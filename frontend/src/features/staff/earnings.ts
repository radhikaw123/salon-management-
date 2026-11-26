import { WEEKDAY_FULL, MONTH_SHORT, formatDayMonth } from './format';
import { mockHistory, mockStaffCustomers, type HistoryItem } from './mock';

export type Period = 'today' | 'week' | 'month' | 'custom';
export interface DateRange { start: Date; end: Date }
export interface Earning { item: HistoryItem; customerName: string; commission: number; at: Date }
export interface Bucket { label: string; heading: string; total: number; entries: Earning[] }

const DAY = 86400000;
const INITIAL = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const daysBetween = (a: Date, b: Date) => Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / DAY);
const startOfWeek = (d: Date) => addDays(startOfDay(d), -((d.getDay() + 6) % 7)); // Monday

export function rangeFor(period: Period, custom: DateRange | null, now = new Date()): DateRange {
  if (period === 'today') return { start: startOfDay(now), end: endOfDay(now) };
  if (period === 'week') {
    const s = startOfWeek(now);
    return { start: s, end: endOfDay(addDays(s, 6)) };
  }
  if (period === 'month') {
    return {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: endOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
    };
  }
  return custom ?? { start: startOfDay(now), end: endOfDay(now) };
}

export const commissionOf = (h: HistoryItem) => Math.round((h.price * h.commissionPct) / 100);

const allEarnings: Earning[] = mockHistory.map((h) => ({
  item: h,
  customerName: mockStaffCustomers.find((c) => c.id === h.customerId)?.name ?? 'Customer',
  commission: commissionOf(h),
  at: new Date(h.completedAt),
}));

export const earningsIn = (r: DateRange) => allEarnings.filter((e) => e.at >= r.start && e.at <= r.end);
export const sumOf = (list: Earning[]) => list.reduce((s, e) => s + e.commission, 0);

// Bars for the trend chart: one per day (up to 14 days), otherwise one per week
export function buildBuckets(r: DateRange): Bucket[] {
  const days = daysBetween(r.start, r.end) + 1;
  const list = earningsIn(r);
  const buckets: Bucket[] = [];

  if (days <= 14) {
    for (let i = 0; i < days; i++) {
      const d = addDays(startOfDay(r.start), i);
      const entries = list.filter((e) => daysBetween(d, e.at) === 0);
      buckets.push({
        label: INITIAL[d.getDay()],
        heading: `${WEEKDAY_FULL[d.getDay()]}, ${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`,
        total: sumOf(entries),
        entries,
      });
    }
  } else {
    const weeks = Math.ceil(days / 7);
    for (let i = 0; i < weeks; i++) {
      const s = addDays(startOfDay(r.start), i * 7);
      const e = endOfDay(addDays(s, 6));
      const last = e > r.end ? r.end : e;
      const entries = list.filter((x) => x.at >= s && x.at <= e);
      buckets.push({
        label: `W${i + 1}`,
        heading: `${formatDayMonth(s)} – ${formatDayMonth(last)}`,
        total: sumOf(entries),
        entries,
      });
    }
  }
  return buckets;
}

// Which bar is "today" (or -1 when today is outside the range)
export function todayBucketIndex(r: DateRange, now: Date) {
  const days = daysBetween(r.start, r.end) + 1;
  const offset = daysBetween(r.start, now);
  if (offset < 0 || offset >= days) return -1;
  return days <= 14 ? offset : Math.floor(offset / 7);
}

export function averagePerDay(r: DateRange, total: number, now: Date) {
  const elapsed = Math.min(daysBetween(r.start, now), daysBetween(r.start, r.end)) + 1;
  return total / Math.max(elapsed, 1);
}

// Today's earnings compared with the daily average of the previous 30 days
export function percentVsDailyAverage(todayTotal: number, now: Date): number | null {
  const past = earningsIn({ start: addDays(startOfDay(now), -30), end: endOfDay(addDays(now, -1)) });
  const avg = sumOf(past) / 30;
  return avg > 0 ? Math.round(((todayTotal - avg) / avg) * 100) : null;
}