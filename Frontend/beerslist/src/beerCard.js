import React from 'react'
import { useNavigate } from 'react-router-dom'

function BeerCard( {beer, deleteBeer, isOnline} ) {

    const navigate = useNavigate()

    return (
        <div className="beer-card">
        {console.log("RENDER de la BeerCard")}
            <h3 onClick={() => navigate(`${beer.id}`)}>{beer.name}</h3>
            {isOnline && (isOnline.isAdmin ? 
                <button onClick={() => deleteBeer(beer.id)}>Delete Beer</button> :
                <button onClick={() => console.log(beer.id)}>Add to favs</button>)
            }
        </div>
    )
}

export default React.memo(BeerCard)