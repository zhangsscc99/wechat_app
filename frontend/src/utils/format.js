import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('zh-cn');

export function formatChatTime(timestamp) {
  if (!timestamp) return '';

  const date = dayjs(timestamp);
  const today = dayjs();

  if (date.isSame(today, 'day')) {
    return date.format('HH:mm');
  }

  if (date.isSame(today, 'year')) {
    return date.format('M月D日');
  }

  return date.format('YYYY/M/D');
}

export function formatMomentTime(timestamp) {
  if (!timestamp) return '';
  return dayjs(timestamp).fromNow();
}

export function formatCountBadge(count) {
  if (!count) return '';
  if (count > 99) return '99+';
  return String(count);
}

export function formatHeaderWithCount(base, count) {
  if (!count) return base;
  return `${base}(${count})`;
}
