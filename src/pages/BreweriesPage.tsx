import Breweries from "../components/Breweries";
import { useFetch } from "../hooks/useFetch";
import { Brewery } from "../models/BreweryModel";

const BREWERIES_API = "https://zythologue-api-pxf6.onrender.com/breweries"

function BreweriesPage() {

    const { data: breweriesData, loading, error } = useFetch<{ breweries: Brewery[] }>(BREWERIES_API);

    const breweries = breweriesData?.breweries;

    if (loading) return <div className="container mx-auto mt-20 px-10 py-14 italic text-center text-lg bg-gray-100">Les bières sont entrain d'être brassées...</div>
    if (error) return <div className="container mx-auto mt-20 px-10 py-14 text-red-600 italic text-center text-lg bg-gray-100">{error}</div>
    console.log("brasseries: ", breweries)

    return (
        <>
            {/* Informations principales de la brasserie */}
            <section className="mx-auto min-w-max max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="text-gray-600 body-font">
                    <h2 className="text-3xl font-bold tracking-tight ml-6 text-gray-900">Les Brasseries</h2>
                    <div className="container py-24 mx-auto">
                        <div className="flex flex-wrap w-full mx-4 -m-4">

                            {breweries?.map((brewery) => (
                                <Breweries
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