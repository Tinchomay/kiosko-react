import Producto from "../components/Producto"
//importamos el hook que contiene el context
import clienteAxios from "../utilities/axios";
import useSWR from "swr";
import useKiosko from "../hooks/useKiosko"

export default function Inicio() {
  //Utilizamos la funcion de useKiosko y aplicamos destructuring, la variable tiene que tener el mismo nombre que la llave en el context para que funcione
  const {categoriaActual} = useKiosko();
  const token = localStorage.getItem('AUTH_TOKEN')
  //Aqui retornamos al fetcher los productos que se obtiene de esta peticion
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }).then( (data) => data.data)
  //Obteniendo los productos con swr, este nos da 3 valores, los datos, el primero son los datos, el segundo si hubo un error, y el otro si esta cargando la informacion
  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  })
  //Mostrando un mensaje si esta cargando
  if(isLoading) return 'Cargando...'
  
  //Aqui es dos veces data porque accedemos al data de axios que nos brinda swr
  const productos = data.data.filter( (producto) => producto.categoria_id === categoriaActual.id)
  return (
    <>
        <h1 className="text-4xl font-black text-center">{categoriaActual.nombre}</h1>
        <p className="text-2xl my-6 text-center">Elige y personaliza tu pedido a continuacion</p>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {productos.map(producto => (
                <Producto
                    producto={producto}
                    key={producto.id}
                />
            ))}
        </div>
    </>
  )
}
