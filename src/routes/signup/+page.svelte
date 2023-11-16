<script>
	import StudentVueAuth from './StudentVueAuth.svelte';
	export let form;
	let showStudentvue = true;
	let showLogin = false;
</script>

<body> 
	<form method="post" action="?/signout">
		<button class="bouncyButton" style="margin: 1em">Sign out</button>
	</form>
	<h1 style="color: var(--text-color); text-align: center; margin-top: -1em">Welcome to __!</h1>
	<StudentVueAuth {form} bind:showStudentvue /></body>

<style>
	body {
		background-color: var(--background-3);
	}
</style>
