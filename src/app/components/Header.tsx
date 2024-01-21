"use client";

import React, { useState } from 'react';
import Logo from './Logo';
import { IoMdSearch } from "react-icons/io";
import CreatePokemon from './CreatePokemon';
import { trpc } from '../_trpc/client';
import SearchResults from './SearchResults';
import toast from 'react-hot-toast';
import "./Header.scss";
import { IoClose } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { CgMenuRight } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setSaerching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const [isMobileSearchActive, setMobileSearchActive] = useState(false);
  
  const getPokemon = trpc.getPokemon.useMutation({
    onSuccess: (success: any)=>{
      
      if (success.length == 0){
        toast.error("No result found");
      }
      else if(success.length > 0){
        setSearchResult(success);
      }
      setSaerching(false);
    },

    onError: (error)=>{
      setSaerching(false);
    },

    onSettled: ()=>{
      setSaerching(false);
    }
  })

  function openPokemonForm(){
    const popup:any = document.getElementById('addPokemonPopup');
    popup.showModal();
  }

  async function onSearch(event: any){
      if (event)
        event.preventDefault();

      if (!isSearching){

        setSaerching(true);

        getPokemon.mutate({bulbasaur: searchQuery});

      }
  }

  return (
    <div className='flex flex-col'>
      <div className="flex bg-base-200 py-5 px-10 md:px-7 md:py-4 border-b-4 border-base-300 border-opacity-30 relative">

          {/* adding a popup to create pokemon */}
          <CreatePokemon/>

          {/* logo here */}
          <Logo url='/logo.png' size={40} showName/>
          
          {/* action buttons */}
          <div className="flex items-center border-l-2 self-center border-neutral-content border-opacity-20 ml-7 h-8 md:hidden">
              <div className="px-7 cursor-pointer" onClick={openPokemonForm}>Create</div>
          </div>

          {/* mobile serach form */}
          {isMobileSearchActive && <form className="MobileSearch bg-base-200" onSubmit={onSearch}>
              <button type="button" onClick={()=>{setMobileSearchActive(false)}}><IoClose/></button>
              <div className="border border-neutral-content h-6 border-opacity-20 mr-5"></div>
              <input type="text" onChange={(event)=>{
                setSearchQuery(event.currentTarget.value);
                if (event.currentTarget.value.length == 0){
                  setSearchResult([]);
                }
              }} value={searchQuery} className="text-sm" placeholder="Search Separated with , or single name" name="search" />
              <button type="submit"><FaArrowRightLong/></button>
          </form>}

          <div className="MobileMenu text-xl">
              <button onClick={()=>{setMobileSearchActive(true)}}><IoSearch/></button>
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-sm w-10 m-1 text-xl shadow-md"><CgMenuRight/></div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-xl w-52">
                  <li onClick={openPokemonForm}><a>Create</a></li>
                  <li>
                    <a>
                      <p>Change Theme</p>
                      <label className="swap swap-rotate">

                          {/* this hidden checkbox controls the state */}
                          <input type="checkbox" className="theme-controller" value="dark"/>
                          
                          {/* sun icon */}
                          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                          
                          {/* moon icon */}
                          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                      
                      </label>
                      </a>
                  </li>
                </ul>
              </div>
          </div>

          {/* a form to search items */}
          <form className="flex items-center gap-2 flex-1 justify-center md:hidden" onSubmit={onSearch}>
              <input onChange={(event)=>{
                setSearchQuery(event.currentTarget.value);
                if (event.currentTarget.value.length == 0){
                  setSearchResult([]);
                }
              }} value={searchQuery} type="text" placeholder="Search Separated with , or single name" className="input input-bordered w-1/4 lg:w-8/12 xl:w-8/12 2xl:w-5/12"/>
              
              <button type="submit" className="btn btn-primary text-xl ">
                {isSearching ? <span className="loading loading-spinner loading-sm"></span> : <IoMdSearch />}
              </button>
          </form>
          
          {/* a button to change theme (dark & light) */}
          <label className="swap swap-rotate md:hidden">

              {/* this hidden checkbox controls the state */}
              <input type="checkbox" className="theme-controller" value="dark" />
              
              {/* sun icon */}
              <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              
              {/* moon icon */}
              <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
          
          </label>
      </div>

      {searchResult && searchResult.length > 0 ? <SearchResults pokemon={searchResult}/> : null}
    </div>
  )
}

export default Header;