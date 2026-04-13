const card = document.querySelector('[data-testid="test-todo-card"]');
const title = document.querySelector('[data-testid="test-todo-title"]');
const statusEl = document.querySelector('[data-testid="test-todo-status"]');
const checkbox = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]',
);
const timeRemaining = document.querySelector(
  '[data-testid="test-todo-time-remaining"]',
);
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector(
  '[data-testid="test-todo-delete-button"]',
);
const dueDate = document.querySelector('[data-testid="test-todo-due-date"]');

// Due date from the datetime attribute
const dueDateValue = new Date(dueDate.getAttribute("datetime"));

// Time remaining
function updateTimeRemaining() {
  const now = new Date();
  const diff = dueDateValue - now;
  const absDiff = Math.abs(diff);

  const minutes = Math.floor(absDiff / (1000 * 60));
  const hours = Math.floor(absDiff / (1000 * 60 * 60));
  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));

  let text;

  if (Math.abs(diff) < 1000 * 60) {
    text = "Due now!";
  } else if (diff > 0) {
    if (days >= 2) {
      text = `Due in ${days} days`;
    } else if (hours >= 24) {
      text = "Due tomorrow";
    } else if (hours >= 1) {
      text = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      text = `Due in ${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  } else {
    if (days >= 2) {
      text = `Overdue by ${days} days`;
    } else if (hours >= 1) {
      text = `Overdue by ${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      text = `Overdue by ${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
    timeRemaining.classList.add("overdue");
  }

  if (diff > 0) {
    timeRemaining.classList.remove("overdue");
  }

  timeRemaining.textContent = text;
}

updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);

// Checkbox toggle
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    title.classList.add("completed");
    statusEl.textContent = "Done";
    statusEl.setAttribute("aria-label", "Status: Done");
    statusEl.classList.add("done");
  } else {
    title.classList.remove("completed");
    statusEl.textContent = "In Progress";
    statusEl.setAttribute("aria-label", "Status: In Progress");
    statusEl.classList.remove("done");
  }
});

// Edit button
editBtn.addEventListener("click", () => {
  console.log("edit clicked");
});

// Delete button
deleteBtn.addEventListener("click", () => {
  alert("Delete clicked");
});
