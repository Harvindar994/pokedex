import React from 'react';

interface Props{
    name: string,
    isActive: boolean,
    onClick: Function,
    isLoading: boolean
}

const Category = (props: Props) => {
  return (
    <div onClick={()=> props.onClick(props.name)} className={`relative md:text-sm md:px-3 md:py-1 px-5 py-3 md:rounded-md rounded-xl font-semibold inline cursor-pointer hover:bg-neutral-content hover:bg-opacity-5 ${props.isActive && 'bg-neutral-content bg-opacity-5'}`}>
        {props.name}
        <div className="absolute w-full h-full top-0 left-0 md:rounded-md rounded-xl overflow-hidden">
          {props.isLoading && 
            <progress className="progress w-full absolute bottom-0 left-0 rounded-none h-1 md:h-0.5"></progress>
          }
        </div>
    </div>
  )
}

export default Category;