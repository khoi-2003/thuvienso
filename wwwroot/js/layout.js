document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const content = document.querySelector(".body-content");
    const toggleBtn = document.getElementById("toggleSidebar");

    /* ===== links và toggles ===== */
    const allLinks = sidebar.querySelectorAll("a[href]");
    const submenuToggles = sidebar.querySelectorAll(".submenu-toggle");

    /* ===== ACTIVE KHI CLICK VÀO LINK (KHÔNG GỒM SUBMENU-TOGGLE) ===== */
    allLinks.forEach(link => {
        // Nếu là nút toggle (cha) thì skip: xử lý riêng bên dưới
        if (link.classList.contains('submenu-toggle')) return;

        link.addEventListener("click", function (e) {
            // Nếu chính là nút toggle hoặc nút điều khiển sidebar thì skip
            if (this.id === "toggleSidebar") return;

            // Xóa tất cả active trước
            sidebar.querySelectorAll(".nav li").forEach(li => li.classList.remove("active"));

            // Gán active cho chính item được chọn
            this.parentElement.classList.add("active");

            // Nếu đây là item con trong .dropdown-submenu thì bật active cho cha (chỉ khi chọn con)
            const dropdownParent = this.closest(".dropdown-submenu");
            if (dropdownParent) dropdownParent.classList.add("active");
            // (lưu ý: không gán open/close ở đây — open sẽ do toggle khi mở submenu)
        });
    });

    /* ===== TOGGLE SIDEBAR ===== */
    toggleBtn?.addEventListener("click", function () {
        if (window.innerWidth <= 992) {
            sidebar.classList.toggle("expanded");
            content.classList.toggle("expanded");
        } else {
            sidebar.classList.toggle("collapsed");
            content.classList.toggle("collapsed");
            document.querySelector(".navbar-fixed-top")?.classList.toggle("collapsed");
            document.querySelector(".navbar-static-bottom")?.classList.toggle("collapsed");
        }
    });

    /* ===== LOGIN / LOGOUT ===== */
    const username = localStorage.getItem('loggedInUser');
    const authSection = document.getElementById('auth-section');
    const userSection = document.getElementById('user-section');
    const usernameSpan = document.getElementById('username');
    const logoutBtn = document.getElementById('logoutBtn');

    if (username) {
        if (authSection) authSection.style.display = "none";
        if (userSection) userSection.style.display = "flex";
        if (usernameSpan) usernameSpan.textContent = username;
    } else {
        if (authSection) authSection.style.display = "flex";
        if (userSection) userSection.style.display = "none";
    }

    logoutBtn?.addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        location.reload();
    });

    /* ===== ACTIVE THEO URL (HỖ TRỢ SUBMENU) ===== */
    const currentPath = window.location.pathname.toLowerCase();
    allLinks.forEach(link => {
        const href = link.getAttribute("href")?.toLowerCase();
        if (!href || href === "javascript:void(0);" || href === "#") return;

        if (currentPath === href || currentPath.startsWith(href)) {
            // Xóa active cũ
            sidebar.querySelectorAll(".nav li").forEach(li => li.classList.remove("active"));

            // Gán active cho link trùng
            link.parentElement.classList.add("active");

            // Nếu là item con → bật active cho cha
            const dropdownParent = link.closest(".dropdown-submenu");
            if (dropdownParent) dropdownParent.classList.add("active");

            // Nếu là item con, đồng thời mở submenu để thấy con được chọn
            const submenu = link.closest(".submenu");
            if (submenu) {
                const parent = submenu.closest(".dropdown-submenu");
                if (parent) {
                    parent.classList.add('open');
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                    submenu.style.opacity = "1";
                }
            }
        }
    });

    /* ===== SUBMENU TOGGLE (MƯỢT) — KHÔNG TỰ GÁN ACTIVE CHO CHA ===== */
    submenuToggles.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = this.closest('.dropdown-submenu');
            const submenu = parent.querySelector('.submenu');

            // Đóng các submenu khác (nếu muốn chỉ mở 1)
            document.querySelectorAll('.dropdown-submenu.open').forEach(openItem => {
                if (openItem !== parent) {
                    openItem.classList.remove('open');
                    const sub = openItem.querySelector('.submenu');
                    if (sub) {
                        sub.style.maxHeight = null;
                        sub.style.opacity = "0";
                    }
                }
            });

            // Toggle open/close cho submenu hiện tại
            parent.classList.toggle('open');
            if (submenu) {
                if (submenu.style.maxHeight) {
                    submenu.style.maxHeight = null;
                    submenu.style.opacity = "0";
                } else {
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                    submenu.style.opacity = "1";
                }
            }

            // QUAN TRỌNG: Không thay đổi class 'active' ở đây
            // Nếu muốn parent sáng khi có item con được chọn, parent sẽ được gán 'active'
            // chỉ khi người dùng click vào chính mục con (xử lý ở handler của allLinks).
        });
    });
});
