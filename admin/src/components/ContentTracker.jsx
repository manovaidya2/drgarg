import React, { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { buildContentDays, dateKey } from '../utils/contentTracker';

const labelForMonth = (month) => new Date(`${month}-01T12:00:00Z`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });

export default function ContentTracker({ blogs, caseStudies, loading, error, onRetry }) {
  const today = dateKey(new Date());
  const currentMonth = today.slice(0, 7);
  const [month, setMonth] = useState(currentMonth);
  const [view, setView] = useState('daily');
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(today);
  const days = useMemo(() => buildContentDays(blogs, caseStudies, month, today), [blogs, caseStudies, month, today]);
  const totals = days.reduce((sum, day) => ({ blogs: sum.blogs + day.blogs.length, studies: sum.studies + day.caseStudies.length }), { blogs: 0, studies: 0 });
  const blogDays = days.filter((day) => day.blogs.length > 0).length;
  const missed = days.filter((day) => day.date < today && !day.blogs.length).length;
  const todayData = buildContentDays(blogs, caseStudies, currentMonth, today).find((day) => day.today);
  const selected = days.find((day) => day.date === selectedDate);
  const visibleDays = days.filter((day) => filter === 'all' || (filter === 'posted' ? day.blogs.length > 0 : day.date < today && !day.blogs.length));
  const months = Array.from({ length: 12 }, (_, i) => {
    const [year, number] = month.split('-').map(Number);
    const date = new Date(Date.UTC(year, number - 12 + i, 1));
    return date.toISOString().slice(0, 7);
  });
  const chartRows = view === 'monthly' ? months.map((key) => {
    const rows = buildContentDays(blogs, caseStudies, key, today);
    return { label: labelForMonth(key), blogs: rows.reduce((n, d) => n + d.blogs.length, 0), studies: rows.reduce((n, d) => n + d.caseStudies.length, 0) };
  }) : days.map((day) => ({ label: day.date.slice(-2), blogs: day.blogs.length, studies: day.caseStudies.length }));
  const shiftMonth = (offset) => {
    const [year, number] = month.split('-').map(Number);
    setMonth(new Date(Date.UTC(year, number - 1 + offset, 1)).toISOString().slice(0, 7));
    setSelectedDate(null);
  };

  return (
    <section className="mb-5 border-y border-gray-200 bg-white px-4 py-5 sm:px-6" aria-label="Content publishing tracker">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Content Publishing Tracker</h2>
        <div className="flex items-center gap-2">
          <button type="button" title="Previous month" aria-label="Previous month" onClick={() => shiftMonth(-1)} className="p-2 hover:bg-gray-100 rounded"><ChevronLeft size={18} /></button>
          <input type="month" aria-label="Tracker month" value={month} max={currentMonth} onChange={(event) => { if (/^\d{4}-\d{2}$/.test(event.target.value) && event.target.value <= currentMonth) { setMonth(event.target.value); setSelectedDate(null); } }} className="min-w-0 border border-gray-300 rounded px-2 py-2 text-sm" />
          <button type="button" title="Next month" aria-label="Next month" disabled={month >= currentMonth} onClick={() => shiftMonth(1)} className="p-2 hover:bg-gray-100 rounded disabled:opacity-30"><ChevronRight size={18} /></button>
        </div>
      </div>
      {error ? <div role="alert" className="py-6 text-sm text-red-700">Publishing data could not be loaded. <button onClick={onRetry} className="underline font-medium">Retry</button></div> : loading && !blogs.length && !caseStudies.length ? <p role="status" className="py-6 text-gray-500">Loading publishing activity...</p> : <>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-b border-gray-200 pb-4">
          {[
            ['Blogs published', totals.blogs, labelForMonth(month)],
            ['Case studies added', totals.studies, labelForMonth(month)],
            ['Blog posting days', blogDays, `${missed} missed days`],
            ["Today's blogs", todayData?.blogs.length || 0, todayData?.blogs.length ? 'Published today' : 'Not posted yet'],
          ].map(([label, value, detail]) => <div key={label}><p className="text-sm text-gray-600">{label}</p><p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p><p className="text-xs text-gray-500 mt-1">{detail}</p></div>)}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 my-4">
          <h3 className="text-sm font-semibold text-gray-700">{view === 'daily' ? labelForMonth(month) : 'Monthly publishing'}</h3>
          <div className="flex border border-gray-200 rounded overflow-hidden" role="group" aria-label="Activity view">
            {['daily', 'monthly'].map((mode) => <button key={mode} type="button" aria-pressed={view === mode} onClick={() => setView(mode)} className={`px-3 py-2 text-sm ${view === mode ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>{mode === 'daily' ? 'Daily' : 'Monthly'}</button>)}
          </div>
        </div>
        <div className="h-56 sm:h-64">
          <Bar data={{ labels: chartRows.map((row) => row.label), datasets: [
            { label: 'Blogs', data: chartRows.map((row) => row.blogs), backgroundColor: '#059669', borderRadius: 3 },
            { label: 'Case studies', data: chartRows.map((row) => row.studies), backgroundColor: '#0284c7', borderRadius: 3 },
          ] }} options={{ responsive: true, maintainAspectRatio: false, animation: false, scales: { y: { beginAtZero: true, ticks: { precision: 0 } }, x: { grid: { display: false }, ticks: { maxTicksLimit: view === 'daily' ? 16 : 6 } } }, plugins: { legend: { position: 'bottom' } } }} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Daily Blog Tracker</h3>
          <select aria-label="Filter blog posting days" value={filter} onChange={(event) => setFilter(event.target.value)} className="border border-gray-300 rounded p-2 text-sm"><option value="all">All days</option><option value="posted">Posted days</option><option value="missed">Missed days</option></select>
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <div key={day} className="text-center text-xs text-gray-500 py-1">{day}</div>)}
          {Array.from({ length: (new Date(`${month}-01T12:00:00Z`).getUTCDay() + 6) % 7 }, (_, i) => <div key={`empty-${i}`} />)}
          {days.map((day) => <button key={day.date} type="button" onClick={() => setSelectedDate(day.date)} aria-pressed={day.date === selectedDate} aria-label={`${day.date}: ${day.blogs.length} blogs, ${day.caseStudies.length} case studies, ${day.future ? 'upcoming' : day.blogs.length ? 'posted' : day.today ? 'not posted yet' : 'missed'}`} className={`min-h-16 sm:min-h-20 rounded border p-1 sm:p-2 text-left ${day.date === selectedDate ? 'ring-2 ring-gray-800' : ''} ${day.future ? 'bg-gray-50 border-gray-100 text-gray-400' : day.blogs.length ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : day.today ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
            <span className="flex items-center justify-between text-xs font-semibold">{Number(day.date.slice(-2))}{day.blogs.length ? <CheckCircle2 size={12} /> : day.future || day.today ? <Clock size={12} /> : <XCircle size={12} />}</span>
            <span className="block text-xs mt-2">B: {day.blogs.length}</span><span className="block text-xs">C: {day.caseStudies.length}</span>
          </button>)}
        </div>
        {selected && <div className="mt-4 border-b border-gray-200 pb-4 text-sm"><h4 className="font-semibold text-gray-800 mb-2">{selected.date}</h4>{selected.future ? <p className="text-gray-500">Upcoming day</p> : <><p className="text-gray-600 mb-2">{selected.blogs.length ? `${selected.blogs.length} blog(s) published` : selected.today ? 'No blog posted yet today' : 'No blog published'} | {selected.caseStudies.length} case study(s)</p>{[...selected.blogs.map((item) => ({ ...item, type: 'Blog' })), ...selected.caseStudies.map((item) => ({ ...item, type: 'Case study' }))].map((item) => <p key={`${item.type}-${item._id}`} className="break-words text-gray-700 py-1"><span className="text-gray-500">{item.type}: </span>{item.title}</p>)}</>}</div>}
        <div className="mt-4 max-h-72 overflow-auto">
          <table className="w-full text-sm text-left"><thead className="sticky top-0 bg-white text-gray-500"><tr><th className="py-2 pr-2">Date (IST)</th><th className="py-2 px-2">Blogs</th><th className="py-2 px-2">Case studies</th><th className="py-2 pl-2">Blog status</th></tr></thead><tbody>{visibleDays.map((day) => <tr key={day.date} className="border-t border-gray-100"><td className="py-2 pr-2 whitespace-nowrap">{day.date.slice(8)} {new Date(`${day.date}T12:00:00Z`).toLocaleDateString('en-IN', { month: 'short', timeZone: 'Asia/Kolkata' })}</td><td className="py-2 px-2">{day.blogs.length}</td><td className="py-2 px-2">{day.caseStudies.length}</td><td className={`py-2 pl-2 ${day.blogs.length ? 'text-emerald-700' : day.date < today ? 'text-rose-700' : 'text-gray-500'}`}>{day.future ? 'Upcoming' : day.blogs.length ? 'Posted' : day.today ? 'Pending today' : 'Missed'}</td></tr>)}</tbody></table>
          {!visibleDays.length && <p className="py-5 text-sm text-gray-500">No {filter} days in this month.</p>}
        </div>
      </>}
    </section>
  );
}
