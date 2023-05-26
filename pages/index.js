import HeroBanner from '../views/indexPage/HeroBanner';
import AppAppBar from '../views/indexPage/AppAppBar'
import withRoot from './withRoot';
import HomePageInfo from '../views/indexPage/HomePageInfo';
import HomePageHowToWork from '../views/indexPage/HomePageHowToWork';
import Appfooter from '../views/indexPage/Appfooter';


function Home() {
  return (
    <>
      <AppAppBar/>
      <HeroBanner/>
      <HomePageInfo/>
      <HomePageHowToWork/>
      <Appfooter/>
    </>
  )
}

export default withRoot(Home)
