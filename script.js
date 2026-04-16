// Elements
const card = document.querySelector('[data-testid="test-todo-card"]');
const title = document.querySelector('[data-testid="test-todo-title"]');
const description = document.querySelector(
  '[data-testid="test-todo-description"]',
);
const priority = document.querySelector('[data-testid="test-todo-priority"]');
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

// Edit form elements
const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
const editTitleInput = document.querySelector(
  '[data-testid="test-todo-edit-title-input"]',
);
const editDescInput = document.querySelector(
  '[data-testid="test-todo-edit-description-input"]',
);
const editPrioritySelect = document.querySelector(
  '[data-testid="test-todo-edit-priority-select"]',
);
const editDueDateInput = document.querySelector(
  '[data-testid="test-todo-edit-due-date-input"]',
);
const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector(
  '[data-testid="test-todo-cancel-button"]',
);

let dueDateValue = new Date(dueDate.getAttribute("datetime"));

// Time remaining
function formatDueDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `Due ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

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

// --- Checkbox toggle ---
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

// --- Edit mode ---
function enterEditMode() {
  // Populate inputs with current values
  editTitleInput.value = title.textContent.trim();
  editDescInput.value = description.textContent.trim();
  editPrioritySelect.value = priority.textContent.trim();

  // Convert due date to datetime-local format (local time, no seconds)
  const pad = (n) => String(n).padStart(2, "0");
  const d = dueDateValue;
  editDueDateInput.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

  card.classList.add("is-editing");
  editForm.hidden = false;
  editTitleInput.focus();
  editTitleInput.select();
}

function exitEditMode() {
  card.classList.remove("is-editing");
  editForm.hidden = true;
  editBtn.focus();
}

editBtn.addEventListener("click", enterEditMode);

cancelBtn.addEventListener("click", exitEditMode);

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Update title
  const newTitle = editTitleInput.value.trim();
  if (newTitle) title.textContent = newTitle;

  // Update description
  description.textContent = editDescInput.value;

  // Update priority
  const newPriority = editPrioritySelect.value;
  priority.textContent = newPriority;
  priority.setAttribute("aria-label", `Priority: ${newPriority}`);
  priority.setAttribute("data-level", newPriority.toLowerCase());

  // Update due date
  const newDueDate = new Date(editDueDateInput.value);
  if (!isNaN(newDueDate.getTime())) {
    dueDateValue = newDueDate;
    dueDate.setAttribute("datetime", newDueDate.toISOString());
    dueDate.textContent = formatDueDate(newDueDate);
    updateTimeRemaining();
  }

  exitEditMode();
});

// Delete button
deleteBtn.addEventListener("click", () => {
  alert("Delete clicked");
});

// Card entrance animation
card.style.opacity = "0";
card.style.transform = "translateY(12px)";
requestAnimationFrame(() => {
  card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  card.style.opacity = "1";
  card.style.transform = "translateY(0)";
});
