document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const targetDateString = params.get('date');
  const daysRemainingElement = document.getElementById('days-remaining');
  const calendarElement = document.getElementById('calendar');

  if (!targetDateString) {
    daysRemainingElement.textContent = 'No date provided.';
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(targetDateString);
  targetDate.setHours(0, 0, 0, 0);

  const timeDiff = targetDate - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    daysRemainingElement.textContent = 'That date has already passed.';
  } else if (daysDiff === 0) {
    daysRemainingElement.textContent = 'That's today!';
  } else {
    daysRemainingElement.textContent = `${daysDiff} day(s) remaining.`;
  }

  // Calendar generation logic
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth(); // 0-indexed

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 6 for Saturday

  let calendarHTML = '<table>';
  calendarHTML += '<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead>';
  calendarHTML += '<tbody><tr>';

  // Add empty cells for the days before the 1st of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarHTML += '<td></td>';
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    currentDate.setHours(0, 0, 0, 0);

    let cellClass = '';
    // Highlight dates between today and the target date (inclusive)
    if (currentDate >= today && currentDate <= targetDate) {
      cellClass = 'highlight';
    }

    calendarHTML += `<td class="${cellClass}">${day}</td>`;

    if ((startingDayOfWeek + day) % 7 === 0) {
      calendarHTML += '</tr><tr>';
    }
  }

  // Add empty cells for the days after the last day of the month
  const remainingCells = 7 - ((startingDayOfWeek + daysInMonth) % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      calendarHTML += '<td></td>';
    }
  }

  calendarHTML += '</tr></tbody></table>';
  calendarElement.innerHTML = calendarHTML;
});