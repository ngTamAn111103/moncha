// Tầng gọi API dùng chung cho toàn bộ ứng dụng.
// Hiện tại chỉ chứa hàm fetch cơ bản trỏ tới backend FastAPI.

// Địa chỉ backend.
// iOS Simulator dùng chung mạng với máy Mac nên 127.0.0.1 trỏ đúng về backend.
// Khi chạy trên thiết bị thật phải đổi sang IP LAN của máy (ví dụ http://192.168.1.10:8000).
const API_BASE_URL = "http://127.0.0.1:8000";

/** Lỗi ném ra khi backend trả về mã trạng thái không thành công. */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Gọi API backend và trả về dữ liệu JSON đã được parse.
 *
 * @param path Đường dẫn API, ví dụ `/api/hello`.
 * @param options Tuỳ chọn của fetch (method, body, headers...).
 */
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  // Ném lỗi nếu backend trả về mã trạng thái lỗi (4xx, 5xx)
  if (!response.ok) {
    throw new ApiError(
      `Yêu cầu thất bại (mã ${response.status})`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
