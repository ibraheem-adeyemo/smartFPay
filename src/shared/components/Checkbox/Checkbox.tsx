import React from 'react';
import {Input} from 'reactstrap';

const Checkbox = (props: any) => {
    return (
      <li>
        {/* <Input key={props.name} type="checkbox" onChange={props.handleCheckFieldElement}/>{' '}
          {props.name} */}
       <input key={props.name} onChange={props.handleCheckFieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
      </li>
    )
}

export default Checkbox;
