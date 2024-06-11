import useKiosko from "../hooks/useKiosko";
import { formatearDinero } from "../helpers";
//Utilizaremos un state local
import { useState, useEffect } from "react";

export default function ModalProducto() {
    const {handleClickModal, producto, handleAgregarPedido, pedido} = useKiosko();
    const {imagen, nombre, precio} = producto;

    //Creamos el state con default de 1 que sera una pieza
    const [cantidad, setCantidad] = useState(1);
    //Este state va a ser para modificar el boton
    const [edicion, setEdicion] = useState(false)

    //Este hook se ejecuta una vez que el componente esta renderizado, y en la parte de abajo en el corchete podemos agregar dependecias y se ejecuta cuando hay cambios en esas dependecias
    useEffect(() => {
        //Aqui comprobamos con some si existe el id de este producto en pedidos
      if(pedido.some( pedidoState => pedidoState.id === producto.id)) {
        //Si existe vamos a guardar ese objeto aqui para poder accerder a su cantidad
        const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0]
        //Seteamos la cantidad del producto en el pedido para simular que lo estamos editando
        setCantidad(productoEdicion.cantidad)
        //Cambiamos el valor de ediicion para cambiar la apariencia del modal
        setEdicion(true);
      } 
      //Aqui se ejecuta el codigo de arriba cuando sufren cambios estas dependencias
    }, [pedido])
    
  return (
    <div className="md:flex gap-8">
        <div className="md:w-1/3">
            <img 
                src={`/img/${imagen}.jpg`} 
                alt={`Imagen ${nombre}`} 
            />
        </div>
        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button
                type="button"
                onClick={handleClickModal}
                ><svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>              
                </button>
            </div>
            <h1 className="text-3xl font-bold mt-5">
                {nombre}
            </h1>
            <p className="mt-5 font-black text-5xl text-amber-500">
                {formatearDinero(precio)}
            </p>
            <div className="flex gap-4 mt-5 items-center">
                <button
                    type="button"
                    onClick={() => {
                        if(cantidad > 1) {
                            setCantidad(cantidad - 1);
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
                <p className=" bg-slate-100 px-4 shadow text-3xl">
                    {cantidad}
                </p>
                <button
                    type="button"
                    onClick={() => {
                        if(cantidad < 5) {
                            setCantidad(cantidad + 1);
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
            <div className="mt-2">
                {cantidad == 5 ? 'Maximo 5 productos' : ''}
            </div>
            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
                //Utilizamos el spread operator para agrgar la cantidad al producto y enviarla a la funcion
                onClick={() => {
                    handleAgregarPedido({...producto, cantidad});
                    handleClickModal();
                }}
            >
                {edicion ? 'Guardar Cambios' : 'Añadir al Pedido'}
            </button>
        </div>
    </div> 
  )
}
