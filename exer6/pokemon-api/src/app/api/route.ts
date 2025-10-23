import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get total number of Pokemon (there are 1010 Pokemon in the API)
    const totalPokemon = 1010;
    const randomId = Math.floor(Math.random() * totalPokemon) + 1;
    
    // Fetch random Pokemon data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    
    if (!data || !data.name) {
      return NextResponse.json(
        { error: 'Invalid Pokemon data received' },
        { status: 400 }
      );
    }
    
    // Extract name, sprite, and types
    const pokemonData = {
      name: data.name,
      sprite: data.sprites.front_default,
      type: data.types.map((type: any) => type.type.name)
    };
    
    return NextResponse.json(pokemonData, { status: 200 });
  } catch (error) {
    console.error('Error fetching random Pokemon:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
