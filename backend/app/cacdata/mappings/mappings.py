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
    "prop1_surname": "Text20",              # Proprietor Surname
    "prop1_forenames": "Text21",            # Forenames
    "prop1_nationality": "Text22",          # Nationality
    "prop1_dob": "Text23",                  # Date of birth
    "prop1_gender": "Text24",               # Gender
    "prop1_phone": "Text25",                # Telephone
    "prop1_id_number": "Text26",            # Identity Number
    "prop1_id_type": "Text27",              # Identity Type
    "prop1_email": "Text28",                # Email
    "prop1_occupation": "Text29",           # Occupation
    # Resendential address
    "prop1_res_number": "Text30",           # Residential Address: Number
    "prop1_res_street": "Text31",
    "prop1_res_city": "Text32",
    "prop1_res_lga": "Text33",
    "prop1_res_postal": "Text34",
    "prop1_res_state": "Text35",
    # Service Address
    "prop1_service_number": "Text36",       # Service Address: Number
    "prop1_service_street": "Text37",
    "prop1_service_city": "Text38",
    "prop1_service_lga": "Text39",
    "prop1_service_postal": "Text40",
    "prop1_service_state": "Text41",
    # Signature (leave blank or placeholder)
    "prop1_signature": "",
    "prop1_date": "Text42",                 # Date
    # Particculars of 2nd Proprietor
    "prop2_surname": "Text43",              # Proprietor Surname
    "prop2_forenames": "Text44",            # Forenames
    "prop2_nationality": "Text45",          # Nationality
    "prop2_dob": "Text46",                  # Date of birth
    "prop2_gender": "Text47",               # Gender
    "prop2_phone": "Text48",                # Telephone
    "prop2_id_number": "Text49",            # Identity Number
    "prop2_id_type": "Text50",              # Identity Type
    "prop2_email": "Text51",                # Email
    "prop2_occupation": "Text52",           # Occupation
    # Resendential address
    "prop2_res_number": "Text53",           # Residential Address: Number
    "prop2_res_street": "Text54",
    "prop2_res_city": "Text55",
    "prop2_res_lga": "Text56",
    "prop2_res_postal": "Text57",
    "prop2_res_state": "Text58",
    # Service Address
    "prop2_service_number": "Text59",       # Service Address: Number
    "prop2_service_street": "Text60",
    "prop2_service_city": "Text61",
    "prop2_service_lga": "Text62",
    "prop2_service_postal": "Text63",
    "prop2_service_state": "Text64",
    # Signature (leave blank or placeholder)
    "prop2_signature": "",
    "prop2_date": "Text65",
    # ... Section 6 corporate partner fields (Text44–Text??) – ignore if null
    "corp_name": "Text66",
    "corp_registration_number": "Text67",
    "corp_addr_number": "Text68",
    "corp_addr_street": "Text69",
    "corp_addr_city": "Text70",
    "corp_addr_lga": "Text71",
    "corp_addr_postal": "Text72",
    "corp_addr_state": "Text73",
    # ... Authentication name/email – later fields
    "auth_name": "Text74",
    "auth_email": "Text75",
    # ... Presented by fields at the end
    "presented_name": "Text76",
    "presented_accreditation_number": "Text77",
    "presented_address_number": "Text78",
    "presented_address_street": "Text79",
    "presented_address_city": "Text80",
    "presented_address_lga": "Text81",
    "presented_address_postal": "Text82",
    "presented_address_state": "Text83",
    "presented_address_country": "Text84",
    "presented_phone": "Text85",
    "presented_email": "Text86",
    "presented_signature": "",
    "presented_date": "Text87",
}


BN06_FIELD_MAP = {
    # Section A1: Company details
    "rc_number": "Text1",
    "company_name": "Text2",
    # often Text3 is day? But some forms may combine. I'll map later.
    "annual_return_made_up_day": "Text3",
    "annual_return_made_up_month": "Text4",
    "annual_return_made_up_year": "Text5",
    "date_of_agm": "Text6",      # likely
    "date_of_agm_d1": "Text7",
    "date_of_agm_d2": "Text8",
    "date_of_agm_m1": "Text9",
    "date_of_agm_m2": "Text10",
    "date_of_agm_y1": "Text11",
    "date_of_agm_y2": "Text12",
    "date_of_agm_y3": "Text13",
    "date_of_agm_y4": "Text14",
    "principal_business_activity": "Text15",
    "specific_business_activity": "Text16",
    "activity_description": "Text17",
    # radio buttons → likely separate checkboxes
    "company_type_small": "",
    "company_type_private_other": "",
    "company_type_guarantee": "",
    "company_type_public": "",
    "ro_number": "Text18",                   # registered office
    "ro_street": "Text19",
    "ro_city": "Text20",
    "ro_lga": "Text21",
    "ro_state": "Text22",
    "head_office_number": "Text23",
    "head_office_street": "Text24",
    "head_office_city": "Text25",
    "head_office_lga": "Text26",
    "head_office_state": "Text27",
    "register_location_number": "Text28",
    "register_location_street": "Text29",
    "register_location_city": "Text30",
    "register_location_lga": "Text31",
    "register_location_state": "Text32",
    # Part 2 Officers: Corporate secretary (B)
    "corp_sec_name": "Text33",
    "corp_sec_reg_number": "Text34",
    "corp_sec_addr_number": "Text35",
    "corp_sec_addr_street": "Text36",
    "corp_sec_addr_city": "Text37",
    "corp_sec_addr_lga": "Text38",
    "corp_sec_phone": "Text39",
    "corp_sec_state": "Text40",
    "corp_sec_email": "Text41",
    # Individual secretary (C)
    "ind_sec_title": "Text42",
    "ind_sec_forenames": "Text43",
    "ind_sec_surname": "Text44",
    "ind_sec_former_names": "Text45",
    "ind_sec_nationality": "Text46",
    "ind_sec_service_number": "Text47",
    "ind_sec_service_street": "Text48",
    "ind_sec_service_city": "Text49",
    "ind_sec_service_lga": "Text50",
    "ind_sec_phone": "Text51",
    "ind_sec_state": "Text52",
    "ind_sec_email": "Text53",
    # Directors (D) – up to 4 directors in the form
    # Director 1
    "dir1_title": "Text54",
    "dir1_forenames": "Text55",
    "dir1_surname": "Text56",
    "dir1_former_names": "Text57",
    "dir1_country_residence": "Text58",
    "dir1_nationality": "Text59",
    "dir1_dob": "",
    "dir1_dob_day1": "Text60",
    "dir1_dob_day2": "Text61",
    "dir1_dob_month1": "Text62",
    "dir1_dob_month2": "Text63",
    "dir1_dob_year1": "Text64",
    "dir1_dob_year2": "Text65",
    "dir1_dob_year3": "Text66",
    "dir1_dob_year4": "Text67",
    "dir1_business_occupation": "Text68",
    "dir1_phone": "Text69",
    "dir1_email": "Text70",
    "dir1_service_number": "Text71",
    "dir1_service_street": "Text72",
    "dir1_service_city": "Text73",
    "dir1_service_lga": "Text74",
    "dir1_service_state": "Text75",
    # Director 2
    "dir2_title": "Text76",
    "dir2_forenames": "Text77",
    "dir2_surname": "Text78",
    "dir2_former_names": "Text79",
    "dir2_country_residence": "Text80",
    "dir2_nationality": "Text81",
    "dir2_dob": "",
    "dir2_dob_day1": "Text82",
    "dir2_dob_day2": "Text83",
    "dir2_dob_month1": "Text84",
    "dir2_dob_month2": "Text85",
    "dir2_dob_year1": "Text86",
    "dir2_dob_year2": "Text87",
    "dir2_dob_year3": "Text88",
    "dir2_dob_year4": "Text89",
    "dir2_business_occupation": "Text90",
    "dir2_phone": "Text91",
    "dir2_email": "Text92",
    "dir2_service_number": "Text93",
    "dir2_service_street": "Text94",
    "dir2_service_city": "Text95",
    "dir2_service_lga": "Text96",
    "dir2_service_state": "Text97",
    # Director 3
    "dir3_title": "Text98",
    "dir3_forenames": "Text99",
    "dir3_surname": "Text100",
    "dir3_former_names": "Text101",
    "dir3_country_residence": "Text102",
    "dir3_nationality": "Text103",
    "dir3_dob": "",
    "dir3_dob_day1": "Text104",
    "dir3_dob_day2": "Text105",
    "dir3_dob_month1": "Text106",
    "dir3_dob_month2": "Text107",
    "dir3_dob_year1": "Text108",
    "dir3_dob_year2": "Text109",
    "dir3_dob_year3": "Text110",
    "dir3_dob_year4": "Text111",
    "dir3_business_occupation": "Text112",
    "dir3_phone": "Text113",
    "dir3_email": "Text114",
    "dir3_service_number": "Text115",
    "dir3_service_street": "Text116",
    "dir3_service_city": "Text117",
    "dir3_service_lga": "Text118",
    "dir3_service_state": "Text119",
    # Director 4
    "dir4_title": "Text120",
    "dir4_forenames": "Text121",
    "dir4_surname": "Text122",
    "dir4_former_names": "Text123",
    "dir4_country_residence": "Text124",
    "dir4_nationality": "Text125",
    "dir4_dob": "",
    "dir4_dob_day1": "Text126",
    "dir4_dob_day2": "Text127",
    "dir4_dob_month1": "Text128",
    "dir4_dob_month2": "Text129",
    "dir4_dob_year1": "Text130",
    "dir4_dob_year2": "Text131",
    "dir4_dob_year3": "Text132",
    "dir4_dob_year4": "Text133",
    "dir4_business_occupation": "Text134",
    "dir4_phone": "Text135",
    "dir4_email": "Text136",
    "dir4_service_number": "Text137",
    "dir4_service_street": "Text138",
    "dir4_service_city": "Text139",
    "dir4_service_lga": "Text140",
    "dir4_service_state": "Text141",
    # Part 3 Share Capital
    # E1
    # Share 1
    "share1_class": "Text142",
    "share1_number_of_shares": "Text143",
    "share1_agg_nominal_value": "Text144",
    "share1_total_unpaid": "Text145",
    # Share 2
    "share2_class": "Text146",
    "share2_number_of_shares": "Text147",
    "share2_agg_nominal_value": "Text148",
    "share2_total_unpaid": "Text149",
    # Total Shares
    "total_number_of_shares": "Text150",
    "total_agg_nominal_value": "Text151",
    "total_total_unpaid": "Text152",
    # E2
    "share_particulars": "Text153",
    # E3
    "total_indebtedness": "Text154",
    # E4
    "past_members_folio": "Text155",
    "past_members_name": "Text156",
    "past_members_shares_no_at_return_date": "Text157",
    "past_members_amount_of_shares": "Text158",
    "past_members_remarks": "Text159",
    # F (Annual Return details)
    "total_turnover": "Text160",                   # Turnover
    "turnover_amount_in_words": "Text161",
    "total_net_assets": "Text162",
    "net_assets_amount_in_words": "Text163",
    # PSC Natural
    # A. Details of Person with Control
    "psc_title": "Text164",
    "psc_first_name": "Text165",
    "psc_surname": "Text166",
    "psc_other_names": "Text167",
    "psc_former_names": "Text168",
    "psc_city": "Text169",
    "psc_state": "Text170",
    "psc_nationality": "Text171",
    "psc_country": "Text172",
    "psc_id_number": "Text173",
    "psc_id_type": "Text174",
    "psc_gender": "Text175",
    "psc_email": "Text176",
    "psc_phone": "Text177",
    "psc_serv_address_number": "Text178",
    "psc_serv_address_street": "Text179",
    "psc_serv_address_city": "Text180",
    "psc_serv_address_state": "Text181",
    "psc_serv_address_country": "Text182",
    "psc_home_address_number": "Text183",
    "psc_home_address_street": "Text184",
    "psc_home_address_city": "Text185",
    "psc_home_address_state": "Text186",
    "psc_home_address_country": "Text187",
    "psc_tax_residency": "Text188",
    "psc_dob_day": "Text189",
    "psc_dob_month": "Text190",
    "psc_dob_year": "Text191",
    # B. Alternative Name Form
    "psc_fullname": "Text192",
    "psc_family_name": "Text193",
    "psc_given_name": "Text194",
    "psc_patronymic_name": "Text195",
    # C. PSC Notification Legal Entity
    "psc_submission_date_day": "Text196",
    "psc_submission_date_month": "Text197",
    "psc_submission_date_year": "Text198",
    "psc_legal_form": "Text200",
    "psc_jurisdiction": "Text201",
    "psc_register": "Text202",
    "psc_rc_number": "Text203",
    "psc_governing_law": "Text204",
    "psc_registered_address_number": "Text205",
    "psc_registered_address_street": "Text206",
    "psc_registered_address_city": "Text207",
    "psc_registered_address_state": "Text208",
    "psc_registered_address_country": "Text209",
    # D Details of Interests Held
    "psc_control_date_day": "Text210",
    "psc_control_date_month": "Text211",
    "psc_control_date_year": "Text212",
    "psc_share_percent_direct": "Text213",
    "psc_share_percent_indirect": "Text214",
    "psc_share_owners_legal_name": "Text215",
    "psc_share_owners_percent": "Text216",
    "psc_voting_rights_percent_direct": "Text217",
    "psc_voting_rights_percent_indirect": "Text218",
    "psc_voting_rights_owners_legal_name": "Text219",
    "psc_voting_rights_owners_voting_percent": "Text220",
    # ... Authentication name/email – later fields
    "auth_name": "Text221",
    "auth_email": "Text222",
    # ... Presented by fields at the end
    "presented_name": "Text223",
    "presented_address_street": "Text224",
    "presented_address_district": "Text225",
    "presented_address_city": "Text226",
    "presented_address_lga": "Text227",
    "presented_address_postal": "Text228",
    "presented_address_state": "Text229",
    "presented_address_country": "Text230",
    "presented_phone": "Text231",
    "presented_email": "Text232",
    "presented_accreditation_number": "Text233",
    "presented_signature": "Text234",
    "presented_date": "Text235",
}
