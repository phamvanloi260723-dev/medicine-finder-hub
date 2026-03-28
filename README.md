# Medicine Finder Hub

Đây là dự án hệ thống quản lý và tìm kiếm thông tin thuốc nội bộ. Phiên bản hiện tại đang được cấu hình để chạy **Mock Data** (sử dụng LocalStorage của trình duyệt) thay vì kết nối với Backend, nhằm mục đích phục vụ cho việc phát triển và hoàn thiện giao diện (UI).

## 🚀 Các tính năng chính

- Lọc, tìm kiếm thông tin chi tiết các loại thuốc.
- Trang dành cho Quản trị viên (Admin) cho phép:
  - Xem danh sách thuốc hiện có trong kho.
  - Thêm mới, chỉnh sửa, xóa thông tin chi tiết của từng loại thuốc.
  - Tính năng tải lên (upload) hình ảnh minh họa và tài liệu đính kèm của thuốc (Mock upload).
- Dữ liệu được lưu trữ tự động trên máy tính hiện tại (`LocalStorage`), việc làm mới trang (F5) không làm văng dữ liệu.

---

## 📋 Yêu cầu hệ thống (Requirements)

Để tải và chạy được dự án này, máy tính của bạn cần được cài đặt sẵn:
- **[Node.js](https://nodejs.org/)**: Khuyến nghị phiên bản 18.0.0 trở lên.
- **npm** (được cài mặc định kèm với Node.js) hoặc có thể sử dụng `yarn`, `pnpm`, `bun`.

---

## 🛠 Hướng dẫn Cài đặt & Chạy dự án (How to run)

1. Tải source code hoặc sao chép thư mục dự án `medicine-finder-hub` về máy tính của bạn.
2. Mở cửa sổ dòng lệnh (Terminal / Command Prompt / PowerShell) và điều hướng vào thư mục bằng lệnh:
   ```bash
   cd medicine-finder-hub
   ```
3. Chạy lệnh sau để cài đặt các gói thư viện (phụ thuộc) cần thiết:
   ```bash
   npm install
   ```
4. Khi cài đặt xong, cấp lệnh khởi động ứng dụng:
   ```bash
   npm run dev
   ```
5. Cuối cùng, mở trình duyệt của bạn lên và truy cập đường dẫn: **http://localhost:8080** (hoặc port khác được chỉ định trên terminal) để bắt đầu sử dụng.

---

## 🔐 Hướng dẫn Đăng nhập Quản trị (Admin Login)

Để vào trang quản trị thêm/sửa/xóa thuốc, hãy gõ trên thanh địa chỉ đường dẫn: **http://localhost:8080/admin** hoặc truy cập thông qua nút trên giao diện.

Bạn sử dụng thông tin tài khoản mặc định dưới đây để đăng nhập:

- **Email:** `admin@gmail.com`
- **Mật khẩu:** `123456`

> **Lưu ý**: Chức năng bảo mật này chỉ là hệ thống giả lập để test luồng (flow) thao tác UI, không có tác dụng bảo mật dữ liệu thực tế.

---

## 📦 Công nghệ Dựng dự án
- **[React](https://reactjs.org/)** kết hợp với Vite compiler siêu tốc.
- **[TypeScript](https://www.typescriptlang.org/)** đảm bảo chặt chẽ kiểu dữ liệu.
- **[Tailwind CSS](https://tailwindcss.com/)** framework để tạo style cho giao diện nhanh chóng.
- **[Shadcn UI](https://ui.shadcn.com/)** là hệ thống thư viện Component tiện lợi.

---

## 🛑 Lưu ý thêm
- Dự án này đã được **tách bỏ 100% kết nối Database**  để chuẩn bị cho Backend tự code sau này.
- Khi upload ảnh và file lên, ứng dụng sẽ sinh ra Object URL (hoặc tên file dạng mock) để biểu diễn mà *không tốn không gian lưu trữ thực tế trên bất kì băng thông nào*. Ảnh có thể sẽ bị hỏng hiển thị nếu bạn copy đường link chia sẻ sang máy tính khác vì nó chỉ lưu trên bộ nhớ tạm của máy tính (hoặc LocalStorage) lúc đó.
