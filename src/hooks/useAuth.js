import clienteAxios from "../utilities/axios"
import useSWR from "swr"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const useAuth = ({middleware, url}) => {

    //Extraemos el token si existe
    const token = localStorage.getItem('AUTH_TOKEN')

    const navigate = useNavigate()

    //Vamos a extraer data renombrado en user, erro y mutate, mutate sirve para llamar a swr cuando queramos a parte de la validacion que hace periodica
    const {data : user, error, mutate} = useSWR('/api/user', () => 
        //Todo esto es el fetcher
        clienteAxios('/api/user', {
            //Con axios requerimos pasar el bearer token en el header
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            //Aqui forzamos a guardar los errores aqui
            throw Error(error?.response?.data?.errors)
        })
    )
    const login = async (datos, setErrores) => {
        try {
            //Con el cliente axios hacemos la consulta con el metodo post, ponien la api y los datos
            const {data} = await clienteAxios.post('/api/login', datos)
            //Vamos a almacenar ese token en localstorage
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([]);
            //Tenemos que utilizar con un await el mutate para forzar la validacion
            await mutate()
        } catch (error) {
            //Agremos los errores
            console.log(error.response.data)
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const registro = async (datos, setErrores) => {
        try {
            //Con el cliente axios hacemos la consulta con el metodo post, ponien la api y los datos
            const {data} = await clienteAxios.post('/api/registro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            await mutate()
        } catch (error) {
            //Agremos los errores
            console.log(error.response.data.errors)
            setErrores(Object.values(error.response.data.errors))
        }
    }
    
    const logout = async () => {
        try {
            //Mandamos la peticion con el token para que laravel identifique usuario va a cerrar sesion
            await clienteAxios.post('api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            //Removemos el token
            localStorage.removeItem('AUTH_TOKEN')
            //Con esto revalida SWR pero reiniciamos su cache para que sea rapido
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {
        if(middleware === 'guest' && user && user.admin) {
            window.location.href = '/admin'
        }
        if(middleware === 'guest' && user && url) {
            navigate(url)
        }
        //Agregaremos el middleware Admin al layout del admin
        if(middleware === 'admin' && user && !user.admin){
            window.location.href = '/'
        }
        if(middleware === 'auth' && error) {
            window.location.href = '/auth/login'
        }
    }, [user, error]);
    
    return {
        login,
        registro,
        logout,
        user, 
        error
    }
}