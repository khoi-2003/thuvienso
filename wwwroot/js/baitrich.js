// =============================
// 📄 QUẢN LÝ BÀI TRÍCH (Phiên bản thuần JS)
// =============================
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ baiviettrich.js đã khởi động");

    const STORAGE_KEY = "baivietTrich";
    const rowsPerPage = 4;
    let currentPage = 1;
    let currentEditIndex = null;

    // =============================
    // 🔹 HÀM TIỆN ÍCH
    // =============================
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const loadData = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const saveData = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // ======= Toast UI =======
    function showToast(message, type = "success") {
        const toastBox = $("#btToast");
        if (!toastBox) return;

        toastBox.textContent = message;
        toastBox.className = `toast ${type} show`;

        setTimeout(() => toastBox.classList.remove("show"), 2500);
    }

    // =============================
    // 🔹 HIỂN THỊ DỮ LIỆU
    // =============================
    function renderTable(list = loadData()) {
        const tbody = $("#dsBaiViet");
        const pagination = $("#pagination");
        if (!tbody || !pagination) return;

        if (list.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="empty">Chưa có bài trích nào.</td></tr>`;
            pagination.innerHTML = "";
            updateStats([]);
            return;
        }

        const totalPages = Math.ceil(list.length / rowsPerPage);
        const start = (currentPage - 1) * rowsPerPage;
        const pageItems = list.slice(start, start + rowsPerPage);

        tbody.innerHTML = pageItems.map((b, i) => `
            <tr>
                <td>${b.anpham}</td>
                <td>${b.ten}</td>
                <td>${b.tacgia || "-"}</td>
                <td title="${b.tomtat}">${b.tomtat.slice(0, 40)}${b.tomtat.length > 40 ? "..." : ""}</td>
                <td>${b.ngay}</td>
                <td>
                    <button class="btn-edit" data-index="${start + i}">✏️</button>
                    <button class="btn-delete" data-index="${start + i}">🗑️</button>
                </td>
            </tr>
        `).join("");

        // Phân trang
        pagination.innerHTML = `
            <button class="pg-prev" ${currentPage === 1 ? "disabled" : ""}>⬅</button>
            ${Array.from({ length: totalPages }, (_, i) =>
            `<button class="pg-btn ${currentPage === i + 1 ? "active" : ""}" data-page="${i + 1}">${i + 1}</button>`
        ).join("")}
            <button class="pg-next" ${currentPage === totalPages ? "disabled" : ""}>➡</button>
        `;

        updateStats(list);
    }

    // =============================
    // 🔹 CẬP NHẬT THỐNG KÊ
    // =============================
    function updateStats(list) {
        $("#btTotal").textContent = list.length;
        $("#btWithAuthor").textContent = list.filter(b => b.tacgia?.trim()).length;
        $("#btNoAuthor").textContent = list.filter(b => !b.tacgia?.trim()).length;
    }

    // =============================
    // 🔹 THÊM / XÓA
    // =============================
    function themBaiTrich() {
        const anpham = $("#anpham").value.trim();
        const ten = $("#tenbaiviet").value.trim();
        const tacgia = $("#tacgia").value.trim();
        const tomtat = $("#tomtat").value.trim();

        if (!anpham || !ten) {
            showToast("⚠️ Vui lòng nhập đầy đủ thông tin bắt buộc!", "error");
            return;
        }

        const list = loadData();
        list.push({
            anpham, ten, tacgia, tomtat,
            ngay: new Date().toLocaleDateString("vi-VN"),
        });
        saveData(list);
        renderTable();
        $$("#anpham, #tenbaiviet, #tacgia, #tomtat").forEach(i => i.value = "");
        showToast("✅ Đã thêm bài trích!", "success");
        document.getElementById("btnAdd").addEventListener("click", themBaiTrich);
    }

    function xoaBaiTrich(index) {
        const list = loadData();
        list.splice(index, 1);
        saveData(list);
        renderTable();
        showToast("🗑️ Đã xóa bài trích!", "warning");
    }

    function xoaTatCa() {
        if (!confirm("Xóa toàn bộ danh sách bài trích?")) return;
        localStorage.removeItem(STORAGE_KEY);
        renderTable();
        showToast("🧹 Đã xóa toàn bộ!", "warning");
    }

    // =============================
    // 🔹 MỞ / ĐÓNG MODAL
    // =============================
    function moModal(index) {
        const list = loadData();
        const bai = list[index];
        currentEditIndex = index;

        // Gán dữ liệu cũ vào modal
        document.getElementById("editAnpham").value = bai.anpham;
        document.getElementById("editTen").value = bai.ten;
        document.getElementById("editTacgia").value = bai.tacgia;
        document.getElementById("editTomtat").value = bai.tomtat;

        // Hiển thị modal
        document.getElementById("editModal").style.display = "flex";
    }

    function dongModal() {
        document.getElementById("editModal").style.display = "none";
    }

    // =============================
    // 🔹 TÌM KIẾM
    // =============================
    function timKiemBaiTrich() {
        const kw = $("#searchInput").value.toLowerCase();
        const list = loadData().filter(b =>
            b.ten.toLowerCase().includes(kw) ||
            (b.tacgia && b.tacgia.toLowerCase().includes(kw))
        );
        currentPage = 1;
        renderTable(list);
    }

    // =============================
    // 🔹 KẾ THỪA DỮ LIỆU (GIẢ LẬP)
    // =============================
    function keThua() {
        showToast("📘 Đã kế thừa dữ liệu ấn phẩm (demo)", "info");
    }

    // =============================
    // 🔹 SỰ KIỆN
    // =============================
    document.addEventListener("click", (e) => {
        const t = e.target;

        if (t.classList.contains("btn-add")) themBaiTrich();
        if (t.classList.contains("btn-danger")) xoaTatCa();
        if (t.classList.contains("btn-edit")) moModal(+t.dataset.index);
        if (t.classList.contains("btn-delete")) xoaBaiTrich(+t.dataset.index);
        if (t.id === "btnCloseModal") dongModal();
        if (t.id === "btnSaveEdit") luuChinhSua();
        if (t.classList.contains("pg-btn")) {
            currentPage = +t.dataset.page;
            renderTable();
        }
        if (t.classList.contains("pg-prev")) {
            if (currentPage > 1) { currentPage--; renderTable(); }
        }
        if (t.classList.contains("pg-next")) {
            const totalPages = Math.ceil(loadData().length / rowsPerPage);
            if (currentPage < totalPages) { currentPage++; renderTable(); }
        }
        if (t.classList.contains("btn-info")) keThua();
    });

    $("#searchInput")?.addEventListener("input", timKiemBaiTrich);
    $("#editModal")?.addEventListener("click", (e) => {
        if (e.target.id === "editModal") dongModal(); // click ngoài đóng modal
    });

    // =============================
    // 🔹 KHỞI TẠO
    // =============================
    renderTable();
});
