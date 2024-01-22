"use client";

import Image from "next/image";
import PokemonShowcase from "./components/PokemonShowcase";
import Section from "@/app/components/Section";
import { trpc } from '@/app/_trpc/client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PokemonRow from "../components/PokemonRow";

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

export default function Home() {

    const [recentPokemons, setRecentPokemons] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnded, setIsEnded] = useState(false);

    const getRecentPokemon = trpc.getRecent.useMutation({
      onSuccess: (success: any)=>{
        setRecentPokemons(success);
      },

      onError: (error)=>{
        toast.error("Unable to fetch showcase pokemon");
      }
    })

    const getByOffset = trpc.getPokemonByOffset.useMutation({
      onSuccess: (success: any)=>{
        setPokemons(pokemons.concat(success.pokemons));
        setIsEnded(success.isEnded);
      },

      onError: (error)=>{
        toast.error("Unable to fetch pokemon");
      },

      onSettled: ()=>{
        setIsLoading(false);
      }
    })

    useEffect(()=>{

      getRecentPokemon.mutate({limit: 20});

      getByOffset.mutate({
        limit: 10,
        fetched: pokemons.length
      });

    }, [])

    function onLoadMore(){

      if (!isEnded && !isLoading){
        setIsLoading(true);
        
        getByOffset.mutate({
          limit: 10,
          fetched: pokemons.length
        });
      }
    }

    return (
        <div>
            <PokemonShowcase/>
            <Section name="Recently added Pokemons" cards={recentPokemons} marginBottom="pb-0"/>
            <div className={`px-10 md:px-7 pb-14 pt-14 md:pt-8 flex flex-col`}>
              <h1 className="text-2xl font-bold pb-7 md:text-base">All Pokemons</h1>
              {/* carousel carousel-center space-x-4 rounded-box */}
              {/* flex flex-wrap gap-4 sm:justify-center */}
              <div className="flex flex-wrap gap-4 sm:justify-center">

                  {
                      pokemons.map((card: Pokemon)=>{
                          return <PokemonRow key={card.id} {...card}/>
                      })
                  }

              </div>
              {
                pokemons.length > 0 && !isEnded && 
                <button className="btn btn-primary self-center mt-10" onClick={onLoadMore}>
                  {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Load More"}
                </button>
              }
          </div>
        </div>
    );
}
