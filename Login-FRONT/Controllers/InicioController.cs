using Microsoft.AspNetCore.Mvc;

namespace Super_prueba_2.Controllers
{
    public class InicioController : Controller
    {
        public ActionResult Index(string rutUsuario, string usrUsuario, string uxsUsuario, string nomUsuario, string tokUsuario)
        {
            ViewBag.rutUsuario = rutUsuario;
            ViewBag.usrUsuario = usrUsuario;
            ViewBag.uxsUsuario = uxsUsuario;

            string[] nombreDes = nomUsuario.Split(' ');

            ViewBag.nomUsuario = nombreDes[0] + ' ' + nombreDes[nombreDes.Length - 2];
            ViewBag.tokUsuario = tokUsuario;

            ViewBag.fotoUsuario = "https://sitios.cygnus-est.cl/FOTOS_PERSONAL/" + rutUsuario.Trim() + ".jpg";
            return View();
        }
    }
}
