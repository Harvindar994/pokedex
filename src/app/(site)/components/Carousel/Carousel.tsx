'use client';

import React, { useState } from 'react'
import Categories from './Categories/Categories';
import Card from './Card/Card';
import { trpc } from '@/app/_trpc/client';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import DeletePokemon from '@/app/components/DeletePokemon';

interface PokemonType{
  id: number,
  name: string,
  pokemonId: number
}
interface Pokemon{
    id: number,
    name: string,
    sprite: string,
    createdAt: string,
    types: PokemonType[]
}

const Carousel = () => {
    const [pokemons, setPokemons] = useState([]);
    const [activeType, setActiveType] = useState('All');
    const [loadingPokemon, setLoadingPokemon] = useState('All')

    let types = trpc.getTypes.useQuery();

    // let's filter teh types;
    let _types = ['All', ]
    if (types.data){
      types.data.map(type => _types.push(type.name));
    }

    const getPokemon = trpc.getByTypes.useMutation({
      onSuccess: (success:any)=>{
        setPokemons(success)
      },

      onError: (error)=>{
        toast.error("Unable to fetch showcase pokemon");
      },

      onSettled: ()=>{
        setLoadingPokemon("");
      }
    })

    useEffect(()=>{

      getPokemon.mutate({pokemonType: "All"});

    }, [])

    function reload(){
      getPokemon.mutate({pokemonType: activeType});
    }

    function onchange(name: string){
        setActiveType(name);
        setLoadingPokemon(name);
        getPokemon.mutate({pokemonType: name});
    }

    return (
        <div className="px-10 md:px-7">
            {types && <Categories loadingPokemon={loadingPokemon} onTypeChnage={onchange} types={_types}/>}
            <div className="carousel carousel-center space-x-4 rounded-box">
            
                {/* maping all the cards */}
                {   pokemons &&
                    pokemons.map((card:Pokemon)=>{
                        return <Card key={card.id} sprite={card.sprite} name={card.name} types={card.types} createdAt={card.createdAt}>
                          <DeletePokemon onDelete={reload} id={card.id} pokemons={pokemons} setPokemons={setPokemons}/>
                        </Card>
                    })
                }
                
            </div>
        </div>
    )
}

export default Carousel