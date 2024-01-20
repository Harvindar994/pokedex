import { Pokemon } from "@/app/DataValidation/Pokemon";
import { publicProcedure, router } from "./trpc";
import z from 'zod';
import prisma from "@/server/Components/client";

export const appRouter = router({
  createPokemon: publicProcedure.input(Pokemon).mutation(async (otps) => {

    try {
        // let's split types.
        const types = otps.input.types.split(",").filter(type => {

          if (type.trim().replace(/(^[,\s]+)|([,\s]+$)/g, '').length === 0){
            return false;
          }

          return true;

        }).map(type => {

          return {'name': type.trim().replace(/(^[,\s]+)|([,\s]+$)/g, '')};

        });

        const respose = await prisma.pokemon.create({
          data: {
            name: otps.input.name,
            sprite: otps.input.image,
            types: {
              createMany: {
                data: types,
                skipDuplicates: true
              }
            } 
          }
        });

        return respose;

    } catch (error) {
      throw Error("Unable to create Pokemon.")
    }
  }),

  getPokemon: publicProcedure.input(z.object({bulbasaur: z.string()})).mutation(async (opts)=>{
    
    if (!opts.input.bulbasaur.includes(",")){
      opts.input.bulbasaur += ",";
    }

    const types = opts.input.bulbasaur.split(",").filter(type => {

        if (type.trim().replace(/(^[,\s]+)|([,\s]+$)/g, '').length === 0){
          return false;
        }

        return true;

      }).map(type => {

        return {'name': {'contains': type.trim().replace(/(^[,\s]+)|([,\s]+$)/g, '')}};

      });

      const respose = prisma.pokemon.findMany({
        where: {
          OR: types
        },
        include: {
          types: true
        }
      })

      console.log(respose);
      return respose;
    
  }),
  
  getRecent: publicProcedure.input(z.object({limit: z.number()})).mutation(async (opts)=>{

    const respose = prisma.pokemon.findMany({
      orderBy: {
        id: 'desc'
      },
      take: opts.input.limit,
      include: {
        types: true
      }
    })

    return respose;
      
  }),

  getByTypes: publicProcedure.input(z.object({pokemonType: z.string()})).mutation(async (opts)=>{

    if (opts.input.pokemonType === "All"){
      const respose = await prisma.pokemon.findMany({
        orderBy: {
          id: 'desc'
        },
        take: 20,
        include: {
          types: true
        }
      })

      return respose;
    }
    else{

      const respose = await prisma.pokemonType.findMany({
        where: {
          name: opts.input.pokemonType
        },
        include: {
          Pokemon: true,
        },
      })

      const result = respose.map((type)=>{
          return type.Pokemon.id;
      })

      const pokemons = await prisma.pokemon.findMany({
        where: {
          id: { in: result },
        },
        include: {
          types: true
        }
      })

      return pokemons;
    }
  }),

  getTypes: publicProcedure.query(async ()=>{

    const respose = prisma.pokemonType.findMany({
      where:{},
      distinct: ['name']
    })

    return respose;
      
  }),
});

export type AppRouter = typeof appRouter;