// ==TAB 7 : BÁO CÁO SERIALS == //
document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("reportChart").getContext("2d");
    let reportChart = null;

    // 🔹 Dữ liệu mẫu cho từng loại báo cáo
    const reports = {
        binding: {
            title: "📘 Báo cáo Đóng tập",
            data: [
                { name: "Tạp chí Khoa học", count: 12 },
                { name: "Công nghệ mới", count: 8 },
                { name: "Nghiên cứu giáo dục", count: 5 },
                { name: "Phát triển xã hội", count: 7 },
            ],
        },
        subscription: {
            title: "💳 Báo cáo Thuê bao",
            data: [
                { name: "Tạp chí Kinh tế", count: 15 },
                { name: "Công nghệ xanh", count: 10 },
                { name: "Sức khỏe & Đời sống", count: 6 },
                { name: "Tài chính hôm nay", count: 9 },
            ],
        },
        circulation: {
            title: "📦 Báo cáo Luân chuyển",
            data: [
                { name: "Khoa học tự nhiên", count: 20 },
                { name: "Giáo dục hiện đại", count: 12 },
                { name: "Công nghệ số", count: 9 },
                { name: "Kinh doanh", count: 14 },
            ],
        },
        archive: {
            title: "📚 Báo cáo Lưu trữ",
            data: [
                { name: "Văn học Việt Nam", count: 30 },
                { name: "Lịch sử thế giới", count: 25 },
                { name: "Nghệ thuật & Thiết kế", count: 18 },
                { name: "Tâm lý học", count: 21 },
            ],
        },
        error: {
            title: "⚠️ Báo cáo Lỗi Tiếp nhận",
            data: [
                { name: "Sai mã số ISSN", count: 3 },
                { name: "Thiếu số kỳ", count: 6 },
                { name: "Trùng bản ghi", count: 2 },
                { name: "Thông tin thiếu", count: 4 },
            ],
        },
    };

    // 🔹 Hàm tạo biểu đồ
    function generateChart(type, chartType) {
        const selected = reports[type];
        const labels = selected.data.map(item => item.name);
        const values = selected.data.map(item => item.count);

        const chartData = {
            labels: labels,
            datasets: [{
                label: selected.title,
                data: values,
                borderWidth: 2,
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(255, 205, 86, 0.6)",
                    "rgba(153, 102, 255, 0.6)"
                ],
                borderColor: "rgba(100, 100, 100, 0.4)",
                fill: true,
                tension: 0.3
            }]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: selected.title, font: { size: 18 } }
            }
        };

        // Xoá biểu đồ cũ nếu có
        if (reportChart) reportChart.destroy();

        // Tạo mới biểu đồ
        reportChart = new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: options
        });
    }

    // 🔹 Sự kiện khi bấm "Tạo báo cáo"
    document.getElementById("generateReport").addEventListener("click", () => {
        const reportType = document.getElementById("reportType").value;
        const chartType = document.getElementById("chartType").value;
        generateChart(reportType, chartType);
    });

    // ✅ Tạo mặc định khi load
    generateChart("binding", "bar");
});

//== THUÊ BAO ==//
function showToast(msg, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = `toast show ${type}`;
    setTimeout(() => toast.classList.remove("show"), 3000);
}

function addSub() {
    const f = document.getElementById("subForm");
    const p = f.Provider.value.trim();
    const t = f.Title.value.trim();
    const s = f.StartDate.value;
    const e = f.EndDate.value;
    const l = f.License.value.trim();
    const n = f.Notes.value.trim();

    if (!t) return showToast("⚠️ Vui lòng nhập tên ấn phẩm!", "error");

    const tbody = document.querySelector("#subTable tbody");
    if (tbody.querySelector(".empty")) tbody.innerHTML = "";

    const now = new Date();
    const added = now.toLocaleString("vi-VN", { hour12: false });

    let status = "Hiệu lực";
    if (e && new Date(e) < now) status = "Hết hạn";
    else if (e && (new Date(e) - now) / (1000 * 3600 * 24) < 30) status = "Sắp hết hạn";

    const row = document.createElement("tr");
    row.innerHTML = `
                            <td>${p || "-"}</td>
                            <td>${t}</td>
                            <td>${s || "-"}</td>
                            <td>${e || "-"}</td>
                            <td>${l || "-"}</td>
                            <td><span class="status ${status === "Hiệu lực" ? "success" : status === "Sắp hết hạn" ? "warning" : "failed"}">${status}</span></td>
                            <td>${n || "-"}</td>
                            <td>${added}</td>
                            <td><button class="btn-remove">🗑️</button></td>
                        `;
    tbody.appendChild(row);

    f.reset();
    updateStats();
    showToast("✅ Đã thêm thuê bao mới!");
}

function clearAll() {
    if (confirm("Xóa tất cả thuê bao?")) {
        document.querySelector("#subTable tbody").innerHTML =
            '<tr><td colspan="9" class="empty">Chưa có dữ liệu thuê bao nào.</td></tr>';
        updateStats();
        showToast("🗑️ Đã xóa toàn bộ!", "warning");
    }
}

const subTable = document.querySelector("#subTable");

if (subTable) {
    subTable.addEventListener("click", e => {
        if (e.target.classList.contains("btn-remove")) {
            e.target.closest("tr").remove();

            const remainingRows = document.querySelectorAll("#subTable tbody tr").length;
            if (remainingRows === 0 && typeof clearAll === "function") clearAll();

            if (typeof updateStats === "function") updateStats();
            if (typeof showToast === "function") showToast("🗑️ Đã xóa một thuê bao!", "warning");
        }
    });
}

function filterTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const filter = document.getElementById("filterSelect").value;
    const rows = document.querySelectorAll("#subTable tbody tr:not(.empty)");

    rows.forEach(r => {
        const title = r.children[1]?.innerText.toLowerCase();
        const status = r.children[5]?.innerText;
        r.style.display = (!input || title.includes(input)) && (!filter || status === filter) ? "" : "none";
    });
}

function updateStats() {
    const rows = document.querySelectorAll("#subTable tbody tr:not(.empty)");
    let total = 0, active = 0, exp = 0;
    rows.forEach(r => {
        total++;
        const s = r.children[5]?.innerText;
        if (s === "Hiệu lực") active++;
        else exp++;
    });
    document.getElementById("countTotal").textContent = total;
    document.getElementById("countActive").textContent = active;
    document.getElementById("countExpired").textContent = exp;
}

document.addEventListener("DOMContentLoaded", updateStats);