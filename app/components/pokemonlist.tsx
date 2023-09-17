import Link from "next/link";
import { useState, useEffect } from "react";
import sleep from "sleep-promise";

const fetchData = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
    await sleep(2000);
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error("error", error);
    return [];
  }
};

export default async function PokemonList() {
//   const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);

//   useEffect(() => {
//     fetchData().then((pokemons) => {
//       setPokemons(pokemons);
//     });
//   }, []);

    const pokemons = await fetchData();

  return (
    <ul className="list">
      {pokemons.map((pokemon: any) => {
        const urlArray = pokemon.url.split("/");
        const id = urlArray[urlArray.length - 2];
        return (
          <li key={pokemon.name} className="listItem">
            <Link href={`/pokemon/${id}`}>
              <img
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id.padStart(
                  3,
                  "0"
                )}.png`}
                alt=""
                width="200"
                height="200"
              />
            </Link>
            <div>
              <p>
                <span>#</span>
                {id.padStart(3, "0")}
              </p>
              <h5>{pokemon.name}</h5>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
