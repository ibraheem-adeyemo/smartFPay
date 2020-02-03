import React, {useState} from 'react';
import CardDetails from './CardDetails/CardDetails';
import SetLimit from './SetLimit/SetLimit';

const Cards = () => {
    const [showLimitForm, setShowLimitForm] = useState(false);
    const setLimit = () => {
        console.log('Set Limit');
    }
    return (
        <div>
            <SetLimit />
            <CardDetails setLimit={setLimit}/>
        </div>
    );
}

export default Cards;
