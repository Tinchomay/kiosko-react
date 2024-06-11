import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Registro from './views/Registro';
import AdminLayout from './layouts/AdminLayout';
import Ordenes from './views/Ordenes';
import Redi from './components/Redi';
import Productos from './views/Productos';

//Aqui van nuestras rutas
const router = createBrowserRouter([
    //Van en un objeto con las rutas
    {
        //Ruta
        path: '/',
        //Aqui van los componentes, la ventaja es que podemos añadir layouts que luego podemos reutilizar.
        //Para agregar un Layout lo hacemos de esta manera <Nombre />
        element: <Layout />,
        //Van a ser los hijos del layout y como pueden ser varios elementos, sera un arreglo
        children: [
            {
                //Require index para react lo pueda identificar facilmente, es conveniente solo cuando se va a utilizar un layout una vez.
                index: true,
                //Añadimos el componente
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children : [
            {
                index: true,
                element: <Redi />
            },
            {
                //Otra opcion es quitando el index y agregar un path con la direccion que reutilizara el layout padre y agregarle un componente a esa ruta en especifico
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
            
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            }
        ]
    }
]);

//Esto es para exportar el router al archivo principal que es el main
export default router