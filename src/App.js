import Menu from './components/Menu';
import Cabecera from './components/Cabecera';
import AppRoutes from './AppRoutes';
import { BrowserRouter, useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <div className="tw-flex tw-flex-col tw-h-screen">
      <div className="tw-flex-1 tw-overflow-auto">
        <Cabecera key={location.pathname} /> {/* Se vuelve a montar cuando cambia la ruta */}
        <AppRoutes />
      </div>
      <Menu />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;