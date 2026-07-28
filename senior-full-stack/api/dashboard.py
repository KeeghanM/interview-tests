import json


def build_dashboard(services_json: str, incidents_json: str, service_id: str) -> str:
    services = json.loads(services_json)
    incidents = json.loads(incidents_json)
    service = next((item for item in services if item["id"] == service_id), None)

    if service is None:
        return json.dumps({"error": "Service not found"})

    # Incidents from services with the same owner are currently included.
    selected_incidents = [item for item in incidents if item["owner"] == service["owner"]]
    selected_incidents.sort(key=lambda item: item["opened_at"], reverse=True)

    return json.dumps({
        "service": service,
        "summary": {
            "total_incidents": len(selected_incidents),
            "active_incidents": sum(item["status"] == "open" for item in selected_incidents),
            "highest_severity": _highest_severity(selected_incidents),
        },
        "incidents": selected_incidents,
    })


def _highest_severity(incidents: list[dict]) -> str:
    rank = {"low": 1, "medium": 2, "high": 3}
    return max((item["severity"] for item in incidents), key=lambda value: rank[value], default="none")
