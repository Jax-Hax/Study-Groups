<script>
	import AttentionCatcher from './AttentionCatcher.svelte';
	import Login from './Login.svelte';
	import Signup from './Signup.svelte';
	export let form;
	let showSignup = false;
	let showLogin = false;
</script>

<svelte:head>
	<title>StockShare - Practice Trading Stocks with Friends</title>
	<meta
		name="description"
		content="Learn about the stock market without risk. Invite your friends to a competition for free!"
	/>
</svelte:head>
<header>
	<img src="/favicon.png" alt="the logo for StockShare" style="width: min(9vw,5em)" />
	<h1 id="nav-title"><a href="/" style="text-decoration: none">StockShare</a></h1>
	<div>
		<button id="signupButton" on:click={() => (showSignup = true)}>Get Started</button>
		<button id="loginButton" on:click={() => (showLogin = true)}>Log In</button>
	</div>
</header>
<body>
	<section>
		{#if showSignup}
			<Signup {form} bind:showSignup bind:showLogin />
		{/if}
		{#if showLogin}
			<Login {form} bind:showSignup bind:showLogin />
		{/if}
	</section>
	<AttentionCatcher bind:showSignup/>
</body>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0.5em;
		align-items: center;
		background-color: var(--background-6);
	}
	header a {
		text-decoration: none;
		color: var(--text-color);
		transition: all 0.3s ease 0s;
	}
	header a:hover {
		color: var(--pop);
		text-decoration: underline;
	}
	@media screen and (max-width: 585px) {
		header a{
			display: none;
		}
	}
	header button {
		padding: 0.75em 2em;
	}
	#loginButton {
		background-color: var(--text-color);
		color: var(--pop);
		cursor: pointer;
		margin: -1px;
		border: 1px solid var(--pop);
	}
	#loginButton:hover {
		background-color: var(--highlight-pop);
		color: var(--text-color);
		transform: none;
		transition: none;
	}
	#signupButton {
		background-color: var(--pop);
		color: var(--text-color);
		cursor: pointer;
		border: none;
		margin-right: 0.51em;
	}
	#signupButton:hover {
		background-color: var(--dark-pop);
		color: var(--text-color);
	}
	body {
		background-color: var(--background-3);
	}
</style>
