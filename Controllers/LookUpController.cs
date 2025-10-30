using Microsoft.AspNetCore.Mvc;

namespace ThuVienSo.Controllers
{
    public class LookUpController : Controller
    {
        private readonly ILogger<LookUpController> _logger;

        public LookUpController(ILogger<LookUpController> logger)
        {
            _logger = logger;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Collection()
        {
            return View();
        }
    }
}
