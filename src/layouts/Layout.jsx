//Outlet es un componente que nos permite añadir otros componentes a los layouts
import { Outlet } from 'react-router-dom'

//modal
import ReactModal from 'react-modal'

//Contenedor para la alerta
import { ToastContainer } from 'react-toastify'
//Estilos
import "react-toastify/dist/ReactToastify.css"

import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import useKiosko from '../hooks/useKiosko'
import ModalProducto from '../components/ModalProducto'

//Validando sesion
import { useAuth } from '../hooks/useAuth'


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay :{
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  }
};

//Agregamos el modal al root
ReactModal.setAppElement('#root');

export default function Layout() {
  const {modal, producto} = useKiosko();

  const {user, error} = useAuth({
    middleware: 'auth'
  })

  return (
    <>
      {/* //Agregamos el componente Outlet para que se le puedan agregar los hijos en el router */}
      <div className='principal px-4 gap-2'>
          <Sidebar />
          {/* Como los otros dos components ya tiene tamaños especificos asignamos el resto a este */}
          <main className='flex-1 overflow-y-scroll h-screen bg-gray-100 p-2 esconder' >
              {/* Outlet sirve para agregar elementos como hijos a los layouts en el route*/}
              <Outlet />
          </main>
          <Resumen />
      </div>
      {/* isOpen es para saber cuando se mostrara */}
      <ReactModal isOpen={modal} style={customStyles}>
        <ModalProducto>
        </ModalProducto>
      </ReactModal>

      {/* Aqui se va a renderizar pero falta mandarlo a llamar */}
      <ToastContainer />
    </>
  )
}
