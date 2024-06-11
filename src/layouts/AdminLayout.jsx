import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import { useAuth } from "../hooks/useAuth"


export default function AdminLayout() {
  
  useAuth({middleware: 'admin'})

  return (
    <main>
        <div className='principal px-4 gap-2'>
          <AdminSidebar />
          {/* Como los otros dos components ya tiene tamaños especificos asignamos el resto a este */}
          <main className='flex-1 overflow-y-scroll h-screen bg-gray-100 p-2 esconder' >
              {/* Outlet sirve para agregar elementos como hijos a los layouts en el route*/}
              <Outlet />
          </main>
        </div>
    </main>
  )
}
