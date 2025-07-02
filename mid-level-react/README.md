# Vertu Technology Mid-Level Frontend Developer Test

## Instructions

This repository contains a finance application built with React, TypeScript, and Astro. It has a local SQLite database using Drizzle ORM, this is seeded with random data every time the application is started. It is designed to be fully standalone, and does not require any external services or APIs to run.

1. Run `npm install` to install the dependencies.
2. Run `npm run dev` to start the development server.
3. Open your browser and navigate to `http://localhost:4321` to view the application.
4. Follow the below tickets

## Interview Tickets

### BUG: Expense table not displaying all tickets

An issue has been reported where the expense table does not display all tickets when first loaded. If you switch the filter to "Pending" and then back to "All", the table displays all tickets correctly.

#### Expected Behavior

The expense table should display the tickets corresponding to the selected filter at all times, even when first loaded.

#### Actual Behavior

The expense table does not display all tickets when first loaded. It shows nothing until the filter is changed to something else and then back to "All".

#### Steps to Reproduce

1. Open the application.
2. Click on the "Expenses" tab.
3. Observe that the expense table does not display any tickets initially.
4. Change the filter to "Pending".
5. Change the filter back to "All".
6. Observe that the expense table now displays all tickets correctly.

### TASK: As an admin, I want to see the most recent changes to expenses, so I can keep track of updates.

#### Description

On the "Dashboard" page, the "Recent Expenses" section should display the most recent changes to expenses. This section should show the last 5 changes made to expenses.

#### Acceptance Criteria

- The "Recent Expenses" section is visible on the "Dashboard" page.
- The section displays the last 5 changes made to expenses.
- Each change includes the date, description, amount, and status of the expense.
- The changes are sorted by date, with the most recent change at the top.
