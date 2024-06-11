import { Link } from "react-router-dom"
import { createRef, useState } from "react";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Login() {

    //Estas variables van a contener los valores del post
    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([]);
    
    //Creamos la variable que con tiene la funcion
    const {login} = useAuth({
        //El middleware es decir donde estamos, esta es una seccion para usuarios no autenticados
        middleware: 'guest',
        //Donde vamos a redireccionar al usuario
        url: '/'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //Acedemos a los valores de los current con nameRef.current.value
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        login(datos, setErrores)
    }
  return (
    <>
        
        <h1 className="font-bold text-4xl text-center md:text-left">Iniciar Sesion</h1>
        <p className="text-center md:text-left">Para realizar un pedido inicia seion</p>
        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-4">
            <form 
                onSubmit={handleSubmit}
                noValidate
            >
                {errores ? errores.map( error =>{
                    if(error.length == 1) {
                        return <Alerta key={error}>{error}</Alerta>
                    } else {
                        return error.map( (err) => <Alerta key={err}>{err}</Alerta>)
                    }
                }  ) : null }
                <div className="mb-4">
                    <label 
                        htmlFor="email"
                        className="text-slate-800"
                    >Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-2 w-full p-3 bg-gray-50"
                        placeholder="Tu email"
                        autoComplete="email"
                        ref={emailRef}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="password"
                        className="text-slate-800"
                    >Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-2 w-full p-3 bg-gray-50"
                        placeholder="Tu Password"
                        ref={passwordRef}
                        required
                    />
                </div>
                <input 
                    type="submit"
                    value="Iniciar Sesion"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-3 p-3 uppercase font-bold cursor-pointer rounded-md" />
            </form>
        </div>
        <nav className="mt-5">
            <Link to="/auth/registro">¿Aun no tienes una cuenta? Crea una</Link>
        </nav>
    </>
  )
}
