<script>
	import { enhance } from '$app/forms';
	export let form;
	export let showStudentvue;
	export let showLogin; //for use with Already a user? Log in
	let dialog;
	$: if (dialog && showStudentvue) dialog.showModal();
	let text = "Import from StudentVue"
</script>
	<div class="dialog">
		<form method="POST" use:enhance action="?/signup">
			<h1 style="text-align: center;">Import classes from StudentVue</h1>
			{#if form?.success == false}
				<p class="error">{form.message}</p>
				<!-- Can not just be !form.success or it will show if it is null -->
			{/if}
			{#if form?.success}
				<p style="text-align: center">{form.message}</p>
			{:else}
				<label>
					Student ID Number:
					<input name="student_id" required placeholder="pin" />
				</label>
				<label>
					Student Password:
					<input style="margin: 0" name="password" type="password" required placeholder="lock" />
				</label>
				<label>
					District: <br>
					<select name="district" id="district">
						<option value="chesterfield">Chesterfield</option>
					</select>
				</label>
				<button class="bouncyButton" on:click={() => text="Loading..."}>{text}</button>
			{/if}
		</form>
	</div>

<style>
	form {
		position: relative;
		display: flex;
		padding: 2em;
		max-width: 30em;
		margin: auto;
		flex-direction: column;
		color: var(--text-color);
		border-radius: 2em;
	}
	input:invalid {
		border: 1px solid red;
	}
	.dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 3em;
		width: 60vw;
		max-width: 400px;
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
		width: 92%;
		margin-bottom: 0.5em;
	}
	select {
		padding: 0.75em 1em 0.75em;
		border-radius: 16px;
		background-color: var(--background-1-darkest);
		color: var(--text-color);
		font-size: 14px;
		width: 100%;
		margin-bottom: 0.5em;
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
