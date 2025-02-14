import { NavLink, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Beer } from "../models/BeerModel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

const BEERS_API: string = "https://zythologue-api-pxf6.onrender.com/beers";

function HomePage() {

    const { data: beerList, loading, error } = useFetch<{ beers: Beer[] }>(BEERS_API);
    const beers = beerList?.beers
    const navigate = useNavigate();
    
    const [query, setQuery] = useState("");

    if (loading) return <div className="container mx-auto mt-20 px-10 py-14 italic text-center text-lg bg-gray-100">Les bières sont entrain d'être brassées...</div>
    if (error) return <div className="container mx-auto mt-20 px-10 py-14 text-red-600 italic text-center text-lg bg-gray-100">{error}</div>

    const handleSearch = (newQuery: string) => {
        setQuery(newQuery);

        // Chercher une bière qui correspond exactement au nom entré
        const foundBeer = beers?.find(beer => beer.name.toLowerCase() === newQuery.toLowerCase());

        // Naviguer vers la bière trouvée par son id
        if (foundBeer) {
            navigate(`/beers/${foundBeer.beer_id}`);
        } else {
            // Si aucune bière n'est trouvée, rediriger vers la liste des bières
            navigate(`/beers`);
        }
    };

    const scrollLeft = () => {
        const carousel = document.getElementById("beerCarousel");
        if (carousel) carousel.scrollLeft -= 300;
    };

    const scrollRight = () => {
        const carousel = document.getElementById("beerCarousel");
        if (carousel) carousel.scrollLeft += 300;
    };

    console.log(query)
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-col px-5 py-14 md:flex-rowitems-center border-b-2 border-amber-300">

                    <div className="w-[50%] !self-center px-0 pt-8 pb-20">
                        <SearchBar onSearch={handleSearch} onQueryChange={setQuery} suggestions={Array.isArray(beers) && beers.length > 0 ? (beers.map(beer => beer.name)) : []} />
                    </div>

                    <div className="flex flex-row">
                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                            <img className="object-cover object-center rounded" alt="hero" src="https://images.pexels.com/photos/5858172/pexels-photo-5858172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                        </div>
                        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Bienvenue sur <span className="text-yellow-500">Zythologue</span>, <br />
                                le site de référence pour les amateurs de bières!
                            </h1>
                            <p className="mb-8 leading-relaxed">Zythologue est la plateforme incontournable pour tous les passionnés de bières, qu’ils soient novices ou experts. Découvrez un vaste répertoire de brasseries, des anecdotes brassicoles, et des guides pour savourer vos bières préférées. Rejoignez une communauté de connaisseurs et laissez-vous inspirer par l’art du houblon à travers le monde!</p>

                            <div className="flex justify-center">
                                <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                                    <NavLink to="/beers">
                                        Voir les bières
                                    </NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto relative">
                    <h1 className="text-4xl font-bold mb-8 tracking-tight text-gray-900">Les Bières à l'honneur</h1>
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
                            {beers?.map((beer) => (
                                <div className="xl:w-1/4 md:w-1/2 flex-shrink-0 snap-center py-4 px-1" key={beer.beer_id}>
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
                                </div>
                            ))}
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
            </section>

        </>
    )
}

export default HomePage;