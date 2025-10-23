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
    
    // First, get the Pokemon species data to find evolution chain
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
    
    if (!speciesResponse.ok) {
      return NextResponse.json(
        { error: 'Pokemon not found' },
        { status: 400 }
      );
    }
    
    const speciesData = await speciesResponse.json();
    
    if (!speciesData || !speciesData.evolution_chain) {
      return NextResponse.json(
        { error: 'Evolution chain not found for this Pokemon' },
        { status: 400 }
      );
    }
    
    // Get the evolution chain
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();
    
    if (!evolutionData || !evolutionData.chain) {
      return NextResponse.json(
        { error: 'Invalid evolution data received' },
        { status: 400 }
      );
    }
    
    // Find the current Pokemon in the evolution chain and get the next evolution
    function findNextEvolution(chain: any, targetName: string): string | null {
      if (chain.species.name === targetName) {
        // Found the current Pokemon, return the first evolution if it exists
        return chain.evolves_to.length > 0 ? chain.evolves_to[0].species.name : targetName;
      }
      
      // Check if any of the evolutions contain the target Pokemon
      for (const evolution of chain.evolves_to) {
        const result = findNextEvolution(evolution, targetName);
        if (result) {
          return result;
        }
      }
      
      return null;
    }
    
    const nextEvolution = findNextEvolution(evolutionData.chain, name.toLowerCase());
    
    if (!nextEvolution) {
      return NextResponse.json(
        { error: 'Could not find evolution for this Pokemon' },
        { status: 400 }
      );
    }
    
    // If the Pokemon is already fully evolved, return the current Pokemon
    const result = nextEvolution === name.toLowerCase() ? name : nextEvolution;
    
    return NextResponse.json({ nextEvolution: result }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Pokemon evolution:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
