
    // ======================
    // 🔸 DỮ LIỆU MẪU
    // ======================
    const sampleBooks = [
    {code: "S001", copy: "AP001", name: "Lập trình C# (Bản 1)", status: "Đang mượn" },
    {code: "S001", copy: "AP002", name: "Lập trình C# (Bản 2)", status: "Có sẵn" },
    {code: "S002", copy: "AP003", name: "Cấu trúc dữ liệu (Bản 1)", status: "Đang mượn" },
    {code: "S003", copy: "AP004", name: "Giải tích 1 (Bản 1)", status: "Có sẵn" }
    ];

    const readers = [
    {id: "BD001", name: "Nguyễn Văn A", phone: "0912345678", location: "Kho A", priority: 3 },
    {id: "BD002", name: "Trần Thị B", phone: "0978123456", location: "Kho B", priority: 2 },
    {id: "BD003", name: "Lê Văn C", phone: "0909123123", location: "Kho C", priority: 3 },
    {id: "BD004", name: "Phạm Thị D", phone: "0933222111", location: "Khoa Toán", priority: 1 },
    {id: "BD005", name: "Ngô Văn E", phone: "0988777666", location: "Khoa Lý", priority: 2 },
    {id: "BD006", name: "Đỗ Thị F", phone: "0944333222", location: "Khoa Hóa", priority: 3 },
    {id: "BD007", name: "Hoàng Văn G", phone: "0911456789", location: "Khoa CNTT", priority: 1 },
    {id: "BD008", name: "Phan Thị H", phone: "0922567890", location: "Kho D", priority: 2 },
    {id: "BD009", name: "Trương Văn I", phone: "0933123456", location: "Kho E", priority: 3 },
    {id: "BD010", name: "Bùi Thị K", phone: "0909998888", location: "Khoa Sinh", priority: 2 }
    ];

    let reader = null;
    let reservations = [];

    // ======================
    // 🔹 PHÂN TRANG CHO BẢNG BẠN ĐỌC
    // ======================
    const rowsPerPage = 5;
    let currentPage = 1;

    function renderReaders() {
        const tbody = document.getElementById("readerInfoTable");
    const pagination = document.getElementById("readerPagination");
    const totalPages = Math.ceil(readers.length / rowsPerPage);

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const displayedReaders = readers.slice(start, end);

        tbody.innerHTML = displayedReaders.map((r, index) => `
    <tr onclick="selectReader('${r.id}')" style="cursor:pointer;">
        <td>${start + index + 1}</td>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${r.location}</td>
        <td>${r.phone}</td>
        <td>${priorityLabel(r.priority)}</td>
    </tr>
    `).join("");

    // Thanh phân trang
    pagination.innerHTML = `
    <button ${currentPage === 1 ? "disabled" : ""} onclick="changeReaderPage(${currentPage - 1})">⬅ Trước</button>
    ${Array.from({ length: totalPages }, (_, i) => `
                <button class="${currentPage === i + 1 ? "active" : ""}" onclick="changeReaderPage(${i + 1})">${i + 1}</button>
            `).join("")}
    <button ${currentPage === totalPages ? "disabled" : ""} onclick="changeReaderPage(${currentPage + 1})">Tiếp ➡</button>
    `;
    }

    function changeReaderPage(page) {
        const totalPages = Math.ceil(readers.length / rowsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderReaders();
    }

    // ======================
    // 🔹 CHỌN BẠN ĐỌC
    // ======================
    function selectReader(id) {
        reader = readers.find(r => r.id === id);
    if (reader) showNotification(`✅ Đã chọn bạn đọc: ${reader.name}`);
    }

    // ======================
    // 🔹 GIỮ CHỖ
    // ======================
    function reserveBook() {
        if (!reader) return alert("Vui lòng chọn bạn đọc từ bảng trên!");
    const copyCode = document.getElementById("reserveBookCopy").value.trim();
    if (!copyCode) return alert("Vui lòng chọn ấn phẩm cụ thể!");

        const book = sampleBooks.find(b => b.copy === copyCode);
    if (!book) return alert("Không tìm thấy ấn phẩm!");
    if (book.status === "Có sẵn")
    return alert("📗 Ấn phẩm này đang sẵn có, không cần giữ chỗ!");

        if (reservations.some(r => r.copy === copyCode && r.readerId === reader.id))
    return alert("⚠️ Bạn đã giữ chỗ ấn phẩm này rồi!");
        if (reservations.filter(r => r.readerId === reader.id).length >= 3)
    return alert("🚫 Mỗi bạn đọc chỉ được giữ tối đa 3 ấn phẩm!");

    const now = new Date();
    const expire = new Date();
    expire.setDate(now.getDate() + 3);

    reservations.push({
        readerId: reader.id,
    readerName: reader.name,
    readerPriority: reader.priority,
    code: book.code,
    copy: book.copy,
    name: book.name,
    date: now.toLocaleDateString(),
    expire: expire.toLocaleDateString(),
    status: "Đang chờ"
        });

    renderReserves();
    document.getElementById("reserveBookCopy").value = "";
    }

    // ======================
    // 🔹 DANH SÁCH GIỮ CHỖ
    // ======================
    function sortReservations() {
        reservations.sort((a, b) => {
            if (a.readerPriority !== b.readerPriority)
                return a.readerPriority - b.readerPriority;
            return new Date(a.date) - new Date(b.date);
        });
    }

    function renderReserves() {
        sortReservations();
    const tbody = document.getElementById("reserveList");
        tbody.innerHTML = reservations.map(r => `
    <tr>
        <td>${r.code}</td>
        <td>${r.name}</td>
        <td>${r.date}</td>
        <td>${r.expire}</td>
        <td>${r.status}</td>
        <td>${r.readerName} (${priorityLabel(r.readerPriority)})</td>
        <td>
            <button class="btn-cancel" onclick="cancelReserve('${r.copy}')">❌ Hủy</button>
        </td>
    </tr>`).join("");
    }

    // ======================
    // 🔹 CÁC HÀM KHÁC
    // ======================
    function cancelReserve(copy) {
        reservations = reservations.filter(r => r.copy !== copy);
    renderReserves();
    }

    function clearReserve() {
        reservations = [];
    renderReserves();
    }

    function markAsReturned(copyCode) {
        const reservation = reservations.find(r => r.copy === copyCode);
    if (!reservation) return alert("Không có bạn đọc nào đang giữ chỗ ấn phẩm này.");
    reservation.status = "Đã đến lượt";
    renderReserves();
    showNotification(`📢 Ấn phẩm ${reservation.copy} (${reservation.name}) đã sẵn sàng cho ${reservation.readerName}!`);
    }

    function priorityLabel(level) {
        if (level === 1) return "🎓 Giảng viên";
    if (level === 2) return "📘 Cao học";
    return "👩‍🎓 Sinh viên";
    }

    function showNotification(message) {
        let note = document.createElement("div");
    note.className = "notify-popup";
    note.innerText = message;
    document.body.appendChild(note);
        setTimeout(() => note.remove(), 4000);
    }

    // 🚀 Khởi tạo khi load
    window.onload = renderReaders;
