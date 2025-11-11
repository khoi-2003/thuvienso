// ============================
// 🔹 QUẢN LÝ PHỤ TRƯƠNG
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("supplementForm");
    const tableBody = document.querySelector("#supplementTable tbody");
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const clearAllBtn = document.getElementById("clearSupBtn");

    // Modal
    const editModal = document.getElementById("editModal");
    const editName = document.getElementById("editName");
    const editIssue = document.getElementById("editIssue");
    const editContent = document.getElementById("editContent");
    const editStatus = document.getElementById("editStatus");
    const saveEdit = document.getElementById("saveEdit");
    const cancelEdit = document.getElementById("cancelEdit");

    // Thống kê
    const totalEl = document.getElementById("supTotal");
    const publishedEl = document.getElementById("supPublished");
    const unpublishedEl = document.getElementById("supUnpublished");

    // Toast
    const toast = document.getElementById("supToast");

    let editIndex = null;

    // ========== Hiển thị thông báo ==========
    function showToast(message, color = "#3498db") {
        toast.textContent = message;
        toast.style.background = color;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
    }

    // ========== Cập nhật thống kê ==========
    function updateStats() {
        const rows = tableBody.querySelectorAll("tr");
        const total = rows.length;
        let published = 0, unpublished = 0;

        rows.forEach(row => {
            const status = row.querySelector(".status").textContent.trim();
            if (status === "Đã phát hành") published++;
            else unpublished++;
        });

        totalEl.textContent = total;
        publishedEl.textContent = published;
        unpublishedEl.textContent = unpublished;
    }

    // ========== Thêm phụ trương ==========
    form.querySelector(".btn-add").addEventListener("click", () => {
        const name = document.getElementById("supplementName").value.trim();
        const issue = document.getElementById("supplementIssue").value.trim();
        const content = document.getElementById("supplementContent").value.trim();
        const status = document.getElementById("supplementStatus").value;

        if (!name || !issue) {
            showToast("⚠️ Vui lòng nhập đủ Tên và Kỳ phát hành", "#e74c3c");
            return;
        }

        const statusClass = status === "Đã phát hành" ? "success" : "pending";
        const newRow = `
            <tr>
                <td>${name}</td>
                <td>${issue}</td>
                <td>${content || "—"}</td>
                <td><span class="status ${statusClass}">${status}</span></td>
                <td>
                    <button class="btn btn-info btn-edit">✏️</button>
                    <button class="btn btn-danger btn-delete">🗑️</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", newRow);
        form.reset();
        updateStats();
        showToast("✅ Đã thêm phụ trương!");
    });

    // ========== Xóa từng phụ trương ==========
    tableBody.addEventListener("click", e => {
        if (e.target.classList.contains("btn-delete")) {
            e.target.closest("tr").remove();
            updateStats();
            showToast("🗑️ Đã xóa phụ trương", "#e67e22");
        }

        // ========== Sửa phụ trương ==========
        if (e.target.classList.contains("btn-edit")) {
            const row = e.target.closest("tr");
            editIndex = Array.from(tableBody.children).indexOf(row);
            const cells = row.querySelectorAll("td");

            editName.value = cells[0].textContent;
            editIssue.value = cells[1].textContent;
            editContent.value = cells[2].textContent;
            editStatus.value = cells[3].textContent.trim();

            editModal.style.display = "flex";
        }
    });

    // ========== Xóa tất cả ==========
    clearAllBtn.addEventListener("click", () => {
        if (confirm("Bạn có chắc muốn xóa TẤT CẢ phụ trương?")) {
            tableBody.innerHTML = "";
            updateStats();
            showToast("🧹 Đã xóa toàn bộ danh sách", "#c0392b");
        }
    });

    // ========== Lưu chỉnh sửa ==========
    saveEdit.addEventListener("click", () => {
        if (editIndex === null) return;

        const rows = Array.from(tableBody.children);
        const row = rows[editIndex];
        const statusClass = editStatus.value === "Đã phát hành" ? "success" : "pending";

        row.innerHTML = `
            <td>${editName.value}</td>
            <td>${editIssue.value}</td>
            <td>${editContent.value}</td>
            <td><span class="status ${statusClass}">${editStatus.value}</span></td>
            <td>
                <button class="btn btn-info btn-edit">✏️</button>
                <button class="btn btn-danger btn-delete">🗑️</button>
            </td>
        `;
        editModal.style.display = "none";
        updateStats();
        showToast("💾 Đã lưu thay đổi!");
    });

    // ========== Hủy chỉnh sửa ==========
    cancelEdit.addEventListener("click", () => {
        editModal.style.display = "none";
    });

    // ========== Lọc và tìm kiếm ==========
    function applyFilter() {
        const keyword = searchInput.value.toLowerCase();
        const filter = filterSelect.value;

        tableBody.querySelectorAll("tr").forEach(row => {
            const name = row.children[0].textContent.toLowerCase();
            const status = row.children[3].textContent.trim();

            const matchKeyword = name.includes(keyword);
            const matchFilter = !filter || status === filter;

            row.style.display = (matchKeyword && matchFilter) ? "" : "none";
        });
    }

    searchInput.addEventListener("input", applyFilter);
    filterSelect.addEventListener("change", applyFilter);

    // ========== Đóng modal khi click ngoài ==========
    window.addEventListener("click", e => {
        if (e.target === editModal) editModal.style.display = "none";
    });

    // Cập nhật thống kê lần đầu
    updateStats();
});
