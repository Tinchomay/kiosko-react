import { formatearDinero } from "../helpers"
import useKiosko from "../hooks/useKiosko"

export default function ProductoDisponible({producto}) {
    const {nombre, precio, imagen, categoria_id, id} = producto;
    const {handleClickModal, handleSetProducto, handleClickDisponibleAgotado} = useKiosko();
  return (
    <div className="border p-3 shadow bg-white flex flex-col justify-between items-center">
        <div>
            <img 
                src={`/img/${imagen}.jpg`} 
                alt={`Imagen ${nombre}`} 
            />
            <h3 className="text-2xl font-bold">{nombre}</h3>
        </div>
        <div className="pt-4 pb-2 w-full">
            <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>
            {producto.disponible ? (
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white text-center w-full mt-4 p-3 uppercase font-bold"
                    onClick={() => {
                        handleClickDisponibleAgotado(producto.id)
                    }
                    }
                >
                    Disponible
                </button>
            ) : (
                <button
                    type="button"
                    className="bg-amber-600 hover:bg-ambeEr-800 text-white text-center w-full mt-4 p-3 uppercase font-bold"
                    onClick={() => {
                        handleClickDisponibleAgotado(producto.id)
                    }
                    }
                >
                    Agotado
                </button>
            )}
        </div>
    </div>
  )
}
