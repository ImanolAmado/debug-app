import { Link } from "react-router-dom"




export default function Menu(){

return (

<div>    
    <div className="tw-flex tw-justify-center tw-items-center tw-mb-10 tw-border tw-bg-gray-300">
        <ul className="tw-flex tw-border tw-w-full">
        <li className="hover:tw-bg-gray-600 tw-text-xl tw-p-2 tw-flex tw-flex-1 tw-justify-center tw-items-center hover:underline"><Link to="/rankings" className="hover:tw-text-white">Ranking global</Link></li>
        <li className="hover:tw-bg-gray-600 tw-border tw-text-xl tw-p-2 tw-flex tw-flex-1 tw-justify-center tw-items-center hover:underline"><Link to="/rankingSemanal" className="hover:tw-text-white">Ranking semana</Link></li>
        </ul>
    </div>    
</div>      

);

}