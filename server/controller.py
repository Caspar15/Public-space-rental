from flask import request, jsonify
import datetime
from server.model import get_user_history
from server.model import get_companies_by_area
from server.model import get_available_times
from server.model import get_booking_details
from server.model import update_time_and_insert_booking
from server.model import get_address_by_location
from server.model import get_user_details
from server.model import update_isEntryToOne_model
def extract_portion(input_string):
    dt_string = input_string.strftime('%Y-%m-%d %H:%M')
    # 找到第一個冒號的位置
    colon_index = str(dt_string).find(':')

    start = colon_index - 2
    end = start + 3  # 包括冒號和後面兩個字符

    output = dt_string[start:end + 2]
    return output

def extract_portion_str(input_string):
    # 找到第一個冒號的位置
    colon_index = str(input_string).find(':')

    start = colon_index - 2
    end = start + 3  # 包括冒號和後面兩個字符

    output = input_string[start:end + 2]
    return output

def get_history(mysql):
    try:
        data = request.get_json()
        user_id = data.get("ID")
        
        # If ID is missing, return an error
        if not user_id:
            return jsonify({"status": "error", "message": "缺少ID"}), 200
        
        # Query the user's history
        history = get_user_history(mysql, user_id)
        
        # If no history is found, return an error
        if history is None:
            return jsonify({"status": "error", "message": "查無ID"}), 200
        
        # Return success result with history
        return jsonify({"status": "success", "history": history}), 200
    
    except Exception as e:
        # Handle any other exceptions
        print(f"Error in get_history: {e}")
        return jsonify({"status": "error", "message": "Server error"}), 200


def get_companies(mysql):
    try:
        data = request.get_json()
        area = data.get("area")
        
        # Get companies by area
        companies = get_companies_by_area(mysql, area)
        
        # If no companies are found, return an error
        if companies is None or companies == []:
            return jsonify({"status": "error", "message": "查無資料"}), 404
        
        # Return success result with companies data
        return jsonify({
            "status": "success",
            "data": companies
        }), 200

    except Exception as e:
        # Handle any other exceptions
        print(f"Error in get_companies: {e}")
        return jsonify({"status": "error", "message": "Server error"}), 200


def check_availability(mysql):
    try:
        # Get JSON request data
        req_data = request.get_json()
        location = req_data.get('location')
        date = req_data.get('date')
        print(location, date)
        
        # Validate request parameters
        if not location or not date:
            return jsonify({"status": "error", "message": "Invalid parameters"}), 200
        
        # Get available times from model
        available_times = get_available_times(mysql, location, date)
        # print(available_times)
        
        if available_times is None or len(available_times) == 0:
            # No available times found for the location and date
            return jsonify({"status": "error", "message": "查無日期"}), 200
        
        # Build the response with available times
        response = {
            "status": "success",
            "location": location,
            "date": date,
            "time": [
                {
                    "IsBooked": time_record['IsBooked'],
                    "StartTime": extract_portion(time_record['StartTime']),
                    "EndTime": extract_portion(time_record['EndTime'])
                }
                for time_record in available_times
            ]
        }
        
        # Return the response
        return jsonify(response), 200
    
    except Exception as e:
        # Handle any other exceptions
        print(f"Error in check_availability: {e}")
        return jsonify({"status": "error", "message": "Server error"}), 200


def showPeopleInfo(mysql):
    try:
        req_data = request.get_json()
        location = req_data.get('location')
        date = req_data.get('date')
        start_time = req_data.get('time')

        if not location or not date or not start_time:
            return jsonify({"status": "error", "message": "Invalid parameters"}), 200
        
        booking_details = get_booking_details(mysql, location, date, start_time)

        if booking_details is None:
            return jsonify({"status": "error", "message": "查無時間"}), 200
        
        response = {
            "status": "success",
            "date": booking_details['date'],
            "time": extract_portion_str(booking_details['start_time']),
            "people": {
                "name": booking_details['name'],
                "phone": booking_details['phone'],
                "ID": booking_details['ID'],
                "mail": booking_details['mail']
            }
        }

        return jsonify(response), 200
    
    except Exception as e:
        # Handle any other exceptions
        print(f"Error in showPeopleInfo: {e}")
        return jsonify({"status": "error", "message": "Server error"}), 200

# 顯示人數
def show_pay_info(mysql):
    try:
        req_data = request.get_json()
        date = req_data.get('date')
        time = req_data.get('time')
        people_details = req_data.get('people', {})
        name = people_details.get('name')
        phone = people_details.get('phone')
        ID = people_details.get('ID')
        mail = people_details.get('mail')
        people_num = people_details.get('people_num')
        
        if not date or not time or not people_num:
            return jsonify({"status": "error", "message": "Invalid parameters"}), 200
        
        if people_details is None:
            return jsonify({"status": "error", "message": "查無資料"}), 200
        
        response = {
            "status": "success",
            "people_num": people_num
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        print(f"Error in show_pay_info: {e}")
        return jsonify({"status": "error", "message": "Server error"}), 200
    

def book_time_slot(mysql):
    try:
        req_data = request.get_json()
        user_id = req_data.get('ID')
        location = req_data.get('location')
        date = req_data.get('date')
        start_time = req_data.get('start_time')
        print(start_time)
        print(type(start_time))
        people_num = req_data.get('people_num')

        if not user_id or not location or not date or not start_time or not people_num:
            print("Invalid parameters")
            return jsonify({"status": "error", "message": "Invalid parameters"}), 200
        
        address = get_address_by_location(mysql, location)
        if not address:
            print("查無資料")
            return jsonify({"status": "error", "message": "查無資料"}), 200

        # 更新 time 表，插入 booking 表
        booking_details = update_time_and_insert_booking(mysql, user_id, address, date, start_time, people_num)
        if not booking_details:
            print("查無資料2")
            return jsonify({"status": "error", "message": "查無資料"}), 200

        # get user詳細資料
        user_details = get_user_details(mysql, user_id)
        if not user_details:
            print("查無資料3")
            return jsonify({"status": "error", "message": "查無資料"}), 200

        response = {
            "status": "success",
            "location": location,
            "date": date,
            "start_time": extract_portion_str(start_time),
            "end_time": extract_portion(booking_details.get('end_time')),
            "people_num": people_num,
            "price": booking_details.get('price'),
            "people": {
                "name": user_details.get('name'),
                "phone": user_details.get('phone'),
                "ID": user_id,
                "mail": user_details.get('mail'),
            }
        }
        print(response)

        return jsonify(response), 200

    except Exception as e:
        print(f"Error in book_time_slot: {e}")
        return jsonify({"status": "error", "message": "Server error"}), 200
    

def update_isEntryToOne(mysql):
    try:
        req_data = request.get_json()
        location = req_data.get("location")
        date = req_data.get("date")
        month = date[0:2]
        day = date[2:4]
        print(month)
        print(day)
        date = datetime.date(2024, int(month), int(day))
        print(date)

        if date is None:
            return jsonify({"status": "error", "message": "查無date"}), 200
        if location == "" or location is None:
            return jsonify({"status": "error", "message": "查無location"}), 200

        update_isEntryToOne_model(mysql=mysql, location=location, date=date)

        response = {
            "status": "success",
        }

        return jsonify(response), 200

    except Exception as e:
        print(f"Error in book_time_slot: {e}")
        return jsonify({"status": "error", "message": "Server error"}), 200