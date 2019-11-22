import React from 'react';
import {Card} from 'reactstrap';
import './LimitCard.css';

interface LimitCardProps {
    limitTitle: string,
    limit: string,
    limitDuration: string
}

const LimitCard = (props: LimitCardProps) => {
    return (
        <Card body>
            <span>{props.limitTitle}</span>
            <span>{props.limit}</span>
            <span className="smaller">{props.limitDuration}</span>
        </Card>
    )
}

export default LimitCard;