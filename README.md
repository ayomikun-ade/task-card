# Task Card

## Overview

This project provides a clean, interactive user interface component designed to display and manage individual tasks. It helps you clearly present task details like due dates, priorities, and status, making it easier for users to keep track of their work. You get a ready-to-use, accessible task card that can fit into any web application.

## Features

- **Detailed Task Display**: Shows task title, description, priority, and status at a glance.
- **Dynamic Due Date Tracking**: Calculates and displays the time remaining until a task's due date, updating live. It also provides visual cues for overdue tasks.
- **Interactive Completion Toggle**: Mark tasks as complete with a checkbox, which visually updates the card (e.g., strike-through title, status change to "Done").
- **Action Buttons**: Includes "Edit" and "Delete" buttons for task management, ready to be integrated with backend logic.
- **Semantic and Accessible HTML**: Built with proper semantic HTML elements and ARIA attributes to ensure it's accessible to all users, including those using screen readers.
- **Responsive Design**: Adapts gracefully to various screen sizes, from mobile phones to desktops, ensuring a consistent user experience.

## Getting Started

To get this task card up and running locally, follow these simple steps.

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/ayomikun-ade/task-card.git
    ```
2.  **Navigate to the Project Directory**:
    ```bash
    cd task-card
    ```
3.  **Open the HTML File**:
    Simply open the `index.html` file in your web browser. You don't need a local server for this.

    ```bash
    # On Windows
    start index.html

    # On macOS
    open index.html

    # On Linux
    xdg-open index.html
    ```

## Usage

Once you've opened the `index.html` file in your browser, you'll see the task card displayed.

- **Observe Task Details**: The card will show a sample task with its title, description, "High" priority, and "In Progress" status.
- **Time Remaining**: Look at the "Due Apr 18, 2026" section; below it, the "Calculating..." text will update every minute to show how much time is left until the due date or if it's overdue.
- **Marking Complete**: Click the "Mark complete" checkbox. You'll notice the task title gets a strike-through, and the status changes to "Done". Uncheck it to revert the changes.
- **Edit and Delete**: The "Edit" and "Delete" buttons are currently set up with dummy actions. Clicking "Edit" will log "edit clicked" to your browser's developer console, and clicking "Delete" will trigger a simple browser alert saying "Delete clicked". You can easily integrate these with your own backend or frontend logic.

## What Changed from Stage 0

Stage 0 delivered a static, read-only card with a single checkbox toggle. Stage 1 expands it into a stateful, interactive component:

- **Inline editing** — Clicking Edit hides the display view and reveals a form pre-populated with current values (title, description, priority, due date). Save applies changes; Cancel discards.
- **Status control** — A segmented button group (Pending / In Progress / Done) that stays bi-directionally synced with the checkbox and status badge.
- **Priority indicator** — A colored left border accent on the card that changes with Low (slate) / Medium (blue) / High (red), updated live when edited.
- **Expand/collapse** — Long descriptions collapse by default with a "Show more" toggle, using `aria-expanded` and `aria-controls`.
- **Overdue indicator** — A distinct red badge that appears when the due date has passed and the task is not Done.
- **Granular time-remaining** — Replaced coarse calculations with days / hours / minutes buckets. Updates every 30 seconds (was 60s). When Done, timer freezes and shows "Completed".
- All 13 original `data-testid` values preserved; 10 new ones added.

## New Design Decisions

- **Hide-and-show edit form (not inline editing)**: Integrated a hidden form reveal which gives each mode a cleaner, isolated container.
- **Segmented control over dropdown**: A segmented control fits my neobrutalism style approach better — three blocky, color-filled buttons sharing a bordered row — and makes the current status visible without an extra click.
- **Left border accent for priority indicator**: Chosen over a colored dot or background tint because it creates a strong vertical visual anchor consistent with the card's heavy borders, and remains visible regardless of content length.
- **Length-based collapse trigger (120 chars)**: The expand toggle stays hidden for short descriptions to avoid unnecessary UI clutter.
- **Blue-toned palette**: Soft blue card on cool grey-blue background, deep navy borders, red reserved for High priority and overdue states, green for Done. Picked for WCAG AA contrast without the usual neobrutalism bright yellow/pink.
- **Hard offset shadow + thick borders**: `6px 6px 0 navy` shadow and 3px borders for neobrutalism style — no blur, no glow.
- **Micro-interactions only**: Button press, tag hover lift, card entrance fade-slide, expand icon rotate, overdue pulse. No decorative motion.

## Known Limitations

- **Cancel has no confirmation**: If the user edits several fields and clicks Cancel, there's no "are you sure?" prompt. Intentional for simplicity.
- **No persistence**: State is in memory only. Reloading resets the card to its hard-coded initial values.
- **Single card only**: Scope is one card component, not a list or full todo app.
- **Checkbox revert goes to Pending, not previous status**: When a Done task is unchecked, status reverts to Pending rather than the prior status like In Progress. Previous status is not tracked.
- **Due-date uses local timezone**: `datetime-local` input reads/writes the browser's local timezone; stored as UTC ISO on save.

## Accessibility Notes

- **Semantic HTML**: `<article>` card root, `<h2>` title, `<p>` description, `<time datetime="…">` for due-date and time-remaining, `<ul role="list">` with `<li>` tags, real `<input type="checkbox">` with `<label for="…">`, `<button>` (never `<div>`) for all actions.
- **Form labels**: Every edit-form field has a visible `<label for="…">`.
- **ARIA**:
  - Priority / status badges have `aria-label` describing their value (e.g., "Priority: High").
  - Status segmented control uses `role="radiogroup"` with `aria-label`; each button has `role="radio"` + `aria-checked`.
  - Expand toggle uses `aria-expanded` + `aria-controls` pointing to the collapsible section's matching `id`.
  - Time-remaining uses `aria-live="polite"` so screen readers announce updates.
  - Overdue indicator has `aria-label="Task is overdue"`.
  - Priority indicator is visual-only → `aria-hidden="true"` (priority badge already conveys the info).
- **Focus management**:
  - Visible 3px blue outline on all interactive elements.
  - Entering edit mode focuses the title input.
  - Exiting edit mode (Save or Cancel) returns focus to the Edit button.
- **Keyboard**: Fully keyboard-navigable via Tab. All interactive elements are native focusable elements.
- **Color contrast**: All text/background combinations meet WCAG AA. Color never communicates alone — text labels accompany priority, status, and overdue indicators.

## Technologies Used

| Technology | Description                                                                           |
| :--------- | :------------------------------------------------------------------------------------ |
| HTML       | Structures the content and defines the task card layout.                              |
| CSS        | Styles the card, ensuring a modern and responsive look.                               |
| JavaScript | Handles interactive elements like the completion toggle and dynamic time calculation. |

## Contributing

We'd love for you to contribute to this project! Here’s how you can help:

1.  **Fork the Repository**: Start by forking the project to your own GitHub account.
2.  **Clone Your Fork**: Clone your forked repository to your local machine.
3.  **Create a New Branch**: Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4.  **Make Your Changes**: Implement your changes and test them thoroughly.
5.  **Commit Your Changes**: Commit your changes with a clear and concise message:
    ```bash
    git commit -m "feat: Add new awesome feature"
    ```
6.  **Push to Your Branch**: Push your changes to your fork on GitHub:
    ```bash
    git push origin feature/your-feature-name
    ```
7.  **Open a Pull Request**: Go to the original repository on GitHub and open a pull request from your branch. Please describe your changes in detail.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
