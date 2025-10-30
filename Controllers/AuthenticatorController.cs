using Microsoft.AspNetCore.Mvc;

namespace ThuVienSo.Controllers
{
    public class AuthenticatorController : Controller
    {
        public IActionResult login()
        {
            return View();
        }
        public IActionResult register()
        {
            return View();
        }
    }
}
