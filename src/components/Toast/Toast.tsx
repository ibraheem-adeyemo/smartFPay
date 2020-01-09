import React, {useState} from 'react';
import {Toast, ToastHeader, ToastBody} from 'reactstrap';

const CustomToast = (props: any) => {    
    const [toast, setToast] = useState(props.show);
    const toggleToast = () => setTimeout(()=>setToast(!toast), props.timeOut);

    return (
        <div style={{top: 0, left: 0}}>
            <Toast isOpen={toast}>
                <ToastHeader toggle={toggleToast}>Error</ToastHeader>
                <ToastBody>
                    {props.message}
                </ToastBody>
            </Toast>
        </div>
        
    )
}

export default CustomToast;
