<script>
	export let searchTerm;

	const handleSubmit = () => {
		console.log(`pinging for ${searchTerm}...`)
		fetch('/.netlify/functions/200.js')
			.then(res => console.log(res))
	}
</script>

<main>
	<h1>Svelte Node App</h1>
	<form on:submit|preventDefault={handleSubmit(searchTerm)}>
		<label for="search-term"></label>
		<input bind:value={searchTerm} type="text" id="search-term">
		<button>Search</button>
	</form>
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
