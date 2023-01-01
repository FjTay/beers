import React, {useEffect, useState, useCallback, useContext} from 'react'
import FormField from './formField'
import axios from 'axios';
import ConnexionContext from './contexts';

function BeerCreator({ formFields, updateBeerList }) {

    const [newBeer, setnewBeer] = useState({})
    const { connexion } = useContext(ConnexionContext)

    const handleChange = useCallback((fieldValue, fieldName, isValidated) => {
        setnewBeer(old => ({...old, [fieldName] : {isValid: isValidated, value: fieldValue}}))
    }, [])

    const sendBeer = () => {
        axios.post(
            'http://localhost:5000/beers', 
            newBeer, 
            {
                headers: {
                    "x-access-token" : localStorage.getItem("token")
                }
            }
        )
        .then((response) => {
            console.log(response.data.createdID)
            updateBeerList({...newBeer, id: {isValid: -1, value: response.data.createdID}})
        })
        .catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        Object.keys(formFields)
            .forEach(key => 
                setnewBeer(old => ({...old, 
                    [key]: {
                        value: "",
                        isValid: false
                    }
                }))
            ) 
    }, [formFields])

  return (
    <>
        {!connexion ? 
            <h3>You need to be logged in to create a beer</h3> : 
            <>
            <form>
                {
                Object.values(formFields).map((field, i) => 
                    <FormField key={`formField${i}`} field={field} handleChange={handleChange} />
                )
                }
            </form>
            <button 
                type='button' 
                onClick={() => sendBeer()}
                disabled={!Object.values(newBeer).every(val => val.isValid < 0)}
            >SEND NEW BEER</button>
            </>
        }
    </>
  )
}

export default BeerCreator