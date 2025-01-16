import { NavLink } from "react-router-dom";

function HomePage() {

    return (
        <>
            <section className="text-gray-600 body-font ">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center border-b-2 border-amber-300">
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
                        
                        {/* <div className="flex justify-center">
                            <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                                <NavLink to="/authenticate">
                                    Se connecter
                                </NavLink>
                            </button>
                            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                                <NavLink to="/register">
                                    S'inscrire
                                </NavLink>
                            </button>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage;