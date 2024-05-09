# from datetime import datetime
# from enum import Enum
#
# from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Sequence, Float
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker, relationship
# from Model.CustomerModel import Customer
#
# # Create a SQLite database engine
#
# # Create a base class for declarative ORM models
# Base = declarative_base()
# engine = create_engine('sqlite:///Bank.db', echo=True)
#
#
# # class Customer(Base):
# #     __tablename__ = 'customer'
# #     customer_list = []
# #     customer_id = Column(Integer, primary_key=True, autoincrement=True)
# #     name = Column(String)
# #     family = Column(String)
# #     national_code = Column(String, unique=True,nullable=False)
# #     sex = Column(String)
# #     birthday = Column(Date)
# #     address = Column(String)
# #     phone = Column(String)
# #     accounts = relationship("Account", back_populates="customer")
# #
#
# # Create the database schema
# Base.metadata.create_all(engine)
# Session = sessionmaker(bind=engine)
# session = Session()
# # Create a session to interact with the database
#
#
# session.close()