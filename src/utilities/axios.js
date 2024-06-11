import axios from "axios";

//El cliente axios sirve para crear bases para los enlaces
const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    //Estos headers se envian antes de la peticion
    headers: {
        //Aqui definimos que esperamos un JSON como respuesta
        'Accept' : 'application/json',
        //Esto indica que estamos realizando la solicitud de una pagina web y no por una linea de comandos
        'X-Requested-With' : 'XMLHttpRequest'
    },
    //Para enviar credenciales que seran cookies
    withCredentials: true

})

export default clienteAxios