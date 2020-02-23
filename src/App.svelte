<script>
	let searchTerm
	let jokes = []

	const handleSubmit = async () => {
		const res = await fetch('/.netlify/functions/node-200')
		const resJSON = await res.json()
		jokes = [...jokes, ...resJSON.data.results]
		console.log([resJSON.data.results])
	}
</script>

<main>
	<h1>Svelte Node App</h1>
	<form on:submit|preventDefault={handleSubmit(searchTerm)}>
		<label for="search-term"></label>
		<input bind:value={searchTerm} type="text" id="search-term">
		<button>Search</button>
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
