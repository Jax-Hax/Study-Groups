<script>
	import { enhance } from '$app/forms';
	export let form;
	export let data;
	export let showPopup; //for use with Already a user? Log in
    export let courseSelected;
	let dialog;
	$: if (dialog && showPopup) dialog.showModal();
	let checked = false;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showPopup = false)}
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
		<h1>{courseSelected.course_name}</h1>
	</div>
</dialog>

<style>
	dialog {
		top: 50%;
		left: 50%;
		transform: translate(calc(-50% + 2.5rem), -50%);
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
        font-size: 25px;
	}
</style>
