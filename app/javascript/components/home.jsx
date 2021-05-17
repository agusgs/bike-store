import React from 'react'
import AppContext from "./context";
import {ProductsSelection} from "./productsSelection";


function Home(){
    return (
        <AppContext>
            <ProductsSelection/>
        </AppContext>
    )
}

export default Home