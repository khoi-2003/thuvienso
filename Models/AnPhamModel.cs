namespace ThuVienSo.Models
{
    public class AnPham
    {
        public string MaAnPham { get; set; }  // VD: AP001
        public string MaSach { get; set; }    // VD: S001
        public string TenSach { get; set; }
        public string TinhTrang { get; set; } // Có sẵn / Đang mượn
    }
}
