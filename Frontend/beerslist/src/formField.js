import React, { useState } from 'react'

function FormField({ field, handleChange }) {
    const [fieldValue, setFieldValue] = useState("")
    const onChange = (value) => {
        handleChange(value, field.name, fieldValidator(value))
        setFieldValue(value)
    }

    const fieldValidator = (value) => {
        return field.regexps.findIndex(reg => !new RegExp(reg).test(value))
    }

    return (
            <div className="formField">
                {console.log("FormField Render")}
                <label>{field.frontName}</label>
                <input
                    type={field.inputType} 
                    name={field.name} 
                    onChange={(e) => onChange(e.target.value)}  
                ></input>
                <div className="formMsgArea">
                <span>{fieldValue && fieldValidator(fieldValue) >= 0 && field.errorMsg[fieldValidator(fieldValue)]}</span>
                </div>
            </div>
    )
}

export default React.memo(FormField)