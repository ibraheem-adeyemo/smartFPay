import React from 'react';

const Checkbox = (props: any) => {
    return (
      <li>
       <input key={props.name} onChange={props.handleCheckFieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
      </li>
    )
}

export default Checkbox;
