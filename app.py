from flask import Flask, render_template, request, jsonify
from Model.EmployeeModel.User import fetch_all_users,create_new_user, delete_user
from Model.CustomerModel.Customer import create_new_customer, fetch_all_customers
from Model.CustomerModel.Customer import  fetch_customerBySSN, join_customer_account
from Model.CustomerModel.Customer import create_new_account,update_account_status, deposit_money, withdraw_money
import Model.CustomerModel.Customer
app = Flask(__name__)
user_list = []
customer_list = []
# Dummy user data for demonstration purposes


users = {

    # "john_doe": "password123",
    # "jane_smith": "flaskrocks"
}

@app.route('/')
def home():
    return render_template('login_pages/login.html')

@app.route('/login', methods=['POST'])
def login():
    user_list = []
    request.form['username']
    username = request.form['username']
    password = request.form['password']
    user_list = fetch_all_users()
    if len(user_list)==0:
        return "Invalid username or password"
    for user in user_list:
        if user.username == username and user.password == password:
            if  user.role == "Admin":
                return render_template('login_pages/admin.html', user_list=user_list)
            else:
                join_customer_account_list =join_customer_account()
                return render_template('main_portal_pages/bankPortal.html', account_list=join_customer_account_list)

    return "Invalid username or password"@app.route('/login', methods=['POST'])

@app.route('/refresh_site', methods=['GET'])
def refresh_site():
     join_customer_account_list =join_customer_account()
     return render_template('main_portal_pages/bankPortal.html', account_list=join_customer_account_list)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    # Drop the table
    # table.drop(engine)
    return render_template('login_pages/signUp.html')
    # return "Table dropped successfully"

@app.route('/adminController', methods=['GET'])
def show_admin_page():
    # Drop the table
    # table.drop(engine)
    user_list = fetch_all_users()
    if len(user_list) == 0:
        return "We have not user to show"
    return render_template('login_pages/admin.html', user_list=user_list)
    # return render_template('admin.html')
    # return "Table dropped successfully"

@app.route('/searchCutomerSSN/<string:national_code>', methods=['GET'])
def searchCutomerSSN(national_code):
    customer = fetch_customerBySSN(national_code)
    if customer and customer!='None':
        return customer
        # return render_template('bankPortal.html', customer=customer)
    else:
        return "Customer Not exists"


@app.route('/signup_submit', methods=['POST'])
def signup_submit():
    username = request.form['username']
    password = request.form['password']
    officer_name = request.form['officer_name']
    officer_family = request.form['officer_family']

    user_list = fetch_all_users()
    for user in user_list:
        if user.username == username:
            return "username already exited"
    try:
        create_new_user(username,password,officer_name,officer_family)
        return render_template('login_pages/login.html', user_list=user_list)
    except:
        return "error"



@app.route('/create_customer', methods=['POST'])
def create_customer():
    data = request.json
    try:
        customer_list = fetch_all_customers()
        for customer in customer_list:
            if data["national_code"] == customer.national_code:
                return "Customer already exists"
                break
        try:
            create_new_customer(data)
            return render_template('main_portal_pages/bankPortal.html')
        except Exception as e:
                return str(e)
    except Exception as e:
           return str(e)
@app.route('/deposit', methods=['POST'])
def deposit():
    data = request.json
    try:
        resp = deposit_money(data["account_number"], data["amount"])
        if resp=="disabled" or  resp=="account not found":
             return "destination account disabled or not found"
        if resp=="done":
             return "done"
    except Exception as e:
        return e


@app.route('/withdraw', methods=['POST'])
def withdraw():
    data = request.json
    try:
        result = withdraw_money(data["account_number"], data["amount"])
        if result=="NotEnoughMoney" or  result=="account not found":
             return "source account not found or Not enough Money to withdraw"
        if result=="done":
            return "done"
    except Exception as e:
        return e


@app.route('/create_account', methods=['POST'])
def create_account():
    data = request.json
    try:
        customer_list = fetch_all_customers()
        customer_exists=False
        for customer in customer_list:
            if data["national_code"] == customer.national_code:
                customer_exists=True
                customer_id=customer.customer_id
                break;
        if customer_exists==False:
            return "Customer Not exists, Please first create Customer"
        else:
            try:
                create_new_account(data, customer_id);
                return "Account created successfully"
            except Exception as e:
                return str(e)
    except Exception as errorTofetch_all_customer:
        return  str(errorTofetch_all_customer)

@app.route('/deleteUserButton/<int:id>', methods=['DELETE'])
def deleteUserButton(id):
    try:
        try:
            delete_user(id)
            return "success"
        except:
            return "Error"
    except:
        return "excepton occured "


@app.route('/changeStatuss/<int:id>/<string:currentStatus>', methods=['UPDATE'])
def changeStatuss(id,currentStatus):
    try:
        try:
            update_account_status(id,currentStatus)
            return "success"
        except:
            return "Error"
    except:
        return "excepton occured "


    # if userid in users:
    #     del users[userid]
    #     return f'User with ID {userid} has been deleted.', 200
    # else:
    #     return f'User with ID {userid} not found.', 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)








# from flask import Flask, render_template, request, make_response, g
# from redis import Redis
# import os
# import socket
# import random
# import json
# import logging
#
# option_a = os.getenv('OPTION_A', "Cats")
# option_b = os.getenv('OPTION_B', "Dogs")
# hostname = socket.gethostname()
#
# app = Flask(__name__)
#
# gunicorn_error_logger = logging.getLogger('gunicorn.error')
# app.logger.handlers.extend(gunicorn_error_logger.handlers)
# app.logger.setLevel(logging.INFO)
#
# def get_redis():
#     if not hasattr(g, 'redis'):
#         g.redis = Redis(host="redis", db=0, socket_timeout=5)
#     return g.redis
#
# @app.route("/", methods=['POST','GET'])
# def hello():
#     voter_id = request.cookies.get('voter_id')
#     if not voter_id:
#         voter_id = hex(random.getrandbits(64))[2:-1]
#
#     vote = None
#
#     if request.method == 'POST':
#         redis = get_redis()
#         vote = request.form['vote']
#         app.logger.info('Received vote for %s', vote)
#         data = json.dumps({'voter_id': voter_id, 'vote': vote})
#         redis.rpush('votes', data)
#
#     resp = make_response(render_template(
#         'index.html',
#         option_a=option_a,
#         option_b=option_b,
#         hostname=hostname,
#         vote=vote,
#     ))
#     resp.set_cookie('voter_id', voter_id)
#     return resp
#
#
# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=80, debug=True, threaded=True)

