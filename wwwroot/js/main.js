// ============================================================
// 🟦 TAB 1 — TRANG CHÍNH (ẤN PHẨM ĐỊNH KỲ)
// ============================================================
// =============================
// 📚 QUẢN LÝ ẤN PHẨM - anpham.js
// =============================
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ anpham.js đã khởi động");

    // ======= PHẦN TỬ DOM =======
    const serialForm = document.getElementById("serialForm");
    const btnAdd = document.getElementById("btnAdd");
    const btnSave = document.querySelector(".btn-save");
    const tableBody = document.querySelector("#serialTable tbody");
    const searchInput = document.getElementById("searchInput");
    const toast = document.getElementById("toast");
    const listSection = document.querySelector("#serialTable");

    // ======= INPUT =======
    const inputTitle = document.getElementById("title");
    const inputIssue = document.getElementById("issue");
    const inputType = document.getElementById("type");
    const inputReleaseDate = document.getElementById("releaseDate");
    const inputStatus = document.getElementById("status");
    const inputNote = document.getElementById("note");

    // ======= LOCAL STORAGE =======
    const STORAGE_KEY = "anphamData";
    let serials = [];
    let editIndex = null;

    try {
        serials = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        console.warn("⚠️ Lỗi khi đọc LocalStorage, reset lại dữ liệu");
        localStorage.removeItem(STORAGE_KEY);
        serials = [];
    }

    // ================================
    // 📊 CẬP NHẬT DASHBOARD
    // ================================
    function updateDashboard() {
        const total = serials.length;
        const published = serials.filter(s => s.status === "Đã phát hành").length;
        const pending = serials.filter(s => s.status === "Đang chờ").length;

        const totalEl = document.getElementById("total-count");
        const publishedEl = document.getElementById("published-count");
        const pendingEl = document.getElementById("pending-count");

        if (totalEl) totalEl.textContent = total;
        if (publishedEl) publishedEl.textContent = published;
        if (pendingEl) pendingEl.textContent = pending;
    }

    // ================================
    // 🔔 TOAST THÔNG BÁO
    // ================================
    function showToast(message, type = "success") {
        if (!toast) return console.log(message);
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => toast.classList.remove("show"), 3000);
    }

    // ================================
    // 🧾 HIỂN THỊ DANH SÁCH
    // ================================
    function renderTable(data = serials) {
        if (!tableBody) return;
        tableBody.innerHTML = "";

        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Không có dữ liệu</td></tr>`;
            return;
        }

        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.issue}</td>
                <td>${item.type}</td>
                <td>${item.releaseDate}</td>
                <td>${item.status}</td>
                <td>
                    <button class="btn-edit" data-index="${index}">Sửa</button>
                    <button class="btn-delete" data-index="${index}">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // ================================
    // 💾 LƯU DỮ LIỆU
    // ================================
    function saveToLocal() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serials));
    }

    // ================================
    // ➕ THÊM / CẬP NHẬT ẤN PHẨM
    // ================================
    function handleAddOrUpdate() {
        const title = inputTitle.value.trim();
        const issue = inputIssue.value.trim();
        const type = inputType.value;
        const releaseDate = inputReleaseDate.value;
        const status = inputStatus.value;
        const note = inputNote.value.trim();

        if (!title || !issue || !releaseDate) {
            showToast("❗Vui lòng nhập đủ thông tin!", "error");
            return;
        }

        const newSerial = { title, issue, type, releaseDate, status, note };

        if (editIndex === null) {
            serials.push(newSerial);
            showToast("✅ Đã thêm ấn phẩm mới!");
        } else {
            serials[editIndex] = newSerial;
            editIndex = null;
            showToast("✏️ Đã cập nhật ấn phẩm!");
        }

        saveToLocal();
        renderTable();
        updateDashboard();
        serialForm.reset();

        setTimeout(() => {
            listSection?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
    }

    // ================================
    // 🔍 TÌM KIẾM
    // ================================
    searchInput?.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = serials.filter(s => s.title.toLowerCase().includes(keyword));
        renderTable(filtered);
    });

    // ================================
    // ✏️ SỬA / ❌ XÓA
    // ================================
    tableBody?.addEventListener("click", (e) => {
        const target = e.target;
        const index = target.dataset.index;

        if (target.classList.contains("btn-edit")) {
            const item = serials[index];
            inputTitle.value = item.title;
            inputIssue.value = item.issue;
            inputType.value = item.type;
            inputReleaseDate.value = item.releaseDate;
            inputStatus.value = item.status;
            inputNote.value = item.note;
            editIndex = index;
            showToast("📝 Đang chỉnh sửa ấn phẩm!");
        }

        if (target.classList.contains("btn-delete")) {
            if (confirm("Bạn có chắc muốn xóa ấn phẩm này không?")) {
                serials.splice(index, 1);
                saveToLocal();
                renderTable();
                updateDashboard();
                showToast("🗑️ Đã xóa ấn phẩm!");
            }
        }
    });

    // ================================
    // 🧩 SỰ KIỆN NÚT & FORM
    // ================================
    serialForm?.addEventListener("submit", (e) => e.preventDefault());
    btnAdd?.addEventListener("click", handleAddOrUpdate);
    btnSave?.addEventListener("click", handleAddOrUpdate);

    // ================================
    // 🚀 KHỞI TẠO
    // ================================
    renderTable();
    updateDashboard();
});

