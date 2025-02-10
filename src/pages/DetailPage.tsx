import BeersDetail from '../components/BeerDetail'
import BeersFromBrew from '../components/BeersFromBrew';

function BeerDetailPage() {

    return (
        <>
            <BeersDetail />
                {/* <div className='self-center border-t-2 border-yellow-500 2xl:w-[1200px] xl:w-[900px] lg:w-[600px]'></div> */}
            <BeersFromBrew />
            {/* Composant bières de la même catégorie */}
        </>
    )
}

export default BeerDetailPage;