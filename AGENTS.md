Đây là ứng dụng di động Expo/React Native. Luôn ưu tiên các mẫu thiết kế mobile-first, hiệu năng và khả năng tương thích đa nền tảng.

## Ngôn ngữ làm việc

- **Luôn luôn hỏi đáp bằng tiếng Việt.** Mọi trao đổi, giải thích, mô tả thay đổi và câu trả lời đều phải dùng tiếng Việt.
- **Ghi chú/giải thích code bằng tiếng Việt.** Mọi comment, ghi chú trong mã nguồn, thông báo log và tài liệu đều viết bằng tiếng Việt.

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
- Quản lý gói bằng **npm** (có `package-lock.json`), không dùng bun.

## Lệnh

Dùng `bunx` thay cho `npx` nếu dự án dùng bun (có `bun.lock`). Dự án này dùng npm nên dùng `npx`.

```bash
npx expo install <package>  # LUÔN dùng thay cho npm/yarn/pnpm/bun add — tự chọn phiên bản tương thích SDK
npx expo start              # khởi động dev server
npx expo lint               # lint
npx tsc --noEmit            # kiểm tra kiểu (typecheck)
npx expo-doctor             # chẩn đoán lỗi phụ thuộc và cấu hình
npx expo install --fix      # sửa các phiên bản gói không tương thích
```

Chạy lint và typecheck trước khi tuyên bố hoàn thành bất kỳ tác vụ nào.

## Điều hướng & Routing

- Dùng **Expo Router** cho mọi điều hướng. Các route nằm trong `src/app/` — mỗi file ở đó là một màn hình, các file `_layout.tsx` định nghĩa navigator. Giữ code không phải route (components, hooks, utils) bên ngoài `src/app/`.
- Import `Link`, `router` và `useLocalSearchParams` từ `expo-router`.
- Alias đường dẫn: `@/*` trỏ tới `./src/*`, `@/assets/*` trỏ tới `./assets/*`.
- Tài liệu: https://docs.expo.dev/router/introduction.md

## NativeWind

- `className` được bật nhờ `nativewind/babel` trong `babel.config.js` và `withNativeWind` trong `metro.config.js`.
- Style toàn cục khai báo tại `global.css`, được import trong `src/app/_layout.tsx`.
- Cấu hình Tailwind ở `tailwind.config.js`; nhớ thêm đường dẫn file chứa class NativeWind vào `content`.
- Khi thêm component/dependency, ưu tiên module Expo chính thức trước thư viện bên thứ ba.

## Build với EAS

Dùng EAS để build, ký và submit ứng dụng trên cloud (`eas build`, `eas submit`) và phát hành bản cập nhật OTA (`eas update`) — không cần Xcode hay Android Studio cục bộ. Chạy EAS CLI bằng `bunx eas-cli <command>` trong dự án Bun, hoặc `npx eas-cli@latest <command>` cho trường hợp còn lại; thay thế cho lệnh `eas` trần trong các ví dụ tài liệu.
Tài liệu: https://docs.expo.dev/eas/index.md

## Quy tắc

- Nếu thư mục `ios/` và `android/` không tồn tại, chúng sẽ được sinh ra tự động (Continuous Native Generation). Không bao giờ tạo hay sửa chúng bằng tay — cấu hình hành vi native trong `app.json` và các config plugin.
- Expo Go chỉ chứa các native module đi kèm sẵn. Sau khi thêm thư viện có code native, ứng dụng cần development build: `npx expo run:ios|android` chạy cục bộ, hoặc `eas build --profile development`.
- Ưu tiên các module Expo được khuyến nghị thay vì thư viện bên thứ ba, và kiểm tra các skill sẵn có trước khi thêm phụ thuộc. Tài liệu: https://docs.expo.dev/versions/latest/index.md
- Không commit thay đổi trừ khi được yêu cầu rõ ràng.
