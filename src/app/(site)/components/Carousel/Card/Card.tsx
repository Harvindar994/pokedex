import Image from 'next/image';
import React from 'react';
import styles from "./Card.module.scss";
import Category from './Category';
import randomColor from '@/app/components/randomColor';

interface PokemonType{
  id: number,
  name: string,
  pokemonId: number
}
interface Pokemon{
    name: string,
    sprite: string,
    createdAt: string,
    types: PokemonType[]
}

const image = "g";

const Card = (props: Pokemon) => {
  return (
    <div className={`carousel-item relative rounded-box overflow-hidden`} style={{backgroundColor: randomColor()}}>
        <img src={props.sprite} width="215px" height="215px" className="object-cover object-center" />
        <div className="absolute bottom-0 pt-10 left-0 p-5 w-full bg-gradient-to-t from-black/30 to-transparent">
          <p className="text-xl font-bold text-white">{props.name}</p>
          
          {/* I'm mapping out all the categories */}
          <div className="flex gap-1 pt-2">
            { props.types &&
              props.types.map((type:PokemonType)=>{
                return <Category key={type.id} name={type.name}/>;
              })
            }
          </div>
        </div>
    </div>
  )
}

export default Card;