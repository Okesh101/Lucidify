from pypdf import PdfReader, PdfWriter
from app.cacdata.mappings.mappings import BN07_FIELD_MAP, BN06_FIELD_MAP
from app.services.helperServices import split_date_into_digits, universal_fill_pdf
from datetime import datetime, date
import io


def _build_bn07_data_from_stored(stored: dict, extracted: dict) -> dict:
    """Merge stored data with user changes from AI extraction."""
    # Start with stored
    pp = stored.get("principal_place", {})
    props = stored.get("proprietors", [])
    prop1 = props[0] if len(props) > 0 else {}
    prop2 = props[1] if len(props) > 1 else {}
    res1 = prop1.get("residential_address", {})
    serv1 = prop1.get("service_address", {})
    res2 = prop2.get("residential_address", {}) if prop2 else {}
    serv2 = prop2.get("service_address", {}) if prop2 else {}
    auth = stored.get("authentication", {})
    presented = stored.get("presented_by", {})

    # Use extracted changes where applicable
    principal_place_changed = extracted.get("principal_place_of_business")
    proprietor_residence_changed = extracted.get(
        "proprietor_residential_address")

    data = {
        # Section 1
        "registration_number": stored.get("registration_number", ""),
        "business_name": stored.get("business_name", ""),
        "general_nature": stored.get("general_nature", ""),
        # Principal place
        "pp_number": pp.get("number", ""),
        "pp_street": pp.get("street", ""),
        "pp_city": pp.get("city", ""),
        "pp_lga": pp.get("lga", ""),
        "pp_postal": pp.get("postal_code", ""),
        "pp_state": pp.get("state", ""),
        # Branch address – all empty
        "branch_number": "",
        "branch_street": "", 
        "branch_city": "",
        "branch_lga": "", 
        "branch_postal": "", 
        "branch_state": "",
        # Annual return details
        "year_ended": stored.get("annual_return_period", "").split(" ")[0] if stored.get("annual_return_period") else "",
        "financial_year_end": stored.get("financial_year_end", ""),
        "turnover": str(stored.get("turnover", "")),
        "total_net_assets": str(stored.get("total_net_assets", "")),
        # First proprietor
        "prop1_surname": prop1.get("surname", ""),
        "prop1_forenames": prop1.get("forenames", ""),
        "prop1_nationality": prop1.get("nationality", ""),
        "prop1_dob": prop1.get("dob", ""),
        "prop1_gender": prop1.get("gender", ""),
        "prop1_phone": prop1.get("phone", ""),
        "prop1_id_number": prop1.get("id_number", ""),
        "prop1_id_type": prop1.get("id_type", ""),
        "prop1_email": prop1.get("email", ""),
        "prop1_occupation": prop1.get("occupation", ""),
        "prop1_res_number": res1.get("number", ""),
        "prop1_res_street": res1.get("street", ""),
        "prop1_res_city": res1.get("city", ""),
        "prop1_res_lga": res1.get("lga", ""),
        "prop1_res_postal": res1.get("postal_code", ""),
        "prop1_res_state": res1.get("state", ""),
        "prop1_service_number": serv1.get("number", ""),
        "prop1_service_street": serv1.get("street", ""),
        "prop1_service_city": serv1.get("city", ""),
        "prop1_service_lga": serv1.get("lga", ""),
        "prop1_service_postal": serv1.get("postal_code", ""),
        "prop1_service_state": serv1.get("state", ""),
        "prop1_signature": "",
        "prop1_date": datetime.today().strftime("%d/%m/%Y"),
        # Second proprietor – blank
        "prop2_surname": "", 
        "prop2_forenames": "", 
        "prop2_nationality": "",
        "prop2_dob": "", 
        "prop2_gender": "", 
        "prop2_phone": "",
        "prop2_id_number": "", 
        "prop2_id_type": "", 
        "prop2_email": "",
        "prop2_occupation": "", 
        "prop2_res_number": "", 
        "prop2_res_street": "",
        "prop2_res_city": "", 
        "prop2_res_lga": "", 
        "prop2_res_postal": "",
        "prop2_res_state": "", 
        "prop2_service_number": "", 
        "prop2_service_street": "",
        "prop2_service_city": "", 
        "prop2_service_lga": "", 
        "prop2_service_postal": "",
        "prop2_service_state": "", 
        "prop2_signature": "", 
        "prop2_date": "",
        # Corporate partner – blank
        "corp_name": "", 
        "corp_registration_number": "",
        "corp_addr_number": "", 
        "corp_addr_street": "", 
        "corp_addr_city": "",
        "corp_addr_lga": "", 
        "corp_addr_postal": "", 
        "corp_addr_state": "",
        # Authentication
        "auth_name": auth.get("name", ""),
        "auth_email": auth.get("email", ""),
        # Presented by
        "presented_name": presented.get("name", ""),
        "presented_accreditation_number": presented.get("accreditation_number", ""),
        "presented_address_number": "",  # not structured
        # whole address
        "presented_address_street": presented.get("address", ""),
        "presented_address_city": "", 
        "presented_address_lga": "",
        "presented_address_postal": "", 
        "presented_address_state": "",
        "presented_address_country": "Nigeria",
        "presented_phone": presented.get("phone", ""),
        "presented_email": presented.get("email", ""),
        "presented_signature": "",
        "presented_date": datetime.today().strftime("%d/%m/%Y")
    }

    # Apply overrides from extracted (simple string replacement)
    if principal_place_changed:
        data["pp_street"] = principal_place_changed
        # Clear other components
        data["pp_number"] = ""
        data["pp_city"] = ""
        data["pp_lga"] = ""
        data["pp_postal"] = ""
        data["pp_state"] = ""
    if proprietor_residence_changed:
        data["prop1_res_street"] = proprietor_residence_changed
        data["prop1_res_number"] = ""
        data["prop1_res_city"] = ""
        data["prop1_res_lga"] = ""
        data["prop1_res_postal"] = ""
        data["prop1_res_state"] = ""

    return data


def _build_bn06_data_from_stored(stored: dict, extracted: dict) -> dict:
    # Registered office
    ro = stored.get("registered_office", {})
    # Officers
    officers = stored.get("officers", {})
    directors = officers.get("directors", [])
    ind_sec = officers.get("individual_secretary") or {}
    corp_sec = officers.get("corporate_secretary") or {}
    # Share capital
    share_cap = stored.get("share_capital", {})
    classes = share_cap.get("classes", [])
    first_class = classes[0] if len(classes) > 0 else {}
    second_class = classes[1] if len(classes) > 1 else {}
    # AGM from extracted
    agm = extracted.get("agm_details", {})
    agm_date = agm.get("date", "") if agm.get("held") else ""
    agm_explanation = agm.get("explanation", "") if not agm.get("held") else ""

    # Split AGM date into digit fields
    y_digits, m_digits, d_digits = split_date_into_digits(agm_date)

    # Company type checkboxes (text fields mapped as empty, we'll just leave them as strings)
    comp_type = stored.get("company_type", "").lower()
    is_small = "Yes" if "small" in comp_type else ""
    is_private_other = "Yes" if (
        "private" in comp_type and "small" not in comp_type) else ""
    is_guarantee = "Yes" if "guarantee" in comp_type else ""
    is_public = "Yes" if "public" in comp_type else ""

    # Authentication / Presented
    auth = stored.get("authentication", {})
    presented = stored.get("presented_by", {})

    # Helper to get director data safely
    def get_dir(d, index):
        if index < len(d):
            return d[index]
        return {}

    d1 = get_dir(directors, 0)
    d2 = get_dir(directors, 1)
    d3 = get_dir(directors, 2)
    d4 = get_dir(directors, 3)

    # Split DOB for each director
    def dir_dob_digits(dir_dict):
        dob = dir_dict.get("dob", "")
        y, m, d = split_date_into_digits(dob)
        return y, m, d

    d1_y, d1_m, d1_d = dir_dob_digits(d1)
    d2_y, d2_m, d2_d = dir_dob_digits(d2)
    d3_y, d3_m, d3_d = dir_dob_digits(d3)
    d4_y, d4_m, d4_d = dir_dob_digits(d4)

    # Build the flat dict
    data = {
        # A1
        "rc_number": stored.get("rc_number", ""),
        "company_name": stored.get("company_name", ""),
        # will be filled by user? set to today for now
        "annual_return_made_up_day": "",
        "annual_return_made_up_month": "",
        "annual_return_made_up_year": "",
        # full date string (maybe used elsewhere)
        "date_of_agm": agm_date,
        # AGM date digits
        "date_of_agm_d1": d_digits.get("d1", ""),
        "date_of_agm_d2": d_digits.get("d2", ""),
        "date_of_agm_m1": m_digits.get("m1", ""),
        "date_of_agm_m2": m_digits.get("m2", ""),
        "date_of_agm_y1": y_digits.get("y1", ""),
        "date_of_agm_y2": y_digits.get("y2", ""),
        "date_of_agm_y3": y_digits.get("y3", ""),
        "date_of_agm_y4": y_digits.get("y4", ""),
        "principal_business_activity": stored.get("principal_activity", ""),
        "specific_business_activity": stored.get("specific_activity", ""),
        "activity_description": stored.get("activity_description", ""),
        "company_type_small": is_small,
        "company_type_private_other": is_private_other,
        "company_type_guarantee": is_guarantee,
        "company_type_public": is_public,
        "ro_number": ro.get("number", ""),
        "ro_street": ro.get("street", ""),
        "ro_city": ro.get("city", ""),
        "ro_lga": ro.get("lga", ""),
        "ro_state": ro.get("state", ""),
        "head_office_number": stored.get("head_office", {}).get("number", ""),
        "head_office_street": stored.get("head_office", {}).get("street", ""),
        "head_office_city": stored.get("head_office", {}).get("city", ""),
        "head_office_lga": stored.get("head_office", {}).get("lga", ""),
        "head_office_state": stored.get("head_office", {}).get("state", ""),
        "register_location_number": stored.get("register_location", {}).get("number", ""),
        "register_location_street": stored.get("register_location", {}).get("street", ""),
        "register_location_city": stored.get("register_location", {}).get("city", ""),
        "register_location_lga": stored.get("register_location", {}).get("lga", ""),
        "register_location_state": stored.get("register_location", {}).get("state", ""),
        # Corporate secretary (B)
        "corp_sec_name": corp_sec.get("name", ""),
        "corp_sec_reg_number": corp_sec.get("registration_number", ""),
        "corp_sec_addr_number": corp_sec.get("address", {}).get("number", ""),
        "corp_sec_addr_street": corp_sec.get("address", {}).get("street", ""),
        "corp_sec_addr_city": corp_sec.get("address", {}).get("city", ""),
        "corp_sec_addr_lga": corp_sec.get("address", {}).get("lga", ""),
        "corp_sec_phone": corp_sec.get("phone", ""),
        "corp_sec_state": corp_sec.get("address", {}).get("state", ""),
        "corp_sec_email": corp_sec.get("email", ""),
        # Individual secretary (C)
        "ind_sec_title": ind_sec.get("title", ""),
        "ind_sec_forenames": ind_sec.get("forenames", ""),
        "ind_sec_surname": ind_sec.get("surname", ""),
        "ind_sec_former_names": ind_sec.get("former_names", ""),
        "ind_sec_nationality": ind_sec.get("nationality", ""),
        "ind_sec_service_number": ind_sec.get("service_address", {}).get("number", ""),
        "ind_sec_service_street": ind_sec.get("service_address", {}).get("street", ""),
        "ind_sec_service_city": ind_sec.get("service_address", {}).get("city", ""),
        "ind_sec_service_lga": ind_sec.get("service_address", {}).get("lga", ""),
        "ind_sec_phone": ind_sec.get("phone", ""),
        "ind_sec_state": ind_sec.get("service_address", {}).get("state", ""),
        "ind_sec_email": ind_sec.get("email", ""),
        # Director 1
        "dir1_title": d1.get("title", ""),
        "dir1_forenames": d1.get("forenames", ""),
        "dir1_surname": d1.get("surname", ""),
        "dir1_former_names": d1.get("former_names", ""),
        "dir1_country_residence": d1.get("country_residence", ""),
        "dir1_nationality": d1.get("nationality", ""),
        "dir1_dob_day1": d1_d.get("d1", ""), 
        "dir1_dob_day2": d1_d.get("d2", ""),
        "dir1_dob_month1": d1_m.get("m1", ""), 
        "dir1_dob_month2": d1_m.get("m2", ""),
        "dir1_dob_year1": d1_y.get("y1", ""), 
        "dir1_dob_year2": d1_y.get("y2", ""),
        "dir1_dob_year3": d1_y.get("y3", ""), 
        "dir1_dob_year4": d1_y.get("y4", ""),
        "dir1_business_occupation": d1.get("business_occupation", ""),
        "dir1_phone": d1.get("phone", ""),
        "dir1_email": d1.get("email", ""),
        "dir1_service_number": d1.get("service_address", {}).get("number", ""),
        "dir1_service_street": d1.get("service_address", {}).get("street", ""),
        "dir1_service_city": d1.get("service_address", {}).get("city", ""),
        "dir1_service_lga": d1.get("service_address", {}).get("lga", ""),
        "dir1_service_state": d1.get("service_address", {}).get("state", ""),
        # Director 2
        "dir2_title": d2.get("title", ""),
        "dir2_forenames": d2.get("forenames", ""),
        "dir2_surname": d2.get("surname", ""),
        "dir2_former_names": d2.get("former_names", ""),
        "dir2_country_residence": d2.get("country_residence", ""),
        "dir2_nationality": d2.get("nationality", ""),
        "dir2_dob_day1": d2_d.get("d1", ""), 
        "dir2_dob_day2": d2_d.get("d2", ""),
        "dir2_dob_month1": d2_m.get("m1", ""), 
        "dir2_dob_month2": d2_m.get("m2", ""),
        "dir2_dob_year1": d2_y.get("y1", ""), 
        "dir2_dob_year2": d2_y.get("y2", ""),
        "dir2_dob_year3": d2_y.get("y3", ""), 
        "dir2_dob_year4": d2_y.get("y4", ""),
        "dir2_business_occupation": d2.get("business_occupation", ""),
        "dir2_phone": d2.get("phone", ""),
        "dir2_email": d2.get("email", ""),
        "dir2_service_number": d2.get("service_address", {}).get("number", ""),
        "dir2_service_street": d2.get("service_address", {}).get("street", ""),
        "dir2_service_city": d2.get("service_address", {}).get("city", ""),
        "dir2_service_lga": d2.get("service_address", {}).get("lga", ""),
        "dir2_service_state": d2.get("service_address", {}).get("state", ""),
        # Director 3
        "dir3_title": d3.get("title", ""),
        "dir3_forenames": d3.get("forenames", ""),
        "dir3_surname": d3.get("surname", ""),
        "dir3_former_names": d3.get("former_names", ""),
        "dir3_country_residence": d3.get("country_residence", ""),
        "dir3_nationality": d3.get("nationality", ""),
        "dir3_dob_day1": d3_d.get("d1", ""), 
        "dir3_dob_day2": d3_d.get("d2", ""),
        "dir3_dob_month1": d3_m.get("m1", ""), 
        "dir3_dob_month2": d3_m.get("m2", ""),
        "dir3_dob_year1": d3_y.get("y1", ""), 
        "dir3_dob_year2": d3_y.get("y2", ""),
        "dir3_dob_year3": d3_y.get("y3", ""), 
        "dir3_dob_year4": d3_y.get("y4", ""),
        "dir3_business_occupation": d3.get("business_occupation", ""),
        "dir3_phone": d3.get("phone", ""),
        "dir3_email": d3.get("email", ""),
        "dir3_service_number": d3.get("service_address", {}).get("number", ""),
        "dir3_service_street": d3.get("service_address", {}).get("street", ""),
        "dir3_service_city": d3.get("service_address", {}).get("city", ""),
        "dir3_service_lga": d3.get("service_address", {}).get("lga", ""),
        "dir3_service_state": d3.get("service_address", {}).get("state", ""),
        # Director 4
        "dir4_title": d4.get("title", ""),
        "dir4_forenames": d4.get("forenames", ""),
        "dir4_surname": d4.get("surname", ""),
        "dir4_former_names": d4.get("former_names", ""),
        "dir4_country_residence": d4.get("country_residence", ""),
        "dir4_nationality": d4.get("nationality", ""),
        "dir4_dob_day1": d4_d.get("d1", ""), 
        "dir4_dob_day2": d4_d.get("d2", ""),
        "dir4_dob_month1": d4_m.get("m1", ""), 
        "dir4_dob_month2": d4_m.get("m2", ""),
        "dir4_dob_year1": d4_y.get("y1", ""), 
        "dir4_dob_year2": d4_y.get("y2", ""),
        "dir4_dob_year3": d4_y.get("y3", ""), 
        "dir4_dob_year4": d4_y.get("y4", ""),
        "dir4_business_occupation": d4.get("business_occupation", ""),
        "dir4_phone": d4.get("phone", ""),
        "dir4_email": d4.get("email", ""),
        "dir4_service_number": d4.get("service_address", {}).get("number", ""),
        "dir4_service_street": d4.get("service_address", {}).get("street", ""),
        "dir4_service_city": d4.get("service_address", {}).get("city", ""),
        "dir4_service_lga": d4.get("service_address", {}).get("lga", ""),
        "dir4_service_state": d4.get("service_address", {}).get("state", ""),
        # Share capital
        "share1_class": first_class.get("class", ""),
        "share1_number_of_shares": str(first_class.get("number_of_shares", "")),
        "share1_agg_nominal_value": str(first_class.get("aggregate_nominal_value", "")),
        "share1_total_unpaid": str(first_class.get("total_unpaid", "")),
        "share2_class": second_class.get("class", ""),
        "share2_number_of_shares": str(second_class.get("number_of_shares", "")),
        "share2_agg_nominal_value": str(second_class.get("aggregate_nominal_value", "")),
        "share2_total_unpaid": str(second_class.get("total_unpaid", "")),
        # Totals (sum for multiple classes; we'll just use first for now)
        "total_number_of_shares": str(first_class.get("number_of_shares", "")),
        "total_agg_nominal_value": str(first_class.get("aggregate_nominal_value", "")),
        "total_total_unpaid": str(first_class.get("total_unpaid", "")),
        "share_particulars": share_cap.get("particulars", ""),
        "total_indebtedness": str(stored.get("indebtedness", "")),
        # Past members (none)
        "past_members_folio": "",
        "past_members_name": "",
        "past_members_shares_no_at_return_date": "",
        "past_members_amount_of_shares": "",
        "past_members_remarks": "",
        # F - Turnover / Net Assets
        "total_turnover": str(stored.get("turnover", "")),
        "turnover_amount_in_words": "",       # optional
        "total_net_assets": str(stored.get("net_assets", "")),
        "net_assets_amount_in_words": "",
        # PSC (none)
        "psc_title": "",
        "psc_first_name": "",
        "psc_surname": "",
        "psc_other_names": "",
        "psc_former_names": "",
        "psc_city": "",
        "psc_state": "",
        "psc_nationality": "",
        "psc_country": "",
        "psc_id_number": "",
        "psc_id_type": "",
        "psc_gender": "",
        "psc_email": "",
        "psc_phone": "",
        "psc_serv_address_number": "",
        "psc_serv_address_street": "",
        "psc_serv_address_city": "",
        "psc_serv_address_state": "",
        "psc_serv_address_country": "",
        "psc_home_address_number": "",
        "psc_home_address_street": "",
        "psc_home_address_city": "",
        "psc_home_address_state": "",
        "psc_home_address_country": "",
        "psc_tax_residency": "",
        "psc_dob_day": "",
        "psc_dob_month": "",
        "psc_dob_year": "",
        "psc_fullname": "",
        "psc_family_name": "",
        "psc_given_name": "",
        "psc_patronymic_name": "",
        "psc_submission_date_day": "",
        "psc_submission_date_month": "",
        "psc_submission_date_year": "",
        "psc_legal_form": "",
        "psc_jurisdiction": "",
        "psc_register": "",
        "psc_rc_number": "",
        "psc_governing_law": "",
        "psc_registered_address_number": "",
        "psc_registered_address_street": "",
        "psc_registered_address_city": "",
        "psc_registered_address_state": "",
        "psc_registered_address_country": "",
        "psc_control_date_day": "",
        "psc_control_date_month": "",
        "psc_control_date_year": "",
        "psc_share_percent_direct": "",
        "psc_share_percent_indirect": "",
        "psc_share_owners_legal_name": "",
        "psc_share_owners_percent": "",
        "psc_voting_rights_percent_direct": "",
        "psc_voting_rights_percent_indirect": "",
        "psc_voting_rights_owners_legal_name": "",
        "psc_voting_rights_owners_voting_percent": "",
        # Authentication
        "auth_name": auth.get("name", ""),
        "auth_email": "",           # not in mock data
        # Presented by
        "presented_name": presented.get("name", ""),
        # full address dumped into street
        "presented_address_street": presented.get("address", ""),
        "presented_address_district": "",
        "presented_address_city": "",
        "presented_address_lga": "",
        "presented_address_postal": "",
        "presented_address_state": "",
        "presented_address_country": "Nigeria",
        "presented_phone": presented.get("phone", ""),
        "presented_email": presented.get("email", ""),
        "presented_accreditation_number": presented.get("accreditation_number", ""),
        "presented_signature": "",
        "presented_date": datetime.today().strftime("%d/%m/%Y"),
    }

    # Override share capital if extracted says changed
    if extracted.get("share_capital_changed"):
        new_val = extracted.get("new_share_capital")
        if new_val:
            data["share1_number_of_shares"] = str(new_val)
            data["total_number_of_shares"] = str(new_val)

    return data


def fill_business_name_pdf(template_path, stored_data: dict, extracted: dict) -> io.BytesIO:
    # 1. Build a complete data dictionary from stored + extracted
    data = _build_bn07_data_from_stored(stored_data, extracted)

    # 2. Map data keys to PDF field names
    field_values = {}
    for key, field_name in BN07_FIELD_MAP.items():
        val = data.get(key, "")
        field_values[field_name] = str(val) if val else ""
    return universal_fill_pdf(template_path, field_values)


def fill_ltd_company_pdf(template_path, stored_data: dict, extracted: dict) -> io.BytesIO:
    # 1. Build a complete data dictionary from stored + extracted
    data = _build_bn06_data_from_stored(stored_data, extracted)

    # 2. Map data keys to PDF field names
    field_values = {}
    for key, field_name in BN06_FIELD_MAP.items():
        val = data.get(key, "")
        field_values[field_name] = str(val) if val else ""
    return universal_fill_pdf(template_path, field_values)
