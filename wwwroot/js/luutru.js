//== TAB 9 : LƯU TRỮ  ===========//
function showArchiveToast(msg, type = "success") {
    const toast = document.getElementById("archiveToast");
    toast.textContent = msg;
    toast.className = `toast ${type}`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// 🔹 Thêm ấn phẩm
function addArchive() {
    const f = document.getElementById("archiveForm");
    const title = f.Title.value.trim();
    const code = f.Code.value.trim();
    const year = f.Year.value.trim();
    const loc = f.Location.value.trim();
    const status = f.Status.value;
    const notes = f.Notes.value.trim();

    if (!title) return showArchiveToast("⚠️ Vui lòng nhập tên ấn phẩm!", "error");

    const tbody = document.querySelector("#archiveTable tbody");
    // Xóa dòng trống nếu có
    const emptyRow = tbody.querySelector(".empty");
    if (emptyRow) emptyRow.remove();

    const now = new Date();
    const added = now.toLocaleString("vi-VN", { hour12: false });

    const statusClass =
        status === "Còn tốt" ? "good" :
            status === "Hư hỏng nhẹ" ? "warn" : "bad";

    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${title}</td>
                    <td>${code || "-"}</td>
                    <td>${year || "-"}</td>
                    <td>${loc || "-"}</td>
                    <td><span class="status ${statusClass}">${status}</span></td>
                    <td>${notes || "-"}</td>
                    <td>${added}</td>
                    <td><button class="btn-remove">🗑️</button></td>
                `;

    tbody.appendChild(row);
    f.reset();
    updateArchiveStats();
    showArchiveToast("✅ Đã thêm ấn phẩm lưu trữ!");
}

// 🔹 Xóa toàn bộ
function clearAllArchives() {
    const tbody = document.querySelector("#archiveTable tbody");
    const hasData = tbody.querySelectorAll("tr:not(.empty)").length > 0;

    if (!hasData) return showArchiveToast("Không có dữ liệu để xóa!", "error");

    if (confirm("Xóa toàn bộ dữ liệu lưu trữ?")) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty">Chưa có dữ liệu lưu trữ nào.</td></tr>';
        updateArchiveStats();
        showArchiveToast("🗑️ Đã xóa toàn bộ!", "warning");
    }
}

// 🔹 Xóa từng dòng (sử dụng event delegation)
const archiveTable = document.querySelector("#archiveTable");

if (archiveTable) {
    archiveTable.addEventListener("click", e => {
        if (e.target.classList.contains("btn-remove")) {
            const row = e.target.closest("tr");
            row.remove();

            const tbody = archiveTable.querySelector("tbody");
            const remaining = tbody.querySelectorAll("tr").length;

            if (remaining === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="8" class="empty">Chưa có dữ liệu lưu trữ nào.</td>
                    </tr>
                `;
            }

            if (typeof updateArchiveStats === "function") updateArchiveStats();
            if (typeof showArchiveToast === "function") showArchiveToast("🗑️ Đã xóa một dòng!", "warning");
        }
    });
}
// 🔹 Lọc / Tìm kiếm
function filterArchives() {
    const input = document.getElementById("archiveSearch").value.toLowerCase();
    const filter = document.getElementById("archiveFilter").value;
    const rows = document.querySelectorAll("#archiveTable tbody tr:not(.empty)");

    rows.forEach(r => {
        const title = r.children[0]?.innerText.toLowerCase();
        const status = r.children[4]?.innerText;
        const matchTitle = !input || title.includes(input);
        const matchStatus = !filter || status === filter;
        r.style.display = (matchTitle && matchStatus) ? "" : "none";
    });
}

// 🔹 Cập nhật thống kê
function updateArchiveStats() {
    const rows = document.querySelectorAll("#archiveTable tbody tr:not(.empty)");
    let total = 0, good = 0, bad = 0;

    rows.forEach(r => {
        total++;
        const s = r.children[4]?.innerText;
        if (s === "Còn tốt") good++;
        else bad++;
    });

    document.getElementById("archiveTotal").textContent = total;
    document.getElementById("archiveGood").textContent = good;
    document.getElementById("archiveBad").textContent = bad;
}

// 🔹 Khi load trang
document.addEventListener("DOMContentLoaded", updateArchiveStats);

