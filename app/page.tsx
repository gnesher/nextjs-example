"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  console.log("if you see this, its rendered on client");

  const [pokemons, setPokemons] = useState<{name: string; url: string}[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=200"
        );
        const json = await response.json();
        setPokemons(json.results);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Pokemons</h1>
      <ul className="list">
      {pokemons.map((pokemon) => {
        const urlArray = pokemon.url.split('/');
        const id = urlArray[urlArray.length-2];
        return <li key={pokemon.name} className="listItem">
          <Link href={`/pokemon/${id}`} >
            <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${('000' + id).substr(-3)}.png`} alt='' width="200" height="200" />
          </Link>
          <div>
            <p >
              <span>#</span>{('000' + id).substr(-3)}
            </p>
            <h5>{pokemon.name}</h5>
          </div>
        </li>
      })}
      </ul>
    </main>
  );
}
