<script>
	import Loader from './Components/Loader.svelte'
	import { fly } from 'svelte/transition'

	let searchTerm = ''
	let jokes = []
	let loading = false
	let matchWholeWord = false
	const jokeError = [{joke: "No matching jokes found.", error: true}]

	$: invalidSearch = searchTerm.length < 2

	const searchJokes = (term) => {
		loading = true
		jokes = []
		fetch(`/.netlify/functions/search-jokes?term=${term}`)
			.then(res => res.json())
			.then(json => {
				if (json.data.results.length) {
					jokes = [...json.data.results]
					if (matchWholeWord) {
						const matchesWholeWord = new RegExp(` ${term} `)
						jokes = [...jokes.filter(joke => matchesWholeWord.test(joke.joke))]
						if (!jokes.length) jokes = jokeError
					}
				} else {
					jokes = jokeError
				}
				loading = false
		})
	}

	const randomJoke = () => {
		loading = true
		jokes = []
		const res = fetch('/.netlify/functions/random-joke')
			.then(res => res.json())
			.then(json => {
				if(json.data) {
					jokes = [json.data]
				} else {
					jokes = jokeError
				}
				loading = false
			})
		}
</script>

<main>
	<div class="container">
		<h1>Search Dad Jokes:</h1>
		<form on:submit|preventDefault={searchJokes(searchTerm)}>
			<input bind:value={searchTerm} type="text" id="search-term">
			<button disabled={invalidSearch}>Search Jokes</button>

			<div>
				<input type="checkbox" id="whole-word" bind:checked={matchWholeWord}>
				<label for="whole-word">Match whole word</label>
			</div>

		</form>

		<p class="or">or</p>

		<button type="button" on:click|preventDefault={randomJoke}>Get a random joke</button>

		{#if loading}
			<Loader />
		{/if}

		<ul>
			{#each jokes as joke, index}
				<li in:fly="{{ y: 20, duration: 400, delay: index * 120}}" class:error={joke.error}>
					{joke.joke}
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	.or {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.error {
		color: red;
		font-weight: bold;
	}

	.or:before, .or:after {
		content: '—';
		margin: 0 .25em;
	}

	ul {
		text-align: left;
		list-style-type: none;
		margin: 3rem auto;
	}

	li {
		margin-bottom: 1em;
		padding-bottom: 1em;
		border-bottom: 1px solid #ccc;
	}
</style>
