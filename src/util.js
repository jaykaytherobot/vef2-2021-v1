function formatUploadTime(milliseconds) {
  const time = Date.now() - milliseconds;
  const sek = Math.floor(time / 1000);
  const hour = Math.floor(sek / 3600);
  if (hour === 1) return 'Fyrir 1 klukkustund síðan';
  if (hour <= 24) return `Fyrir ${hour} klukkustundum síðan`;
  const day = Math.floor(hour / 24);
  if (day === 1) return 'Fyrir 1 degi síðan';
  if (day <= 7) return `Fyrir ${day} dögum síðan`;
  const week = Math.floor(day / 7);
  if (week === 1) return 'Fyrir 1 viku síðan';
  if (week <= 4) return `Fyrir ${week} vikum síðan`;
  const month = Math.floor(day / 30);
  if (month === 1) return 'Fyrir 1 mánuði síðan';
  if (month <= 11) return `Fyrir ${month} mánuðum síðan`;
  const year = Math.floor(month / 12);
  if (year === 1) return 'Fyrir 1 ári síðan';
  return `Fyrir ${year} árum síðan`;
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  return `${min}:${sec<10 ? 0: ''}${sec}`;
}

module.exports = { formatTime, formatUploadTime };