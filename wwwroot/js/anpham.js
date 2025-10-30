document.addEventListener("DOMContentLoaded", () => {
    // ============================================================
    // 🔹 KHỞI TẠO TAB ĐẦU TIÊN
    // ============================================================
    document.getElementById("trangchinh").style.display = "block";  // Hiển thị tab đầu tiên

    // ============================================================
    // 🔸 CHUYỂN TAB
    // ============================================================
    // Gán openTab vào window để có thể sử dụng trong HTML
    window.openTab = function (evt, tabName) {
        // Ẩn tất cả các tab-content
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";
            tab.classList.remove("active");
        });

        // Gỡ bỏ active class của tất cả các nút tab
        document.querySelectorAll(".tab-link").forEach(btn => btn.classList.remove("active"));

        // Hiển thị tab được chọn
        const tab = document.getElementById(tabName);
        tab.style.display = "block";
        tab.classList.add("active");

        // Thêm active class vào nút bấm hiện tại
        evt.currentTarget.classList.add("active");
    };
});