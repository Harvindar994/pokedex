import React from 'react';
import PokemonRow from '@/app/components/PokemonRow';
import DeletePokemon from './DeletePokemon';


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

interface Props{
    name: string,
    cards: Pokemon[],
    marginTop?: string,
    marginBottom?: string,
    onDelete: CallableFunction
}

const Section = (props: Props) => {
  return (
    <div className={`px-10 md:px-7 ${props.marginBottom ? props.marginBottom: 'pb-14'} ${props.marginTop ? props.marginTop: 'pt-14 md:pt-8'}`}>
        <h1 className="text-2xl font-bold pb-7 md:text-base">{props.name}</h1>
        {/* carousel carousel-center space-x-4 rounded-box */}
        {/* flex flex-wrap gap-4 sm:justify-center */}
        <div className="py-0 flex gap-2 carousel rounded-box">

            {
                props.cards.map((card: Pokemon)=>{
                    return <PokemonRow key={card.id} {...card}>
                        <DeletePokemon id={card.id} onDelete={props.onDelete}/>
                    </PokemonRow>
                })
            }

        </div>
    </div>
  )
}

export default Section;