<script>
	import { enhance } from '$app/forms';
	export let form;
	export let showAddTask; //for use with Already a user? Log in
	let dialog;
	$: if (dialog && showAddTask) dialog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showAddTask = false)}
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
			<h1 style="text-align: center; letter-spacing: 0.05em">Add Task</h1>
			{#if form?.success == false}
				<p class="error">{form.message}</p>
				<!-- Can not just be !form.success or it will show if it is null -->
			{/if}
            <div style="display: flex; align-items: center; justify-content: center"><p>Public</p><input type="checkbox" name="publicOrPrivate" id="switch" /><label class="toggle" for="switch"></label><p>Private</p></div>
			

			<label>
				Password:
				<input name="password" type="password" required placeholder="Todo" />
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
	input[type='checkbox'] {
		height: 0;
		width: 0;
		visibility: hidden;
	}

	.toggle {
		cursor: pointer;
		width: 5em;
		height: 2.5em;
		background: grey;
		display: block;
		border-radius: 100px;
		position: relative;
	}

	.toggle:after {
		content: '';
		position: absolute;
		top: 0.25em;
		left: 5px;
		width: 2em;
		height: 2em;
		background: #fff;
		border-radius: 90px;
		transition: 0.3s;
	}

	input:checked + .toggle {
		background: #bada55;
	}

	input:checked + .toggle:after {
		left: calc(100% - 5px);
		transform: translateX(-100%);
	}

	label:active:after {
		width: 3em;
	}
	.error {
		text-align: center;
		color: red;
	}
</style>
