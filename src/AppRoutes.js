import Home from './pages/Home';
import Partidas from './pages/Partidas';
import Rankings from './pages/Rankings';
import Usuario from './pages/Usuario';
import { Route, Routes } from 'react-router-dom';


export default function AppRoutes() {

return (
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/rankings" element={<Rankings/>}/>
    <Route path="/partidas" element={<Partidas/>}/>
    <Route path="/usuario" element={<Usuario/>}/>
</Routes>
);



}