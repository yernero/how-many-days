function calculateDays() {
  const inputDate = document.getElementById("future-date").value;
  const result = document.getElementById("result");

  if (!inputDate) {
    result.textContent = "Please enter a date.";
    return;
  }

  const today = new Date();
  const future = new Date(inputDate);

  // Clear time part for accurate difference
  today.setHours(0, 0, 0, 0);
  future.setHours(0, 0, 0, 0);

  const timeDiff = future - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    result.textContent = "That date has already passed.";
  } else if (daysDiff === 0) {
    result.textContent = "That's today!";
  } else {
    result.textContent = `${daysDiff} day(s) remaining.`;
  }
}