"use client";

import React from 'react';
import Section from '@/app/components/Section';
import { trpc } from '@/app/_trpc/client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
    pokemon: Pokemon[]
}

const SearchResults = (props: Props) => {

    return (
        <div className={`px-10 md:px-7 pb-5 pt-14 md:pt-8`}>
            <h1 className="text-2xl font-bold pb-7 md:text-base">Search Results</h1>
            {/* carousel carousel-center space-x-4 rounded-box */}
            {/* flex flex-wrap gap-4 sm:justify-center */}
            <div className="flex flex-wrap gap-4 sm:justify-center">

                {
                    props.pokemon.map((card: Pokemon)=>{
                        return <PokemonRow key={card.id} {...card}/>
                    })
                }

            </div>
        </div>
    );
}

export default SearchResults;