// =============================
// 📅 TAB 5: QUẢN LÝ LỊCH PHÁT HÀNH
// =============================
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ lichphathanh.js đã khởi động");

    // ====== STORAGE KEYS ======
    const STORAGE_KEY = "schedules";
    const SPECIAL_KEY = "specialRegistration";
    const DIGITAL_KEY = "digitalNews";
    const FORECAST_KEY = "forecastData";

    // ====== ELEMENTS ======
    const scheduleBody = document.getElementById("scheduleBody");
    const createModal = document.getElementById("createModal");
    const createForm = document.getElementById("createForm");

    const specialModal = document.getElementById("specialModal");
    const digitalModal = document.getElementById("digitalModal");
    const statsModal = document.getElementById("statsModal");
    const forecastModal = document.getElementById("forecastModal");

    const specialForm = document.getElementById("specialForm");
    const digitalForm = document.getElementById("digitalForm");
    const forecastForm = document.getElementById("forecastForm");

    const specialSelect = document.getElementById("specialPublication");
    const specialTable = document.querySelector("#specialTable tbody");
    const digitalTable = document.querySelector("#digitalTable tbody");
    const statsTableBody = document.querySelector("#statsTable tbody");
    const forecastSelect = document.getElementById("forecastPublication");
    const forecastTable = document.querySelector("#forecastTable tbody");

    const statsFrom = document.getElementById("statsFrom");
    const statsTo = document.getElementById("statsTo");
    const statsTopic = document.getElementById("statsTopic");

    // ====== DỮ LIỆU MẪU ======
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
        {
            publicationName: "Tạp chí Khoa học",
            issueNumber: "Số 10/2025",
            releaseDate: "2025-10-05",
            topic: "Nghiên cứu ứng dụng trí tuệ nhân tạo",
            status: "published"
        },
        {
            publicationName: "Bản tin Công nghệ",
            issueNumber: "Số 11/2025",
            releaseDate: "2025-11-15",
            topic: "Xu hướng phát triển công nghệ năm 2026",
            status: "pending"
        }
    ]));

    // ====== TOAST ======
    function showToast(msg, type = "success") {
        const t = document.getElementById("toast");
        if (!t) return alert(msg);
        t.innerHTML = `<div style="
            background:${type === 'success' ? '#2ecc71' : '#ff6b6b'};
            color:#fff; padding:12px 18px; border-radius:8px;
            font-weight:600; box-shadow:0 4px 10px rgba(0,0,0,0.2);
        ">${msg}</div>`;
        t.style.display = "block";
        setTimeout(() => t.style.display = "none", 2500);
    }

    // ====== UTIL ======
    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    function statusLabel(st) {
        if (st === "published") return `<span class="status success">Đã phát hành</span>`;
        if (st === "pending") return `<span class="status warning">Đang chuẩn bị</span>`;
        return `<span class="status pending">Chưa xác định</span>`;
    }

    function loadSchedules() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    }

    function saveSchedules(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    // ====== HIỂN THỊ BẢNG CHÍNH ======
    function renderTable() {
        const list = loadSchedules();
        if (list.length === 0) {
            scheduleBody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#666;padding:15px">Chưa có lịch phát hành</td></tr>`;
            return;
        }

        scheduleBody.innerHTML = list.map((s, i) => `
            <tr>
                <td style="text-align:left">${escapeHtml(s.publicationName)}</td>
                <td style="text-align:center">${escapeHtml(String(s.issueNumber || ""))}</td>
                <td style="text-align:center">${escapeHtml(s.releaseDate)}</td>
                <td style="text-align:center">${statusLabel(s.status)}</td>
                <td style="text-align:center">
                    <button class="btn-edit" onclick="editSchedule(${i})">✏️</button>
                    <button class="btn-delete" onclick="deleteSchedule(${i})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    // ====== THÊM / SỬA ======
    let currentEditIndex = null;

    window.openCreateModal = () => {
        createForm.reset();
        currentEditIndex = null;
        createModal.style.display = "block";
        createForm.querySelector("button[type='submit']").textContent = "➕ Thêm mới";
    };

    window.closeCreateModal = () => createModal.style.display = "none";

    window.editSchedule = (index) => {
        const list = loadSchedules();
        const item = list[index];
        if (!item) return;

        currentEditIndex = index;
        document.getElementById("createPublication").value = item.publicationName;
        document.getElementById("createIssue").value = item.issueNumber;
        document.getElementById("createDate").value = item.releaseDate;
        document.getElementById("createTopic").value = item.topic;
        document.getElementById("createStatus").value = item.status;

        createModal.style.display = "block";
        createForm.querySelector("button[type='submit']").textContent = "💾 Lưu chỉnh sửa";
    };

    createForm.addEventListener("submit", e => {
        e.preventDefault();

        const publicationName = document.getElementById("createPublication").value.trim();
        const issueNumber = document.getElementById("createIssue").value.trim();
        const releaseDate = document.getElementById("createDate").value;
        const topic = document.getElementById("createTopic").value;
        const status = document.getElementById("createStatus").value;

        if (!publicationName || !issueNumber || !releaseDate)
            return showToast("Vui lòng nhập đầy đủ thông tin", "error");

        const list = loadSchedules();

        if (currentEditIndex !== null) {
            list[currentEditIndex] = { publicationName, issueNumber, releaseDate, topic, status };
            showToast("Đã cập nhật lịch phát hành ✏️");
        } else {
            list.push({ publicationName, issueNumber, releaseDate, topic, status });
            showToast("Đã thêm số phát hành mới 🎉");
        }

        saveSchedules(list);
        renderTable();
        closeCreateModal();
    });

    window.deleteSchedule = (i) => {
        if (!confirm("Bạn chắc chắn muốn xóa?")) return;
        const arr = loadSchedules();
        arr.splice(i, 1);
        saveSchedules(arr);
        renderTable();
        showToast("Đã xóa thành công");
    };

    window.clearAllSchedules = () => {
        if (!confirm("Xóa tất cả lịch phát hành?")) return;
        localStorage.removeItem(STORAGE_KEY);
        renderTable();
        showToast("Đã xóa tất cả");
    };

    renderTable();

    // ==============================
    // 🔹 CÁC MODAL PHỤ
    // ==============================
    // ----- ẤN PHẨM CÁ BIỆT -----
    window.openSpecialModal = () => {
        loadSpecialOptions();
        renderSpecialTable();
        specialModal.style.display = "block";
    };
    window.closeSpecialModal = () => specialModal.style.display = "none";

    function loadSpecialOptions() {
        specialSelect.innerHTML = "";
        const list = loadSchedules();
        if (list.length === 0) return specialSelect.innerHTML = `<option>Chưa có ấn phẩm</option>`;
        list.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s.publicationName;
            opt.textContent = s.publicationName;
            specialSelect.appendChild(opt);
        });
    }

    specialForm.addEventListener("submit", e => {
        e.preventDefault();
        const pub = specialSelect.value;
        const code = document.getElementById("specialCode").value.trim();
        const note = document.getElementById("specialNote").value.trim();

        if (!pub || !code) return showToast("Chưa nhập đủ dữ liệu", "error");

        const arr = JSON.parse(localStorage.getItem(SPECIAL_KEY) || "[]");
        arr.push({ publicationName: pub, code, note });
        localStorage.setItem(SPECIAL_KEY, JSON.stringify(arr));

        renderSpecialTable();
        specialForm.reset();
        showToast("Đã lưu đăng ký cá biệt");
    });

    function renderSpecialTable() {
        const arr = JSON.parse(localStorage.getItem(SPECIAL_KEY) || "[]");
        if (arr.length === 0)
            return specialTable.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#666">Chưa có đăng ký</td></tr>`;
        specialTable.innerHTML = arr.map((s, i) => `
            <tr>
                <td>${escapeHtml(s.publicationName)}</td>
                <td>${escapeHtml(s.code)}</td>
                <td>${escapeHtml(s.note)}</td>
                <td><button class="btn-delete" onclick="deleteSpecial(${i})">Xóa</button></td>
            </tr>
        `).join('');
    }

    window.deleteSpecial = (i) => {
        if (!confirm("Xóa đăng ký này?")) return;
        const arr = JSON.parse(localStorage.getItem(SPECIAL_KEY) || "[]");
        arr.splice(i, 1);
        localStorage.setItem(SPECIAL_KEY, JSON.stringify(arr));
        renderSpecialTable();
        showToast("Đã xóa");
    };

    // ----- ẤN PHẨM ĐIỆN TỬ -----
    window.openDigitalModal = () => {
        digitalModal.style.display = "block";
        renderDigitalTable();
    };
    window.closeDigitalModal = () => digitalModal.style.display = "none";

    function renderDigitalTable() {
        const arr = JSON.parse(localStorage.getItem(DIGITAL_KEY) || "[]");
        if (arr.length === 0)
            return digitalTable.innerHTML = `<tr><td colspan="3" style="text-align:center;color:#666">Chưa có bản tin điện tử</td></tr>`;
        digitalTable.innerHTML = arr.map((x, i) => `
            <tr>
                <td>${x.title}</td>
                <td>${x.link}</td>
                <td><button class="btn-delete" onclick="deleteDigital(${i})">Xóa</button></td>
            </tr>
        `).join('');
    }

    window.deleteDigital = (i) => {
        const arr = JSON.parse(localStorage.getItem(DIGITAL_KEY) || "[]");
        arr.splice(i, 1);
        localStorage.setItem(DIGITAL_KEY, JSON.stringify(arr));
        renderDigitalTable();
        showToast("Đã xóa bản tin điện tử");
    };

    // ----- THỐNG KÊ -----
    window.openStatsModal = () => {
        statsModal.style.display = "block";
        renderStatsTable();
    };
    window.closeStatsModal = () => statsModal.style.display = "none";

    function renderStatsTable() {
        const arr = loadSchedules();
        if (arr.length === 0)
            return statsTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#666">Không có dữ liệu thống kê</td></tr>`;
        statsTableBody.innerHTML = arr.map(x => `
            <tr>
                <td>${x.publicationName}</td>
                <td>${x.issueNumber}</td>
                <td>${x.releaseDate}</td>
                <td>${x.topic}</td>
                <td>${x.status}</td>
            </tr>
        `).join('');
    }

    // ----- DỰ BÁO -----
    window.openForecastModal = () => {
        forecastModal.style.display = "block";
        renderForecastTable();
    };
    window.closeForecastModal = () => forecastModal.style.display = "none";

    function renderForecastTable() {
        const arr = JSON.parse(localStorage.getItem(FORECAST_KEY) || "[]");
        if (arr.length === 0)
            return forecastTable.innerHTML = `<tr><td colspan="3" style="text-align:center;color:#666">Chưa có dữ liệu dự báo</td></tr>`;
        forecastTable.innerHTML = arr.map(f => `
            <tr>
                <td>${f.publication}</td>
                <td>${f.forecastDate}</td>
                <td>${f.note}</td>
            </tr>
        `).join('');
    }

    // ====== CLICK RA NGOÀI ĐỂ ĐÓNG ======
    window.onclick = (e) => {
        [specialModal, digitalModal, statsModal, forecastModal, createModal].forEach(modal => {
            if (e.target === modal) modal.style.display = "none";
        });
    };
});
