function calculateAndDisplay() {
  const inputDate = document.getElementById("future-date").value;
  const daysRemainingElement = document.getElementById('days-remaining');
  const calendarElement = document.getElementById('calendar');

  // Clear previous results
  daysRemainingElement.textContent = '';
  calendarElement.innerHTML = '';

  if (!inputDate) {
    daysRemainingElement.textContent = "Please enter a date.";
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(inputDate);
  targetDate.setHours(0, 0, 0, 0);

  const timeDiff = targetDate - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    daysRemainingElement.textContent = "That date has already passed.";
  } else if (daysDiff === 0) {
    daysRemainingElement.textContent = "That's today!";
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
  calendarHTML += '<tbody>';

  let day = 1; // Current day of the month we are adding

  // Loop through weeks (rows)
  for (let week = 0; week < 6; week++) { // A month can span at most 6 weeks in the calendar view
      if (day > daysInMonth) break; // Stop if we've added all days

      calendarHTML += '<tr>'; // Start a new week row

      // Loop through days of the week (cells)
      for (let i = 0; i < 7; i++) {
          if (week === 0 && i < startingDayOfWeek) {
              // Add empty cells for the first week before the 1st day
              calendarHTML += '<td></td>';
          } else if (day <= daysInMonth) {
              // Add the day cell
              // *** Temporarily apply highlight to every day cell ***
              let cellClass = 'highlight';

              calendarHTML += `<td class="${cellClass}">${day}</td>`;
              day++; // Move to the next day of the month
          } else {
              // Add empty cells for the last week after the last day
              calendarHTML += '<td></td>';
          }
      }
      calendarHTML += '</tr>'; // End the week row
  }


  calendarHTML += '</tbody></table>';
  calendarElement.innerHTML = calendarHTML;
}