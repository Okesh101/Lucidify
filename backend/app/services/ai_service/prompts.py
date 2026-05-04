import json


BN07_SYSTEM_PROMPT = """
You are a data extraction tool for Nigerian CAC Form BN/07. 
Focus ONLY on the business particulars. Do not include business names or BN numbers.

Output a strict JSON object:
{
  "principal_place_of_business": "string (from stored data if no change, else use residential address if it moved there)",
  "nature_of_business": "string",
  "proprietor_residential_address": "string or null (null if residence_changed is false)",
  "warnings": ["list of strings if other_particulars_changed is true"]
}

Rules:
- If 'residence_changed' is true, set 'proprietor_residential_address' to the new address.
- If 'other_particulars_changed' is true, add warning: "Other changes to particulars detected. Ensure BN/03, BN/04, or BN/05 was filed."
"""

BN06_SYSTEM_PROMPT = """
You are a data extraction tool for Nigerian CAC Form 06. 
Focus ONLY on the annual return summary. Do not include company names or RC numbers.

Output a strict JSON object:
{
  "small_company": "boolean",
  "agm_details": {
    "held": "boolean",
    "date": "YYYY-MM-DD or null",
    "explanation": "string or null (required if held is false)"
  },
  "directors_changed": "boolean",
  "shareholders_changed": "boolean",
  "share_capital_changed": "boolean",
  "new_share_capital": "number or null",
  "new_shares_issued": "boolean",
  "warnings": ["list"]
}

Rules:
- If agm_held is false, set date to null and provide a generic legal explanation (e.g., "Company is a small company exempt from AGM under CAMA 2020").
- If shareholders_changed or directors_changed is true, add a warning about separate filings.
"""


def build_prompt(entity_type: str, answers: dict, stored_data: dict = None) -> tuple:
    if stored_data is None:
        stored_data = {}
    # print(stored_data)

    if entity_type == "business_name":
        system_prompt = BN07_SYSTEM_PROMPT
        # If new_residential_address has a value, residence changed.
        residence_val = answers.get("new_residential_address", "").strip()

        mapped_answers = {
            "nature_of_business": answers.get("business_nature"),
            "residence_changed": bool(residence_val),
            "new_residential_address": residence_val if residence_val else None,
            "other_particulars_changed": answers.get("bnQuestion6") == "yes"
        }
    else:
        system_prompt = BN06_SYSTEM_PROMPT
        # Logic: If these fields have values, the change happened.
        new_shares_val = answers.get(
            "new_registered_address", "").strip()  # Misnamed on FE
        new_capital_val = answers.get("issued_shared_capital", "").strip()
        agm_date_val = answers.get("agm_date", "").strip()

        mapped_answers = {
            "is_small_company": answers.get("rcQuestion1") == "yes",
            "directors_changed": answers.get("rcQuestion3") == "yes",
            "shareholders_changed": answers.get("rcQuestion4") == "yes",
            "new_shares_issued": bool(new_shares_val),
            "new_shares_details": new_shares_val if new_shares_val else None,
            "share_capital_changed": bool(new_capital_val),
            "new_share_capital": new_capital_val if new_capital_val else None,
            "agm_held": bool(agm_date_val),
            "agm_date": agm_date_val if agm_date_val else None
        }

    user_prompt = f"User Inputs: {json.dumps(mapped_answers)}\nRegistry Truth: {json.dumps(stored_data)}"
    return system_prompt, user_prompt
