'use client'

import { useState, useEffect } from "react";
import _ from 'lodash';
import Link from "next/link";

export default function Pokemon(props: { params: {id: string} }) {

  const [pokemon, setPokemon] = useState({} as any);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${props.params.id}`
        );
        const json = await response.json();
        setPokemon(json);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchData();
  }, []);


    console.log('if you see this, its rendered on client');

    return( 
      <>
      <h1>{pokemon.name}</h1>
      <div style={{display:"flex"}} >
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${('000' + pokemon.id).substr(-3)}.png`} alt='' width="200" height="200" />
        <div>
          <ul>
            <li>Weight: {pokemon.weight}</li>
            <li>Heiight: {pokemon.height}</li>
            <li>Base Stats:
              <ul>
                {_.map(pokemon.stats, (stat: any) => 
                  <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <Link href="/">Back</Link>
      </>)
  }