/*
  Warnings:

  - You are about to drop the column `pokemon_id` on the `pokemontype` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `PokemonType` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `pokemontype` DROP FOREIGN KEY `PokemonType_pokemon_id_fkey`;

-- AlterTable
ALTER TABLE `pokemontype` DROP COLUMN `pokemon_id`,
    ADD COLUMN `pokemonId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PokemonType_name_key` ON `PokemonType`(`name`);

-- AddForeignKey
ALTER TABLE `PokemonType` ADD CONSTRAINT `PokemonType_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
