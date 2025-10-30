namespace ThuVienSo.Models
{
    public class MuonTra
    {
        public int Id { get; set; }
        public string MaPhieuMuon { get; set; }
        public string LoaiMuon { get; set; }
        public int SoLuong { get; set; }
        public DateTime NgayMuon { get; set; }
        public DateTime? NgayTra { get; set; }
        public string TinhTrang { get; set; }
        public string NguoiDuyet { get; set; }

        // Thêm trường phụ nếu View cần (ví dụ tên bạn đọc / tên sách)
        public string TenBanDoc { get; set; }
        public string TenSach { get; set; }
    }
    public class BanDoc
    {
        public int Id { get; set; }
        public string TenBanDoc { get; set; }
        public string Lop { get; set; }
        public string Email { get; set; }
        public string DiaChi { get; set; }
        public string SoDienThoai { get; set; }
    }

    public class TaiLieu
    {
        public int Id { get; set; }
        public string TenTaiLieu { get; set; }
        public string TacGia { get; set; }
        public string TheLoai { get; set; }
        public int NamXuatBan { get; set; }
    }
    public class GiuCho
    {
        public string MaSach { get; set; }
        public string TenSach { get; set; }
        public string MaBanDoc { get; set; }
        public string TenBanDoc { get; set; }
        public DateTime NgayGiu { get; set; }
        public DateTime HanGiu { get; set; }
        public string TrangThai { get; set; }
    }
}
