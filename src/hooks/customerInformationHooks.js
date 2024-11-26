import React, { useRef} from 'react';

export const userCustometInfo = () => {

    let submitFormRef = useRef(null);

    const handleCreateCustomerFormSubmit = (formValue) => {
        console.log(formValue)
        if (submitFormRef.current) {
            submitFormRef.current.submitForm()
        }
    }
    return {
        submitFormRef,
        handleCreateCustomerFormSubmit
    }
}