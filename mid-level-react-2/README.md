# Vertu Technology Mid-Level Frontend Developer Test

## Instructions

This repository contains a finance application built with React, TypeScript, and Astro. It has a local SQLite database using Drizzle ORM, this is seeded with random data every time the application is started. It is designed to be fully standalone, and does not require any external services or APIs to run.

1. Run `npm install` to install the dependencies.
2. Run `npm run dev` to start the development server.
3. Open your browser and navigate to `http://localhost:4321` to view the application.
4. Follow the below tickets

## Interview Tickets

### Add new sort orders

As a user, I want to be able to sort expenses by amount and date in both ascending and descending order.

#### Acceptance Criteria

- On the Expenses page, the "Sort By" dropdown should allow selecting "Amount Ascending", "Amount Descending", "Date Ascending", and "Date Descending".
- The expenses table should be sorted according to the selected sort order.
