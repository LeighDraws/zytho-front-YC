import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { PlusIcon, MinusIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Beers from '../components/Beers'
import { useFetch } from '../hooks/useFetch';
import { Beer } from '../models/BeerModel';
import { useEffect, useState } from 'react';

const categories = [
    { id: '1', value: 'Lager', label: 'Lager', checked: false },
    { id: '2', value: 'Ale', label: 'Ale', checked: false },
    { id: '3', value: 'Pale ale', label: 'Pale ale', checked: false },
    { id: '4', value: 'Amber ale', label: 'Amber ale', checked: false },
    { id: '5', value: 'Indian pale ale', label: 'Indian pale ale', checked: false },
    { id: '6', value: 'Stout', label: 'Stout', checked: false },
    { id: '7', value: 'Wheat beer', label: 'Wheat beer', checked: false },
    { id: '8', value: 'Porter', label: 'Porter', checked: false },
    { id: '9', value: 'Fruit beer', label: 'Fruit beer', checked: false },
    { id: '10', value: 'Radler', label: 'Radler', checked: false },
    { id: '11', value: 'Honey beer', label: 'Honey beer', checked: false },
    { id: '12', value: 'Tripel', label: 'Tripel', checked: false },
    { id: '13', value: 'IPA', label: 'IPA', checked: false },
]

const BEERS_API: string = "http://localhost:3000/beers";

function BeerList() {

    const { data: beersData, loading, error } = useFetch<{ beers: Beer[] }>(BEERS_API);
    const beers = beersData?.beers;

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [filteredBeers, setFilteredBeers] = useState<Beer[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const checkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkedCategory = e.target.value;
        const isChecked = e.target.checked;
        console.log("category", checkedCategory, "checked", isChecked)

        setSelectedCategories((prev) => {
            if (isChecked) {
                return [...prev, checkedCategory]; // Si catégorie cochée → ajouté au tableau
            } else {
                return prev.filter((cat) => cat !== checkedCategory); // Supprimée si elle est décochée  
            }
        })
    }

    // Met à jour les bières filtrées lorsque `selectedCategories` ou `beers` changent
    useEffect(() => {
        if (selectedCategories.length > 0) {
            const filteredItems = beers?.filter((beer) =>
                beer.category && selectedCategories.includes(beer.category)
            );
            setFilteredBeers(filteredItems || []);
        } else {
            setFilteredBeers(beers || []); // Si aucune catégorie sélectionnée, afficher tout
        }
    }, [selectedCategories, beers]);

    if (loading) return <div className="container mx-auto mt-20 px-10 py-14 italic text-center text-lg bg-gray-100">Les bières sont entrain d'être brassées...</div>
    if (error) return <div className="container mx-auto mt-20 px-10 py-14 text-red-600 italic text-center text-lg bg-gray-100">{error}</div>
    console.log("bières: ", filteredBeers)

    return (
        <>
            <div className="bg-white">
                <div>
                    {/* Dialog Filtres Mobile */}
                    <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                        />

                        <div className="fixed inset-0 z-40 flex">

                            {/* Dialog Droite */}
                            <DialogPanel
                                transition
                                className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filtres</h2>
                                    <button
                                        type="button"
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">Catégories</span>
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                                <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-6">
                                            {categories.map((category) => (
                                                <div key={category.id} className="flex gap-3">
                                                    <div className="flex h-5 shrink-0 items-center">
                                                        <div className="group grid size-4 grid-cols-1">
                                                            <input
                                                                defaultValue={category.value}
                                                                defaultChecked={category.checked}
                                                                id={category.id}
                                                                name={category.label}
                                                                type="checkbox"
                                                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                onChange={checkInput}
                                                            />
                                                            <svg
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                            >
                                                                <path
                                                                    d="M3 8L6 11L11 3.5"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                                                />
                                                                <path
                                                                    d="M3 7H11"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <label htmlFor={category.id} className="text-sm text-gray-600">
                                                        {category.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            </DialogPanel>
                        </div>
                    </Dialog>


                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">

                            {/* En tête de Section */}
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Les Bières</h1>

                            {/* Bouton de Filtres Mobile */}
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                >
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon aria-hidden="true" className="size-5" />
                                </button>
                            </div>

                        </div>

                        {/* Section Desktop */}
                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">
                                Bières
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <form className="hidden lg:block">
                                    {/* Bouton pour Réinitialiser la liste de bières et les catégories */}
                                    <button
                                        type='button'
                                        onClick={() => {
                                            setFilteredBeers(beers || []);
                                            setSelectedCategories([]);
                                        }}
                                        className="group inline-flex justify-center text-sm font-normal text-gray-700 hover:text-gray-900 hover:underline">
                                        Réinitialiser
                                    </button>
                                    <h3 className="sr-only">Categories</h3>
                                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">Catégories</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {categories.map((category) => (
                                                    <div key={category.id} className="flex gap-3">
                                                        <div className="flex h-5 shrink-0 items-center">
                                                            <div className="group grid size-4 grid-cols-1">
                                                                <input
                                                                    defaultValue={category.value}
                                                                    defaultChecked={category.checked}
                                                                    id={category.id}
                                                                    name={category.label}
                                                                    type="checkbox"
                                                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                    onChange={checkInput}
                                                                />
                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 14 14"
                                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3.5"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-[:checked]:opacity-100"
                                                                    />
                                                                    <path
                                                                        d="M3 7H11"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <label htmlFor={category.id} className="text-sm text-gray-600">
                                                            {category.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                </form>

                                {/* Product grid */}
                                <div className="lg:col-span-3">
                                    <div className="bg-white">

                                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
                                            {filteredBeers?.length === 0 ? (
                                                <p className="text-center text-gray-500 mt-6">
                                                    Aucune bière ne correspond à la catégorie sélectionnée.
                                                </p>
                                            ) : (
                                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                                    {filteredBeers?.map((beer) => (
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
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>


        </>
    )

}

export default BeerList;