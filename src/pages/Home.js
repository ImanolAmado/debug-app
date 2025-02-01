import HomeNoLogin from './HomeNoLogin';
import HomeLogin from './HomeLogin';
import '../index.css';


export default function Home(){
    

// Si existen datos en localStorage, el usuario está
// autenticado

if (sessionStorage.getItem("miToken")){
    return(   
        <HomeLogin></HomeLogin>
    );
} else {
    return(   
        <HomeNoLogin></HomeNoLogin>
    );
}

}