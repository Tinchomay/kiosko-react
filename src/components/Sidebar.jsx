import useKiosko from "../hooks/useKiosko"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth";



export default function Sidebar() {

    const  { logout, user } = useAuth({middleware: 'auth'});
    const {categorias} = useKiosko();

  return (
    <aside className="rem18">
        <div className="p-4">
            <img
            //Aqui no lleva los dos puntos porque no tiene subdominios
             src="img/logo.svg" 
             alt="Imagen Logo" />
        </div>
        <div>
            {/* Utilizamos el ? porque no estara disponible en primera instancia */}
            <p className="text-center text-2xl mt-4">Hola <span className="font-bold text-violet-600">{user?.name}</span></p>
        </div>
        <div className="mt-8">
            {/* Aqui insertamos codigo js con llaves */}
            {/* Tambien en lugar de tener llaves en el arrow tenemos parentesis porque queremos retornar contenido como return que esta arriba, esto es codigo de react */}
            {categorias.map( categoria => (
                    //Los props son argumentos que se pasan entre componentes, se recomienda nombrarlos de la misma manera que el valor
                    <Categoria
                        //Podemos pasar cualquier tipo de valor. aqui estamos pasando JS
                        categoria={categoria}
                        //Tenemos que pasarle un id unico a los props
                        key={categoria.id}
                    />
            ))}
        </div>

        <div className="my-5 px-5">
            <button
                type="button"
                className="text-center bg-red-500 w-full text-white p-3 font-bold truncate"
                onClick={() => logout()}
            >
                Cancelar Orden
            </button>
        </div>

    </aside>
  )
}
