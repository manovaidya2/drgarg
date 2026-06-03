import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { 
  Phone, Mail, Calendar, MessageCircle, User, 
  AlertCircle, Clock, ChevronRight, Search, 
  Filter, Download, Eye, CheckCircle, XCircle,
  TrendingUp, Users, FileText, Star, RefreshCw,
  ChevronDown, ChevronUp, MoreVertical, Trash2,
  Send, Reply, Archive, Flag, Printer
} from "lucide-react";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterConcern, setFilterConcern] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/appointments/admin/all");
      console.log("API Response:", res.data);
      
      let appointmentsData = [];
      if (res.data.appointments && Array.isArray(res.data.appointments)) {
        appointmentsData = res.data.appointments;
      } else if (Array.isArray(res.data)) {
        appointmentsData = res.data;
      } else if (res.data.data && Array.isArray(res.data.data)) {
        appointmentsData = res.data.data;
      }
      
      setAppointments(appointmentsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.response?.data?.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    const confirmed = window.confirm("Delete this appointment? This action cannot be undone.");
    if (!confirmed) return;

    try {
      setDeleteLoading(true);
      setDeleteError(null);
      await api.delete(`/appointments/admin/${appointmentId}`);
      setAppointments((prev) => prev.filter((appointment) => appointment._id !== appointmentId));
      if (selectedAppointment?._id === appointmentId) {
        setSelectedAppointment(null);
        setShowDetailsModal(false);
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
      setDeleteError(err.response?.data?.message || "Unable to delete appointment. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        return `Today, ${date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
      } else if (diffDays === 1) {
        return `Yesterday, ${date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      }
      
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "Invalid date";
    }
  };

  const getConcernColor = (concern) => {
    const colors = {
      "Autism / ADHD": "bg-gradient-to-r from-purple-500 to-pink-500",
      "Depression": "bg-gradient-to-r from-blue-500 to-cyan-500",
      "Anxiety": "bg-gradient-to-r from-green-500 to-emerald-500",
      "Stress": "bg-gradient-to-r from-orange-500 to-red-500",
      "Other": "bg-gradient-to-r from-gray-500 to-gray-600"
    };
    return colors[concern] || colors["Other"];
  };

  const getConcernIcon = (concern) => {
    const icons = {
      "Autism / ADHD": <Star className="w-3 h-3" />,
      "Depression": <AlertCircle className="w-3 h-3" />,
      "Anxiety": <AlertCircle className="w-3 h-3" />,
      "Stress": <AlertCircle className="w-3 h-3" />
    };
    return icons[concern] || <FileText className="w-3 h-3" />;
  };

  const filteredAndSortedAppointments = () => {
    let filtered = appointments.filter(app => {
      const matchesSearch = 
        (app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         app.phone?.includes(searchTerm));
      const matchesConcern = filterConcern === "all" || app.concern === filterConcern;
      return matchesSearch && matchesConcern;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === "createdAt") {
        aVal = new Date(a.createdAt);
        bVal = new Date(b.createdAt);
      }
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Concern", "Message", "Date"];
    const csvData = appointments.map(app => [
      app.name,
      app.email,
      app.phone,
      app.concern,
      app.message,
      new Date(app.createdAt).toLocaleString()
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uniqueConcerns = ["all", ...new Set(appointments.map(a => a.concern).filter(Boolean))];

  const stats = {
    total: appointments.length,
    withMessage: appointments.filter(a => a.message).length,
    uniqueConcerns: new Set(appointments.map(a => a.concern)).size,
    todayCount: appointments.filter(a => {
      const today = new Date().toDateString();
      return new Date(a.createdAt).toDateString() === today;
    }).length
  };

  /* LOADING STATE */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  /* ERROR STATE */
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={fetchAppointments}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto    py-5">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Appointments
              </h1>
              <p className="text-gray-500 mt-2">Manage and track all appointment requests</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={fetchAppointments}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Total Appointments</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-2">All time requests</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">With Messages</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats.withMessage}</p>
            <p className="text-xs text-gray-400 mt-2">{((stats.withMessage / stats.total) * 100).toFixed(1)}% have details</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Filter className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Concern Types</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats.uniqueConcerns}</p>
            <p className="text-xs text-gray-400 mt-2">Different categories</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Today's Requests</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats.todayCount}</p>
            <p className="text-xs text-gray-400 mt-2">Received today</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterConcern}
                onChange={(e) => setFilterConcern(e.target.value)}
                className="pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
              >
                {uniqueConcerns.map(concern => (
                  <option key={concern} value={concern}>
                    {concern === "all" ? "All Concerns" : concern}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block   overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
                <tr>
                  {["Name", "Email", "Phone", "Concern", "Date & Time", "Message", ""].map((header, idx) => (
                    <th key={idx} className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      {header !== "Date & Time" ? header : (
                        <button
                          onClick={() => {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                            setSortField("createdAt");
                          }}
                          className="flex items-center gap-1 hover:text-purple-600"
                        >
                          {header}
                          {sortField === "createdAt" && (
                            sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAndSortedAppointments().map((item) => (
                  <tr key={item._id} className="hover:bg-purple-50/50 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{item.email || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{item.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 ${getConcernColor(item.concern)} text-white rounded-full text-xs font-medium shadow-sm`}>
                        {getConcernIcon(item.concern)}
                        {item.concern || "Autism / ADHD"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        {formatDate(item.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm max-w-xs truncate" title={item.message}>
                        {item.message || "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedAppointment(item);
                          setShowDetailsModal(true);
                        }}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(item._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        disabled={deleteLoading}
                        title="Delete appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 lg:hidden">
          {filteredAndSortedAppointments().map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-5 space-y-3 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-500">{formatDate(item.createdAt)}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 ${getConcernColor(item.concern)} text-white rounded-lg text-xs font-medium`}>
                  {getConcernIcon(item.concern)}
                  {item.concern || "Autism / ADHD"}
                </span>
              </div>

              <div className="space-y-2 pl-1">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{item.email || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {item.phone}
                </div>
              </div>

              {item.message && (
                <div className="flex gap-2 text-gray-600 bg-purple-50 p-3 rounded-xl">
                  <MessageCircle className="w-4 h-4 text-purple-500 mt-0.5" />
                  <p className="text-sm flex-1 line-clamp-2">{item.message}</p>
                </div>
              )}

              <div className="grid gap-2">
                <button
                  onClick={() => {
                    setSelectedAppointment(item);
                    setShowDetailsModal(true);
                  }}
                  className="w-full px-4 py-2 bg-gray-50 text-purple-600 rounded-xl text-sm font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteAppointment(item._id)}
                  disabled={deleteLoading}
                  className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedAppointments().length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No appointments found</h3>
            <p className="text-gray-500">
              {searchTerm || filterConcern !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "New appointment requests will appear here"}
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Appointment Details</h2>
                  <p className="text-purple-200 mt-1">ID: {selectedAppointment._id?.slice(-8)}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <User className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-800">{selectedAppointment.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-800">{selectedAppointment.email || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-800">{selectedAppointment.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-xs text-gray-500">Concern / Issue</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 ${getConcernColor(selectedAppointment.concern)} text-white rounded-lg text-xs font-medium mt-1`}>
                        {getConcernIcon(selectedAppointment.concern)}
                        {selectedAppointment.concern || "Autism / ADHD"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-cyan-600" />
                    <div>
                      <p className="text-xs text-gray-500">Submitted On</p>
                      <p className="font-medium text-gray-800">
                        {new Date(selectedAppointment.createdAt).toLocaleString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAppointment.message && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-800">Message / Additional Details</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{selectedAppointment.message}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Reply className="w-4 h-4" />
                  Respond
                </button>
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAppointment(selectedAppointment._id)}
                  disabled={deleteLoading}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Appointment
                </button>
              </div>
              {deleteError && (
                <p className="mt-3 text-sm text-red-600">{deleteError}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}