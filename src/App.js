import Menu from './components/Menu';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import './App.css';


function App() {
  return (

    <BrowserRouter>
   
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Contenedor principal para las rutas */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <AppRoutes />
        </div>        
      <Menu></Menu>             
    </div>
    </BrowserRouter>
  );
}

export default App;
