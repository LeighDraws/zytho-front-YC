import { NavLink, useParams } from "react-router-dom";
import { Beer } from "../models/BeerModel";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Ingredient } from "../models/IngredientModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import BeersFromBrew from "./BeersFromBrew";
import { usePost } from "../hooks/usePost";
import { useDelete } from "../hooks/useDelete";


function BeersDetail() {
    // Récupérer les infos de la bière
    const { id } = useParams()
    const BEER_API: string = `http://localhost:3000/beers/${id}`
    const { data: beerData, loading, error } = useFetch<{ beer: Beer }>(BEER_API)

    // Récupérer les ingrédients de la bière
    const INGREDIENT_API: string = `http://localhost:3000/beers/ingredients/${id}`
    const { data: ingredientsData } = useFetch<{ ingredients: Ingredient[] }>(INGREDIENT_API)

    // Assigner les variables
    const beer = beerData?.beer;
    const ingredients = ingredientsData?.ingredients;

    // Utilisation des tabs pour Description / Ingrédients
    const [activeTab, setActiveTab] = useState("tab1")

    const FAVORITES_API = `http://localhost:3000/fave/3`;
    const { data: favoriteData } = useFetch<{ favorites: Beer[] }>(FAVORITES_API);

    // Gestion des like 
    const { postData } = usePost()

    // Supprimer des favoris
    const { deleteData } = useDelete()

    const [isLiked, setIsLiked] = useState(false); 

    useEffect(() => {
        if (favoriteData) {
            setIsLiked(favoriteData.favorites.some(fav => fav.beer_id === Number(id)));
        }
    }, [favoriteData, id]); 
    
    const toggleLike = async (beerId: number, userId: number) => {
        if (isLiked) {
            await deleteData(userId, beerId);
            console.log("test de delete", beerId, userId);
            setIsLiked(false);
        } else {
            await postData(beerId, userId);
            console.log("test de post", beerId, userId);
            setIsLiked(true); 
        }
    };
    

    if (loading) return <div className="container mx-auto mt-20 px-10 py-14 italic text-center text-lg bg-gray-100">La bière est entrain d'être brassée...</div>
    if (error) return <div className="container mx-auto mt-20 px-10 py-14 text-red-600 italic text-center text-lg bg-gray-100">{error}</div>

    const brewId = beer?.brewery_id

    return (
        <section className="text-gray-600 content-center body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{beer?.brewery}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{beer?.name}</h1>
                        <div className="flex mb-4">
                            <button onClick={() => setActiveTab("tab1")}
                                className={`flex-grow py-2 text-lg px-1 ${activeTab === "tab1" ? " text-yellow-500 border-b-2 border-yellow-500" : "text-gray-600 border-gray-300"} `}
                            >
                                Description
                            </button>
                            <button onClick={() => setActiveTab("tab2")}
                                className={`flex-grow py-2 text-lg px-1 ${activeTab === "tab2" ? " text-yellow-500 border-b-2 border-yellow-500" : "text-gray-600 border-gray-300"} `}
                            >
                                Ingrédients
                            </button>
                        </div>

                        <div className="mt-4">

                            {/* Contenu pour description */}
                            {activeTab === "tab1" &&
                                <div>
                                    <p className="leading-relaxed mb-4">{beer?.description}</p>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Color</span>
                                        <span className="ml-auto text-gray-900">{beer?.color}</span>
                                    </div>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Type</span>
                                        <span className="ml-auto text-gray-900">{beer?.category}</span>
                                    </div>
                                    <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                        <span className="text-gray-500">Alcohol</span>
                                        <span className="ml-auto text-gray-900">{beer?.abv}°</span>
                                    </div>
                                </div>}

                            {/* Contenu pour Ingrédients */}
                            {activeTab === "tab2" &&
                                <div className="py-5">
                                    {Array.isArray(ingredients) && ingredients.length > 0 ? (
                                        ingredients.map((ingredient) => (
                                            <div className="flex border-t border-gray-200 py-2">
                                                <span className="text-gray-500">{ingredient.type}</span>
                                                <span className="ml-auto text-gray-900 pr-3">{ingredient.ingredient}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Pas d'ingrédients enregistrés</p>
                                    )}
                                </div>
                            }
                        </div>

                        <div className="flex content-center mt-20">
                            <span className="title-font font-medium text-2xl text-gray-900">{beer?.price} €</span>
                            <button className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
                                <NavLink to={`/breweries/${brewId}`}>Voir la brasserie</NavLink>
                            </button>
                            <button className={`rounded-full w-10 h-10 ${isLiked ? `bg-yellow-400 text-white` : `bg-gray-200`} p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-yellow-600 ml-4`}
                                onClick={() => toggleLike(Number(id), 3)}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                    </div>
                    <img alt={`Photo de la bière ${beer?.name}`} className="lg:w-1/2 w-full lg:h-96 h-64 lg:mt-4 object-cover object-center rounded" src={beer?.picture_url} />
                </div>

                {brewId && <BeersFromBrew breweryId={brewId} />}
            </div>
        </section>
    )

}

export default BeersDetail;