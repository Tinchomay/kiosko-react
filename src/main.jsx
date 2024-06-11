import React from 'react'
import ReactDOM from 'react-dom/client'
//Importamos el RouterProvider que viene del react-router-dom
import { RouterProvider } from 'react-router-dom'
import { KioskoProvider } from './context/KioskoProvider'
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Agregamos el KioskoProvider y rodeamos el router para que este disponible en toda la app */}
    <KioskoProvider>
      {/* Agregamos agregamos el RouterProvider al React.StrictMode y este toma un router, tenemos que importar el archivo del router para agregarlo al router*/}
      <RouterProvider router={router}/>
    </KioskoProvider>
  </React.StrictMode>,
)
