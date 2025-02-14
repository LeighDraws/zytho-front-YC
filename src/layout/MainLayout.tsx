import { Disclosure, DisclosureButton, DisclosurePanel, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { NavLink, Outlet } from "react-router-dom";
import beericon from "../assets/beericon.png"
import { useFetch } from '../hooks/useFetch';
import { User } from '../models/UserModel';

const USER_API: string = "http://localhost:3000/users/3"

function MainLayout() {

      const { data: userData, loading, error } = useFetch<{ user: User }>(USER_API);
      const user = userData?.user;

      if (loading) return <div className="container mx-auto mt-20 px-10 py-14 italic text-center text-lg bg-gray-100">Nous récupérons vos informations ... </div>
      if (error) return <div className="container mx-auto mt-20 px-10 py-14 text-red-600 italic text-center text-lg bg-gray-100">{error}</div>

  return (
    <>
      <Disclosure as="nav" className="bg-gray-200">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="BEER ?"
                  src={beericon}
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink to="/" className={({ isActive }) =>
                    `font-medium hover:text-yellow-600 ${isActive ? "text-yellow-600" : "text-gray-900"}`
                  }
                  > Accueil</NavLink>
                  <NavLink to="/beers" className={({ isActive }) =>
                    `font-medium hover:text-yellow-600 ${isActive ? "text-yellow-600" : "text-gray-900"}`
                  }
                  >Les Bières</NavLink>
                  <NavLink to="/breweries" className={({ isActive }) =>
                    `font-medium hover:text-yellow-600 ${isActive ? "text-yellow-600" : "text-gray-900"}`
                  }
                  >Les Brasseries</NavLink>
                </div>
              </div>

            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <NavLink to='/profile'>
                    <div className="relative flex rounded-full bg-gray-800 text-sm ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Ouvrir Profil</span>
                      <img
                        alt=""
                        src={user?.profile_pic}
                        className="size-8 object-cover rounded-full"
                      />
                    </div>
                  </NavLink>
                </div>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink to="/">Accueil </NavLink><br />
            <NavLink to="/beers">Les Bières</NavLink><br />
            <NavLink to="/breweries">Les Brasseries</NavLink>
          </div>
        </DisclosurePanel>

      </Disclosure >

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout;
