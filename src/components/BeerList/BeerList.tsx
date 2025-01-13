import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from "axios";
import { Beer } from "../../models/BeerModel"
import Beers from '../Beer/Beers';

const BEER_API = "http://localhost:3000/beers"

function BeerList() {

    const [beers, setBeers] = useState<Beer[]>([]);

    useEffect(() => {
        axios.get(BEER_API).then((response: AxiosResponse) => {
            const data = response.data
            const beers = data.beers
            setBeers(beers)
        })
    }, [])

    console.log("bières: ", beers)

    return (
        <>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Les Bières</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {beers.map((beer) => (
                            <Beers
                                key={beer.beer_id}
                                beer_id={beer.beer_id}
                                name={beer.name}
                                price={beer.price}
                                description={beer.description}
                                color={beer.color}
                                abv={beer.abv}
                                picture_url={beer.picture_url}
                                production_date={beer.production_date}
                                brewery_id={beer.beer_id}
                                brewery={beer.brewery} />
                        ))}
                    </div>

                </div>
            </div>
        </>
    )

}

export default BeerList;