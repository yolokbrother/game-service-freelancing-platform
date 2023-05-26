import React from 'react'
import withRoot from '../withRoot';
import AppAppBar2 from '../../views/HomePage/AppAppBar2';
import AppFooter2 from '../../views/HomePage/Appfooter2';
import CreateServiceForm2 from '../../views/CreateServicePage/CreateServiceForm2';




function CreateServicePage1() {
    return (
      <>
        <AppAppBar2/>
        <CreateServiceForm2/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(CreateServicePage1)