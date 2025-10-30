using Microsoft.AspNetCore.Mvc;

namespace ThuVienSo.Controllers
{
    public class AcquisitionsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
