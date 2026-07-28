import json


def filter_expenses(expenses_json: str, status: str | None) -> str:
    expenses = json.loads(expenses_json)

    if status:
        expenses = [expense for expense in expenses if expense["status"] == status]

    return json.dumps(expenses)
