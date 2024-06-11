import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Registro() {
    //Estas variables van a contener los valores del post
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    const {registro} = useAuth({middleware: 'guest', url: '/'} )

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //Acedemos a los valores de los current con nameRef.current.value
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        registro(datos, setErrores);
    }

  return (
    //Podemos retornar una etiqueta html sin nombre que es conocido como fragment y es mejor opcion que un div
    <>
        <h1 className="font-bold text-4xl text-center md:text-left">Crea tu cuenta</h1>
        <p className="text-center md:text-left">Crea tu cuenta llenando el formulario</p>
        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-4">
            <form 
                onSubmit={handleSubmit}
                noValidate
            >   {errores ? errores.map( error =>{
                    if(error.length == 1) {
                        return <Alerta key={error}>{error}</Alerta>
                    } else {
                        return error.map( (err) => <Alerta key={err}>{err}</Alerta>)
                    }
                }  ) : null }
                <div className="mb-4">
                    <label 
                        htmlFor="name"
                        className="text-slate-800"
                    >Nombre</label>
                    <input 
                    //Por convencion se ponen los atributos uno sobre otro por el control de versiones
                        type="text"
                        id="name"
                        name="name"
                        className="mt-2 w-full p-3 bg-gray-50"
                        placeholder="Tu nombre"
                        autoComplete="name"
                        ref={nameRef}
                        required
                    />
                </div>
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
                <div className="mb-4">
                    <label 
                        htmlFor="password_confirmation"
                        className="text-slate-800"
                    >Repetir Password</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        className="mt-2 w-full p-3 bg-gray-50"
                        placeholder="Repetir Password"
                        ref={passwordConfirmationRef}
                        required
                    />
                </div>
                <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-3 p-3 uppercase font-bold cursor-pointer rounded-md" />
            </form>
        </div>
        <nav className="mt-5">
            <Link to="/auth/login">¿Ya tienes cuenta? Inicia Sesión</Link>
        </nav>
    </>
  )
}
 