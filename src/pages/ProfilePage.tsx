import { User } from "../models/UserModel";
import { useFetch } from "../hooks/useFetch";
import { Brewery } from "../models/BreweryModel";
import { Link } from "react-router-dom";
import { Beer } from "../models/BeerModel";
import Beers from "../components/Beers";

const USER_API: string = "http://localhost:3000/users/3"

function ProfilePage() {

    const { data: userData, loading, error } = useFetch<{ user: User }>(USER_API);
    const user = userData?.user;

    // Récupérer les infos de la brasserie
    const BREWERY_API = `http://localhost:3000/breweries/owner/3`
    const { data: brew } = useFetch<{ brewery: Brewery }>(BREWERY_API)
    const brewery = brew?.brewery

    const FAVORITES_API = `http://localhost:3000/fave/3`;
    const { data: favoriteBeers } = useFetch<{ favorites: Beer[] }>(FAVORITES_API);
    const beers = favoriteBeers?.favorites

    if (loading) return <div className="container mx-auto mt-20 px-10 py-14 italic text-center text-lg bg-gray-100">Nous récupérons vos informations ... </div>
    if (error) return <div className="container mx-auto mt-20 px-10 py-14 text-red-600 italic text-center text-lg bg-gray-100">{error}</div>

    return (
        <>
            <div className="container mx-auto flex flex-col px-10 py-14 md:flex-row items-center">
                <div className="mt-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="relative">
                            <img
                                src={user?.profile_pic}
                                alt={user?.first_name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-amber-300 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                            />
                        </div>
                        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-800">{user?.first_name} {user?.last_name}</h3>
                            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                                {/* icon */}
                                <span>{user?.email}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start mt-1 text-gray-600">
                                {/* icon */}
                                <span className="uppercase font-medium" >{user?.role}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-xl font-semibold text-gray-700 mb-4">Ma Brasserie</h4>
                        <div className="flex md:grid-cols-2 gap-4">
                            <div
                                className="2xl:h-[150px] w-full flex flex-row bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out"
                            >
                                <div className="w-[70%] border-r-2 px-2 border-amber-300">
                                    <p className="text-gray-800 font-medium">{brewery?.name}</p>
                                    <p className="text-gray-600 text-sm mt-1">{brewery?.address}</p>
                                    <p className="text-gray-600 text-sm mt-1 mb-5 uppercase">{brewery?.country}</p>
                                    <Link to={`/breweries/${brewery?.brewery_id}`} className="text-yellow-500 hover:text-yellow-300 transition duration-300 ease-in-out">
                                        Voir la page
                                    </Link>
                                </div>
                                <div className="pl-16 pr-8">
                                    <p className="text-gray-800 font-medium mt-1">Description</p>
                                    <p className="text-gray-600 text-sm mt-2">{brewery?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <h4 className="text-xl font-semibold text-gray-700 mb-4">Mes Favoris</h4>
                            <div className="grid grid-cols-4 p-4">
                                {beers?.map((beer) => (
                                    <div className="w-[320px] bg-gray-100 p-6 rounded-lg">
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
                                    </div>
                                ))}


                            </div>
                        </div>
                    </section>

                </div>

            </div>
        </>
    )
}

export default ProfilePage