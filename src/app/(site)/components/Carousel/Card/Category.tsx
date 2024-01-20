import React from 'react';

interface Props{
    name: string
}

const Category = (props: Props) => {
  return (
    <p className="text-xs bg-black bg-opacity-50 px-3 py-1 rounded-md text-white">{props.name}</p>
  )
}

export default Category