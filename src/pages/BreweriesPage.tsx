import Brewery from "../components/Breweries";
import { useFetchBreweries } from "../hooks/useFetchBreweries";

const BREWERIES_API = "http://localhost:3000/breweries"

function BreweriesPage() {

    const { breweries, loading, error } = useFetchBreweries(BREWERIES_API);

    if (loading) return <div>Les bières sont entrain d'être brassées...</div>
    if (error) return <div>Erreur lors du chargement, {error}</div>
    console.log("brasseries: ", breweries)

    return (
        <>
            <section className="mx-auto min-w-max max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="text-gray-600 body-font">
                    <h2 className="text-3xl font-bold tracking-tight ml-6 text-gray-900">Les Brasseries</h2>
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">

                            {breweries.map((brewery) => (
                                <Brewery
                                    key={brewery.brewery_id}
                                    name={brewery.name}
                                    country={brewery.country}
                                    region={brewery.region}
                                    description={brewery.description}
                                    address={brewery.address}
                                    picture_url={brewery.picture_url}
                                    brewery_id={brewery.brewery_id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default BreweriesPage;