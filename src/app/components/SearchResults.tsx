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
        <Section name="Search Results" cards={props.pokemon} marginBottom="md:mb-5"/>
    );
}

export default SearchResults;