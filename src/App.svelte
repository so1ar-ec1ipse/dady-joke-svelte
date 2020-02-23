<script>
	let searchTerm
	let jokes = []

	const searchJokes = async (term) => {
		const res = await fetch(`/.netlify/functions/search-jokes?term=${term}`)
		const resJSON = await res.json()
		jokes = [...jokes, ...resJSON.data.results]
		console.log([resJSON.data.results])
	}

	const randomJoke = async () => {
		const res = await fetch('/.netlify/functions/random-joke')
		console.log(res)
		const resJSON = await res.json();
		console.log(resJSON)
		jokes = [resJSON.data]
		console.log(resJSON.data)
	}
</script>

<main>
	<h1>Svelte Node App</h1>
	<form on:submit|preventDefault={searchJokes(searchTerm)}>
		<label for="search-term"></label>
		<input bind:value={searchTerm} type="text" id="search-term">
		<button>Search Jokes</button>
		<button type="button" on:click|preventDefault={randomJoke}>Random Joke</button>
	</form>

	{#each jokes as joke}
		<p>{joke.joke}</p>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
