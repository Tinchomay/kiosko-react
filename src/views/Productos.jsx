import ProductoDisponible from "../components/ProductoDisponible"
import clienteAxios from "../utilities/axios"
import useSWR from "swr"

export default function Productos() {
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/productos/all', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then( (data) => data.data)
  const { data, error, isLoading } = useSWR('/api/productos/all', fetcher, {
    refreshInterval: 1000
  })
  const productos = data?.data
  if(isLoading) return 'Cargando...'
  return (
    <div className="p-6">
        <h1 className="text-4xl font-black text-center">Productos</h1>
        <p className="text-2xl my-6 text-center">Maneja la disponibilidad desde aqui</p>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {productos.map(producto => (
                <ProductoDisponible
                  producto={producto}
                  key={producto.id}
                  >
                </ProductoDisponible>
            ))}
        </div>
    </div>
  )
}
