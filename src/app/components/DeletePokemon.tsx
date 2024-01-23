import React, { useState } from 'react';
import { trpc } from '@/app/_trpc/client';
import { MdDelete } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';

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

interface Props{
    id: number,
    pokemons?: Pokemon[],
    setPokemons?: any,
    onDelete?: CallableFunction,
}

const DeletePokemon = (props: Props) => {
    const [deleting, setDeleting] = useState(false);

    const deletePokemon =  trpc.deletePokemon.useMutation({
        onSuccess: (success)=>{

            if (props.pokemons){
                for (var index in props.pokemons){
                    if (props.pokemons[index].id === props.id){
                        const pokemons = [...props.pokemons]
                        pokemons.splice(parseInt(index), 1);
                        props.setPokemons(pokemons);
                        break;
                    }
                }
            }
            
            if (props.onDelete){
                props.onDelete();
            }
        },

        onError: (error)=>{
            toast.error("Unable to delete Pokemon");
        },

        onSettled: ()=>{
            setDeleting(false);
        }
    })

    function  onDelete(){
        setDeleting(true);

        deletePokemon.mutate({
            id: props.id
        })
    }

    return (
        <div className="absolute top-3 right-3">
            <div className="btn btn-error glass btn-circle btn-sm text-base" onClick={onDelete}>
                {deleting ? <span className="loading loading-spinner loading-xs"></span> : <MdDeleteOutline />}
            </div>
        </div>
    )
}

export default DeletePokemon;