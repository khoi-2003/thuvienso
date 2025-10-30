// =============================
// 📰 QUẢN LÝ PHỤ TRƯƠNG - phutruong.js
// =============================
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ phutruong.js đã khởi động");

    // ====== PHẦN TỬ DOM ======
    const form = document.getElementById("supplementForm");
    const nameInput = document.getElementById("supplementName");
    const issueInput = document.getElementById("supplementIssue");
    const contentInput = document.getElementById("supplementContent");
    const statusInput = document.getElementById("supplementStatus");

    const tableBody = document.querySelector("#supplementTable tbody");
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const toast = document.getElementById("supToast");

    const btnAdd = form.querySelector(".btn-add");
    const btnClear = document.getElementById("clearSupBtn");

    const modal = document.getElementById("editModal");
    const editName = document.getElementById("editName");
    const editIssue = document.getElementById("editIssue");
    const editContent = document.getElementById("editContent");
    const editStatus = document.getElementById("editStatus");
    const saveEdit = document.getElementById("saveEdit");
    const cancelEdit = document.getElementById("cancelEdit");

    // ====== BIẾN LƯU TRỮ ======
    const STORAGE_KEY = "supplementData";
    let supplements = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let editIndex = null;

    // ====== HÀM TOAST ======
    function showToast(msg, type = "success") {
        toast.textContent = msg;
        toast.className = `toast show ${type}`;
        setTimeout(() => toast.classList.remove("show"), 3000);
    }

    // ====== LƯU LOCAL STORAGE ======
    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(supplements));
    }

    // ====== CẬP NHẬT THỐNG KÊ ======
    function updateStats() {
        document.getElementById("supTotal").textContent = supplements.length;
        document.getElementById("supPublished").textContent = supplements.filter(s => s.status === "Đã phát hành").length;
        document.getElementById("supUnpublished").textContent = supplements.filter(s => s.status === "Chưa phát hành").length;
    }

    // ====== HIỂN THỊ DANH SÁCH ======
    function renderTable(data = supplements) {
        tableBody.innerHTML = "";
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Không có dữ liệu</td></tr>`;
            updateStats();
            return;
        }

        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.issue}</td>
                <td>${item.content}</td>
                <td><span class="status ${item.status === "Đã phát hành" ? "success" : "warning"}">${item.status}</span></td>
                <td>
                    <button class="btn btn-info btn-edit" data-index="${index}">✏️</button>
                    <button class="btn btn-danger btn-delete" data-index="${index}">🗑️</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        updateStats();
    }

    // ====== THÊM PHỤ TRƯƠNG ======
    btnAdd.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const issue = issueInput.value.trim();
        const content = contentInput.value.trim();
        const status = statusInput.value;

        if (!name || !issue) {
            showToast("⚠️ Vui lòng nhập đầy đủ thông tin!", "error");
            return;
        }

        supplements.push({ name, issue, content, status });
        saveData();
        renderTable();
        form.reset();
        showToast("✅ Đã thêm phụ trương mới!");
    });

    // ====== XÓA TẤT CẢ ======
    btnClear.addEventListener("click", () => {
        if (confirm("Bạn có chắc muốn xóa tất cả phụ trương không?")) {
            supplements = [];
            saveData();
            renderTable();
            showToast("🗑️ Đã xóa toàn bộ dữ liệu!");
        }
    });

    // ====== SỬA / XÓA ======
    tableBody.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("btn-edit")) {
            const item = supplements[index];
            editIndex = index;
            editName.value = item.name;
            editIssue.value = item.issue;
            editContent.value = item.content;
            editStatus.value = item.status;
            modal.style.display = "block"; // 🪟 MỞ MODAL
        }

        if (e.target.classList.contains("btn-delete")) {
            if (confirm("Bạn có chắc muốn xóa phụ trương này không?")) {
                supplements.splice(index, 1);
                saveData();
                renderTable();
                showToast("🗑️ Đã xóa phụ trương!");
            }
        }
    });

    // ====== LƯU CHỈNH SỬA ======
    saveEdit.addEventListener("click", () => {
        if (editIndex !== null) {
            supplements[editIndex] = {
                name: editName.value.trim(),
                issue: editIssue.value.trim(),
                content: editContent.value.trim(),
                status: editStatus.value
            };
            saveData();
            renderTable();
            modal.style.display = "none";
            showToast("✏️ Đã cập nhật phụ trương!");
        }
    });

    // ====== HỦY CHỈNH SỬA ======
    cancelEdit.addEventListener("click", () => {
        modal.style.display = "none";
        editIndex = null;
    });

    // ====== TÌM KIẾM / LỌC ======
    function applyFilters() {
        const keyword = searchInput.value.toLowerCase();
        const filter = filterSelect.value;
        const filtered = supplements.filter(s => {
            const matchName = s.name.toLowerCase().includes(keyword);
            const matchStatus = filter ? s.status === filter : true;
            return matchName && matchStatus;
        });
        renderTable(filtered);
    }

    searchInput.addEventListener("input", applyFilters);
    filterSelect.addEventListener("change", applyFilters);

    // ====== ĐÓNG MODAL KHI CLICK RA NGOÀI ======
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // ====== KHỞI TẠO ======
    renderTable();
});