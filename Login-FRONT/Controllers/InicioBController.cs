using Microsoft.AspNetCore.Mvc;

namespace Front_template.Controllers
{
    public class InicioBController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}

        //public ActionResult Index(string rutUsuario, string usrUsuario, string uxsUsuario, string nomUsuario, string tokUsuario)
        //{
        //    ViewBag.rutUsuario = rutUsuario;
        //    ViewBag.usrUsuario = usrUsuario;
        //    ViewBag.uxsUsuario = uxsUsuario;

        //    string[] nombreDes = nomUsuario.Split(' ');

        //    ViewBag.nomUsuario = nombreDes[0] + ' ' + nombreDes[nombreDes.Length - 2];
        //    ViewBag.tokUsuario = tokUsuario;

        //    //ViewBag.fotoUsuario = "https://sitios.cygnus-est.cl/FOTOS_PERSONAL/" + rutUsuario.Trim() + ".jpg";
        //    return View();
        //}

        public ActionResult Index( string usrUsuario, string nomUsuario)
        {
            
            ViewBag.usrUsuario = usrUsuario;
 
            string[] nombreDes = nomUsuario.Split(' ');

            ViewBag.nomUsuario = nombreDes[0] + ' ' + nombreDes[nombreDes.Length - 2];

            return View();
        }
    }
}
