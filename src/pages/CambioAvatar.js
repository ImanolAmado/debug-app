/* import * as React from 'react';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { apiClient } from '../components/apiClient';

export default function CambioAvatar() {
  
const [avatar, setAvatar] = useState();
  

  
  let miToken = "";
  let datosJson = sessionStorage.getItem("misdatos");
  let datos = JSON.parse(datosJson);
  
  
  if(sessionStorage.getItem('miToken')){
    miToken = sessionStorage.getItem('miToken');
    
  }
  
  
  useEffect(() => {      
  
      apiClient.post("/changeavatar", avatar,
          {
          headers: {
          Authorization: `Bearer ${miToken}`,
              },
          }
      )
      .then((response) => {     
        console.log(response.data);                 
          
      })
      .catch((error) => {     

      })   
      .finally(() => {
          
      })  
  },[avatar]);


  function handleOnClick(event){
   
    console.log("hola");


  }


  return (
    <div>

      <div>
        <h4 className="tw-mt-4 tw-text-center">Cambio de avatar</h4>
      </div>

      <div id="miAvatar" className="tw-pt-5 tw-flex tw-flex-col tw-justify-center tw-items-center">
        <img src={datos.avatar} width="35%" alt="foto avatar"></img>                                   
      </div>
      
      <div className='tw-mt-7 tw-flex tw-justify-center tw-items-center'>
      https://stackoverflow.com/questions/64902406/react-material-ui-make-a-button-open-a-file-picker-window
      <input         
        style={{ display: 'none' }}
        accept="image/*"
        id="avatar"
        type="file"
       />
      <label htmlFor="avatar">
      <Button
        component="span"
        size="small"
        startIcon={<FileOpenIcon />}
        onClick={handleOnClick}
        >
        Select
        </Button>
      </label>
    </div>

    </div>
  );
    
}


 */
