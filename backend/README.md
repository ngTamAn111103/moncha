# Moncha Backend (FastAPI)

Backend cơ bản của ứng dụng quản lý chi tiêu **Moncha**. Hiện tại chỉ là bản
khung tối giản để Front End (Expo) gọi thử, **chưa có database và chưa có xác thực**.

## Yêu cầu môi trường

- **Python 3.11** (dự án đang dùng 3.11.16).
- **uv** — trình quản lý môi trường và gói Python. Nếu chưa có:
  ```bash
  brew install uv
  ```
  hoặc xem hướng dẫn tại https://docs.astral.sh/uv/getting-started/installation/

> Tất cả thư viện Python được cài **trong môi trường ảo `.venv`** nằm trong thư mục
> `backend/`, không cài trực tiếp lên máy. Thư mục `.venv/` đã được bỏ qua trong
> `.gitignore` nên không commit lên Git.

## Cài đặt từ đầu (sau khi clone dự án từ GitHub)

```bash
# 1. Di chuyển vào thư mục backend
cd moncha/backend

# 2. Tạo môi trường ảo Python 3.11
uv venv --python 3.11 .venv

# 3. Cài các thư viện cần thiết vào môi trường ảo
uv pip install -r requirements.txt
```

## Chạy server

```bash
cd moncha/backend
.venv/bin/uvicorn main:app --reload --port 8000
```

- `--reload`: tự khởi động lại khi sửa code (chỉ dùng khi phát triển).
- Server chạy tại `http://127.0.0.1:8000`.
- Tài liệu API tương tác (Swagger UI): http://127.0.0.1:8000/docs

### Dừng server

Nhấn `Ctrl + C` tại cửa sổ đang chạy.

## Các endpoint hiện có

| Method | Đường dẫn     | Mô tả                                              |
| ------ | ------------- | -------------------------------------------------- |
| GET    | `/api/health` | Kiểm tra trạng thái hoạt động → `{"status": "ok"}` |
| GET    | `/api/hello`  | Lời chào mẫu → `{"message": "..."}`                |

Thử nhanh bằng `curl`:

```bash
curl http://127.0.0.1:8000/api/health
curl http://127.0.0.1:8000/api/hello
```

## Trạng thái hiện tại của backend

**Đã có:**

- Khung ứng dụng FastAPI (`main.py`).
- CORS mở cho môi trường phát triển (`http://localhost:8081`, `http://127.0.0.1:8081`).
- Hai endpoint kiểm tra: `/api/health` và `/api/hello`.
- Môi trường ảo `.venv` + `requirements.txt` để tái lập cài đặt.

**Chưa có (dự kiến làm sau):**

- Database (SQLite) và ORM.
- Đăng ký / đăng nhập / JWT.
- Các nghiệp vụ quản lý chi tiêu (ví / danh mục / giao dịch).
- Cấu hình CORS và biến môi trường cho môi trường production.

## Cấu trúc thư mục

```
backend/
├── .venv/              # Môi trường ảo Python (không commit)
├── .gitignore
├── main.py             # Điểm khởi tạo FastAPI + các endpoint
├── requirements.txt    # Danh sách thư viện
└── README.md
```

## Ghi chú khi Front End gọi API

- **iOS Simulator** (Xcode): dùng thẳng `http://127.0.0.1:8000` vì simulator
  dùng chung mạng với máy Mac.
- **Thiết bị thật / Android emulator**: `localhost` không trỏ về máy Mac. Khi đó
  phải chạy server với `--host 0.0.0.0` và dùng địa chỉ IP LAN của máy
  (ví dụ `http://192.168.1.10:8000`).
