import React from 'react';
import randomColor from './randomColor';

interface Type{
    id: number,
    name: string,
    pokemonId: number
}

interface Pokemon{
    id: number,
    name: string,
    sprite: string,
    createdAt: string,
    types: Type[]
}

const PokemonRow = (props: Pokemon) => {
  return (
    <div style={{width: "217px"}} className="card bg-base-100 carousel-item border-neutral-content border-opacity-10 border flex flex-col">
        <figure className="h-full" style={{backgroundColor: randomColor()}}><img className="h-fullobject-cover w-full" src={props.sprite} alt="Shoes" /></figure>
        <div className="card-body px-4 py-4 h-1/2">
            <h2 className="card-title mb-2 text-sm">
                {props.name}
                <div className="badge badge-secondary text-xs">{props.id}</div>
            </h2>
            
            <div className="card-actions">
                {
                    props.types.map((type: Type)=>{
                        return <div key={type.id} className="badge badge-outline py-2px-2 text-xs">{type.name}</div>;
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default PokemonRow;