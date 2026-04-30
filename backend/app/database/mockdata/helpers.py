from app.services.helperServices import format_date_for_frontend
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def loadRegistryJSON(filename):
    file_path = os.path.join(BASE_DIR, 'registry', filename)
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return {"status": "OK",
                    "data": json.load(file)}
    except FileNotFoundError:
        return {"status": "ERROR",
                "code": 404,
                "message": f"Error: The file at {file_path} was not found."}
    except json.JSONDecodeError:
        return {"status": "ERROR",
                "code": 500,
                "message": "Error: Failed to decode JSON. Check the file format."}
    

def loadJSON():
    file_path = os.path.join(BASE_DIR, 'mock_registry.json')
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return {"status": "OK",
                    "data": json.load(file),}
    except FileNotFoundError:
        return {"status": "ERROR",
                "code": 404,
                "message": f"Error: The file at {file_path} was not found."}
    except json.JSONDecodeError:
        return {"status": "ERROR",
                "code": 500,
                "message": "Error: Failed to decode JSON. Check the file format."}


def verify_organization(reg_number, type):
    data = loadJSON()
    if data.get("status") != "OK":
        return data

    if type == "BN":
        list_of_businesses = data['data']['business_names']
        if reg_number not in list_of_businesses:
            return {"status": "ERROR",
                    "code": 404,
                    "message": "Sorry, we couldn't find a business name with that BN-number."}
        return {"status": "SUCCESS",
                "code": 200,
                "message": "Business verified successfully."}
    else:
        list_of_companies = data['data']['companies']
        if reg_number not in list_of_companies:
            return {"status": "ERROR",
                    "code": 404,
                    "message": "Sorry, we couldn't find a company with that RC-number."}
        return {"status": "SUCCESS", 
                "code": 200,
                "message": "Company verified successfully."}


def retrieve_organization_data(reg_number, type):
    if type == "BN":
        business_data = loadRegistryJSON('business_names.json')
        if business_data.get("status") != "OK":
            return business_data

        business_name_data = business_data['data'][reg_number]

        business_name = business_name_data["business_name"]
        business_nature = business_name_data["general_nature"]
        raw_address = business_name_data["principal_place"]
        registered_address = f"{raw_address["number"]} {raw_address["street"]}, {raw_address["city"]}, {raw_address["state"]}{" State" if raw_address["state"] != "FCT" else ""}."

        return {"status": "SUCCESS",
                "code": 200,
                "data": {
                    "business_name": business_name,
                    "bn_number": reg_number,
                    "business_nature": business_nature,
                    "status": "Active",
                    "registered_address": registered_address
                },
                "entity_type": "business_name",
                "message": "Business details retrieved successfully."}
    else:
        company_data = loadRegistryJSON('companies.json')
        if company_data.get("status") != "OK":
            return company_data
        
        business_data = company_data['data'][reg_number]

        company_name = business_data["company_name"]
        company_type = business_data["company_type"]
        registration_date = business_data["registration_date"]
        raw_address = business_data["registered_office"]
        registered_address = f"{raw_address["number"]} {raw_address["street"]}, {raw_address["city"]}, {raw_address["state"]}."

        return {"status": "SUCCESS",
                "code": 200,
                "data": {
                    "company_name": company_name,
                    "rc_number": reg_number,
                    "company_type": company_type,
                    "registration_date": format_date_for_frontend(registration_date),
                    "status": "Active",
                    "registered_address": registered_address
                },
                "entity_type": "ltd_company",
                "message": "Company verified and details retrieved successfully."}
