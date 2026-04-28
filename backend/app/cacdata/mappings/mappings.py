# Mapping from data key -> field name in PDF
BN07_FIELD_MAP = {
    "registration_number": "Text1",          # Section 1: Registration Number
    "business_name": "Text2",               # Business Name in full
    "general_nature": "Text3",              # General Nature of Business
    # Principal Place of business
    "pp_number": "Text4",                   # Principal place: Number
    "pp_street": "Text5",                   # Street
    "pp_city": "Text6",                     # City
    "pp_lga": "Text7",                      # Local Government
    "pp_postal": "Text8",                   # Postal code
    "pp_state": "Text9",                    # State
    # Branch address (if any) – likely optional
    "branch_number": "Text10",
    "branch_street": "Text11",
    "branch_city": "Text12",
    "branch_lga": "Text13",
    "branch_postal": "Text14",
    "branch_state": "Text15",
    # Annual Return details
    "year_ended": "Text16",                 # Annual Return for the year ended
    "financial_year_end": "Text17",         # Financial Year End
    "turnover": "Text18",                   # Turnover
    "total_net_assets": "Text19",           # Total Net Assets
    # Particculars of Proprietor
    "prop_surname": "Text20",              # Proprietor Surname
    "prop_forenames": "Text21",            # Forenames
    "prop_nationality": "Text22",          # Nationality
    "prop_dob": "Text23",                  # Date of birth
    "prop_gender": "Text24",               # Gender
    "prop_phone": "Text25",                # Telephone
    "prop_id_number": "Text26",            # Identity Number
    "prop_id_type": "Text27",              # Identity Type
    "prop_email": "Text28",                # Email
    "prop_occupation": "Text29",           # Occupation
    # Resendential address
    "prop_res_number": "Text30",           # Residential Address: Number
    "prop_res_street": "Text31",
    "prop_res_city": "Text32",
    "prop_res_lga": "Text33",
    "prop_res_postal": "Text34",
    "prop_res_state": "Text35",
    # Service Address
    "prop_service_number": "Text36",       # Service Address: Number
    "prop_service_street": "Text37",
    "prop_service_city": "Text38",
    "prop_service_lga": "Text39",
    "prop_service_postal": "Text40",
    "prop_service_state": "Text41",
    # Signature (leave blank or placeholder)
    "prop_signature": "Text42",
    "prop_date": "Text43",                 # Date
    # ... Section 6 corporate partner fields (Text44–Text??) – ignore if null
    "corp_name": "Text44",
    "corp_registration_number": "Text45",
    "corp_addr_number": "Text46",
    "corp_addr_street": "Text47",
    "corp_addr_city": "Text48",
    "corp_addr_lga": "Text49",
    "corp_addr_postal": "Text50",
    "corp_addr_state": "Text51",
    # ... Authentication name/email – later fields
    "auth_name": "Text52",
    "auth_email": "Text53",
    # ... Presented by fields at the end
    "presented_name": "Text54",
    "presented_accreditation_number": "Text55",
    "presented_address_number": "Text56",
    "presented_address_street": "Text57",
    "presented_address_city": "Text58",
    "presented_address_lga": "Text59",
    "presented_address_postal": "Text60",
    "presented_address_state": "Text61",
    "presented_address_country": "Text62",
    "presented_phone": "Text63",
    "presented_email": "Text64",
    "presented_signature": "Text65",
    "presented_date": "Text66",
}
