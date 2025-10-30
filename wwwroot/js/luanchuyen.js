//== TAB 8 : LUÂN CHUYỂN ==//
function showTransToast(msg, type = "success") {
    const toast = document.getElementById("transToast");
    toast.textContent = msg;
    toast.className = `toast show ${type}`;
    setTimeout(() => toast.classList.remove("show"), 3000);
}

function addTransfer() {
    const f = document.getElementById("transferForm");
    const title = f.Title.value.trim();
    const from = f.From.value.trim();
    const to = f.To.value.trim();
    const date = f.Date.value;
    const status = f.Status.value;
    const notes = f.Notes.value.trim();

    if (!title || !from || !to)
        return showTransToast("⚠️ Vui lòng nhập đầy đủ ấn phẩm, nơi gửi và nơi nhận!", "error");

    const tbody = document.querySelector("#transferTable tbody");
    if (tbody.querySelector(".empty")) tbody.innerHTML = "";

    const now = new Date();
    const added = now.toLocaleString("vi-VN", { hour12: false });

    const row = document.createElement("tr");
    row.innerHTML = `
                        <td>${title}</td>
                        <td>${from}</td>
                        <td>${to}</td>
                        <td>${date || "-"}</td>
                        <td><span class="status ${status === "Đã nhận" ? "success" : status === "Đang chuyển" ? "warning" : "failed"}">${status}</span></td>
                        <td>${notes || "-"}</td>
                        <td>${added}</td>
                        <td><button class="btn-remove">🗑️</button></td>
                    `;
    tbody.appendChild(row);

    f.reset();
    updateTransferStats();
    showTransToast("✅ Đã thêm luân chuyển mới!");
}

function clearAllTransfers() {
    if (confirm("Xóa toàn bộ danh sách luân chuyển?")) {
        document.querySelector("#transferTable tbody").innerHTML =
            '<tr><td colspan="8" class="empty">Chưa có dữ liệu luân chuyển nào.</td></tr>';
        updateTransferStats();
        showTransToast("🗑️ Đã xóa toàn bộ!", "warning");
    }
}

const transferTable = document.querySelector("#transferTable");

if (transferTable) {
    transferTable.addEventListener("click", e => {
        if (e.target.classList.contains("btn-remove")) {
            e.target.closest("tr").remove();

            const remainingRows = document.querySelectorAll("#transferTable tbody tr").length;

            if (remainingRows === 0 && typeof clearAllTransfers === "function") clearAllTransfers();

            if (typeof updateTransferStats === "function") updateTransferStats();
            if (typeof showTransToast === "function") showTransToast("🗑️ Đã xóa một dòng luân chuyển!", "warning");
        }
    });
}

function filterTransfers() {
    const input = document.getElementById("transferSearch").value.toLowerCase();
    const filter = document.getElementById("statusFilter").value;
    const rows = document.querySelectorAll("#transferTable tbody tr:not(.empty)");

    rows.forEach(r => {
        const title = r.children[0]?.innerText.toLowerCase();
        const status = r.children[4]?.innerText;
        r.style.display = (!input || title.includes(input)) && (!filter || status === filter) ? "" : "none";
    });
}

function updateTransferStats() {
    const rows = document.querySelectorAll("#transferTable tbody tr:not(.empty)");
    let total = 0, received = 0, pending = 0;
    rows.forEach(r => {
        total++;
        const s = r.children[4]?.innerText;
        if (s === "Đã nhận") received++;
        else pending++;
    });
    document.getElementById("transTotal").textContent = total;
    document.getElementById("transReceived").textContent = received;
    document.getElementById("transPending").textContent = pending;
}

document.addEventListener("DOMContentLoaded", updateTransferStats);