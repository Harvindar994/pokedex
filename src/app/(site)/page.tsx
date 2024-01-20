"use client";

import Image from "next/image";
import PokemonShowcase from "./components/PokemonShowcase";
import Section from "@/app/components/Section";
import { trpc } from '@/app/_trpc/client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

    const [recentPokemons, setRecentPokemons] = useState([])

    const getRecentPokemon = trpc.getRecent.useMutation({
      onSuccess: (success: any)=>{
        setRecentPokemons(success)
      },

      onError: (error)=>{
        toast.error("Unable to fetch showcase pokemon");
      }
    })

    useEffect(()=>{

      getRecentPokemon.mutate({limit: 20});

    }, [])

    return (
        <div>
            <PokemonShowcase/>
            <Section name="Recently added Pokemons" cards={recentPokemons}/>
        </div>
    );
}
