import { NavLink } from "react-router-dom";
import { Brewery } from "../models/BreweryModel";


function Breweries(props: Brewery) {

    const id = props.brewery_id

    return (
        <>
            <div className="w-full p-2 sm:w-1/2 lg:w-1/3 md:w-1/2 pb-3">
                <div className="mb-4 border-b-4 p-6 rounded bg-gray-100 border-amber-300 hover:border-amber-200">
                    <NavLink to={`/breweries/${id}`} className="block relative h-72 rounded overflow-hidden">
                        <img alt={props.name} className="object-cover object-center w-full h-full block hover:opacity-75" src={props.picture_url} />
                    </NavLink>
                    <div className="mt-4" key={props.brewery_id}>
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{props.country} | {props.region}</h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">{props.name}</h2>
                        <p className="mt-1 text-sm">{props.address}</p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Breweries;