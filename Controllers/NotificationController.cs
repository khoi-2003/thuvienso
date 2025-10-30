using Microsoft.AspNetCore.Mvc;

namespace ThuVienSo.Controllers
{
    public class NotificationController : Controller
    {
        private readonly ILogger<NotificationController> _logger;

        public NotificationController(ILogger<NotificationController> logger)
        {
            _logger = logger;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
