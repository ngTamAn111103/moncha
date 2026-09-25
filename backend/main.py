import sqlite3

from fastapi import FastAPI, HTTPException
from pwdlib import PasswordHash

app = FastAPI()
password_hasher = PasswordHash.recommended()


def get_db():
    # Mở kết nối tới file SQLite.
    conn = sqlite3.connect("moncha.db")

    # Mặc định SQLite trả row dạng tuple:
    # (1, "An", "an@gmail.com")
    #
    # sqlite3.Row giúp ta truy cập theo tên cột:
    # user["name"], user["email"]
    conn.row_factory = sqlite3.Row

    return conn

@app.get("/users")
def get_users():
    conn = get_db()

    users = conn.execute(
        "SELECT id, name, email FROM users"
    ).fetchall()

    conn.close()

    return [dict(user) for user in users]

@app.get("/users/{user_id}")
def get_user(user_id: int):
    conn = get_db()

    user = conn.execute(
        "SELECT id, name, email FROM users WHERE id = ?",
        (user_id,),
    ).fetchone()

    conn.close()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return dict(user)

@app.post("/users", status_code=201)
def create_user(data: dict):
    # 1. Lấy dữ liệu client gửi lên.
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # 2. Tự validate dữ liệu đầu vào.
    # Vì hiện tại chưa dùng Pydantic schema nên ta phải tự kiểm tra.
    if not name:
        raise HTTPException(
            status_code=400,
            detail="Name is required",
        )

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email is required",
        )

    if not isinstance(password, str) or not password:
        raise HTTPException(
            status_code=400,
            detail="Password is required",
        )

    # Hash mật khẩu bằng Argon2id trước khi lưu vào database.
    password_hash = password_hasher.hash(password)

    # 3. Mở kết nối database.
    conn = get_db()

    # 4. Kiểm tra email đã tồn tại hay chưa.
    existing_user = conn.execute(
        "SELECT id FROM users WHERE email = ?",
        (email,),
    ).fetchone()

    if existing_user is not None:
        conn.close()

        raise HTTPException(
            status_code=409,
            detail="Email already exists",
        )

    # 5. Insert user mới vào database.
    cursor = conn.execute(
        """
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
        """,
        (name, email, password_hash),
    )

    # 6. SQLite chưa thật sự lưu thay đổi cho tới khi commit.
    conn.commit()

    # 7. cursor.lastrowid là id vừa được SQLite tạo.
    user_id = cursor.lastrowid

    # 8. Query lại user vừa tạo.
    #
    # Không SELECT password vì không nên trả password về client.
    user = conn.execute(
        """
        SELECT id, name, email
        FROM users
        WHERE id = ?
        """,
        (user_id,),
    ).fetchone()

    # 9. Đóng kết nối khi sử dụng xong.
    conn.close()

    # 10. sqlite3.Row chưa phải JSON object,
    # nên chuyển nó thành dict.
    return dict(user)
