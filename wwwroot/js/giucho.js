/* ============================
   📘 giucho.js
   Chức năng quản lý Giữ Chỗ
   - Hiển thị danh sách bạn đọc (demo)
   - Phân trang
   - Giữ chỗ ấn phẩm
   - Giả lập trả ấn phẩm
   - Xóa toàn bộ giữ chỗ
=============================== */

// ----------------------------
// 🔹 DỮ LIỆU GIẢ LẬP
// ----------------------------
const readers = [
    { id: 1, ma: "BD001", ten: "Nguyễn Văn A", diachi: "Hà Nội", sdt: "0905123456", doituong: "Sinh viên" },
    { id: 2, ma: "BD002", ten: "Trần Thị B", diachi: "Đà Nẵng", sdt: "0912345678", doituong: "Giảng viên" },
    { id: 3, ma: "BD003", ten: "Lê Văn C", diachi: "Hồ Chí Minh", sdt: "0987654321", doituong: "Sinh viên" },
    { id: 4, ma: "BD004", ten: "Phạm Thị D", diachi: "Cần Thơ", sdt: "0977123123", doituong: "Sinh viên" },
    { id: 5, ma: "BD005", ten: "Nguyễn Hữu E", diachi: "Huế", sdt: "0922334455", doituong: "Giảng viên" },
    { id: 6, ma: "BD006", ten: "Lê Hồng F", diachi: "Nha Trang", sdt: "0956677889", doituong: "Sinh viên" },
    { id: 7, ma: "BD007", ten: "Trịnh Văn G", diachi: "Đà Lạt", sdt: "0944556677", doituong: "Sinh viên" },
    { id: 8, ma: "BD008", ten: "Phan Thị H", diachi: "Quảng Ninh", sdt: "0911223344", doituong: "Giảng viên" },
    { id: 9, ma: "BD009", ten: "Nguyễn Văn I", diachi: "Bình Dương", sdt: "0933344556", doituong: "Sinh viên" },
    { id: 10, ma: "BD010", ten: "Đỗ Thị K", diachi: "Nam Định", sdt: "0989988776", doituong: "Sinh viên" },
];

let reserveList = []; // Danh sách giữ chỗ
let currentPage = 1;
const pageSize = 5;

// ----------------------------
// 🔹 HIỂN THỊ DANH SÁCH BẠN ĐỌC
// ----------------------------
function renderReaders(page = 1) {
    currentPage = page;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageReaders = readers.slice(start, end);

    const tbody = document.getElementById("readerInfoTable");
    tbody.innerHTML = pageReaders
        .map((r, i) => `
            <tr onclick="selectReader('${r.ma}', '${r.ten}')">
                <td>${start + i + 1}</td>
                <td>${r.ma}</td>
                <td>${r.ten}</td>
                <td>${r.diachi}</td>
                <td>${r.sdt}</td>
                <td>${r.doituong}</td>
            </tr>
        `)
        .join("");

    renderPagination();
}

// ----------------------------
// 🔹 PHÂN TRANG
// ----------------------------
function renderPagination() {
    const totalPages = Math.ceil(readers.length / pageSize);
    const container = document.getElementById("readerPagination");

    container.innerHTML = `
        <button ${currentPage === 1 ? "disabled" : ""} onclick="renderReaders(${currentPage - 1})">⬅️</button>
        ${Array.from({ length: totalPages }, (_, i) => `
            <button class="${currentPage === i + 1 ? "active" : ""}" onclick="renderReaders(${i + 1})">${i + 1}</button>
        `).join("")}
        <button ${currentPage === totalPages ? "disabled" : ""} onclick="renderReaders(${currentPage + 1})">➡️</button>
    `;
}

// ----------------------------
// 🔹 CHỌN BẠN ĐỌC
// ----------------------------
let selectedReader = null;
function selectReader(ma, ten) {
    selectedReader = { ma, ten };
    alert(`📘 Đã chọn bạn đọc: ${ten} (${ma})`);
}

// ----------------------------
// 🔹 GIỮ CHỖ ẤN PHẨM
// ----------------------------
function reserveBook() {
    const bookSelect = document.getElementById("reserveBookCopy");
    const bookValue = bookSelect.value;
    const bookName = bookSelect.options[bookSelect.selectedIndex]?.text;

    if (!selectedReader) {
        alert("⚠️ Hãy chọn bạn đọc trước khi giữ chỗ!");
        return;
    }
    if (!bookValue) {
        alert("⚠️ Hãy chọn ấn phẩm cụ thể!");
        return;
    }

    const now = new Date();
    const due = new Date(now);
    due.setDate(now.getDate() + 7);

    reserveList.push({
        maSach: bookValue,
        tenSach: bookName,
        ngayGiu: now.toLocaleDateString("vi-VN"),
        hanGiu: due.toLocaleDateString("vi-VN"),
        trangThai: "Đang giữ",
        banDoc: selectedReader.ten,
    });

    renderReserveList();
    alert(`✅ Đã giữ chỗ ấn phẩm cho ${selectedReader.ten}`);
}

// ----------------------------
// 🔹 HIỂN THỊ DANH SÁCH GIỮ CHỖ
// ----------------------------
function renderReserveList() {
    const tbody = document.getElementById("reserveList");
    if (reserveList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7">Chưa có dữ liệu giữ chỗ</td></tr>`;
        return;
    }

    tbody.innerHTML = reserveList.map((r, i) => `
        <tr>
            <td>${r.maSach}</td>
            <td>${r.tenSach}</td>
            <td>${r.ngayGiu}</td>
            <td>${r.hanGiu}</td>
            <td>${r.trangThai}</td>
            <td>${r.banDoc}</td>
            <td>
                <button onclick="cancelReserve(${i})">❌ Hủy</button>
            </td>
        </tr>
    `).join("");
}

// ----------------------------
// 🔹 HỦY GIỮ CHỖ CỤ THỂ
// ----------------------------
function cancelReserve(index) {
    if (confirm("Bạn có chắc muốn hủy giữ chỗ này không?")) {
        reserveList.splice(index, 1);
        renderReserveList();
    }
}

// ----------------------------
// 🔹 HỦY TẤT CẢ GIỮ CHỖ
// ----------------------------
function clearReserve() {
    if (reserveList.length === 0) {
        alert("Không có dữ liệu để xóa!");
        return;
    }
    if (confirm("Bạn có chắc muốn xóa toàn bộ giữ chỗ không?")) {
        reserveList = [];
        renderReserveList();
    }
}

// ----------------------------
// 🔹 GIẢ LẬP TRẢ ẤN PHẨM
// ----------------------------
function markAsReturned(maSach) {
    const item = reserveList.find(r => r.maSach === maSach);
    if (!item) {
        alert("Không tìm thấy ấn phẩm trong danh sách giữ chỗ!");
        return;
    }
    item.trangThai = "Đã trả";
    renderReserveList();
    alert(`📗 Ấn phẩm ${maSach} đã được đánh dấu là ĐÃ TRẢ.`);
}

// ----------------------------
// 🔹 KHỞI TẠO KHI TẢI TRANG
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
    renderReaders();
    renderReserveList();
});
