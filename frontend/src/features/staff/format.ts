export const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
export const WEEKDAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// 3800 -> ₹3,800 and 486200 -> ₹4,86,200 (Indian grouping)
export function formatRupees(n: number) {
  const s = Math.round(n).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3 : last3;
  return '₹' + grouped;
}

// 148 -> 2 hr 28 min
export function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h} hr ${m} min` : `${m} min`;
}

// Nov 12, 2026
export function formatDate(d: Date | string) {
  const x = typeof d === 'string' ? new Date(d) : d;
  return `${MONTH_SHORT[x.getMonth()]} ${String(x.getDate()).padStart(2, '0')}, ${x.getFullYear()}`;
}

// Nov 12, 2026 · 11:58 AM
export function formatDateTime(iso: string) {
  const d = new Date(iso);
  const h = d.getHours();
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${formatDate(d)} · ${h % 12 || 12}:${mm} ${h >= 12 ? 'PM' : 'AM'}`;
}

// 12 Nov
export function formatDayMonth(d: Date) {
  return `${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`;
}

// 12 Nov 2026
export function formatFullDate(d: Date) {
  return `${d.getDate()} ${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

// Thursday, 19 November
export function formatLongDate(d: Date) {
  return `${WEEKDAY_FULL[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}