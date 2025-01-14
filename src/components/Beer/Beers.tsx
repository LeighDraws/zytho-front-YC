import { Link } from "react-router-dom";
import { Beer } from "../../models/BeerModel";

function Beers(props: Beer) {

    const id = props.beer_id

    return (
        <>
            <article>
                <div key={props.beer_id} className="group relative">
                    <img
                        alt={props.name}
                        src={props.picture_url}
                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700 justify-self-start">
                                <Link to={`/beers/${id}`}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {props.name}
                                </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 justify-self-start">{props.color} {props.beer_id}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{props.price}</p>
                    </div>
                </div>
            </article>
        </>
    )
}

export default Beers;