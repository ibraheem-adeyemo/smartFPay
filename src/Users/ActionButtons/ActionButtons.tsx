import React from 'react';
import RolesList from '../../Roles/RolesList/RolesList';
import { Button } from 'reactstrap';
import './ActionButtons.css';

const ActionButtons = () => {
    return (
        <div className='action-group'>
            <RolesList />
            <Button color='secondary'>Unassign</Button>
        </div>
    )
}

export default ActionButtons;