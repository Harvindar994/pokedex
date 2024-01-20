import React from 'react';
import PokemonRow from '@/app/components/PokemonRow';


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
}

const Section = (props: Props) => {
  return (
    <div className={`px-10 md:px-7 ${props.marginBottom ? props.marginBottom: 'pb-14'} ${props.marginTop ? props.marginTop: 'pt-14 md:pt-8'}`}>
        <h1 className="text-2xl font-bold pb-7 md:text-base">{props.name}</h1>
        {/* carousel carousel-center space-x-4 rounded-box */}
        <div className="flex flex-wrap gap-4 sm:justify-center">

            {
                props.cards.map((card: Pokemon)=>{
                    return <PokemonRow key={card.id} {...card}/>
                })
            }

        </div>
    </div>
  )
}

export default Section;