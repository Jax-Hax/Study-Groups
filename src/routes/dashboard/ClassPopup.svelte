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
		<div style="display: flex;">
		<h1>{courseSelected.course_name}</h1>
		<form method="post" use:enhance style="margin-left: auto; margin-right: 3em" action="?/seenCourse">
			<input type="hidden" name="courseID" value={courseSelected.course_id}>
			<button class="bouncyButton" >Seen all</button>
		</form>
		</div>
		{#each courseSelected.new_assignments as assignment}
                    <p>{@html assignment.Measure} - {assignment.Score.replace(/0+$/,'').replace(/\.$/, '')}</p>
                {/each}
	</div>
</dialog>

<style>
	dialog {
		padding: 3em;
		width: 100vw;
		min-height: 100vh;
		border: none;
		background-color: var(--background-5);
	}
	h1,
	p,
	span {
		color: var(--text-color);
	}
</style>
