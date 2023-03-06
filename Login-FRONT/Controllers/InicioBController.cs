using Microsoft.AspNetCore.Mvc;

namespace Front_template.Controllers
{
    public class InicioBController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
