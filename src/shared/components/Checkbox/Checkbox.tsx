import React from 'react';

const Checkbox = (props: any) => {
    return (
      <li>
       <input key={props.name} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
      </li>
    )
}

export default Checkbox;
