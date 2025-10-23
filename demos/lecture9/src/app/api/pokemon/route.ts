export const GET = async (req: Request): Promise<Response> => {
	const url = URL.parse(req.url);
	if (!url) {
		return new Response('bad request', { status: 400 });
	}

	const pokemonName = url.searchParams.get('name');
	if (!pokemonName) {
		return new Response('missing name query param', { status: 400 });
	}

	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
	if (!res.ok) {
		return new Response(res.body, { status: res.status });
	}

	return new Response(res.body, { status: res.status, headers: { 'Content-Type': 'application/json' } });
};
