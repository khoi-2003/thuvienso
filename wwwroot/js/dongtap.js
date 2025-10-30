// ===== TAB 6 : ĐÓNG TẬP =====
document.addEventListener("DOMContentLoaded", () => {
    const BINDING_KEY = "bindings";

    // ===== HIỂN THỊ THÔNG BÁO =====
    function showToast(msg) {
        const toast = document.querySelector("#dongtap #toast");
        if (!toast) return alert(msg);
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
    }

    // ===== CHUYỂN GIỮA CÁC BƯỚC =====
    window.nextStep = function (step) {
        const dongtap = document.getElementById("dongtap");
        if (!dongtap) return;

        // Ẩn các step cũ
        dongtap.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
        dongtap.querySelectorAll(".progress-step").forEach(p => p.classList.remove("active"));

        // Kiểm tra & xác nhận dữ liệu nếu sang bước 2
        if (step === 2) {
            const title = dongtap.querySelector("#title").value.trim();
            const start = dongtap.querySelector("#startIssue").value.trim();
            const end = dongtap.querySelector("#endIssue").value.trim();
            const notes = dongtap.querySelector("#notes").value.trim();

            if (!title) {
                showToast("⚠️ Vui lòng nhập tên ấn phẩm!");
                dongtap.querySelector("#title").focus();
                return;
            }

            const confirmBox = dongtap.querySelector("#confirmBox");
            confirmBox.innerHTML = `
                                <p><b>Tên ấn phẩm:</b> ${title}</p>
                                <p><b>Số bắt đầu:</b> ${start || "-"}</p>
                                <p><b>Số kết thúc:</b> ${end || "-"}</p>
                                <p><b>Ghi chú:</b> ${notes || "Không có"}</p>
                            `;
        }

        // Hiển thị step tương ứng
        const targetStep = dongtap.querySelector(`#step${step}`);
        const targetIndicator = dongtap.querySelector(`#stepIndicator${step}`);
        if (targetStep) targetStep.classList.add("active");
        if (targetIndicator) targetIndicator.classList.add("active");
    };

    // ===== LƯU DỮ LIỆU =====
    window.saveBinding = function () {
        const dongtap = document.getElementById("dongtap");
        if (!dongtap) return;

        const title = dongtap.querySelector("#title").value.trim();
        const start = dongtap.querySelector("#startIssue").value.trim();
        const end = dongtap.querySelector("#endIssue").value.trim();
        const notes = dongtap.querySelector("#notes").value.trim();
        const date = new Date().toLocaleDateString("vi-VN");

        if (!title) return showToast("⚠️ Thiếu tên ấn phẩm!");

        const arr = JSON.parse(localStorage.getItem(BINDING_KEY) || "[]");
        arr.push({ title, start, end, notes, date });
        localStorage.setItem(BINDING_KEY, JSON.stringify(arr));

        renderBindings();
        showToast("✅ Đã lưu tập đóng!");
        nextStep(3);
    };

    // ===== HIỂN THỊ DANH SÁCH =====
    function renderBindings() {
        const dongtap = document.getElementById("dongtap");
        if (!dongtap) return;

        const arr = JSON.parse(localStorage.getItem(BINDING_KEY) || "[]");
        const tbody = dongtap.querySelector("#bindingTable tbody");

        if (!tbody) return;

        if (arr.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#777;">Chưa có dữ liệu đóng tập nào.</td></tr>`;
            return;
        }

        tbody.innerHTML = arr.map((b, i) => `
                            <tr>
                                <td>${b.title}</td>
                                <td>${b.start || "-"}</td>
                                <td>${b.end || "-"}</td>
                                <td>${b.notes || ""}</td>
                                <td>${b.date}</td>
                                <td><button onclick="deleteBinding(${i})">🗑</button></td>
                            </tr>
                        `).join("");
    }

    // ===== XÓA MỘT BẢN GHI =====
    window.deleteBinding = function (i) {
        const arr = JSON.parse(localStorage.getItem(BINDING_KEY) || "[]");
        if (!confirm("Xóa tập này?")) return;
        arr.splice(i, 1);
        localStorage.setItem(BINDING_KEY, JSON.stringify(arr));
        renderBindings();
        showToast("🗑 Đã xóa tập đóng!");
    };

    // ===== RESET QUY TRÌNH =====
    window.resetProcess = function () {
        const form = document.querySelector("#dongtap #bindingForm");
        if (form) form.reset();
        nextStep(1);
    };

    // ===== KHỞI TẠO =====
    renderBindings();
    nextStep(1);
});



