import React, { useState, useRef } from "react";

export const usePaymentControl = () => {
    const [btnIsDisabled, setBtnIsDisabled] = useState(true);
    const [limit, setLimit] = useState('')

    
    let submitFormRef = useRef(null);

    const enableBtn = () => {
        setBtnIsDisabled(false)
    }

    const  switchControl = (control) => {
        setLimit(control)
        enableBtn()
    }

    const handleControlSubmit = (obj) => {
        if (submitFormRef.current) {
            submitFormRef.current.submitForm()
        }
    }

    const disableBtn = () => {
        setBtnIsDisabled(true)
    }
    return { 
        btnIsDisabled, 
        limit,
        enableBtn,
        submitFormRef,
        disableBtn,
        handleControlSubmit,
        switchControl
    }
}