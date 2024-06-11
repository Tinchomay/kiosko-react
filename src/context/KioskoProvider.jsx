//Tenemos que importar el createContext de reac para poder crearlo
//Añadimos useState
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../utilities/axios";

//Creamos una variable donde le asiganmos la funcion para crearContext
const KioskoContext = createContext();

//Toma un prop especial llamado children que tiene que ir como objeto
const KioskoProvider = ({children}) => {
    //Lo que queremos retornar pueden ser variables o funciones a los hijos una vez que los llamemos

    //Creando states
    //Al utilizar useState en la parte antes del igual, vamos a utilizar array destructuring, y nos va a retornar dos valores, el primero sera el state y el segundo una funcion que pueda cambiar ese estado, en el segundo se pone set y el nombre del state; en la parte despues del signo igual designamos el valor inicial del state
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios.post('/api/pedidos', {
                total,
                productos: pedido.map( producto => {
                    return {
                        id : producto.id,
                        cantidad : producto.cantidad
                    }
                })
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message, {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                pauseOnHover: false
            })
            setTimeout(() => {
                setPedido([])
            }, 1000);
            setTimeout(() => {
                logout();
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //Reduce recibe una funcion acumuladora, total es el valor actual, que el valor inicial es el 0 que esta al final, y el segundo parametro es el acumulador, lo que se sumara al total
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido]);

    //Obtenemos las categorias de la api
    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            //Aplicamos destructuring a data que ahi viene los datos de axios
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            //Seteamos las categorias y pasamos data.data porque es el array donde vienen los valores de laravel
            setCategorias(data.data)
            //Seteamos la categoria actial, recordar poner un objeto como state inicial a la categoria actual
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    //Usamos use effect para que se obtengan cada vez que este listo el componente
    useEffect(() => {
        obtenerCategorias()
    }, []);

    const handleClickCompletarPedido = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            //Le ponemos null porque aqui no vamos a actualizar los campos si no en el servidor, tiene que ser con el meotodo put para actualizar
            const data = await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }

    }

    const handleClickDisponibleAgotado = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            //Le ponemos null porque aqui no vamos a actualizar los campos si no en el servidor, tiene que ser con el meotodo put para actualizar
            const {data, mutate} = await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await mutate();
        } catch (error) {
            console.log(error)
        }

    }

    //Para definir esta funcion utilizamos la convencion de handle para clicks o submit, luego el evento y luego que cambiara 
    const handleClickCategoria = (id) => {
        //Esto retorna un array con un objeto, accedemos a su primer valor para que nos de el objeto
        const categoria = categorias.filter((categoria) => categoria.id === id)[0]
        //Nunca debemos de cambiar el state actual directamente, siempre debemos de utilizar la funcion para modificar. Utilizamos la funcion que definimos y le pasamos el nuevo valor que tiene que ser identido en el tipo de datos
        setCategoriaActual(categoria);
    }
    //Esta funcion sera reutilizable para mostrar y ocultar el modal porque negara el estado del modal
    const handleClickModal = () => {
        setModal(!modal);
    }
    const handleSetProducto = (producto) => {
        setProducto(producto);
    }
    const handleDeleteProducto = (id) => {
        const nuevoPedido = pedido.filter( (pedidoState) => pedidoState.id !== id)
        console.log(nuevoPedido);
        setPedido(nuevoPedido);
        toast.error('Producto Eliminado', {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
            pauseOnHover: false
            });
    }
    //Podemos eliminar ciertos atributos del producto aplicando destructuring y tomando una copia del producto
    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        //Aqui comprobamos si ya existe el pedido
        if(pedido.some( pedidoState => pedidoState.id === producto.id)) {
            //Aqui creamos un nuevo array iterando en el pedido y cuando identifiquemos el producto que ya esta pedidos lo cambiamos por el nuevo producto que se esta mandando
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado);
            toast.success('Producto Actualizado', {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
                pauseOnHover: false
                });
        } else {
            //Utilizamos el spread operator con llaves con corchetes porque los productos son un array
            setPedido([...pedido, producto])
            toast.success('Producto Agregado', {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
                pauseOnHover: false
            });
        }
    }

    return (
        <KioskoContext.Provider
            //Este componente emite valores por medio de JS, la primer llave es para indicar que es contenido de JS y el segundo que estamos pasando un objeto
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleDeleteProducto,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickDisponibleAgotado
            }}
        >{children}</KioskoContext.Provider>
    )
};

//KioskoProvider se importara como un componente normal
//Este es el componente proveedor y se utiliza para para envolver otros componentes y darles acceso al context
export {
    KioskoProvider
}
//Kiosko context sera el componente por default de todo el modulo, es el contexto y es el que tiene la informacion
export default KioskoContext