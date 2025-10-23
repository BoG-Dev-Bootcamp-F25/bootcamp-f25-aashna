import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    
    if (!type) {
      return NextResponse.json(
        { error: 'Pokemon type is required' },
        { status: 400 }
      );
    }
    
    // Fetch Pokemon of specific type
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Pokemon type not found' },
        { status: 400 }
      );
    }
    
    const data = await response.json();
    
    if (!data || !data.pokemon) {
      return NextResponse.json(
        { error: 'Invalid type data received' },
        { status: 400 }
      );
    }
    
    // Extract Pokemon names from the type data
    const pokemonList = data.pokemon.map((pokemon: any) => pokemon.pokemon.name);
    
    return NextResponse.json(pokemonList, { status: 200 });
  } catch (error) {
    console.error('Error fetching Pokemon by type:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
