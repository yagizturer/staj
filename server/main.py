from flask import Flask, session, request, send_from_directory
from flask_session import Session
from database import db_database, db_username, db_password, db_url, db_port
from database import create_user_read_book, create_user_plan_to_read, delete_record_by_id, get_user, create_user, get_all_read_books, \
    get_all_books, get_all_users, get_all_plan_to_read
import json

app = Flask(__name__, static_url_path='')
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_username}:{db_password}@{db_url}:{db_port}/{db_database}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
Session(app)
app.session_interface.db.create_all()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

def create_response(status_code: int, success: bool, additional_data: dict = None, error: str = None):
    data = {"success": success}
    if additional_data:
        data |= additional_data
    if error:
        data |= {"error": error}
    return json.dumps(data), status_code

@app.route("/sayac")
def sayac():
    if "sayac" in session:
        print(f"Eski sayaç: {session['sayac']}")
        session["sayac"] += 1
    else:
        session["sayac"] = 0
    print(f"Yeni sayaç: {session['sayac']}")
    return str(session["sayac"])

@app.route("/check_session")
def check_session():
    if "username" not in session:
        return create_response(401, False, error="Giriş yapılı değil!")
    return create_response(200, True, {"username": session["username"], "user_type": session["user_type"], "id": session["user_id"]})


@app.route("/logout")
def logout():
    session.clear()
    return create_response(200, True)


@app.route("/initial")
def initial():
    if "username" not in session:
        return create_response(401, False, error="Giriş yapılı değil!")
    try:
        return create_response(200, True, additional_data={
            "users": get_all_users()[1],
            "books": get_all_books()[1],
            "plan_to_read": get_all_plan_to_read()[1],
            "read_books": get_all_read_books()[1]
        })
    except Exception as e:
        return create_response(500, False, error=str(e))


@app.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        status, user = get_user(username)
        if not status:
            return create_response(500, False, error=user)
        if not user:
            return create_response(401, False, error="Kullanıcı adı kayıtlı değil!")
        if password != user["password"]:
            return create_response(401, False, error="Şifre yanlış!")
        session["user_id"] = user["id"]
        session["username"] = user["username"]
        session["user_type"] = user["user_type"]
        return create_response(200, True,
                               additional_data={"username": user["username"], "user_type": user["user_type"],
                                                "id": user["id"]})
    except Exception as e:
        return create_response(500, False, error=str(e))


@app.route("/register", methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        status, message = create_user(username, password)
        if not status:
            return create_response(400, False, error=message)
        status, user = get_user(username)
        session["user_id"] = user["id"]
        session["username"] = user["username"]
        return create_response(200, True,
                               additional_data={"username": user["username"], "user_type": user["user_type"],
                                                "id": user["id"]})
    except Exception as e:
        return create_response(500, False, error=str(e))


@app.route("/add_to_plan_to_read", methods=['POST'])
def add_to_plan_to_read():
    try:
        if "user_id" not in session:
            return create_response(401, False, error="Giriş yapılı değil!")
        book_id = request.get_json()["bookId"]
        status, message = create_user_plan_to_read(session["user_id"], book_id)
        if not status:
            return create_response(400, False, error=message)
        return create_response(200, True, additional_data={
            "users": get_all_users()[1],
            "books": get_all_books()[1],
            "plan_to_read": get_all_plan_to_read()[1],
            "read_books": get_all_read_books()[1]
        })
    except Exception as e:
        return create_response(500, False, error=str(e))


@app.route("/remove_from_plan_to_read", methods=['DELETE'])
def remove_from_plan_to_read():
    try:
        if "user_id" not in session:
            return create_response(401, False, error="Giriş yapılı değil!")
        record_id = request.get_json()["recordId"]
        status, message = delete_record_by_id("user_plan_to_read", record_id)
        if not status:
            return create_response(400, False, error=message)
        return create_response(200, True, additional_data={
            "users": get_all_users()[1],
            "books": get_all_books()[1],
            "plan_to_read": get_all_plan_to_read()[1],
            "read_books": get_all_read_books()[1]
        })
    except Exception as e:
        return create_response(500, False, error=str(e))

@app.route("/add_to_read_books", methods=['POST'])
def add_to_read_books():
    try:
        if "user_id" not in session:
            return create_response(401, False, error="Giriş yapılı değil!")
        book_id = request.get_json()["bookId"]
        rating = request.get_json()["rating"]
        status, message = create_user_read_book(session["user_id"], book_id, int(rating))
        if not status:
            return create_response(400, False, error=message)
        return create_response(200, True, additional_data={
            "users": get_all_users()[1],
            "books": get_all_books()[1],
            "plan_to_read": get_all_plan_to_read()[1],
            "read_books": get_all_read_books()[1]
        })
    except Exception as e:
        return create_response(500, False, error=str(e))


@app.route("/remove_from_read_books", methods=['DELETE'])
def remove_from_read_books():
    try:
        if "user_id" not in session:
            return create_response(401, False, error="Giriş yapılı değil!")
        record_id = request.get_json()["recordId"]
        status, message = delete_record_by_id("user_read_books", record_id)
        if not status:
            return create_response(400, False, error=message)
        return create_response(200, True, additional_data={
            "users": get_all_users()[1],
            "books": get_all_books()[1],
            "plan_to_read": get_all_plan_to_read()[1],
            "read_books": get_all_read_books()[1]
        })
    except Exception as e:
        return create_response(500, False, error=str(e))

@app.route('/images/<path:path>')
def send_image(path):
    return send_from_directory('images', path)


if __name__ == '__main__':
    app.run(debug=True)
