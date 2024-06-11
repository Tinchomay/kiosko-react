import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function AdminSidebar() {

    const {logout} = useAuth({middleware : 'auth'})
    function validarRuta(textoFinal) {
        const rutaActual = window.location.pathname;
        const expresionRegular = new RegExp(textoFinal + "$");
      
        return expresionRegular.test(rutaActual);
      }
      // Ejemplo de uso
  return (
    <aside className="rem18 md:h-screen flex flex-col justify-between">
        <div>
            <img 
                className="p-4" 
                src="/img/logo.svg" 
                alt="Logo kiosko" 
            />
            <nav className="flex flex-col p-4">
                <Link to={'/admin'} className={`w-full p-3 font-bold text-2xl hover:bg-amber-400 ${validarRuta('/admin') ? 'bg-amber-400' : ''}`}>Ordenes</Link>
                <Link to={'/admin/productos'} className={`w-full p-3 font-bold text-2xl hover:bg-amber-400 ${validarRuta('/admin/productos') ? 'bg-amber-400' : ''}`}>Productos</Link>
            </nav>
        </div>
        <div className="mb-10 px-5">
            <button
                type="button"
                className="text-center bg-red-500 w-full text-white p-3 font-bold truncate"
                onClick={() => logout()}
            >
                Cerrar Sesion
            </button>
        </div>
    </aside>
  )
}