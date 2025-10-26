import { NextRequest, NextResponse } from 'next/server';

interface PokemonStat {
  base_stat: number;
}

interface PokemonType {
  type: {
    name: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pokemon1, pokemon2 } = body;
    
    if (!pokemon1 || !pokemon2) {
      return NextResponse.json(
        { error: 'Both pokemon1 and pokemon2 are required' },
        { status: 400 }
      );
    }
    
    // Fetch data for both Pokemon
    const [pokemon1Response, pokemon2Response] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1.toLowerCase()}`),
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.toLowerCase()}`)
    ]);
    
    if (!pokemon1Response.ok || !pokemon2Response.ok) {
      return NextResponse.json(
        { error: 'One or both Pokemon not found' },
        { status: 400 }
      );
    }
    
    const [pokemon1Data, pokemon2Data] = await Promise.all([
      pokemon1Response.json(),
      pokemon2Response.json()
    ]);
    
    if (!pokemon1Data || !pokemon2Data) {
      return NextResponse.json(
        { error: 'Invalid Pokemon data received' },
        { status: 400 }
      );
    }
    
    // Calculate base stat totals for both Pokemon
    const pokemon1Stats = pokemon1Data.stats.reduce((total: number, stat: PokemonStat) => total + stat.base_stat, 0);
    const pokemon2Stats = pokemon2Data.stats.reduce((total: number, stat: PokemonStat) => total + stat.base_stat, 0);
    
    // Determine the winner
    let winner;
    if (pokemon1Stats > pokemon2Stats) {
      winner = {
        name: pokemon1Data.name,
        sprite: pokemon1Data.sprites.front_default,
        type: pokemon1Data.types.map((type: PokemonType) => type.type.name),
        totalStats: pokemon1Stats
      };
    } else if (pokemon2Stats > pokemon1Stats) {
      winner = {
        name: pokemon2Data.name,
        sprite: pokemon2Data.sprites.front_default,
        type: pokemon2Data.types.map((type: PokemonType) => type.type.name),
        totalStats: pokemon2Stats
      };
    } else {
      // Tie - return both Pokemon
      winner = {
        name: 'Tie',
        pokemon1: {
          name: pokemon1Data.name,
          sprite: pokemon1Data.sprites.front_default,
          type: pokemon1Data.types.map((type: PokemonType) => type.type.name),
          totalStats: pokemon1Stats
        },
        pokemon2: {
          name: pokemon2Data.name,
          sprite: pokemon2Data.sprites.front_default,
          type: pokemon2Data.types.map((type: PokemonType) => type.type.name),
          totalStats: pokemon2Stats
        }
      };
    }
    
    return NextResponse.json(winner, { status: 200 });
  } catch (error) {
    console.error('Error in battle:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
