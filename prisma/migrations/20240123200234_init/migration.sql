-- DropForeignKey
ALTER TABLE "PokemonType" DROP CONSTRAINT "PokemonType_pokemonId_fkey";

-- AddForeignKey
ALTER TABLE "PokemonType" ADD CONSTRAINT "PokemonType_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
