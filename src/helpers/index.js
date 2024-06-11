//Si nombramos como index el archivo de los helppers solo necesitaremos el nombre de la funcion a exportar cuando la importemos
//Utilizamos export para que otrso archivos pueden utilizarlo
export const formatearDinero = (cantidad) => {
    return cantidad.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})
}