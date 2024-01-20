"use client";

import React, { useEffect } from 'react';
import Carousel from './Carousel/Carousel';
import Header from '@/app/components/Header';
import { useState } from 'react';
import { trpc } from '@/app/_trpc/client';
import toast from 'react-hot-toast';


const PokemonShowcase = () => {
  
    return (
      <div className="">
          <Carousel/>
      </div>
    )
}

export default PokemonShowcase;