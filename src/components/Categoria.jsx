import useKiosko from "../hooks/useKiosko"

//Aqui nombramos el atributo como props, se pasan como objeto, por lo que si queremos acceder al array tendriq que ser props.categoria, mejor aplicar destructuring
export default function Categoria({categoria}) {
    const { handleClickCategoria, categoriaActual } = useKiosko()
    const {icono, nombre, id } = categoria
  return (
    <button className={`flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer ${categoriaActual.id === id ? 'bg-amber-400' : 'bg-white'}`}
    type="button"
    //Utilizamos un arrow para pasar parametros
    onClick={() => handleClickCategoria(id)}
    >
        {/* Aqui agregamos un template string como se hace en JS normalmente */}
        <img src={`/img/icono_${icono}.svg`} alt={`Imagen Icono ${icono}`} className="w-12"/>
        {/* Si queremos que tenga eventos tenemos que cambiarlo a un button */}
        <p 
        className="text-lg font-bold truncate cursor-pointer"
        >{nombre}
        </p>
    </button>
  )
}
