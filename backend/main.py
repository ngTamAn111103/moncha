"""Điểm khởi tạo backend Moncha (FastAPI).

Bản cơ bản đầu tiên: chỉ có endpoint kiểm tra sức khoẻ và một endpoint
chào để Front End gọi thử. Chưa có database, chưa có xác thực.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Khởi tạo ứng dụng FastAPI
app = FastAPI(title="Moncha API", version="0.1.0")

# Cấu hình CORS cho phép Front End (Expo) gọi API trong lúc phát triển.
# 8081 là cổng mặc định của Expo dev server trên web.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8081",
        "http://127.0.0.1:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Endpoint kiểm tra sức khoẻ (health check) — dùng khi deploy
@app.get("/api/health")
def health() -> dict[str, str]:
    """Trả về trạng thái hoạt động của API."""
    return {"status": "ok"}


# Endpoint chào — Front End gọi thử để kiểm tra kết nối
@app.get("/api/hello")
def hello() -> dict[str, str]:
    """Trả về lời chào kèm tên ứng dụng."""
    return {"message": "Xin chào từ backend Moncha!"}
