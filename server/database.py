import psycopg2
from psycopg2 import errors
import json

with open("info.json", "r") as f:
    db_info = json.load(f)

db_username = db_info["db_username"]
db_password = db_info["db_password"]
db_url = db_info["db_url"]
db_port = db_info["db_port"]
db_database = db_info["db_database"]


def create_user(username: str, password: str):
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        cur.execute(f"INSERT INTO users(username, password, user_type) VALUES ('{username}', '{password}', 2)")
        conn.commit()
        cur.close()
        conn.close()
        return True, "Başarılı"
    except errors.UniqueViolation:
        return False, "Bu kullanıcı adı alınmış!"
    except Exception as e:
        return False, f"Hata! Sebep: {e}"


def get_user(username: str = None, id: str = None):
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        if username:
            cur.execute(f"SELECT id, username, password, user_type from users WHERE username='{username}'")
        else:
            cur.execute(f"SELECT id, username, password, user_type from users WHERE id='{id}'")
        results = cur.fetchall()
        user = None
        if len(results) > 0:
            user = {
                "id": results[0][0],
                "username": results[0][1],
                "password": results[0][2],
                "user_type": results[0][3]
            }
        cur.close()
        conn.close()
        return True, user
    except Exception as e:
        return False, f"Hata! Sebep: {e}"

def get_all_users():
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        cur.execute("SELECT id, username, user_type FROM users");
        users = [{"id": result[0], "username": result[1], "user_type": result[2]} for result in cur.fetchall()]
        cur.close()
        conn.close()
        return True, users
    except Exception as e:
        return False, f"Hata! Sebep: {e}"

def get_all_books():
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        cur.execute("SELECT books.id, title, summary, image_name, year, a.name FROM books JOIN authors a on a.id = books.author_id");
        books = [{"id": result[0],
                  "title": result[1],
                  "summary": result[2],
                  "image_name": result[3],
                  "year": result[4],
                  "author": result[5]
                  } for result in cur.fetchall()]
        cur.close()
        conn.close()
        return True, books
    except Exception as e:
        return False, f"Hata! Sebep: {e}"

def get_all_read_books():
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        cur.execute("SELECT id, user_id, book_id, rating FROM user_read_books");
        books = [{"id": result[0],
                  "user_id": result[1],
                  "book_id": result[2],
                  "rating": result[3]
                  } for result in cur.fetchall()]
        cur.close()
        conn.close()
        return True, books
    except Exception as e:
        return False, f"Hata! Sebep: {e}"

def get_all_plan_to_read():
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        cur.execute("SELECT id, user_id, book_id FROM user_plan_to_read");
        users = [{"id": result[0],
                  "user_id": result[1],
                  "book_id": result[2]
                  } for result in cur.fetchall()]
        cur.close()
        conn.close()
        return True, users
    except Exception as e:
        return False, f"Hata! Sebep: {e}"

def create_user_read_book(user_id: int, book_id: int, rating: int = None):
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        cur.execute(f"DELETE FROM user_read_books WHERE user_id = '{user_id}' and book_id = '{book_id}'")
        if not rating:
            cur.execute(f"INSERT INTO user_read_books (user_id, book_id) VALUES({user_id}, {book_id})")
        else:
            cur.execute(f"INSERT INTO user_read_books (user_id, book_id, rating) VALUES({user_id}, {book_id}, {rating})")
        conn.commit()
        cur.close()
        conn.close()
        return True, "Başarılı"
    except Exception as e:
        return False, f"Hata! Sebep: {e}"

def create_user_plan_to_read(user_id: int, book_id: int):
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        cur.execute(f"INSERT INTO user_plan_to_read (user_id, book_id) VALUES({user_id}, {book_id})")
        conn.commit()
        cur.close()
        conn.close()
        return True, "Başarılı"
    except Exception as e:
        return False, f"Hata! Sebep: {e}"


def get_user_read_books(user_id: int = None, book_id: int = None):
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        if user_id:
            cur.execute(f"SELECT id, user_id, book_id, rating FROM user_read_books WHERE user_id = {user_id}")
        elif book_id:
            cur.execute(f"SELECT id, user_id, book_id, rating FROM user_read_books WHERE book_id = {book_id}")
        else:
            cur.execute(f"SELECT id, user_id, book_id, rating FROM user_read_books")
        results = cur.fetchall()
        return True, [{
            "id": result[0],
            "user_id": result[1],
            "book_id": result[2],
            "rating": result[3]
        } for result in results]
    except Exception as e:
        return False, f"Hata! Sebep: {e}"

def get_user_plan_to_read(user_id: int = None, book_id: int = None):
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        if user_id:
            cur.execute(f"SELECT id, user_id, book_id FROM user_plan_to_read WHERE user_id = {user_id}")
        elif book_id:
            cur.execute(f"SELECT id, user_id, book_id FROM user_plan_to_read WHERE book_id = {book_id}")
        else:
            cur.execute(f"SELECT id, user_id, book_id FROM user_plan_to_read")
        results = cur.fetchall()
        return True, [{
            "id": result[0],
            "user_id": result[1],
            "book_id": result[2]
        } for result in results]
    except Exception as e:
        return False, f"Hata! Sebep: {e}"

def delete_record_by_id(table_name: str, id: int):
    try:
        conn = psycopg2.connect(database=db_database, user=db_username, password=db_password)
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {table_name} WHERE id = {id}")
        conn.commit()
        return True, "Başarılı"
    except Exception as e:
        return False, f"Hata! Sebep: {e}"

if __name__ == "__main__":
    print(create_user("admin", "şifre"))
    print(create_user("yeni_kullanici", "şifre"))