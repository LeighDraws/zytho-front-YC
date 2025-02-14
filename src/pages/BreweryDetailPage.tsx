import { NavLink, useParams } from "react-router-dom";
import { Brewery } from "../models/BreweryModel";
import { useFetch } from "../hooks/useFetch";
import { User } from "../models/UserModel";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BeersFromBrew from "../components/BeersFromBrew";


function BreweryDetailPage() {

    const { id } = useParams()
    const breweryId = Number(id)

    // Récupérer les infos de la brasserie
    const BREWERY_API = `https://zythologue-api-pxf6.onrender.com/breweries/${id}`
    const { data: brew, loading, error } = useFetch<{brewery : Brewery}>(BREWERY_API)
    const brewery = brew?.brewery

    // Récupérer les infos du propriétaire
    const USER_API = `https://zythologue-api-pxf6.onrender.com/users/breweries/${id}`
    const { data: user } = useFetch<{user : User}>(USER_API)
    const owner = user?.user

    if (loading) return <div className="container mx-auto mt-20 px-10 py-14 italic text-center text-lg bg-gray-100">On arrive bientôt...</div>
    if (error) return <div className="container mx-auto mt-20 px-10 py-14 text-red-600 italic text-center text-lg bg-gray-100">{error}</div>

    console.log(owner)
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 pt-20 pb-18 mx-auto flex flex-col">
                    <div className="lg:w-4/6 mx-auto">
                        <div className="rounded-lg h-64 overflow-hidden">
                            <img alt={brewery?.name} className="object-cover object-center h-full w-full" src={brewery?.picture_url} />
                        </div>
                        <div className="flex flex-col sm:flex-row mt-10">
                            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                    <img alt={brewery?.name} className="rounded-full object-cover object-center h-full w-full" src={owner?.profile_pic} />
                                </div>
                                <div className="flex flex-col items-center text-center justify-center">
                                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{brewery?.name}</h2>
                                    <div className="w-12 h-1 bg-yellow-500 rounded mt-2 mb-4"></div>
                                    <p className="text-base uppercase">{brewery?.country} - {brewery?.region}</p>
                                    <p className="text-base">{brewery?.address}</p>
                                </div>
                            </div>
                            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <p className="leading-relaxed text-lg mb-4">{brewery?.description}</p>
                                <NavLink to={brewery?.website_url ? brewery?.website_url : "localhost:5175"} className="text-yellow-500 inline-flex content-center items-center">Découvre le site
                                    <FontAwesomeIcon icon={faArrowRight} className="w-5 h-4 px-0.5 self-center" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BeersFromBrew breweryId={breweryId} />

        </>
    )
}

export default BreweryDetailPage;
