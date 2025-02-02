
export default function Patrocinador({patrocinador}){

return (

<div className="tw-border tw-mt-2 tw-mr-5 tw-ml-5">
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">     
        <a href={patrocinador.url} target="_blank"><img className="tw-pt-5 tw-pl-5 tw-pr-5" src={patrocinador.imagen}></img></a>
        <p className="tw-pb-5 tw-pl-5 tw-pr-5 tw-text-xs tw-mt-5">{patrocinador.texto}</p>
    </div>
</div>
);

}