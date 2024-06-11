//Importamos useContext para poder acceder a los valores
import { useContext } from "react";
//Importamos KioskoContext que es el que tiene los valores
import KioskoContext from "../context/KioskoProvider";

//El hecho de nombrar este hook con un use al principio lo integra mejor react
const useKiosko = () => {
    //Retornamos el valor de la funcion useContext con parametro KioskoContext
    return useContext(KioskoContext)
}

export default useKiosko;
