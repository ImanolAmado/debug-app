import BotonBasico from '../components/BotonBasico';
import '../index.css';


export default function Home(){
    
    return(
    <div className='tw-mt-5 tw-mr-5 tw-ml-5'>
        <div className='tw-text-center'>
            <h1 className='tw-text-xl tw-text-blue-500'>¡Bienvenid@ a DebugAcademia!</h1>
            <p>Tu compañero de estudios DAW/DAM</p>
        </div>
        <div className="tw-container tw-grid tw-grid-cols-3 tw-gap-2 tw-mt-5">
            <div>
                <img src="/home/foto3.jpg" alt="estudiante en biblioteca"></img>
            </div>
            <div>
                <img src="/home/foto1.jpg" alt="monitor con código de software"></img>
            </div>
            <div>
                <img src="/home/foto2.jpg" alt="grupo de estudiantes"></img>
            </div>
        </div>
        <div className="tw-container tw-grid tw-grid-cols-2 tw-gap-2 tw-mt-3">
            <div>
                <img src="/home/foto4.jpg" alt="profesora dando clase"></img>
            </div>
            <div>
                <img src="/home/foto5.jpg" alt="portatil con código de software"></img>
            </div>
        </div>
        <div className='tw-flex tw-flex-col tw-mt-8 tw-items-center'>
            <p className='tw-text-center'>Únete y empieza a practicar con nuestras preguntas diarias. Compite con tus compañeros en los rankings globales y semanales. ¡Desarrolla todo tu potencial!</p>           
            <img className="tw-mt-6" src="/home/foto7.png" width={'60%'} alt="grupo de estudiantes"></img>
        </div>
        <div className='tw-flex tw-flex-col tw-mt-10 tw-items-center'> 
            <BotonBasico tipo="contained" ruta="/registro" texto="Crea tu perfil con nosotros"></BotonBasico>           
        </div>
        <div className='tw-flex tw-flex-col tw-mt-5 tw-mb-10 tw-items-center'>            
            <BotonBasico tipo="outlined" ruta="/login" texto="Ya tengo una cuenta"></BotonBasico>
        </div>
    </div>


    );

}



