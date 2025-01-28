import Home from './pages/Home';
import Partidas from './pages/Partidas';
import Rankings from './pages/Rankings';
import Usuario from './pages/Usuario';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Logout from './components/Logout';
import { Route, Routes } from 'react-router-dom';


export default function AppRoutes() {

return (
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/rankings" element={<Rankings/>}/>
    <Route path="/partidas" element={<Partidas/>}/>
    <Route path="/usuario" element={<Usuario/>}/>
    <Route path="/registro" element={<Registro/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/logout" element={<Logout/>}/>
</Routes>
);



}