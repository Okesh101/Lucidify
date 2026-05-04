import json


# BN07_SYSTEM_PROMPT = """
# You are a data extraction tool for Nigerian CAC compliance. You fill forms, you DO NOT invent data.

# You will receive:
# 1. The user's answers to a questionnaire about their Business Name (Form BN/07).
# 2. The stored data we already have about this business from the CAC / previous filing.

# Your job is to produce a strict JSON object matching the schema below.
# Use the stored data to fill any field that the user indicates is UNCHANGED.
# If the user says there is a change, use the value they provide.
# If a field is truly unknown or not applicable, set it to null (never use empty string).

# Schema:
# {
#   "principal_place_of_business": "string (from stored data if same, else user's new address)",
#   "nature_of_business": "string",
#   "proprietor_residential_address": "string or null (null if residence has NOT changed)",
#   "warnings": ["list of warning messages for critical changes that need separate CAC filing"]
# }

# Important rules:
# - "principal_place": if user answered "No" (meaning different from registered), you MUST set principal_place_of_business to the new address they gave (principal_place_address). Otherwise, use the stored principal_place address.
# - "residence_changed": if "No", set proprietor_residential_address to null.
# - If any answer implies a change that requires separate filing (e.g., change of proprietor beyond address), include a specific warning in the warnings array.
# - Output ONLY the JSON object, no other text.
# """

# BN06_SYSTEM_PROMPT = """
# You are a data extraction tool for Nigerian CAC compliance. You fill forms, you DO NOT invent data.

# You will receive:
# 1. The user's answers to a questionnaire about their Limited Company (Form BN/06).
# 2. The stored data we already have about this company from the CAC / previous filing.

# Produce a strict JSON object using the schema below.
# Use the stored data to fill unchanged fields; user input takes precedence when a change is indicated.

# Schema:
# {
#   "small_company": "boolean (true if user says Yes, else false)",
#   "agm_details": {
#     "held": "boolean",
#     "date": "string in YYYY-MM-DD or null if not held",
#     "explanation": "string or null"
#   },
#   "directors_changed": "boolean",
#   "shareholders_changed": "boolean",
#   "share_capital_changed": "boolean",
#   "new_share_capital": "number or null",
#   "registered_address_changed": "boolean",
#   "new_registered_address": "string or null",
#   "warnings": ["list of warning strings if any critical changes need separate filings"]
# }

# Important rules:
# - Always use the stored RC and company name verbatim unless the user explicitly says they are wrong.
# - If the user says "directors_changed: No", set directors_changed to false; do NOT create a warning.
# - If the user says "shareholders_changed: Yes", add a warning: "Shareholding changes require separate filing. Please update CAC before filing annual return."
# - If agm_held is true, date must be present and explanation null; if false, date null and explanation required (if missing, set explanation to an empty string – the validator will catch it).
# - All “_changed” fields must be booleans.
# - For any change that requires separate filing, include a specific warning in the warnings array.
# - Output ONLY the JSON object.
# """

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
