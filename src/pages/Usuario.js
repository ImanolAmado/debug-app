import { Link } from "react-router-dom";


export default function Usuario(){

    return(

        <div>
            <h1 className="tw-mt-3">Esta es la página usuario</h1>
            <h3><Link to="/logout">Logout</Link></h3>            
        </div>
    );

}