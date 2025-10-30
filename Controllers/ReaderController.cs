using Microsoft.AspNetCore.Mvc;

namespace ThuVienSo.Controllers
{
    public class ReaderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ReaderDetail()
        {
            return View();
        }
    }
}
