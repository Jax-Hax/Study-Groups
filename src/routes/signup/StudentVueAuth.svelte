<script>
	import { enhance } from '$app/forms';
	export let form;
	export let showStudentvue;
	export let showLogin; //for use with Already a user? Log in
	let dialog;
	$: if (dialog && showStudentvue) dialog.showModal();
</script>
	<div class="dialog">
		<form method="POST" use:enhance action="?/signup">
			<h1 style="text-align: center; letter-spacing: 0.05em">Sign up</h1>
			{#if form?.success == false}
				<p class="error">{form.message}</p>
				<!-- Can not just be !form.success or it will show if it is null -->
			{/if}
			{#if form?.success}
				<p style="text-align: center">{form.message}</p>
			{:else}
				<label>
					Email (NOT your school email as that will not recieve emails):
					<input name="email" type="email" required placeholder="mail" />
				</label>
				<label>
					Password:
					<input style="margin: 0" name="password" type="password" required placeholder="lock" />
				</label>
				<p style="margin-bottom: 1em; color: #a9b2ba">
					Password should be at least 6 characters long.
				</p>
				<label>
					Confirm Password:
					<input name="confirmPassword" type="password" required placeholder="key" />
				</label>
				<button class="bouncyButton">Sign up</button>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<p
					class="already"
					on:click={() => {
						dialog.close();
						showLogin = true;
					}}
				>
					Already a user? Log in
				</p>
			{/if}
		</form>
	</div>

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
	.dialog {
		position: absolute;
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
	label {
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
