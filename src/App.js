import Menu from './components/Menu';
import Cabecera from './components/Cabecera';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>   
    
    <div className="tw-flex tw-flex-col tw-h-screen">
        
       
        <div className="tw-flex-1 tw-overflow-auto">
        <Cabecera></Cabecera>
        <AppRoutes/>
        </div>   
       
        <Menu/>             
    </div>
    </BrowserRouter>
  );
}

export default App;
