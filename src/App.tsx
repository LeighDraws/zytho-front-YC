
import './App.css'
import {
  Route,
  Routes
} from "react-router-dom";
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import BreweriesPage from './pages/BreweriesPage';
import BeerDetailPage from './pages/BeerDetailPage';
import BreweryDetailPage from './pages/BreweryDetailPage';
import BeerList from './pages/BeerList';
import ProfilePage from './pages/ProfilePage';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path='/beers' element={<BeerList/>} />
          <Route path='/beers/:id' element={<BeerDetailPage/>} />
          <Route path='/breweries' element={<BreweriesPage/>} />
          <Route path='/breweries/:id' element={<BreweryDetailPage />} />
          <Route path='/profile' element={<ProfilePage/>} />
        </Route>
      </Routes>
    </>



  )
}

export default App
