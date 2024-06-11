export default function Alerta({children}) {
  return (
    <div className=" border-l-4 border-red-600 my-2 bg-red-100 text-red-600  font-bold p-3 text-sm">
        {children}
    </div>
  )
}
