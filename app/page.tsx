import { Suspense } from "react";
import PokemonList from "./components/pokemonlist";

import Loader from "./components/loader";
import React from "react";

export default function Home() {
  console.log("if you see this, its rendered on client");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Pokemons</h1>
      <PokemonList />
    </main>
  );
}
