<script>
	import { enhance } from '$app/forms';
	export let form;
    export let data;
	export let showLogin;
    $: if (form?.success == true) showLogin = false
	let loading = false;
</script>
<form method="post" action="?/signout">
	<button class="bouncyButton" style="margin: 1em">Sign out</button>
</form>
<div id="signupDiv">
	
	<form method="POST" use:enhance={ () => {
		loading = true;
		return async ({update}) => {
			await update();
			loading = false;
		}
	}} action="?/get_studentvue_data" class="form">
	{#if loading}
	<div id="loading" style="color: inherit; margin: auto; font-size: 2rem">Loading...</div>
	{:else}
		<h1 style="text-align: center; letter-spacing: 0.05em">StudentVue Login</h1>
		<p>Enter your studentvue password to see new grades, GPA, etc.</p>
		{#if form?.success == false}
			<p class="error">{form.error}</p>
			<!-- Can not just be !form.success or it will show if it is null -->
		{/if}
		<input name="studentvue_password_for_auth" type="password" required placeholder="lock" />
		<input type="hidden" name="student_id_for_auth" value={data.user_data.student_number} />
		<input type="hidden" name="district_for_auth" value={data.user_data.school_id} />
		<button class="bouncyButton">Log In</button>{/if}
	</form>
	
</div>

<style>
	.form {
		display: flex;
		padding: 2em;
		max-width: 30em;
		height: max(60vh,15em);
		margin: auto;
		flex-direction: column;
		justify-content: center;
		margin-top: 5vh;
		color: var(--text-color);
		border-radius: 2em;
		background-color: var(--background-5);
	}
	h1,
	p {
		color: var(--text-color);
	}
	input::placeholder {
		font-family: 'Material Symbols Outlined';
		font-weight: normal;
		font-style: normal;
		font-size: 24px; /* Preferred icon size */
		display: inline-block;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;

		/* Support for all WebKit browsers. */
		-webkit-font-smoothing: antialiased;
		/* Support for Safari and Chrome. */
		text-rendering: optimizeLegibility;

		/* Support for Firefox. */
		-moz-osx-font-smoothing: grayscale;

		/* Support for IE. */
		font-feature-settings: 'liga';
	}
	.error {
		text-align: center;
		color: red;
	}
</style>
