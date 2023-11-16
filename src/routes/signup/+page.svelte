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
	
	<StudentVueAuth {form} bind:showStudentvue bind:showLogin /></body>

<style>
	body {
		background-color: var(--background-3);
	}
</style>
