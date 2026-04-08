from app.repositories.ai_repository import save_chat_log, save_invoice


def process_invoice(file_name: str):
    return {
        "file_name": file_name,
        "vendor": "Nova Supplies Ltd",
        "total": 4820.45,
        "tax": 482.05,
        "confidence": 0.96,
        "extracted_items": [
            {"description": "Automation Integrations", "quantity": 2, "price": 1200.0},
            {"description": "Cloud Workflow Credits", "quantity": 1, "price": 2420.45},
        ],
    }


def save_invoice_result(db, payload: dict) -> None:
    save_invoice(db, payload)


def smart_ai_reply(prompt: str):
    normalized = prompt.lower()
    if "order" in normalized:
        return (
            "Your order pipeline looks healthy. Consider auto-escalating delayed orders after 12 hours.",
            "Enable delay trigger automation for Tier-1 accounts.",
        )
    if "invoice" in normalized:
        return (
            "Invoice anomaly risk is medium. Missing line-item tags on 2 uploads.",
            "Run invoice schema validation before ERP sync.",
        )
    return (
        "I can optimize workflows, summarize trends, and suggest automations from your live data.",
        "Connect CRM events to trigger real-time AI playbooks.",
    )


def save_chat(db, user_id: int, prompt: str, response: str) -> None:
    save_chat_log(db, user_id, prompt, response)
