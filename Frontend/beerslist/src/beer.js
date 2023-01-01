import React, {useContext, useEffect, useMemo, useState} from 'react'
import ConnexionContext from './contexts'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Beer({ data, deleteBeer }) {

    const {beerID} = useParams()
    const beer = data.find(beer => beer.id === parseInt(beerID), 10)
    const { connexion } = useContext(ConnexionContext)
    const [comments, setComments] = useState([])
    const beerBody = useMemo(() =>
        <>
            {console.log("-- Render Du BEER BODY")}
            <h2>{beer.name}</h2>
            <h3>{beer.brewers_tips}</h3>
            <h3>{beer.contributed_by}</h3>
            <h3>{beer.description}</h3>
            <h3>{beer.tagline}</h3>
            {connexion && (connexion.isAdmin ? 
                <button onClick={() => deleteBeer(beer.id)}>Delete Beer</button> :
                <button onClick={() => console.log(beer.id)}>Add to favs</button>)
            }
            {connexion &&
                <button onClick={() => setComments(old => old + 1)}>Leave Comment</button>
            }
        </>, [beer]
    )

    useEffect(() => {
        axios.get(`http://localhost:5000/comments/${beerID}`)
        .then(res => {
            console.log(res)
            setComments([res.data.comments])}
        ).catch(err => 
            console.log(err)
        )
    }, [])

    return (
        <div id="beer-container">
            {beerBody}
            <textarea onChange={(e) => setComments(e.target.value)}></textarea>
            <div>
                {!comments.length ? 
                    <p>...loading</p> :
                    comments.map((comment, index) => 
                        <div key={`comment${index}`}>
                            <h4>{comment.lastName} wrote :</h4>
                            <p>{comment.content}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Beer