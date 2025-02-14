import { Beer } from "../models/BeerModel";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

function BeersFromBrew({ breweryId }: { breweryId: number }) {

    // Récupérer les bières de la brasserie
    const BEERS_BREWERIES_API = `http://localhost:3000/beers/breweries/${breweryId}`
    const { data: beersData } = useFetch<{ beers: Beer[] }>(BEERS_BREWERIES_API)

    const beers = beersData?.beers;

    const scrollLeft = () => {
        const carousel = document.getElementById("beerCarousel");
        if (carousel) carousel.scrollLeft -= 300;
    };

    const scrollRight = () => {
        const carousel = document.getElementById("beerCarousel");
        if (carousel) carousel.scrollLeft += 300;
    };
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-14 mx-auto relative">
                    <h1 className="text-4xl font-bold mb-8 tracking-tight text-gray-900">Les Bières de la Brasserie</h1>
                    <div className="relative">
                        {/* Flèche gauche */}
                        <button
                            onClick={() => scrollLeft()}
                            className="absolute top-1/2 -left-9 z-10 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-4 px-0.5" />
                        </button>

                        <div
                            id="beerCarousel"
                            className="flex overflow-x-auto snap-x snap-mandatory space-x-4 scroll-smooth no-scrollbar"
                        >
                            {Array.isArray(beers) && beers.length > 0 ? (
                                beers.map((beer) => (

                                    <div className="xl:w-1/4 md:w-1/2 flex-shrink-0 snap-center py-4 px-1" key={beer.beer_id}>
                                        <Link to={`/beers/${beer.beer_id}`}>
                                            <div className="bg-gray-100 h-full p-6 rounded-lg">
                                                <img
                                                    className="h-40 rounded w-full object-cover object-center mb-6"
                                                    src={beer.picture_url}
                                                    alt="content"
                                                />
                                                <h3 className="tracking-widest text-yellow-500 text-xs font-medium title-font">{beer.category}</h3>
                                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{beer.name}</h2>
                                                <p className="text-sm text-gray-500 justify-self-start uppercase">{beer.color}</p>
                                                <p className="leading-relaxed text-base">{beer.description}</p>
                                            </div>
                                        </Link>
                                    </div>

                                ))
                            ) : (
                                <div>Pas de bières pour le moment</div>
                            )}
                        </div>

                        {/* Flèche droite */}
                        <button
                            onClick={() => scrollRight()}
                            className="absolute top-1/2 z-10 -right-9 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow"
                        >
                            <FontAwesomeIcon icon={faArrowRight} className="w-5 h-4 px-0.5" />
                        </button>
                    </div>
                </div>
            </section >
        </>
    )
}

export default BeersFromBrew;
