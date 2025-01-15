
import './App.css'
import {
  Route,
  Routes
} from "react-router-dom";
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import MainLayout from './layout/MainLayout';
import BreweriesPage from './pages/BreweriesPage';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path='/beers/:id' element={<DetailPage/>} />
          <Route path='/breweries' element={<BreweriesPage/>} />
        </Route>
      </Routes>
    </>



  )
}

export default App
