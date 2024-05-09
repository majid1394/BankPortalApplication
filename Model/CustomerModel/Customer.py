from datetime import datetime
from enum import Enum

from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Sequence, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship


# Create a SQLite database engine

# Create a base class for declarative ORM models


Base = declarative_base()
engine = create_engine('sqlite:///Bank.db', echo=True)

class Constants(Enum):
    JARI = 1
    kotalModat = 2
    PASANDAZ = 3
# Accessing the constant values
print(Constants.JARI.value)  # Output: 1
print(Constants.kotalModat.value)  # Output: 2
print(Constants.PASANDAZ.value)  # Output: 3
# Define a sample ORM model



class Customer(Base):
    __tablename__ = 'customer'
    customer_list = []
    customer_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    family = Column(String)
    national_code = Column(String, unique=True,nullable=False)
    sex = Column(String)
    birthday = Column(Date)
    address = Column(String)
    phone = Column(String)
    accounts = relationship("Account", back_populates="customer")


class Account(Base):
    __tablename__ = 'account'
    account_list = []
    account_number = Column(Integer, Sequence('account_number_seq', start=100000), primary_key=True)
    account_balance = Column(Float)
    account_status = Column(String)
    account_created_date = Column(Date)
    account_type = Column(Integer, default=Constants.JARI.value)
    account_customer_id = Column(Integer, ForeignKey('customer.customer_id'))
    customer = relationship("Customer", back_populates="accounts")


account_list = []

def create_new_account(data,customer_id):
    new_account = Account(
         account_type=int(data["accountType"]),
         account_balance=0,
         account_created_date=datetime.now(),
         account_customer_id=customer_id,
         account_status="active")

    session.add(new_account)
    try:
        session.commit()
    except:
        Session.rollback()


def serialize_account(account):
    return {
        "account_id": account.account_number,
        "account_type": account.account_type,
        "balance": account.account_balance
        # Add more fields as needed
    }
def update_account_status(id,currentStatus):
    try:
        account_to_update = session.query(Account).filter_by(account_number=id).first()
        if currentStatus == "active":
            account_to_update.account_status = "disabled"
        if currentStatus == "disabled":
            account_to_update.account_status = "active"

    except Exception as e:
        return e
    try:
        session.commit()
    except Exception as error:
        Session.rollback()
        return error


def deposit_money(account_number,amount):
    try:
        account = session.query(Account).filter_by(account_number=account_number).first()
        if account:
            if account.account_status == "disabled":
                return "disabled"
            else:
                temp =account.account_balance+float(amount)
                account.account_balance =temp
                try:
                    session.commit()
                    return "done"
                except Exception as error:
                    Session.rollback()
        else:
            return "account not found"
    except Exception as e:
        return e

def withdraw_money(account_number,amount):
    try:
        account = session.query(Account).filter_by(account_number=account_number).first()
        if account:
            if account.account_balance < float(amount):
                return "NotEnoughMoney"
            else:
                result =account.account_balance-float(amount)
                account.account_balance =result
                try:
                    session.commit()
                    return "done"
                except Exception as error:
                    Session.rollback()

        else:
            return "account not found"
    except Exception as e:
        return e


# Create the database schema
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()
# Create a session to interact with the database




def create_new_customer(data):
    new_customer = Customer(name=data["name"],
                            family=data["family"],
                            national_code = data["national_code"],
                            sex=data["sex"],
                            birthday=datetime.strptime(data["birthday"], '%Y-%m-%d').date(),# Convert date string to Python date object
                            address=data["address"],
                            phone=data["phone"])

    session.add(new_customer)
    try:
        session.commit()

    except:
        Session.rollback()




def fetch_all_customers():
    customer_list = []
    customers = session.query(Customer).all()
    for cutomer in customers:
        customer_list.append(cutomer)
    session.commit()
    return customer_list


def fetch_customerBySSN(national_code):
    try:
        customer = session.query(Customer).filter_by(national_code=national_code).first()
        # serialize (object to json)
        if customer!=None:
            account_list=[]
            for account in customer.accounts:
                serialized_account = serialize_account(account)
                account_list.append(serialized_account)

            customer_info={
                "customer_id":customer.customer_id,
                "customer_name":customer.name,
                "customer_family":customer.family,
                "customer_sex":customer.sex,
                "customer_address":customer.address,
                "customer_phone":customer.phone,
                "customer_accounts":account_list,
                "customer_national_code":customer.national_code,
                "customer_birthday":customer.birthday
            }
            return customer_info;
        else:
            return  "None"
    except Exception as e:
        return e;

# Query to join Customer and Account tables based on customer_id
def join_customer_account():
    results = session.query(Customer, Account).join(Account, Customer.customer_id == Account.account_customer_id).all()
    for customer, account in results:
        # Access and print the data from the Customer and Account objects
        print("Customer ID:", customer.customer_id)
        print("Customer Name:", customer.name)
        print("Account ID:", account.account_number)
        print("Account_type", account.account_type)
        print("Customer ID (from Account):", account.account_customer_id)
    return  results













