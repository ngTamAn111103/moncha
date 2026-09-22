Đây là ứng dụng di động Expo/React Native (dự án **Moncha** — ứng dụng quản lý chi tiêu). Luôn ưu tiên các mẫu thiết kế mobile-first, hiệu năng và khả năng tương thích đa nền tảng.

## Ngôn ngữ làm việc

- **Luôn luôn hỏi đáp bằng tiếng Việt.** Mọi trao đổi, giải thích, mô tả thay đổi và câu trả lời đều phải dùng tiếng Việt.
- **Ghi chú/giải thích code bằng tiếng Việt.** Mọi comment, ghi chú trong mã nguồn, thông báo log và tài liệu đều viết bằng tiếng Việt.
- **Luôn có chú thích cho từng phân đoạn element khi xây dựng giao diện.** Mỗi khu vực UI (top nav, ô nhập liệu, nút, checkbox, dòng chữ có link...) phải có comment tiếng Việt mô tả ngắn gọn ngay phía trên. Xem mẫu tại `src/app/index.tsx` và `src/app/(auth)/sign-up.tsx`.

## Expo đã thay đổi — không tin tưởng dữ liệu huấn luyện

Expo phát hành các breaking change mỗi bản SDK. Các API bạn từng nhớ có thể đã bị đổi tên, di chuyển hoặc xoá. Trước khi viết bất kỳ code nào liên quan đến Expo, EAS hoặc React Native API:

1. Đọc phiên bản major của gói `expo` trong `package.json`.
2. Tải tài liệu đúng phiên bản: `https://docs.expo.dev/versions/v<major>.0.0/`
3. Với các vấn đề khác, tải https://docs.expo.dev/llms.txt — đây là mục lục toàn bộ tài liệu Expo kèm các đính chính về những hiểu lầm phổ biến của LLM. Theo liên kết đến đúng trang cần dùng; không bao giờ trả lời từ trí nhớ.

> Dự án hiện tại dùng **Expo SDK 57** (`expo: ~57.0.24`), React Native 0.86.3, React 19.2.3.

## Công nghệ chính

- **Expo Router** cho điều hướng (file-based routing trong `src/app/`).
- **NativeWind v4** (Tailwind CSS cho React Native) — dùng prop `className` trên component.
- **TypeScript** với chế độ `strict`.
- **React Compiler** và **Typed Routes** đang bật trong `app.json` (`experiments`).
- **expo-image** để hiển thị ảnh, bao gồm cả SVG.
- **@expo/vector-icons** cho icon (Ionicons, AntDesign...).
- Quản lý gói bằng **npm** (có `package-lock.json`), không dùng bun.
- **Backend:** FastAPI + Python 3.11 (môi trường ảo `uv`), dự kiến dùng SQLite. Nằm trong thư mục `backend/` cùng repo.

## Cấu trúc thư mục

```
src/
├── app/                  # Route của Expo Router — mỗi file là một màn hình
│   ├── _layout.tsx       # Layout gốc: Stack + headerShown: false, import global.css
│   ├── index.tsx         # Màn hình Welcome (route "/")
│   └── (auth)/           # Nhóm route xác thực (không tạo segment trên URL)
│       ├── login.tsx     # Màn hình Login (route "/login")
│       └── sign-up.tsx   # Màn hình Sign Up (route "/sign-up")
├── api/                  # Tầng gọi API backend
│   └── client.ts         # apiFetch + ApiError; API_BASE_URL trỏ tới backend
├── components/
│   └── ui/               # Component UI tái sử dụng (Button, TextField...)
├── constants/
│   └── colors.ts         # Bảng màu cho code không dùng className
└── types/
    └── assets.d.ts       # Khai báo type cho import ảnh *.svg
```

Backend nằm trong thư mục `backend/` ở gốc repo:

```
backend/
├── .venv/              # Môi trường ảo Python (đã bỏ qua trong .gitignore, không commit)
├── .gitignore          # Bỏ qua .venv/, __pycache__/, .env, *.db
├── main.py             # Khởi tạo FastAPI + các endpoint
├── requirements.txt    # Danh sách thư viện Python
├── README.md           # Hướng dẫn cài đặt/chạy + mô tả trạng thái backend
└── ...
```

- Giữ code không phải route (components, hooks, utils) bên ngoài `src/app/`.
- Nhóm route bằng thư mục có ngoặc đơn, ví dụ `(auth)`: vẫn giữ URL phẳng (`/login`, `/sign-up`) nhưng gom các màn hình cùng nhóm lại.

## Lệnh

Dự án dùng npm. Dùng `npx` cho các lệnh CLI.

```bash
npx expo install <package>  # LUÔN dùng thay cho npm/yarn/pnpm/bun add — tự chọn phiên bản tương thích SDK
npx expo start              # khởi động dev server (npm run start)
npm run android             # mở trên Android
npm run ios                 # mở trên iOS
npm run web                 # mở trên web
npm run lint                # lint (expo lint)
npm run typecheck           # kiểm tra kiểu (tsc --noEmit)
npm run format              # định dạng code (prettier --write .)
npx expo-doctor             # chẩn đoán lỗi phụ thuộc và cấu hình
npx expo install --fix      # sửa các phiên bản gói không tương thích
```

Chạy `npm run lint` và `npm run typecheck` trước khi tuyên bố hoàn thành bất kỳ tác vụ nào.

## Backend (FastAPI)

Backend nằm trong `backend/`, dùng **Python 3.11** và môi trường ảo **`uv`**. Hiện là bản khung tối giản để Front End gọi thử — **chưa có database và chưa có xác thực**.

**Cài đặt từ đầu** (khi clone dự án về):

```bash
cd backend
uv venv --python 3.11 .venv                   # tạo môi trường ảo
uv pip install -r requirements.txt            # cài thư viện vào .venv
```

**Chạy dev server:**

```bash
cd backend
.venv/bin/uvicorn main:app --reload --port 8000
# Swagger UI: http://127.0.0.1:8000/docs
```

**Endpoint hiện có:**

- `GET /api/health` → `{"status": "ok"}`
- `GET /api/hello` → `{"message": "..."}`

**Quy tắc backend:**

- **Không cài thư viện Python lên môi trường thật** — mọi thứ phải nằm trong `backend/.venv`. Hỏi trước khi cài bất cứ gì ngoài môi trường ảo.
- Mọi thư viện mới phải thêm vào `backend/requirements.txt`.
- CORS hiện mở cho `http://localhost:8081` và `http://127.0.0.1:8081` (Expo dev).
- **iOS Simulator** gọi backend qua `http://127.0.0.1:8000`. **Thiết bị thật / Android emulator** phải chạy server với `--host 0.0.0.0` và dùng IP LAN (ví dụ `http://192.168.1.10:8000`).
- `AGENTS.md` (file này) và `backend/README.md` phải được cập nhật khi backend thay đổi.

## Điều hướng & Routing

- Dùng **Expo Router** cho mọi điều hướng. Các route nằm trong `src/app/` — mỗi file ở đó là một màn hình, các file `_layout.tsx` định nghĩa navigator.
- Import `Link`, `router` và `useLocalSearchParams` từ `expo-router`.
- Điều hướng bằng `router.push("/duong-dan")`, `router.back()`. Vì **Typed Routes** đang bật, route phải tồn tại thì `router.push` mới qua typecheck.
- Alias đường dẫn: `@/*` trỏ tới `./src/*`, `@/assets/*` trỏ tới `./assets/*`.
- Tài liệu: https://docs.expo.dev/router/introduction.md

## NativeWind & token màu

- `className` được bật nhờ `nativewind/babel` trong `babel.config.js` và `withNativeWind` trong `metro.config.js`.
- Style toàn cục khai báo tại `global.css`, được import trong `src/app/_layout.tsx`.
- Cấu hình Tailwind ở `tailwind.config.js`; nhớ thêm đường dẫn file chứa class NativeWind vào `content`.
- **Không được code cứng giá trị màu/px tùy ý** (ví dụ `leading-[18px]`, `text-[#212325]`). Phải tra cứu `tailwind.config.js` và `src/constants/colors.ts` trước khi dùng, rồi chọn token có sẵn như `leading-4` thay cho `leading-[18px]`, `text-black` thay cho `text-[#212325]`. Nếu không có token chính xác thì dùng token gần đúng nhất.
- Hai nguồn màu (`tailwind.config.js` và `src/constants/colors.ts`) chứa cùng bộ màu thương hiệu và **đồng bộ thủ công** — khi đổi màu phải cập nhật cả hai.
- `src/constants/colors.ts` dùng cho code không phải `className`: `react-native-svg`, chart, navigation theme, `placeholderTextColor`, prop `color` của icon...

## Quy ước xây dựng giao diện

- **Chú thích tiếng Việt cho từng phân đoạn element.** Ví dụ: `{/* Top nav: nút quay lại + tiêu đề */}`, `{/* Ô nhập Email */}`, `{/* Nút Sign Up */}`.
- **Tái sử dụng component UI** trong `src/components/ui/` thay vì viết lại. Hiện có:
  - `Button` — nút bấm, hỗ trợ biến thể `primary` / `secondary` (qua prop `variant`), prop `label`, `onPress`.
  - `TextField` — ô nhập liệu (cao 56px, bo 16px); khi truyền `secureTextEntry` sẽ tự hiện nút con mắt bật/tắt mật khẩu. Dùng chung cho cả Sign Up và Login.
- Dùng `expo-image` (`<Image />`) để hiển thị ảnh, kể cả SVG. Ví dụ import SVG:
  `import googleIcon from "@/assets/images/onboarding/flat-color-icons_google.svg";`
  rồi `source={googleIcon}`. Type `*.svg` đã khai báo ở `src/types/assets.d.ts`.
- Với kích thước ảnh, bọc trong `<View className="h-8 w-8">` rồi đặt `style={{ width: "100%", height: "100%" }}` cho `Image` để vẫn dùng token thay vì px cứng.
- Bao ngoài màn hình bằng `SafeAreaView` từ `react-native-safe-area-context` (NativeWind đã có sẵn interop `className`); dùng `ScrollView` + `keyboardShouldPersistTaps="handled"` cho form để tránh bàn phím che.
- **Font:** hiện dùng font hệ thống. Thiết kế gốc dùng Inter nhưng dự án chưa cài đặt; nếu cần đúng thiết kế phải thêm `expo-font` + file font.
- Văn bản có link bên trong dùng `Text` lồng nhau với `onPress` và màu `text-primary`.

## Build với EAS

Dùng EAS để build, ký và submit ứng dụng trên cloud (`eas build`, `eas submit`) và phát hành bản cập nhật OTA (`eas update`) — không cần Xcode hay Android Studio cục bộ. Chạy EAS CLI bằng `npx eas-cli@latest <command>` (dự án dùng npm) thay cho lệnh `eas` trần trong các ví dụ tài liệu.
Tài liệu: https://docs.expo.dev/eas/index.md

## Quy tắc

- Nếu thư mục `ios/` và `android/` không tồn tại, chúng sẽ được sinh ra tự động (Continuous Native Generation). Không bao giờ tạo hay sửa chúng bằng tay — cấu hình hành vi native trong `app.json` và các config plugin.
- Expo Go chỉ chứa các native module đi kèm sẵn. Sau khi thêm thư viện có code native, ứng dụng cần development build: `npx expo run:ios|android` chạy cục bộ, hoặc `eas build --profile development`.
  - Lưu ý: `@expo/ui` và `expo-glass-effect` đã cài nhưng chưa dùng; đây là native module nên chỉ chạy trong development build, không chạy trên Expo Go.
- Ưu tiên các module Expo được khuyến nghị thay vì thư viện bên thứ ba, và kiểm tra các skill sẵn có trước khi thêm phụ thuộc. Tài liệu: https://docs.expo.dev/versions/latest/index.md
- Không commit thay đổi trừ khi được yêu cầu rõ ràng.
