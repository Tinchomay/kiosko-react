import useKiosko from "../hooks/useKiosko"
import ResumenProducto from "./ResumenProducto";
import { formatearDinero } from "../helpers";
import { useAuth } from "../hooks/useAuth";


export default function Resumen() {
  const {pedido, total, handleSubmitNuevaOrden } = useKiosko();
  const comprobarPedido = () => pedido.length === 0;

  const {logout} = useAuth({});
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitNuevaOrden(logout);
  }

  return (
    <aside className="rem18 h-screen overflow-y-scroll p-5 bar text-center">
      <h1 className="text-4xl font-black">Mi pedido</h1>
      <p className="text-lg my-5">Aqui podras ver el resumen de tu pedido</p>
      <div className="py-8">
        {pedido.length === 0 ?( 
          <p className="text-2xl">Pedido vacio 🥺</p>
        ) : (
          pedido.map(producto => (
            <ResumenProducto 
              producto={producto}
              key={producto.id}
            >
            </ResumenProducto>
          ))
        )}
      </div>
      <p className="text-xl mt-8">Total: {formatearDinero(total)}</p>
      <form 
        className="w-full"
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input 
            type="submit"
            className={`${comprobarPedido() ? 'bg-indigo-100' :'bg-indigo-600 hover:bg-indigo-800'} px-5 py-2 rounded uppercase font-bold text-white w-full cursor-pointer`}
            value="Enviar Pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  )
}
