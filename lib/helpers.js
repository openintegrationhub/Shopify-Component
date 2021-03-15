/* eslint no-param-reassign: 0 */ // --> OFF

function toISO8601Time(x) {
  if (!x) x = 0;
  const localTime = new Date(x);
  const sign = (localTime.getTimezoneOffset() <= 0) ? '+' : '-';
  const offsetHours = `${Math.abs(localTime.getTimezoneOffset() / 60)}`.padStart(2, '0');
  const offsetMinutes = `${Math.abs(localTime.getTimezoneOffset() % 60)}`.padStart(2, '0');

  const fullTime = `${localTime.toISOString()}${sign}${offsetHours}:${offsetMinutes}`;

  return fullTime;
}

module.exports = {
  toISO8601Time,
};
