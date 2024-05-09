from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Create a SQLite database engine
engine = create_engine('sqlite:///Bank.db', echo=True)

# Create a base class for declarative ORM models
Base = declarative_base()

# Define a sample ORM model
class User(Base):
    __tablename__ = 'user'
    user_list = []
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String)
    password = Column(String)
    officer_name = Column(String)
    officer_family = Column(String)
    role=Column(String)


# Create the database schema
Base.metadata.create_all(engine)

# Create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()
Session = sessionmaker(bind=engine)
session = Session()


user_list = []
# Add a new user to the database
def create_new_user(username,password,officer_name,officer_family):
    new_user = User(username=username, password=password,officer_name=officer_name,officer_family=officer_family,role='regular')
    session.add(new_user)
    session.commit()

# Query all users from the database
def fetch_all_users():
    user_list = []
    users = session.query(User).all()
    for user in users:
        print(user.id, user.username, user.password)
        user_list.append(user)
    session.commit()
    return user_list

# Update a user's age
def update_user():
    user_to_update = session.query(User).filter_by(username='Maj').first()
    user_to_update.password = 1234
    session.commit()


# Delete a user from the database
def delete_user(id):
    user_to_delete = session.query(User).filter_by(id=id).first()
    session.delete(user_to_delete)
    session.commit()
    return

# Close the session
session.close()