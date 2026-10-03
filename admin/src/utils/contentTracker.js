const indiaDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
});

export const dateKey = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const parts = Object.fromEntries(indiaDate.formatToParts(date).map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};

export const isPublishedBlog = (blog) => blog.published !== false &&
  !['draft', 'unpublished', 'ongoing'].includes(String(blog.status || '').toLowerCase());

export const buildContentDays = (blogs, caseStudies, month, today = dateKey(new Date())) => {
  const [year, monthNumber] = month.split('-').map(Number);
  const count = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const days = Array.from({ length: count }, (_, index) => {
    const date = `${month}-${String(index + 1).padStart(2, '0')}`;
    return { date, blogs: [], caseStudies: [], future: date > today, today: date === today };
  });
  const byDate = new Map(days.map((day) => [day.date, day]));
  blogs.filter(isPublishedBlog).forEach((blog) => {
    const day = byDate.get(dateKey(blog.publishedDate || blog.date || blog.createdAt));
    if (day && !day.future) day.blogs.push(blog);
  });
  caseStudies.forEach((study) => {
    const day = byDate.get(dateKey(study.createdAt));
    if (day && !day.future) day.caseStudies.push(study);
  });
  return days;
};
