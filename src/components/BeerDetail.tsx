import { useParams } from "react-router-dom";
import { Beer } from "../models/BeerModel";
import { useFetch } from "../hooks/useFetch";



function BeersDetail() {

    const { id } = useParams()
    const BEER_API: string = `http://localhost:3000/beers/${id}`
    const { data: beer, loading, error } = useFetch<Beer>(BEER_API, "beer")

    console.log("la bière", beer)

    if (loading) return <div>La bière est entrain d'être brassée...</div>
    if (error) return <div>Erreur lors du chargement, {error}</div>

    return (
        <div className="bg-gray-100 rounded-md">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">

                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <img src={beer?.picture_url} alt={beer?.name} className="w-96 h-auto rounded-lg shadow-md mb-4" id="mainImage" />
                        <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                            {/* <img src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 1"
                                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                        onclick="changeImage(this.src)">
                        <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 2"
                                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                        onclick="changeImage(this.src)">
                        <img src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 3"
                                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                        onclick="changeImage(this.src)">
                        <img src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 4"
                                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                        onclick="changeImage(this.src)">*/}
                        </div>
                    </div>


                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{beer?.name}</h2>
                        <p className="text-gray-600 mb-4 font-semibold">{beer?.category ? beer?.category : "Pas de catégorie"}  | {beer?.abv}° | 75cl</p>

                        <div className="mb-4">
                            <span className="text-gray-900 text-2xl font-bold mr-2">{beer?.price} €</span>
                        </div>

                        <p className="text-gray-700 mb-6">{beer?.description}</p>

                        <div className="flex justify-center mb-6">
                            <button className="bg-amber-500 flex gap-2 items-center text-white font-semibold px-6 py-2 rounded-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2">
                                Ajouter aux Favoris
                            </button>
                        </div>

                        {/* <div>
                            <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Industry-leading noise cancellation</li>
                                <li>30-hour battery life</li>
                                <li>Touch sensor controls</li>
                                <li>Speak-to-chat technology</li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BeersDetail;