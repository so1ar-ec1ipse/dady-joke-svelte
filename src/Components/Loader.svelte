<div id="loader">
	<div class="dot"></div>
	<div class="dot"></div>
	<div class="dot"></div>
</div>


<style>
#loader {
	display: flex;
	justify-content: center;
	text-align: center;
	margin: 1em 0;
}

.dot {
	width: 1em;
	height: 1em;
	border-radius: 1em;
	margin: .1em;
	background: var(--orange);
	animation: pulse .9s infinite ease;
}

.dot:nth-of-type(2) {
	animation-delay: .15s;
}

.dot:nth-of-type(3) {
	animation-delay: .3s;
}

@keyframes pulse {
	0% {
		transform: scale(.2)
	}
	50% {
		transform: scale(1)
	}
	100% {
		transform: scale(.2)
	}
}
</style>
