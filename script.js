function goToCalendar() {
  const inputDate = document.getElementById("future-date").value;

  if (!inputDate) {
    alert("Please enter a date."); // Using alert for simplicity on the first page
    return;
  }

  // We don't need to calculate days here, just pass the date
  window.location.href = `calendar.html?date=${inputDate}`;
}