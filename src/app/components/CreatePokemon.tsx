"use client";

import React, { useState } from 'react';
import Logo from './Logo';
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import { VscGithub } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { trpc } from '../_trpc/client';
import toast from 'react-hot-toast';
import TosterContext from './TosterContext';
import { json } from 'stream/consumers';
import {Cloudinary} from "@cloudinary/url-gen";
import uploadImages from './uploadImage';
import Link from 'next/link';

const CreatePokemon = () => {
    const [creatingPokemon, setCreatingPokemon] = useState(false);
    const createPokemon = trpc.createPokemon.useMutation({
        onError: (error)=>{
            if (error.data?.code === 'INTERNAL_SERVER_ERROR'){
                toast.error(error.message)
            }else{
                toast.error(JSON.parse(error.message)[0].message)
            }
        },

        onSuccess: (success) => {
            toast.success("Pokemon created Successfully");

            setPokemon({
                name: "",
                image: "",
                types: "",
            })
        },

        onSettled: ()=>{
            setCreatingPokemon(false);
        }
    });

    const [pokemon, setPokemon] = useState({
        name: "",
        image: "",
        types: "",
    })

    const handleChange = (event: any) => {
        const {name, value} = event.currentTarget;

        setPokemon({
            ...pokemon,
            [name]: value
        })
    }

    async function onSubmit(formData: FormData){
        setCreatingPokemon(true);
        try {

            const respose:any = await uploadImages(formData);

            if (!respose){
                toast.error("Unbale to upload image");
                setCreatingPokemon(false);
                return;
            }

            const newPokemon = {
                ...pokemon,
                image: respose.secure_url
            }

            createPokemon.mutate(newPokemon);
            
        } catch (error) {
            
            toast.error("Unable to create pokemon");
        } 
    }

    return (
        <dialog id="addPokemonPopup" className="modal">
            <TosterContext/>
            <div className="modal-box py-8 px-10 w-96">
                <div className="flex justify-center flex-col items-center gap-2 mt-10">
                    <Logo url='/logo.png' size={40}/>
                    <h1 className="text-xl font-bold">Create Pokemon</h1>
                </div>
                <form action={onSubmit} className="flex flex-col mt-8 mb-10">
                    <div className="flex flex-col gap-4">
                        <input onChange={handleChange} value={pokemon.name} name="name" type="text" placeholder="Name" className="input input-bordered w-full" />
                        <input onChange={handleChange} value={pokemon.types} name="types" type="text" placeholder="Types example, example, ..." className="input input-bordered w-full" />
                        <input onChange={handleChange} value={pokemon.image} name="image" type="file" className="file-input file-input-warning file-input-bordered w-full text-neutral-content" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-5 w-28 self-center">
                        {creatingPokemon ? <span className="loading loading-spinner loading-sm"></span> : "Create"}
                    </button>
                    <div className="text-xs cursor-pointer text-center mt-10">Connect with us on Social Media</div>
                    <div className="flex w-full justify-center gap-3 mt-3">
                        <Link target="_blank" href="https://wa.me/+919695806109" className="text-2xl"><button type="button" className="btn shadow-lg btn-square mt-4 text-lg"><FaWhatsapp /></button></Link>
                        <Link target="_blank" href="https://www.linkedin.com/in/harvindar-singh-653326212/" className="text-2xl"><button type="button" className="btn shadow-lg btn-square mt-4 text-lg"><FaLinkedinIn /></button></Link>
                        <Link target="_blank" href="https://github.com/Harvindar994" className="text-2xl"><button type="button" className="btn shadow-lg btn-square mt-4 text-lg"><VscGithub /></button></Link>
                        <Link target="_blank" href="https://harvindar.in" className="text-2xl"><button type="button" className="btn shadow-lg btn-square mt-4 text-lg"><IoEarthOutline /></button></Link>
                    </div>
                </form>
                <div className="modal-action absolute right-5 top-0">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-primary rounded-full btn-circle btn-sm"><IoClose/></button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default CreatePokemon;