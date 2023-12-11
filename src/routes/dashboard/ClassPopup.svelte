<script>
	import { enhance } from '$app/forms';
	export let form;
	export let data;
	export let showPopup; //for use with Already a user? Log in
	export let courseSelected;
	let grade_id_list = [];
	let dialog;
	$: if (dialog && showPopup) dialog.showModal();
	$: {grade_id_list = courseSelected.new_assignments.map((value) => value.GradebookID);}
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
		<form
			method="post"
			use:enhance={ () => {
				return async ({update}) => {
					await update();
					dialog.close()
				}
			}}
			style="margin-left: auto; margin-right: 3em"
			action="?/seenAssignments"
		>
			<input type="hidden" name="courseID" value={courseSelected.course_id} />
			<button class="bouncyButton">Seen all new assignments</button>
			{#each data.new_assignments as assignment}
				{#if assignment.course_id === courseSelected.course_id}
					<p>{assignment.text}</p>
				{/if}
			{/each}
		</form>
		<div class="section">
			<form
				method="post"
				use:enhance
				style="margin-left: auto; margin-right: 3em"
				action="?/seenGrades"
			>
				<input type="hidden" name="courseID" value={courseSelected.course_id} />
				<input type="hidden" name="grade_id_list" value={grade_id_list.join(",")} />
				<button class="bouncyButton">Seen all new grades</button>
			</form>
			{#each courseSelected.new_assignments as assignment}
				<p>{@html assignment.Measure} - {assignment.Score.replace(/0+$/, '').replace(/\.$/, '')}</p>
			{/each}
		</div>
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
