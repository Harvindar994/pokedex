"use client";

import { useState } from 'react';
import Category from './Category';

interface Props{
  types: string[],
  onTypeChnage: Function,
  loadingPokemon: string
}

const Categories = (props: Props) => {
  const [activeCategory, setAvtiveCategory] = useState("All");

  function onTypeChnage(type: string){
    setAvtiveCategory(type);
    props.onTypeChnage(type);
  }

  return (
    <div className="py-8 flex gap-2 carousel rounded-box">
      {
        props.types.map((category, index)=>{
          return <Category isLoading={category === props.loadingPokemon} onClick={onTypeChnage} isActive={category === activeCategory} key={index} name={category}/>;
        })
      }
    </div>
  )
}

export default Categories;