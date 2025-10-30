
// ============================================================
// 🟩 TAB 2 — HOLDINGS (Quản lý Holdings)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#holdingsTable tbody");
    const coverageList = document.getElementById("coverageList");
    const form = document.getElementById("holdingForm");

    let holdings = JSON.parse(localStorage.getItem("holdingsData")) || [];
    let editingIndex = null;

    // =============================
    // 🟢 HIỂN THỊ DỮ LIỆU
    // =============================
    function renderTable() {
        tableBody.innerHTML = "";

    if (holdings.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="empty">Chưa có dữ liệu...</td></tr>`;
    coverageList.innerHTML = `<li style="list-style:none">Chưa có dữ liệu...</li>`;
    return;
        }

        holdings.forEach((h, i) => {
            const row = document.createElement("tr");
    row.innerHTML = `
    <td>${h.title}</td>
    <td>${h.startIssue || "-"}</td>
    <td>${h.endIssue || "-"}</td>
    <td><span class="status ${h.status}">${getStatusText(h.status)}</span></td>
    <td>
        <button class="btn-edit" data-index="${i}">✏️</button>
        <button class="btn-del" data-index="${i}">🗑️</button>
    </td>
    `;
    tableBody.appendChild(row);
        });

    renderCoverage();
    }

    // =============================
    // 🟣 TRẠNG THÁI (CHỮ)
    // =============================
    function getStatusText(status) {
        switch (status) {
            case "success": return "Đầy đủ";
    case "pending": return "Thiếu số";
    case "processing": return "Đang bổ sung";
    default: return "-";
        }
    }

    // =============================
    // 🟠 COVERAGE (PHẠM VI LƯU TRỮ)
    // =============================
    function renderCoverage() {
        coverageList.innerHTML = "";
        holdings.forEach(h => {
            const li = document.createElement("li");
    li.textContent = `${h.title}: ${h.startIssue || "?"} → ${h.endIssue || "?"} (${getStatusText(h.status)})`;
    coverageList.appendChild(li);
        });
    }

    // =============================
    // 🟢 THÊM HOLDING
    // =============================
    window.addHolding = function () {
        const title = form.title.value.trim();
    const startIssue = form.startIssue.value.trim();
    const endIssue = form.endIssue.value.trim();
    const status = form.status.value;

    if (!title) {
        alert("Vui lòng nhập tên ấn phẩm!");
    return;
        }

    holdings.push({title, startIssue, endIssue, status});
    saveData();
    renderTable();
    form.reset();
    };

    // =============================
    // 🔵 XOÁ HOLDING
    // =============================
    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-del")) {
            const index = e.target.dataset.index;
    if (confirm("Xóa holdings này?")) {
        holdings.splice(index, 1);
    saveData();
    renderTable();
            }
        }

    // ✏️ Mở modal sửa
    if (e.target.classList.contains("btn-edit")) {
            const index = e.target.dataset.index;
    openModal(index);
        }
    });

    // =============================
    // 🟡 MỞ / ĐÓNG MODAL
    // =============================
    window.openModal = function (index) {
        editingIndex = index;
    const item = holdings[index];

    document.getElementById("editTitle").value = item.title;
    document.getElementById("editStart").value = item.startIssue;
    document.getElementById("editEnd").value = item.endIssue;
    document.getElementById("editStatus").value = item.status;

    document.getElementById("editModal").style.display = "flex";
    };

    window.closeModal = function () {
        document.getElementById("editModal").style.display = "none";
    };

    // =============================
    // 💾 LƯU CHỈNH SỬA
    // =============================
    window.saveEdit = function () {
        if (editingIndex === null) return;

    const title = document.getElementById("editTitle").value.trim();
    const startIssue = document.getElementById("editStart").value.trim();
    const endIssue = document.getElementById("editEnd").value.trim();
    const status = document.getElementById("editStatus").value;

    if (!title) {
        alert("Tên ấn phẩm không được bỏ trống!");
    return;
        }

    holdings[editingIndex] = {title, startIssue, endIssue, status};
    saveData();
    renderTable();
    closeModal();
    };

    // =============================
    // 💾 LƯU LOCALSTORAGE
    // =============================
    function saveData() {
        localStorage.setItem("holdingsData", JSON.stringify(holdings));
    }

    // =============================
    // 🚀 KHỞI CHẠY
    // =============================
    renderTable();
});