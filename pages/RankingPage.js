import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import Ranking from '../views/RankingPage/Ranking';

function RankingPage() {
    return (
      <>
        <AppAppBar2/>
        <Ranking/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(RankingPage)
