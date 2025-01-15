import { NavLink } from "react-router-dom";
import { Brewery } from "../models/BreweryModel";


function Breweries(props: Brewery) {

    const id = props.brewery_id

    return (
        <>
            <div className="lg:w-3/12 md:w-1/2 p-2 rounded pb-3 border-b-4 border-amber-300 hover:border-amber-200">
                <NavLink to={`/breweries/${id}`} className="block relative h-72 rounded overflow-hidden">
                    <img alt={props.name} className="object-cover object-center w-full h-full block hover:opacity-75" src={props.picture_url} />
                    <div className="mt-4" key={props.brewery_id}>
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{props.country} | {props.region}</h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">{props.name}</h2>
                        <p className="mt-1 text-sm">{props.address}</p>
                    </div>
                </NavLink>
            </div >
        </>
    )
}

export default Breweries;