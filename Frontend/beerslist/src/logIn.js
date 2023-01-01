import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from './formField'
import axios from 'axios'
import ConnexionContext from './contexts'

function LogIn( {loginFields} ) {

    const [logInData, setLogInData] = useState({})
    const { connexion, setConnexion } = useContext(ConnexionContext)

    const logInFields = {
        email: loginFields.email,
        password : loginFields.password
    }
    const navigate = useNavigate()

    const handleChange = useCallback((fieldValue, fieldName, isValidated) => {
        setLogInData(old => ({...old, [fieldName] : {isValid: isValidated, value: fieldValue}}))
    }, [])

    axios.defaults.withCredentials = true

    const logIn = () => {
        axios.post('http://localhost:5000/users/logIn', 
        logInData
        )
        .then((response) => {
            console.log(response.data)
            if(response.data.auth) {
                setConnexion(response.data.user)
                localStorage.setItem("token", response.data.token)
            } else {
                setConnexion(false)
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const logOut = () => {
        axios.get('http://localhost:5000/users/logout')
        .then(res => {
            console.log(res.data.message)
            setConnexion(false)
            navigate("/")
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        Object.keys(logInFields)
            .forEach(key => 
                setLogInData(old => ({...old, 
                    [key]: {
                        value: "",
                        isValid: false
                    }
                }))
            ) 
    }, [loginFields])

    useEffect(() => {
        axios.get('http://localhost:5000/users/logIn')
        .then(response => {
            if(response.data.loggedIn) {
                setConnexion(response.data.user)
                console.log(response.data.message)
            } else {
                console.log(response.data.message)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const userAuthenticated = () => {
        axios.get('http://localhost:5000/users/auth', {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }})
            .then(response => 
                console.log(response)
        )
    }

  return (
    <div>
        <form>
            {
                Object.values(logInFields).map((field, i) => {
                    return <FormField key={`formField${i}`} field={field} handleChange={handleChange} />
                })
            }
        </form>
        <button 
            type='button' 
            onClick={() => logIn()}
            disabled={connexion || !Object.values(logInData).every(val => val.isValid < 0)}
        >LOG IN</button>
        <button 
            type='button' 
            onClick={() => logOut()}
            disabled={!connexion}
        >LOG OUT</button>
        <button 
            type='button' 
            onClick={() => userAuthenticated()}
        >CHECK AUTH</button>
    </div>
  )
}

export default LogIn