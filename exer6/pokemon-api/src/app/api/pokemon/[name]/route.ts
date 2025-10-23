import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    
    if (!name) {
      return NextResponse.json(
        { error: 'Pokemon name is required' },
        { status: 400 }
      );
    }
    
    // Fetch Pokemon data by name
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Pokemon not found' },
        { status: 400 }
      );
    }
    
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
    console.error('Error fetching Pokemon:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
