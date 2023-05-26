import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import ViewHomeProduct from '../views/ViewHomeProduct.js/ViewHomeProduct';



function ViewHomeProductPage() {
    return (
      <>
        <AppAppBar2/>
        <ViewHomeProduct/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(ViewHomeProductPage)