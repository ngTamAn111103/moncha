<div align="center">

# Moncha — Ứng dụng quản lý chi tiêu cá nhân

Ứng dụng di động quản lý thu chi, xây dựng bằng **Expo + React Native**,
giao diện dựa trên bộ UI Kit **[Montra — Expense Tracker](https://figma.com/design/ANP0Y13a3snTrcTycE0Xop/Montra---Expense-Tracker-UI-Kit--Community-?m=auto&is-community-duplicate=1&fuid=1243820180129192104)**.

Hiện là dự án **thuần Front End** (chưa có backend), tập trung hoàn thiện giao diện và luồng người dùng.

</div>

---

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Thiết kế & nguồn cảm hứng](#thiết-kế--nguồn-cảm-hứng)
- [Tính năng hiện có](#tính-năng-hiện-có)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu môi trường](#yêu-cầu-môi-trường)
- [Cài đặt](#cài-đặt)
- [Khởi chạy ứng dụng](#khởi-chạy-ứng-dụng)
- [Scripts](#scripts)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Design tokens (màu sắc)](#design-tokens-màu-sắc)
- [Component UI dùng chung](#component-ui-dùng-chung)
- [Quy ước lập trình](#quy-ước-lập-trình)
- [Build & phát hành (EAS)](#build--phát-hành-eas)
- [Lộ trình](#lộ-trình)
- [Giấy phép](#giấy-phép)

---

## Giới thiệu

**Moncha** là ứng dụng quản lý chi tiêu cá nhân: giúp người dùng ghi lại các khoản thu, chi và chuyển tiền, theo dõi dòng tiền và kiểm soát ngân sách hằng ngày.

Dự án đang ở giai đoạn xây dựng giao diện. Toàn bộ màn hình hiện tại chỉ xử lý UI/UX, chưa kết nối API hay lưu trữ dữ liệu.

**Trạng thái hiện tại:** đã hoàn thành nhóm màn hình xác thực (Welcome, Login, Sign Up).

## Thiết kế & nguồn cảm hứng

Toàn bộ giao diện được thiết kế dựa trên bộ UI Kit trên Figma:

> **[Montra — Expense Tracker UI Kit (Community)](https://figma.com/design/ANP0Y13a3snTrcTycE0Xop/Montra---Expense-Tracker-UI-Kit--Community-?m=auto&is-community-duplicate=1&fuid=1243820180129192104)**

- Nguồn: cộng đồng Figma (Community UI Kit).
- Bảng màu, kích thước, bo góc, kiểu chữ trong dự án đều bám theo bộ kit này.
- Bảng màu được khai báo tại **một nguồn duy nhất** `src/constants/colors.js`; `tailwind.config.js` (dùng cho `className`) và code runtime (`import { colors }`) đều lấy giá trị từ file này.

## Tính năng hiện có

| Màn hình | Route      | Mô tả                                                                                                             |
| -------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| Welcome  | `/`        | Ảnh minh hoạ onboarding, tiêu đề, hai nút **Sign Up** và **Login**                                                |
| Login    | `/login`   | Nhập Email / Password, nút đăng nhập, liên kết **Forgot Password** và chuyển sang Sign Up                         |
| Sign Up  | `/sign-up` | Nhập Name / Email / Password, checkbox đồng ý điều khoản, nút **Sign Up with Google**, liên kết chuyển sang Login |

## Công nghệ sử dụng

| Nhóm            | Công nghệ                                                                          |
| --------------- | ---------------------------------------------------------------------------------- |
| Framework       | [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)                             |
| UI              | React Native 0.86.3, React 19.2.3                                                  |
| Điều hướng      | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)     |
| Styling         | [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS cho React Native)       |
| Ngôn ngữ        | TypeScript (`strict`)                                                              |
| Ảnh             | [expo-image](https://docs.expo.dev/versions/v57.0.0/sdk/image/) (hỗ trợ cả SVG)    |
| Icon            | [@expo/vector-icons](https://docs.expo.dev/guides/icons/) (Ionicons, AntDesign...) |
| Chất lượng code | ESLint (`expo lint`), Prettier                                                     |
| Quản lý gói     | npm (`package-lock.json`)                                                          |

> **Lưu ý Expo:** Expo phát hành breaking change theo từng SDK. Luôn tra tài liệu đúng phiên bản tại [docs.expo.dev/versions/v57.0.0](https://docs.expo.dev/versions/v57.0.0/) trước khi dùng API mới.

## Yêu cầu môi trường

- **Node.js** LTS (khuyến nghị >= 20)
- **npm** (đi kèm Node.js)
- Một trong các môi trường chạy:
  - **Expo Go** (nhanh nhất, nhưng chỉ chứa native module có sẵn — không chạy được các module native tuỳ chỉnh),
  - **iOS Simulator** (macOS + Xcode),
  - **Android Emulator** (Android Studio),
  - hoặc **thiết bị thật**.

> Dự án đang cài `@expo/ui` và `expo-glass-effect` (native module, chưa dùng tới). Các module này **không chạy trên Expo Go** — cần development build (`npx expo run:ios|android` hoặc EAS build).

## Cài đặt

```bash
# 1. Clone repository
git clone https://github.com/ngTamAn111103/moncha.git

# 2. Di chuyển vào thư mục dự án
cd moncha

# 3. Cài đặt dependencies
npm install
```

> Khi thêm thư viện mới, **luôn dùng** `npx expo install <package>` thay cho `npm install`, để Expo tự chọn phiên bản tương thích với SDK 57.

## Khởi chạy ứng dụng

```bash
# Khởi động dev server (sau đó bấm phím để chọn nền tảng)
npx expo start

# Hoặc mở trực tiếp từng nền tảng
npm run ios       # iOS Simulator
npm run android   # Android Emulator
npm run web       # Trình duyệt web
```

Trong terminal của `expo start`, nhấn:

- `i` — mở iOS Simulator
- `a` — mở Android Emulator
- `w` — mở trên web
- `r` — tải lại (reload)
- `j` — mở DevTools

Quét mã QR bằng ứng dụng **Expo Go** để chạy trên thiết bị thật (lưu ý giới hạn native module nêu trên).

### Chạy development build cục bộ

Khi cần dùng native module tuỳ chỉnh:

```bash
npx expo run:ios       # build & chạy trên iOS
npx expo run:android   # build & chạy trên Android
```

## Scripts

| Lệnh                               | Mô tả                                 |
| ---------------------------------- | ------------------------------------- |
| `npm run start` / `npx expo start` | Khởi động dev server                  |
| `npm run ios`                      | Chạy trên iOS Simulator               |
| `npm run android`                  | Chạy trên Android Emulator            |
| `npm run web`                      | Chạy trên trình duyệt web             |
| `npm run lint`                     | Kiểm tra lint (`expo lint`)           |
| `npm run typecheck`                | Kiểm tra kiểu (`tsc --noEmit`)        |
| `npm run format`                   | Định dạng code (`prettier --write .`) |
| `npx expo-doctor`                  | Chẩn đoán lỗi phụ thuộc & cấu hình    |
| `npx expo install --fix`           | Sửa phiên bản gói không tương thích   |

> Chạy `npm run lint` và `npm run typecheck` trước khi hoàn tất bất kỳ thay đổi nào.

## Cấu trúc thư mục

```text
moncha/
├── assets/
│   ├── avatars/              # Ảnh đại diện (nam, nữ) và viền avatar
│   ├── expo.icon/            # Nguồn icon dạng Apple Icon Composer
│   └── images/
│       ├── onboarding/       # Ảnh minh hoạ & icon Google (SVG)
│       └── ...               # Icon app, splash, favicon
├── src/
│   ├── app/                  # Route của Expo Router — mỗi file là một màn hình
│   │   ├── _layout.tsx       # Layout gốc: Stack + headerShown: false, import global.css
│   │   ├── index.tsx         # Màn hình Welcome (route "/")
│   │   └── (auth)/           # Nhóm route xác thực (không tạo segment trên URL)
│   │       ├── login.tsx     # Màn hình Login (route "/login")
│   │       └── sign-up.tsx   # Màn hình Sign Up (route "/sign-up")
│   ├── components/
│   │   └── ui/               # Component UI tái sử dụng (Button, TextField)
│   ├── constants/
│   │   └── colors.js         # Nguồn duy nhất cho design token màu
│   └── types/
│       └── assets.d.ts       # Khai báo type cho import ảnh *.svg
├── app.json                  # Cấu hình Expo (tên, icon, plugin, experiments)
├── babel.config.js           # babel-preset-expo + nativewind/babel
├── metro.config.js           # Metro + withNativeWind
├── tailwind.config.js        # Cấu hình Tailwind/NativeWind (ánh xạ token từ colors.js)
├── global.css                # Import Tailwind base/components/utilities
├── tsconfig.json             # TypeScript strict + alias @/*
└── eslint.config.js          # ESLint (eslint-config-expo)
```

**Quy tắc cấu trúc:**

- Code không phải route (components, hooks, utils) đặt **ngoài** `src/app/`.
- Nhóm route bằng thư mục có ngoặc đơn (ví dụ `(auth)`): giữ URL phẳng nhưng gom các màn hình cùng nhóm.
- Alias đường dẫn: `@/*` → `./src/*`, `@/assets/*` → `./assets/*`.

## Design tokens (màu sắc)

Bảng màu thương hiệu Montra — khai báo tại **nguồn duy nhất** `src/constants/colors.js`:

| Token                | Mã màu    | Ý nghĩa               |
| -------------------- | --------- | --------------------- |
| `primary`            | `#7F3DFF` | Màu thương hiệu (tím) |
| `primary-background` | `#EEE5FF` | Nền tím nhạt          |
| `income`             | `#00A86B` | Thu nhập              |
| `expense`            | `#FD3C4A` | Chi tiêu              |
| `transfer`           | `#0077FF` | Chuyển tiền           |
| `warning`            | `#FCAC12` | Cảnh báo              |
| `text-primary`       | `#292B2D` | Chữ chính             |
| `text-secondary`     | `#91919F` | Chữ phụ / placeholder |
| `surface-muted`      | `#F1F1FA` | Nền/viền nhạt         |
| `border`             | `#E3E5E5` | Viền                  |

> **Không hard-code màu/px tuỳ ý.** Chỉ sửa màu tại `src/constants/colors.js`; dùng qua `className` (ví dụ `bg-primary`, `text-text-secondary`) khi có thể, hoặc `import { colors }` cho SVG, chart, `placeholderTextColor`, prop `color` của icon...

## Component UI dùng chung

Đặt trong `src/components/ui/`, tái sử dụng thay vì viết lại:

- **`Button`** — nút bấm, prop `label`, `onPress`, `variant` (`primary` / `secondary`). Cao 56px, bo góc 16px.
- **`TextField`** — ô nhập liệu, cao 56px, bo góc 16px. Khi truyền `secureTextEntry` sẽ tự hiện nút con mắt bật/tắt mật khẩu. Dùng chung cho cả Login và Sign Up.

## Quy ước lập trình

- **Ngôn ngữ:** mọi trao đổi, comment, log và tài liệu đều dùng **tiếng Việt**.
- **Chú thích UI:** mỗi phân đoạn giao diện (top nav, ô nhập liệu, nút, checkbox, dòng chữ có link...) phải có comment tiếng Việt mô tả ngắn gọn ngay phía trên.
- **Mobile-first:** ưu tiên thiết kế mobile, hiệu năng và tương thích đa nền tảng.
- **Điều hướng:** dùng Expo Router (`router.push`, `router.replace`, `router.back`, `Link`). Typed Routes đang bật nên route phải tồn tại mới qua typecheck. Với các màn hình chuyển đổi qua lại trong cùng nhóm (ví dụ Login ↔ Sign Up), dùng `router.replace` để tránh tích luỹ history — chỉ dùng `router.push` khi cần back về màn hình trước.
- **Ảnh:** dùng `expo-image` (`<Image />`), kể cả với SVG. Bọc trong `<View className="h-8 w-8">` rồi đặt `style={{ width: "100%", height: "100%" }}` để dùng token thay vì px cứng.
- **Safe area:** bọc màn hình bằng `SafeAreaView` từ `react-native-safe-area-context`; form nên dùng `ScrollView` + `keyboardShouldPersistTaps="handled"`.
- **Font:** hiện dùng font hệ thống. Thiết kế gốc dùng Inter nhưng dự án chưa cài đặt (cần `expo-font` + file font nếu muốn khớp thiết kế).
- **Native folders:** không tạo/sửa `ios/` và `android/` bằng tay — chúng được sinh tự động (CNG). Cấu hình native qua `app.json` và config plugin.

## Build & phát hành (EAS)

Dùng **[EAS](https://docs.expo.dev/eas/index.md)** để build, ký và phát hành ứng dụng trên cloud mà không cần Xcode/Android Studio cục bộ:

```bash
npx eas-cli@latest build          # build trên cloud
npx eas-cli@latest submit         # submit lên store
npx eas-cli@latest update         # phát hành bản cập nhật OTA
```

> Dự án chưa có `eas.json`. Cần chạy `npx eas-cli@latest build:configure` để khởi tạo trước khi build.

## Lộ trình

- [x] Màn hình Welcome (onboarding)
- [x] Màn hình Login
- [x] Màn hình Sign Up
- [ ] Quên mật khẩu
- [ ] Màn hình Home / Dashboard
- [ ] Thêm giao dịch Thu nhập / Chi tiêu / Chuyển tiền
- [ ] Thống kê, biểu đồ chi tiêu
- [ ] Quản lý ngân sách
- [ ] Ví / Tài khoản
- [ ] Hồ sơ người dùng & cài đặt
- [ ] Kết nối backend & lưu trữ dữ liệu

## Giấy phép

Dự án phát hành theo giấy phép [MIT](./LICENSE).

---

<div align="center">

Được xây dựng với [Expo](https://expo.dev) và bộ UI Kit [Montra — Expense Tracker](https://figma.com/design/ANP0Y13a3snTrcTycE0Xop/Montra---Expense-Tracker-UI-Kit--Community-?m=auto&is-community-duplicate=1&fuid=1243820180129192104).

</div>
