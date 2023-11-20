<script>
	import { enhance } from '$app/forms';
	export let form;
    export let data;
	export let showLogin;
	let dialog;
	$: if (dialog && showLogin) dialog.showModal();
    $: if (form?.success == true) dialog.close()
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showLogin = false)}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div id="signupDiv">
		<form method="POST" use:enhance action="?/get_studentvue_data">
			<h1 style="text-align: center; letter-spacing: 0.05em">StudentVue Login</h1>
            <p>Enter your studentvue password to see new grades, GPA, etc.</p>
			{#if form?.success == false}
				<p class="error">{form.error}</p>
				<!-- Can not just be !form.success or it will show if it is null -->
			{/if}
            <input name="password" type="password" required placeholder="lock" />
            <input type="hidden" name="student_id" value={data.user_data.student_number} />
            <input type="hidden" name="district" value={data.user_data.studentvue_url} />
			<button class="bouncyButton">Log In</button>
		</form>
	</div>
</dialog>

<style>
	form {
		position: relative;
		display: flex;
		padding: 2em;
		max-width: 20em;
		margin: auto;
		flex-direction: column;
		color: var(--text-color);
		border-radius: 2em;
	}
	input:invalid {
		border: 1px solid red;
	}
	input {
		width: 90%;
		padding: 0.5em;
		margin-bottom: 0.5em;
	}
	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 3em;
		width: 60vw;
		max-width: 380px;
		border: none;
		border-radius: 1em;
		background-color: var(--background-5);
	}
	h1,
	p {
		color: var(--text-color);
	}
	input {
		padding: 0.75em 1em 0.75em;
		border: 0.1em solid #46c759;
		border-radius: 16px;
		background-color: var(--background-1-darkest);
		color: var(--text-color);
		font-size: 18px;
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
