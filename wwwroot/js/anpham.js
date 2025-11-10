function openTab(evt, tabName) {
    // Ẩn tất cả nội dung tab
    const tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("fade-in");
    }

    // Bỏ active ở tất cả tab-link
    const tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Hiển thị tab được chọn
    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.style.display = "block";
        activeTab.classList.add("fade-in");
    }

    // Đánh dấu nút hiện tại là active
    evt.currentTarget.classList.add("active");
}
