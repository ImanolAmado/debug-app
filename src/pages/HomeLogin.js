import CuentaAtras from "../components/CuentaAtras";




export default function HomeLogin(){

// Formateo de fecha:
//https://es.stackoverflow.com/questions/49370/c%C3%B3mo-dar-formato-a-una-fecha-en-javascript
let opciones = { year: 'numeric', month: 'short', day: 'numeric' };
let fecha = new Date().toLocaleDateString('es',opciones).replace(/ /g,'-')
.replace('.','')
.replace(/-([a-z])/, function (x) {return '-' + x[1].toUpperCase()});
    
    
let datosJson = localStorage.getItem("misdatos");
let datos = JSON.parse(datosJson); 
console.log(datos);


return (

<div className="tw-container">
<div className="tw-mt-4 tw-text-center">
    <p>Bienvenido otra vez {datos.nombre}</p>
    <h1 className="tw-text-2xl tw-mt-3">{fecha}</h1>
</div>


</div>


);


}