import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import ViewDeliveringServiceView from '../views/ViewServicePage/ViewDeliveringServiceView';


function ViewCreatedServicePage() {
    return (
      <>
        <AppAppBar2/>
        <ViewDeliveringServiceView/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(ViewCreatedServicePage)