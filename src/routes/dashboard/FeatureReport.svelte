<script>
	import { enhance } from '$app/forms';
	export let form;
	export let featurePopup; //for use with Already a user? Log in
	let dialog;
	$: if (dialog && featurePopup) dialog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (featurePopup = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div id="signupDiv" on:click|stopPropagation>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			class="material-symbols-outlined"
			style="cursor: pointer; padding:0.25em; font-size: 30px"
			on:click={() => dialog.close()}>arrow_back</span
		>
		<form method="POST" use:enhance action="?/login">
			<h1 style="text-align: center; letter-spacing: 0.05em">Log In</h1>
			{#if form?.success == false}
				<p class="error">{form.message}</p>
				<!-- Can not just be !form.success or it will show if it is null -->
			{/if}
			<label>
				Email:
				<input name="email" type="email" required placeholder="mail" />
			</label>
			<label>
				Password:
				<input name="password" type="password" required placeholder="lock" />
			</label>
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
	p,
	label,
	span {
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
	.already {
		cursor: pointer;
		text-align: center;
	}
	.already:hover {
		color: var(--pop);
		text-decoration: underline;
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
