import useSWR from "swr"
import clienteAxios from "../utilities/axios"
import { formatearDinero } from "../helpers"
import useKiosko from "../hooks/useKiosko"

export default function Ordenes() {

    const {handleClickCompletarPedido} = useKiosko();

    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const {data, error, isLoading} = useSWR('/api/pedidos', fetcher, {
        refreshInterval: 1000
    })
    if(isLoading) return 'Cargando...'
  return (
    <div className="p-6">
        <h1 className="text-4xl font-black text-center">Ordenes</h1>
        <p className="text-2xl my-6 text-center">Administra las ordenes desde aquí</p>
        <div className="grid grid-cols-3 gap-4">
            {data.data.map( pedido => (
                <div key={pedido.id} className="bg-white shadow border-b p-5 flex flex-col justify-between">
                    <div>
                        <p className="text-xl font-bold text-slate-600">Contenido del pedido: </p>
                        {pedido.productos.map(producto => (
                            <div key={producto.id}
                                className=" border-b-slate-200 last-of-type:border-none py-2"
                            >
                                <p className="text-sm">ID: {producto.id}</p>
                                <p >{producto.nombre}</p>
                                <p>Cantidad: <span className="font-bold">{producto.pivot.cantidad}</span></p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className="text-lg font-bold text-slate-600 mt-6">Cliente: <span className="font-normal">{pedido.user.name}</span></p>
                        <p className="text-lg font-bold text-amber-600">Total a pagar: <span className="font-normal text-slate-600">{formatearDinero(pedido.total)}</span></p>
                        <button 
                            type="button"
                            className="bg-amber-600 hover:bg-amber-800 px-5 py-2 rounded uppercase font-bold text-white w-full cursor-pointer mt-4"
                            onClick={ () => {
                                handleClickCompletarPedido(pedido.id)
                            }}
                            >
                                Enviar pedido
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
