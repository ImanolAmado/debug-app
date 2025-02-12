import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Loading from 'react-simple-loading';
import { useEffect, useState } from 'react';
import Login from './Login';
import ResumenPartida from '../components/ResumenPartida';
import { apiClient } from "../components/apiClient";
import Button from '@mui/material/Button';

  

export default function Partidas() {
  
    const paginationModel = { page: 0, pageSize: 5 };   
    const [partidas, setPartidas] = useState([]);
    const [todasLasPartidas, setTodasLasPartidas] = useState([]);
    const [seleccion, setSeleccion] = useState([]);
    const [cargando, setCargando] = useState(true); 
    const [mostrar, setMostrar] = useState(false);  
    let logueado = false;

    // definición columnas de la tabla
    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable:false, hide:true},
        { field: 'fecha', headerName: 'Fecha', width: 110, editable:false },
        { field: 'resumen', headerName: 'Resumen', width: 150, editable:false, sortable:false},
        { field: 'puntos', headerName: 'Puntos', width: 100, editable:false },
    ];     
    
    let miToken = "";
    if(sessionStorage.getItem("miToken")){
        miToken = sessionStorage.getItem("miToken");
        logueado = true;
    }


    // Recoge el valor de la fila seleccionada:
    // https://stackoverflow.com/questions/64419767/get-the-selected-values-in-a-datagrid-with-material-ui
    function handleOnSelection(selectionModel){
        console.log(selectionModel[0]);
        let id = selectionModel[0];    

        for(let i=0; i<todasLasPartidas.length; i++){
            for(let j=0; j<10; j++){
                if(todasLasPartidas[i][j].pivot.partida_id==id){
                    setSeleccion(todasLasPartidas[i]);                              
                }                
            }
        }             
        console.log(seleccion);
        setMostrar(true);
    }


    // Función botón para volver a la tabla 
    function handleOnClick(event){
        event.preventDefault();
        setMostrar(false);
    }
  
 
    // Llamada Api
    useEffect(() => {    
       
        apiClient.get("/userstats",
            {
            headers: {
            Authorization: `Bearer ${miToken}`,
                },
            }
        )
        .then((response) => {                    
        console.log(response.data);
        setTodasLasPartidas(response.data);
        
        // Crear la fila para la tabla
        // Se declaran las variables necesarias      
        let nuevasPartidas = [];
        let numPartidas = response.data.length;
        let fecha = "";
        let resumen = "";
        let id = 0;        
     
        // Doble "for" para acceder a "pivot" (partida_preguntas)
        for(let i=0; i<numPartidas; i++){
            let respuestasAcertadas = 0;
            let puntos = 0;

                for(let j=0; j<10; j++){
            // cálculo de la puntuación de la partida
             if(response.data[i][j].pivot.acierto==true){
                 respuestasAcertadas++;
             }
             id = response.data[i][j].pivot.partida_id;
             fecha = response.data[i][j].pivot.fecha;
             resumen = "Aciertos: " + respuestasAcertadas + " de 10";
             puntos = respuestasAcertadas;             
            }  
            // se guarda la info en un array 
            nuevasPartidas.push({ id, fecha, resumen, puntos });
        }         
        // metemos los datos en la fila usando variable de estado
        setPartidas(nuevasPartidas);
            
        })
        .catch((error) => {            
            console.log(error.error);                    
        })   
        
        .finally(()=> {        
        setCargando(false);
        })
    
    },[]);
    

    if(!logueado){
        return (
        <div className='tw-text-center tw-mt-5 tw--mb-10'>
        <p>Loguéate para consultar tus partidas</p>
        <Login></Login>
        </div>
        );
    } else {

    let contador=0;

  return (     
    <div>
       {mostrar ? 
       <div>
        <h1 className='tw-text-center tw-mt-5'>Partida de {seleccion[0].pivot.fecha}</h1>
        
         {seleccion.map((seleccion) => (<ResumenPartida key={seleccion.id} resumen={seleccion} contador={contador=contador+1}></ResumenPartida>))}
         <div className='tw-flex tw-flex-col tw-mt-10 tw-items-center tw-mb-10'> 
            <Button className='tw-w-40 tw-mt-5' variant='contained' onClick={handleOnClick}>Volver</Button>           
        </div>        
       </div> :     
    <div>
    <div className="tw-mt-6">
        <p className='tw-text-center'>Consulta de partidas</p>
        <p className="tw-mt-5 tw-m-5 tw-mb-10">En la siguiente tabla puedes filtrar, buscar o selecionar cualquier partida que hayas jugado.</p>
    </div>
    {cargando ? <Loading  color={'#1976d2'}
        stroke={'10px'}
        size={'100px'}></Loading> : 
    
        <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
        rows={partidas}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        columnVisibilityModel={{id: false,}}        
        sx={{ border: 0 }}
        onRowSelectionModelChange={handleOnSelection}      
        />
        </Paper> }
    </div>  }
    </div>    
  );
}
}