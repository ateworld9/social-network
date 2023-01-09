export const timeStringBetweenDates = (date1: Date, date2: Date) => {
  const ms = date1.getTime() - date2.getTime();
  const seconds = Math.ceil(ms / 1000);
  const minutes = Math.trunc(seconds / 60);
  const hours = Math.trunc(minutes / 60);
  const days = Math.trunc(hours / 24);
  if (days) return `${days} days ago`;
  if (hours) return `${hours} hours ago`;
  if (minutes) return `${minutes} minutes ago`;
  return `${seconds} days ago`;
};

export default { timeStringBetweenDates };
