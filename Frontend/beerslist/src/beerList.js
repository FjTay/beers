import React, { useContext } from 'react'
import BeerCard from './beerCard'
import ConnexionContext from './contexts'

function BeerList( {data, deleteBeer} ) {
    const { connexion } = useContext(ConnexionContext)

    return (
        <div id="beer-container">
            {data && data.map((beer, i) =>
                <BeerCard beer={beer} key={`beerCard${i}`} isOnline={connexion} deleteBeer={deleteBeer} />
            )}
        </div>
    )
}

export default BeerList