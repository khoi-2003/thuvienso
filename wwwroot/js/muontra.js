
    // ================== DỮ LIỆU MẪU ==================
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

    const sampleBooks = [
    {code: "S001", name: "Lập trình C# cơ bản", type: "Giáo trình", location: "Kho A" },
    {code: "S002", name: "Cấu trúc dữ liệu", type: "Giáo trình", location: "Kho A" },
    {code: "S003", name: "Giải tích 1", type: "Tham khảo", location: "Kho B" },
    {code: "S004", name: "Công nghệ phần mềm", type: "Giáo trình", location: "Kho B" },
    {code: "S005", name: "Cơ sở dữ liệu nâng cao", type: "Giáo trình", location: "Kho A" },
    {code: "S006", name: "Lập trình Python", type: "Giáo trình", location: "Kho C" },
    {code: "S007", name: "Mạng máy tính", type: "Tham khảo", location: "Kho A" },
    {code: "S008", name: "Trí tuệ nhân tạo", type: "Tham khảo", location: "Kho C" },
    {code: "S009", name: "Phân tích thiết kế hệ thống", type: "Giáo trình", location: "Kho B" },
    {code: "S010", name: "Lập trình Java nâng cao", type: "Giáo trình", location: "Kho C" },
    {code: "S011", name: "Xử lý tín hiệu số", type: "Tham khảo", location: "Kho B" },
    {code: "S012", name: "Thuật toán tối ưu", type: "Tham khảo", location: "Kho C" },
    {code: "S013", name: "Nguyên lý hệ điều hành", type: "Giáo trình", location: "Kho A" },
    {code: "S014", name: "Quản trị dự án CNTT", type: "Tham khảo", location: "Kho B" },
    {code: "S015", name: "Kỹ thuật lập trình hướng đối tượng", type: "Giáo trình", location: "Kho C" }
    ];
    // ================== DỮ LIỆU GIẢ MƯỢN TRẢ ==================
    const muonTraList = [
    {id: 1, reader: "Nguyễn Văn A", book: "Lập trình C#", borrowDate: "01/10/2025", returnDate: "15/10/2025" },
    {id: 2, reader: "Trần Thị B", book: "Cấu trúc dữ liệu", borrowDate: "02/10/2025", returnDate: "16/10/2025" },
    {id: 3, reader: "Lê Văn C", book: "Giải tích 1", borrowDate: "03/10/2025", returnDate: "17/10/2025" },
    {id: 4, reader: "Phạm Thị D", book: "Công nghệ phần mềm", borrowDate: "04/10/2025", returnDate: "18/10/2025" },
    {id: 5, reader: "Ngô Văn E", book: "Lập trình Python", borrowDate: "05/10/2025", returnDate: "19/10/2025" },
    {id: 6, reader: "Đỗ Thị F", book: "Cơ sở dữ liệu nâng cao", borrowDate: "06/10/2025", returnDate: "20/10/2025" },
    {id: 7, reader: "Hoàng Văn G", book: "Trí tuệ nhân tạo", borrowDate: "07/10/2025", returnDate: "21/10/2025" },
    {id: 8, reader: "Phan Thị H", book: "Lập trình Java nâng cao", borrowDate: "08/10/2025", returnDate: "22/10/2025" },
    {id: 9, reader: "Trương Văn I", book: "Kỹ thuật lập trình hướng đối tượng", borrowDate: "09/10/2025", returnDate: "23/10/2025" },
    {id: 10, reader: "Bùi Thị K", book: "Quản trị dự án CNTT", borrowDate: "10/10/2025", returnDate: "24/10/2025" }
    ];
    const cardList = [
    {id: 1, code: "BD001", name: "Nguyễn Văn A", issue: "2024-02-01", expiry: "2025-02-01", status: "Hoạt động" },
    {id: 2, code: "BD002", name: "Trần Thị B", issue: "2023-03-10", expiry: "2024-03-10", status: "Hết hạn" },
    {id: 3, code: "BD003", name: "Lê Minh C", issue: "2024-01-05", expiry: "2025-01-05", status: "Bị khóa" },
    ];

    const requestList = [
    {id: "YC001", reader: "Lê Văn D", type: "Cấp mới", date: "2025-10-25", status: "Chờ duyệt" },
    {id: "YC002", reader: "Phạm Thị E", type: "Gia hạn", date: "2025-10-26", status: "Đã duyệt" },
    ];


    let borrowedBooks = [];
    let reader = null;
    let transactions = [];
    let savedTransactions = [];
    let reserveList = [];

    // ================== HÀM TIỆN ÍCH ==================
    function showAlert(message, type = "success") {
        // đảm bảo phần tử alertBox tồn tại — nếu chưa có thì tự tạo
        let alertBox = document.getElementById("alertBox");

    if (!alertBox) {
        alertBox = document.createElement("div");
    alertBox.id = "alertBox";
    alertBox.className = "alert-box";
    document.body.appendChild(alertBox);
    }

    alertBox.textContent = message;
    alertBox.className = `alert-box ${type}`;
    alertBox.style.display = "block";

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);
}

    // ================== HIỂN THỊ DANH SÁCH BẠN ĐỌC ==================
    let currentReaderPage = 1;
    const readersPerPage = 5;

    function renderAllReaders(page = 1) {
    const tbody = document.getElementById("readerInfoTable");
    const pagination = document.getElementById("readerPagination");
    tbody.innerHTML = "";
    pagination.innerHTML = "";

    const totalPages = Math.ceil(readers.length / readersPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentReaderPage = page;

    const start = (page - 1) * readersPerPage;
    const end = start + readersPerPage;
    const readersToShow = readers.slice(start, end);

    readersToShow.forEach((r, index) => {
        const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${start + index + 1}</td>
    <td>${r.id}</td>
    <td>${r.name}</td>
    <td>${r.location}</td>
    <td>${r.phone}</td>
    <td>${r.address || "-"}</td>
    `;
        tr.addEventListener("click", () => selectReader(r));
    tbody.appendChild(tr);
    });

    // Nút phân trang
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "⬅️ Trước";
    prevBtn.className = "btn btn-sm btn-outline-primary m-1";
    prevBtn.disabled = page === 1;
    prevBtn.onclick = () => renderAllReaders(page - 1);

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Sau ➡️";
    nextBtn.className = "btn btn-sm btn-outline-primary m-1";
    nextBtn.disabled = page === totalPages;
    nextBtn.onclick = () => renderAllReaders(page + 1);

    const pageInfo = document.createElement("span");
    pageInfo.textContent = `Trang ${page} / ${totalPages}`;
    pageInfo.style.margin = "0 10px";
    pageInfo.style.fontWeight = "bold";

    pagination.appendChild(prevBtn);
    pagination.appendChild(pageInfo);
    pagination.appendChild(nextBtn);
}

    //Hiển thị tất cả thông tin sách
    // ================== HIỂN THỊ TẤT CẢ SÁCH ==================
    let currentBookPage = 1;
    const booksPerPage = 5;

    function renderAllBooks(page = 1) {
    const tbody = document.getElementById("allBookTable");
    const pagination = document.getElementById("bookPagination");
    tbody.innerHTML = "";
    pagination.innerHTML = "";

    const totalPages = Math.ceil(sampleBooks.length / booksPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentBookPage = page;

    const start = (page - 1) * booksPerPage;
    const end = start + booksPerPage;
    const booksToShow = sampleBooks.slice(start, end);

    booksToShow.forEach(book => {
        const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${book.code}</td>
    <td>${book.name}</td>
    <td>${book.type}</td>
    <td>${book.location}</td>
    <td><button class="btn-add" onclick="addBookFromList('${book.code}')">➕ Thêm</button></td>
    `;
    tbody.appendChild(tr);
    });

    // Phân trang
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "⬅️ Trước";
    prevBtn.className = "btn btn-sm btn-outline-primary m-1";
    prevBtn.disabled = page === 1;
    prevBtn.onclick = () => renderAllBooks(page - 1);

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Sau ➡️";
    nextBtn.className = "btn btn-sm btn-outline-primary m-1";
    nextBtn.disabled = page === totalPages;
    nextBtn.onclick = () => renderAllBooks(page + 1);

    // Hiển thị số trang
    const pageInfo = document.createElement("span");
    pageInfo.textContent = `Trang ${page} / ${totalPages}`;
    pageInfo.style.margin = "0 10px";
    pageInfo.style.fontWeight = "bold";

    pagination.appendChild(prevBtn);
    pagination.appendChild(pageInfo);
    pagination.appendChild(nextBtn);
}

    // Chọn một bạn đọc từ bảng
    function selectReader(r) {
        reader = r;
    showAlert(`✅ Đã chọn bạn đọc: ${r.name}`, "success");
    }
    /* -------------------- PHÂN TRANG DANH SÁCH MƯỢN – TRẢ -------------------- */
    let currentMuonTraPage = 1;
    const muonTraPerPage = 5;

    // ✅ Hàm hiển thị danh sách mượn – trả có phân trang
    function renderMuonTra(page = 1) {
    const table = document.querySelector(".muontra-card table.muontra-table");
    if (!table) return;

    const tbody = table.querySelector("tbody");
    const pagination = document.getElementById("muonTraList");

    tbody.innerHTML = "";
    pagination.innerHTML = "";

    const totalPages = Math.ceil(muonTraList.length / muonTraPerPage);
    if (totalPages === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Không có dữ liệu mượn – trả</td></tr>`;
    return;
    }

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentMuonTraPage = page;

    const start = (page - 1) * muonTraPerPage;
    const end = start + muonTraPerPage;
    const dataToShow = muonTraList.slice(start, end);

    dataToShow.forEach((item, i) => {
        const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${start + i + 1}</td>
    <td>${item.reader}</td>
    <td>${item.book}</td>
    <td>${item.borrowDate}</td>
    <td>${item.returnDate}</td>
    <td><a href="#" class="btn btn-sm btn-warning">📚 Giữ chỗ</a></td>
    `;
    tbody.appendChild(tr);
    });

    // Nút "Trước"
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "⬅️ Trước";
    prevBtn.className = "btn btn-sm btn-outline-primary m-1";
    prevBtn.disabled = page === 1;
    prevBtn.onclick = () => renderMuonTra(page - 1);

    // Hiển thị thông tin trang
    const pageInfo = document.createElement("span");
    pageInfo.textContent = `Trang ${page} / ${totalPages}`;
    pageInfo.style.margin = "0 10px";
    pageInfo.style.fontWeight = "bold";

    // Nút "Sau"
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Sau ➡️";
    nextBtn.className = "btn btn-sm btn-outline-primary m-1";
    nextBtn.disabled = page === totalPages;
    nextBtn.onclick = () => renderMuonTra(page + 1);

    pagination.appendChild(prevBtn);
    pagination.appendChild(pageInfo);
    pagination.appendChild(nextBtn);
}

// ✅ Tự động hiển thị khi load trang
document.addEventListener("DOMContentLoaded", () => {
        renderAllReaders();
    renderAllBooks();
    renderMuonTra(); // ← thêm dòng này để danh sách mượn-trả có phân trang tự load
});


    // Tìm kiếm theo mã bạn đọc
    function searchReader() {
        const id = document.getElementById("readerId").value.trim().toUpperCase();
    const tbody = document.getElementById("readerInfoTable");
    tbody.innerHTML = "";

    if (!id) return showAlert("Vui lòng nhập mã bạn đọc!");

        const found = readers.filter(r => r.id === id);
    if (found.length === 0) return showAlert("❌ Không tìm thấy bạn đọc!");

        found.forEach((r, index) => {
            const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${r.id}</td>
    <td>${r.name}</td>
    <td>${r.location}</td>
    <td>${r.phone}</td>
    <td>${r.address}</td>
    `;
            tr.addEventListener("click", () => selectReader(r));
    tbody.appendChild(tr);
        });
    }

    // Khi load trang, hiển thị tất cả bạn đọc
    document.addEventListener("DOMContentLoaded", renderAllReaders);
    // ===== THÊM SÁCH VÀO DANH SÁCH MƯỢN =====
    window.addBookFromList = function(code) {
            if (!reader) return showAlert("⚠️ Vui lòng chọn bạn đọc trước!");
            const book = sampleBooks.find(b => b.code === code);
    if (!book) return showAlert("⚠️ Không tìm thấy sách này!");
            if (transactions.some(t => t.books.some(b => b.code === code)))
    return showAlert("⚠️ Sách này đang được mượn ở giao dịch khác!");
            if (borrowedBooks.some(b => b.code === code))
    return showAlert("⚠️ Sách này đã nằm trong danh sách mượn!");
    if (book.location !== reader.location)
    return showAlert("⚠️ Sách ở " + book.location + " — bạn đọc ở " + reader.location);
            if (borrowedBooks.length >= 5)
    return showAlert("⚠️ Mỗi bạn đọc chỉ được mượn tối đa 5 sách!");

    const borrowDate = new Date();
    const returnDate = calculateReturnDate(book.type);
    borrowedBooks.push({...book, borrowDate, returnDate, status: "Đang mượn" });
    renderTable();
    showAlert(`✅ Đã thêm "${book.name}" vào danh sách mượn!`, "success");
        };

    // ===== HIỂN THỊ THÔNG BÁO =====
    function showAlert(msg, type = "error") {
            const box = document.getElementById("alertBox");
    box.innerText = msg;
    box.className = "alert-box " + type;
    box.style.display = "block";
            setTimeout(() => box.style.display = "none", 3500);
        }

        // ===== KHỞI TẠO =====
        document.addEventListener("DOMContentLoaded", () => {
        renderAllReaders();
    renderAllBooks();
        });



    // ================== QUÉT MÃ ==================
    function simulateScan(type) {
        const scanSound = document.getElementById("scanSound");
    scanSound.play();
    const box = document.getElementById("bookCode");
    box.value = "";
    box.placeholder = type === "barcode" ? "Đang quét mã vạch..." : "Đang đọc RFID...";

        setTimeout(() => {
            const randomBook = sampleBooks[Math.floor(Math.random() * sampleBooks.length)];
    box.value = randomBook.code;
    box.placeholder = "Nhập mã / Quét mã vạch / RFID...";
    showAlert(type === "barcode" ? "📸 Quét mã vạch thành công!" : "📶 Đọc RFID thành công!", "success");
        }, 1000);
    }

    // ================== TÍNH NGÀY TRẢ ==================
    function calculateReturnDate(type) {
            const d = new Date();
    const plus = type === "Giáo trình" ? 30 : 14;
    d.setDate(d.getDate() + plus);
    return d;
        }


    // ================== THÊM SÁCH ==================
    function addBook() {
        if (!reader) return showAlert("Vui lòng nhập mã bạn đọc trước!");
    const code = document.getElementById("bookCode").value.trim().toUpperCase();
    if (!code) return showAlert("Vui lòng nhập mã sách!");

        const book = sampleBooks.find(b => b.code === code);
    if (!book) return showAlert("Không tìm thấy sách này trong hệ thống!");

        if (transactions.some(t => t.books.some(b => b.code === code)))
    return showAlert("⚠️ Sách này đang được mượn ở giao dịch khác!");
        if (borrowedBooks.some(b => b.code === code))
    return showAlert("⚠️ Sách này đã nằm trong danh sách mượn!");
    if (book.location !== reader.location)
    return showAlert("⚠️ Sách ở " + book.location + " — bạn đọc ở " + reader.location);

    const borrowDate = new Date();
    const returnDate = calculateReturnDate(book.type);

    borrowedBooks.push({...book, borrowDate, returnDate, status: "Đang mượn" });
    renderTable();
    document.getElementById("bookCode").value = "";
    showAlert("✅ Đã thêm sách vào danh sách mượn!", "success");
    }

    // ===== HIỂN THỊ DANH SÁCH MƯỢN =====
    function renderTable() {
            const tbody = document.getElementById("bookList");
    tbody.innerHTML = "";
            borrowedBooks.forEach((b, i) => {
                const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${b.code}</td>
    <td>${b.name}</td>
    <td>${b.type}</td>
    <td>${b.borrowDate.toLocaleDateString()}</td>
    <td>${b.returnDate.toLocaleDateString()}</td>
    <td>${b.status}</td>
    <td><button class="btn-remove" onclick="removeBook(${i})">Xóa</button></td>
    `;
    tbody.appendChild(tr);
            });
        }

    window.removeBook = function(index) {
        borrowedBooks.splice(index, 1);
    renderTable();
        };


    // ================== TRẢ & GIA HẠN ==================
    function returnBook(code) {
        const note = prompt("Nhập ghi chú khi trả (nếu có):", "");
        borrowedBooks = borrowedBooks.filter(b => b.code !== code);
    showAlert("📚 Đã trả sách thành công!", "success");
    if (note) console.log("Ghi chú khi trả:", note);
    renderTable();
    }

    function extendReturnDate(code, days = 7) {
        const book = borrowedBooks.find(b => b.code === code);
    if (!book) return showAlert("Không tìm thấy sách!");
    book.returnDate.setDate(new Date(book.returnDate).getDate() + days);
    renderTable();
    showAlert(`✅ Gia hạn thêm ${days} ngày cho sách ${book.name}`, "success");
    }

    /* ------------------ LƯU GIAO DỊCH ------------------ */
    function saveTransaction() {
    if (!reader) {
        showAlert("⚠️ Bạn chưa chọn bạn đọc!", "error");
    return;
    }

    if (borrowedBooks.length === 0) {
        showAlert("⚠️ Chưa có sách nào để lưu!", "error");
    return;
    }

    // Tạo giao dịch mới
    const newTransaction = {
        id: savedTransactions.length + 1,
    reader: reader,
    books: [...borrowedBooks],
    createdAt: new Date().toLocaleString()
    };

    // Thêm vào danh sách
    savedTransactions.push(newTransaction);
    renderSavedTransactions();

    // Reset tạm
    borrowedBooks = [];
    reader = null;
    renderTable();

    showAlert("💾 Đã lưu giao dịch thành công!", "success");
}


    /* ========================== DANH SÁCH GIAO DỊCH ĐÃ LƯU ========================== */
    function renderSavedTransactions() {
    const tbody = document.querySelector("#savedTransactionsTable tbody");
    tbody.innerHTML = "";

    if (savedTransactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">Chưa có giao dịch nào</td></tr>`;
    return;
    }

    savedTransactions.forEach((t, index) => {
        const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${t.reader.name}</td>
    <td>${t.books.length}</td>
    <td>${t.createdAt}</td>
    `;
    tbody.appendChild(tr);
    });
}

    // ================== IN / PHẠT / HỦY ==================
    function printReceipt() {
        if (!reader || borrowedBooks.length === 0)
    return showAlert("Không có dữ liệu để in!");

    const content = `
    <h2 style='text-align:center;'>THƯ VIỆN CÔNG NGHỆ</h2>
    <h3>🧾 Biên nhận mượn sách</h3>
    <p><b>Bạn đọc:</b> ${reader.name}</p>
    <p><b>Địa điểm:</b> ${reader.location}</p>
    <p><b>Điện thoại:</b> ${reader.phone}</p>
    <p><b>Địa chỉ:</b> ${reader.address}</p>
    <table border='1' cellspacing='0' cellpadding='8' style='width:100%; border-collapse:collapse;'>
        <tr><th>Mã</th><th>Tên sách</th><th>Ngày mượn</th><th>Ngày trả</th></tr>
        ${borrowedBooks.map(b => `
                    <tr><td>${b.code}</td><td>${b.name}</td><td>${b.borrowDate.toLocaleDateString()}</td><td>${b.returnDate.toLocaleDateString()}</td></tr>
                `).join("")}
    </table>
    <p style='margin-top:20px;'>📅 Ngày in: ${new Date().toLocaleDateString()}</p>`;

    const w = window.open('', '_blank');
    w.document.write(content);
    w.print();
    w.close();
    }

    function skipPenalty(role = "user") {
        if (role === "admin" || role === "thuthu")
    showAlert("✅ Quyền cao – được phép bỏ qua phạt!", "success");
    else showAlert("⚠️ Bạn không có quyền bỏ qua phạt!", "error");
    }

    function clearAll() {
    if (borrowedBooks.length === 0 && !reader) {
        showAlert("⚠️ Không có gì để hủy!", "error");
    return;
    }

    if (!confirm("Bạn có chắc muốn hủy giao dịch hiện tại?")) return;

    borrowedBooks = [];
    reader = null;
    renderTable();
    showAlert("🗑️ Đã hủy giao dịch hiện tại!", "success");
}


    // ================== KIỂM TRA HỢP LỆ ==================
    function validateTransaction() {
        if (!reader) {
        showAlert("⚠️ Bạn chưa chọn bạn đọc!");
    return false;
        }
    if (borrowedBooks.length === 0) {
        showAlert("⚠️ Chưa có sách nào trong danh sách mượn!");
    return false;
        }
        if (borrowedBooks.length > 5) {
        showAlert("⚠️ Mỗi bạn đọc chỉ được mượn tối đa 5 sách!", "error");
    return false;
        }
        const codes = borrowedBooks.map(b => b.code);
        const duplicates = codes.filter((c, i) => codes.indexOf(c) !== i);
        if (duplicates.length > 0) {
        showAlert("⚠️ Có sách bị trùng mã trong danh sách!", "error");
    return false;
        }
    for (let b of borrowedBooks) {
            if (b.returnDate < b.borrowDate) {
        showAlert(`⚠️ Ngày trả của sách ${b.name} không hợp lệ!`);
    return false;
            }
    if (b.location !== reader.location) {
        showAlert(`⚠️ Sách ${b.name} ở ${b.location}, không cùng kho với bạn đọc (${reader.location})!`);
    return false;
            }
        }
    return true;
    }
    // 🧨 Hủy yêu cầu mượn
    function cancelBorrowRequest() {
            if (borrowedBooks.length === 0)
    return showAlert("❌ Không có yêu cầu mượn nào để hủy!");
    if (!confirm("Bạn có chắc muốn hủy yêu cầu mượn hiện tại không?")) return;

    borrowedBooks = [];
    renderTable();
    showAlert("🗑️ Đã hủy toàn bộ yêu cầu mượn!", "success");
        }

    // 🔄 Hủy yêu cầu gia hạn
    function cancelExtension() {
            if (borrowedBooks.length === 0)
    return showAlert("⚠️ Chưa có sách nào đang được gia hạn!");
    if (!confirm("Bạn có chắc muốn hủy gia hạn các sách này?")) return;

            borrowedBooks.forEach(b => {
        b.returnDate.setDate(new Date().getDate() + 14); // đặt lại hạn mặc định
            });
    renderTable();
    showAlert("↩️ Đã hủy yêu cầu gia hạn và khôi phục hạn mặc định!", "success");
        }

    // 🚫 Khóa thẻ bạn đọc
    function lockCard() {
            if (!reader) return showAlert("⚠️ Chưa chọn bạn đọc!");
    if (!confirm(`Khóa thẻ của ${reader.name}?`)) return;

    reader.isLocked = true;
    showAlert(`🔒 Thẻ bạn đọc ${reader.name} đã bị khóa!`, "error");
    document.getElementById("readerInfo").innerHTML += `<p style='color:red'><strong>⚠️ Thẻ đang bị khóa!</strong></p>`;
        }

    // 🗓️ Xem lịch thư viện
    function showLibrarySchedule() {
            const box = document.getElementById("librarySchedule");
    box.style.display = box.style.display === "none" ? "block" : "none";
        }
    document.addEventListener("DOMContentLoaded", () => {
    const btnSave = document.getElementById("btnSave");
    const btnClear = document.getElementById("btnClear");

    if (btnSave) btnSave.addEventListener("click", saveTransaction);
    if (btnClear) btnClear.addEventListener("click", clearAll);

    renderSavedTransactions();
});

    function confirmHold(tenSach) {
            const confirmMsg = `📚 Bạn có muốn giữ chỗ cho cuốn "${tenSach}" không?`;
    if (confirm(confirmMsg)) {
        // Nếu người dùng bấm "OK" thì chuyển đến trang giữ chỗ
        window.location.href = `/GiuCho/Index?tenSach=${encodeURIComponent(tenSach)}`;
            }
        }
            document.querySelectorAll(".main-tabs li").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".main-tabs li").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    function toggleSchedule() {
        const box = document.getElementById("librarySchedule");
    box.style.display = (box.style.display === "none" || !box.style.display) ? "block" : "none";
    }

    function renderCards() {
      const tbody = document.getElementById("cardBody");
    tbody.innerHTML = "";
      cardList.forEach((c, i) => {
        tbody.innerHTML += `
          <tr>
            <td>${i + 1}</td>
            <td>${c.code}</td>
            <td>${c.name}</td>
            <td>${c.issue}</td>
            <td>${c.expiry}</td>
            <td>${statusBadge(c.status)}</td>
            <td>
              <button class="btn btn-warning" onclick="lockCard(${i})">🔒 Khóa</button>
              <button class="btn btn-info" onclick="renewCard(${i})">🔄 Gia hạn</button>
            </td>
          </tr>`;
      });
    updateStats();
    }

    function statusBadge(status) {
      if (status === "Hoạt động") return `<span style="color:green;font-weight:bold;">✅ ${status}</span>`;
    if (status === "Bị khóa") return `<span style="color:red;font-weight:bold;">🔒 ${status}</span>`;
    if (status === "Hết hạn") return `<span style="color:#f97316;font-weight:bold;">⚠️ ${status}</span>`;
    return status;
    }

    // ==== Render yêu cầu thẻ ====
    function renderRequests() {
      const tbody = document.getElementById("requestBody");
    tbody.innerHTML = "";
      requestList.forEach(r => {
        tbody.innerHTML += `
          <tr>
            <td>${r.id}</td>
            <td>${r.reader}</td>
            <td>${r.type}</td>
            <td>${r.date}</td>
            <td>${r.status}</td>
            <td>
              ${r.status === "Chờ duyệt" ? `
                <button class="btn btn-info" onclick="approveRequest('${r.id}')">✅ Duyệt</button>
                <button class="btn btn-danger" onclick="rejectRequest('${r.id}')">❌ Từ chối</button>` : `--`}
            </td>
          </tr>`;
      });
    }

    // ==== Hành động ====
    function lockCard(index) {
        cardList[index].status = "Bị khóa";
    renderCards();
    alert("🔒 Đã khóa thẻ bạn đọc!");
    }

    function renewCard(index) {
      const oldDate = new Date(cardList[index].expiry);
    oldDate.setFullYear(oldDate.getFullYear() + 1);
    cardList[index].expiry = oldDate.toISOString().split("T")[0];
    cardList[index].status = "Hoạt động";
    renderCards();
    alert("🔄 Gia hạn thẻ thành công!");
    }

    function approveRequest(id) {
      const r = requestList.find(x => x.id === id);
    r.status = "Đã duyệt";
    renderRequests();
    alert(`✅ Đã duyệt yêu cầu ${id}`);
    }

    function rejectRequest(id) {
      const r = requestList.find(x => x.id === id);
    r.status = "Từ chối";
    renderRequests();
    alert(`❌ Đã từ chối yêu cầu ${id}`);
    }

    function toggleSchedule() {
      const box = document.getElementById("librarySchedule");
    box.style.display = box.style.display === "none" ? "block" : "none";
    }

    function filterCards() {
      const input = document.getElementById("searchCard").value.toLowerCase();
    const rows = document.querySelectorAll("#cardBody tr");
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
      });
    }

    // ==== Thống kê ====
    function updateStats() {
      const active = cardList.filter(c => c.status === "Hoạt động").length;
      const locked = cardList.filter(c => c.status === "Bị khóa").length;
      const pending = requestList.filter(r => r.status === "Chờ duyệt").length;
      const expiry = cardList.map(c => new Date(c.expiry)).sort((a,b)=>a-b)[0];
    document.getElementById("stat-active").textContent = active;
    document.getElementById("stat-locked").textContent = locked;
    document.getElementById("stat-pending").textContent = pending;
    document.getElementById("stat-expiry").textContent = expiry ? expiry.toISOString().split("T")[0] : "--";
    }

    // ==== Khởi tạo ====
    document.addEventListener("DOMContentLoaded", () => {
        renderCards();
    renderRequests();
    });

    function savePolicy() {
        const group = policyGroup.value, type = policyType.value,
    days = policyDays.value, limit = policyLimit.value;
    if (!group || !type || !days || !limit) return alert("Vui lòng nhập đủ thông tin.");
    localStorage.setItem("policy", JSON.stringify({group, type, days, limit}));
    policySummary.innerHTML = `✅ Chính sách: <b>${group}</b> - ${type}, <b>${days}</b> ngày, tối đa <b>${limit}</b> cuốn.`;
      }

    function saveFineRule() {
        const fine = finePerDay.value, max = fineMax.value, discount = fineDiscountGroup.value;
    localStorage.setItem("fine", JSON.stringify({fine, max, discount}));
    fineSummary.innerHTML = `💰 Phạt: ${fine}đ/ngày, tối đa ${max}đ. Giảm cho: ${discount || 'Không có'}.`;
      }

    function saveSchedule() {
        const open = openTime.value, close = closeTime.value, off = Array.from(offDays.selectedOptions).map(o=>o.value);
    localStorage.setItem("schedule", JSON.stringify({open, close, off}));
    scheduleSummary.innerHTML = `🕒 ${open} - ${close}, nghỉ: ${off.join(", ")}`;
      }

    function kiemTraHopLe() {
        const reader = checkReader.value, book = checkBookCode.value.trim();
    if (!reader || !book) return alert("Vui lòng chọn bạn đọc và nhập mã sách.");
    checkResult.style.display = "block";
    checkResult.innerHTML = `✅ Giao dịch hợp lệ cho bạn đọc <b>${reader}</b> với sách <b>${book}</b>.`;
      }

    function exportConfig() {
        const data = {
        policy: JSON.parse(localStorage.getItem("policy") || "{ }"),
    fine: JSON.parse(localStorage.getItem("fine") || "{ }"),
    schedule: JSON.parse(localStorage.getItem("schedule") || "{ }"),
        };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "config.json"; a.click();
    configSummary.innerHTML = "💾 Đã xuất file cấu hình.";
      }

    function importConfig(input) {
        const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
        reader.onload = e => {
          const data = JSON.parse(e.target.result);
    localStorage.setItem("policy", JSON.stringify(data.policy || { }));
    localStorage.setItem("fine", JSON.stringify(data.fine || { }));
    localStorage.setItem("schedule", JSON.stringify(data.schedule || { }));
    configSummary.innerHTML = "📥 Đã nhập cấu hình thành công.";
        };
    reader.readAsText(file);
}
function showMuonTraAlert(message, type = "success") {
    const alertBox = document.getElementById("muontraAlert");
    alertBox.textContent = message;
    alertBox.className = `muontra-alert show ${type}`;
    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 3000);
}


// =============================
// 📑 SCRIPT CHUYỂN TAB CHÍNH
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".main-tabs li");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Bỏ active khỏi tất cả tab
            tabs.forEach(t => t.classList.remove("active"));
            // Gắn active cho tab được chọn
            tab.classList.add("active");

            // Ẩn tất cả nội dung
            contents.forEach(c => c.classList.remove("active"));

            // Lấy id của nội dung cần hiển thị
            const targetId = tab.getAttribute("data-tab");
            const target = document.getElementById(targetId);
            if (target) target.classList.add("active");
        });
    });
});