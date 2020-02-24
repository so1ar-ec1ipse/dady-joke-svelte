<script>
	import Loader from './Components/Loader.svelte'
	import Footer from './Components/Footer.svelte'
	import { fly } from 'svelte/transition'

	let searchTerm = ''
	let wasSearched = false
	let searchedTerm = ''
	let strictSearch = false
	let loading = false
	let jokes = []
	const jokeError = [{joke: "No matching jokes found.", error: true}]

	$: invalidSearch = searchTerm.length < 2

	const searchJokes = (term) => {
		loading = true
		wasSearched = true
		searchedTerm = term
		jokes = []
		fetch(`/.netlify/functions/search-jokes?term=${term}`)
			.then(res => res.json())
			.then(json => {
				if (json.data.results.length) {
					jokes = [...json.data.results]
					if (strictSearch) {
						const matchesWholeWord = new RegExp(` ${term} `, "i")
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
		wasSearched = false
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

		const highlight = (joke, searchTerm) => {
			const terms = [...searchTerm.trim().split(/\s/)]
			terms.forEach(term => {
				joke = joke.split(term).join(`<b>${term}</b>`)
			})
			return joke
		}
</script>

<main>
	<div class="container">
		<h1>
			<img src="svelte-logo-mark.svg" alt="">
			Dad Joke API
		</h1>

		<p class="or">Search for jokes</p>

		<form on:submit|preventDefault={searchJokes(searchTerm)}>
			<div class="flex">
				<input bind:value={searchTerm} type="text" id="search-term">
				<button disabled={invalidSearch}>
					<span aria-hidden="true">🔍</span>
					Search Jokes
				</button>
			</div>

			<div class="flex">
				<input type="checkbox" id="whole-word" bind:checked={strictSearch}>
				<label for="whole-word">Strict search<i>&nbsp;(match whole words and order)</i></label>
			</div>

		</form>

		<p class="or">or</p>

		<button type="button" on:click|preventDefault={randomJoke}>
			<span aria-hidden="true">❓</span>
			Get a random joke
		</button>

		{#if loading}
			<Loader />
		{/if}

		<ul>
			{#each jokes as joke, index}
				<li in:fly="{{ y: 20, duration: 400, delay: index * 120}}" class:error={joke.error}>
					{#if wasSearched}
						{@html highlight(joke.joke, searchedTerm)}
					{:else}
						{joke.joke}
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</main>

<Footer />



<style>
	main {
		text-align: center;
		padding: 2rem 1rem;
		margin: 0 auto;
	}

	.flex input[type="text"] {
		margin-right: 1rem;
		flex: 1 1 auto;
	}

	.flex button, .flex input[type="submit"] {
		flex: 0 1 auto;
	}

	.flex input[type="checkbox"] {
		margin: 0 .5rem 0 0;
	}

	.error {
		color: var(--orange);
		font-weight: bold;
	}

	.or {
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 4rem;
	}

	.or:before, .or:after {
		content: '—';
		margin: 0 .25em;
		color: var(--darkergray);
	}

	h1 {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	h1 img {
		max-width: 1em;
		margin-right: .25em;
	}

	input[type="checkbox"] {
		position: absolute;
		left: -100vw;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	input[type="checkbox"] + label {
		font-size: .9rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	input[type="checkbox"] + label:before {
		content: '⬜';
		font-size: 1.4rem;
		margin-right: .25rem;
	}

	input[type="checkbox"]:checked + label:before {
		content: '✅'
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
