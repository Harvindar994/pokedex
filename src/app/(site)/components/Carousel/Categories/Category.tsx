import React from 'react';

interface Props{
    name: string,
    isActive: boolean,
    onClick: Function
}

const Category = (props: Props) => {
  return (
    <div onClick={()=> props.onClick(props.name)} className={`md:text-sm md:px-3 md:py-1 md:rounded-md px-5 py-3 rounded-xl font-semibold inline cursor-pointer hover:bg-neutral-content hover:bg-opacity-5 ${props.isActive && 'bg-neutral-content bg-opacity-5'}`}>
        {props.name}
    </div>
  )
}

export default Category;