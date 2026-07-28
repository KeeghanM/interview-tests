# Interviewer assessment

Suggested timebox: 30 minutes.

Score out of 20: acceptance-criteria coverage (5), sorting correctness (5), state and type design (4), test quality (3), maintainability and communication (3).

Strong candidates model direction as part of the sort selection, implement all four options without duplicating comparator logic, compare numeric amounts and parsed dates correctly, avoid mutating fetched data while sorting, and verify every sort order with focused tests.

## Ideal steps

1. Run the application and confirm that the current dropdown supports only one direction for amount and date.
2. Trace `sortBy` from the select through the Zustand store to the comparator in `ExpensesTable`.
3. Extend `SortByType` so each field and direction has a distinct valid value, then add the four requested options to the dropdown.
4. Update the comparator to handle amount and date in both directions. Amounts should be compared numerically and dates by timestamp.
5. Sort a copied array rather than mutating the array held in the React Query cache.
6. Verify all four choices with data whose ordering is easy to distinguish, and add focused tests if time permits.

## Follow-up

Ask: "How would you prevent the dropdown and sorting implementation from getting out of sync as more sort options are added?"

Expected answer: keep the allowed values in a shared typed definition or option configuration, make comparator selection exhaustive for `SortByType`, and test every declared option. Strong answers may suggest deriving the dropdown from the same configuration used to select comparators.
