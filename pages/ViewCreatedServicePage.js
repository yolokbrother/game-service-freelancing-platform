import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import CreatedServiceView from '../views/ViewServicePage/CreatedServiceView';


function ViewCreatedServicePage() {
    return (
      <>
        <AppAppBar2/>
        <CreatedServiceView/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(ViewCreatedServicePage)