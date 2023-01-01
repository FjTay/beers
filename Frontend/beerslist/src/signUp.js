import React, { useState, useCallback, useEffect } from 'react'
import FormField from './formField'
import axios from 'axios'

function SignUp( {loginFields} ) {

    const [newUser, setNewUser] = useState({})

    const handleChange = useCallback((fieldValue, fieldName, isValidated) => {
        setNewUser(old => ({...old, [fieldName] : {isValid: isValidated, value: fieldValue}}))
    }, [])

    const sendUser = () => {
        axios.post('http://localhost:5000/users/signUp', 
        newUser
        )
        .then((response) => {
            console.log("User successfully created")
        })
        .catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        Object.keys(loginFields)
            .forEach(key => 
                setNewUser(old => ({...old, 
                    [key]: {
                        value: "",
                        isValid: false
                    }
                }))
            ) 
    }, [loginFields])

  return (
    <div>
        <form>
            {
            Object.values(loginFields).map((field, i) => 
                <FormField key={`formField${i}`} field={field} handleChange={handleChange} />
            )
            }
        </form>
        <button 
            type='button' 
            onClick={() => sendUser()}
            disabled={!Object.values(newUser).every(val => val.isValid < 0)}
        >SEND NEW USER</button>
    </div>
  )
}

export default SignUp