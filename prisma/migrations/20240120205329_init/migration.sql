-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sprite" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonId" INTEGER,

    CONSTRAINT "PokemonType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PokemonType" ADD CONSTRAINT "PokemonType_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
