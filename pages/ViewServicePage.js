import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import CreatedServices from '../views/ViewServicePage/CreatedServices';
import DeliveringServices from '../views/ViewServicePage/DeliveringServices';





function CreateServicePage1() {
    return (
      <>
        <AppAppBar2/>
        <CreatedServices/>
        <DeliveringServices/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(CreateServicePage1)