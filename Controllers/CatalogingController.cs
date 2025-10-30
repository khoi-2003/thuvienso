using Microsoft.AspNetCore.Mvc;

namespace ThuVienSo.Controllers
{
    public class CatalogingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Dictionary()
        {
            return View();
        }
    }
}
