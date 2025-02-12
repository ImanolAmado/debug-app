
export default function ResumenPartida({resumen, contador}){


return (

<div className="tw-mr-4 tw-ml-4 tw-border tw-flex tw-justify-center tw-items-center">    
    <div className="tw-block tw-rounded-lg">    
      <div className="tw-flex tw-flex-wrap">      
      <p className="tw-text-center tw-pt-2 tw-pl-2">Pregunta {contador} de 10</p> 
      {resumen.pivot.acierto ? <img className="tw-ml-5 tw-mt-2" src="verdadero.png" width="20" alt="icono verdadero"></img>
      : <img className="tw-ml-5 tw-mt-2" src="falso.png" width="20" alt="icono falso"></img> }
      </div>
      <p className="tw-pl-2">Categoría: {resumen.categoria}</p>
      <p className="tw-mt-4 tw-pl-2">{resumen.pregunta}</p>  
    <img
      className="tw-tw-rounded-t-lg tw-mt-3"
      src={`https://admin.debugacademia.com/storage/${resumen.imagen}`}
      alt="foto pregunta" ></img>

    <div className="tw-mt-3 tw-text-surface">
      <p className="tw-mb-2 tw-pl-2 tw-font-medium tw-leading-tight">Tu respuesta: {resumen.pivot.respuesta}</p>
      <p className="tw-mb-2 tw-pl-2 tw-font-medium tw-leading-tight">Respuesta correcta: {resumen.respuesta_correcta}</p>
      <p className="tw-mb-4 tw-pl-2 tw-text-base">Puntos: {resumen.pivot.puntos}</p>    
    </div>
    </div>
</div>

);

}