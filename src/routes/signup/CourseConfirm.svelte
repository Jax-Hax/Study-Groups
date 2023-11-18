<script>
	import { enhance } from '$app/forms';

	export let selectedCourses;
	export let courseConfirm;
	export let form;
	let dialog;
	let selectedCoursesList;
	$: if (dialog && courseConfirm) dialog.showModal();
	$: selectedCoursesList = selectedCourses.map((x) => x.course_id);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (courseConfirm = false)}
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

		<h1 style="text-align: center; letter-spacing: 0.05em">Selected Courses:</h1>
		{#each selectedCourses as course}
			<div class="courseDiv">
				<p>{course.course_name}</p>
				<button
					on:click={() => {
						const index = selectedCourses.indexOf(course);
						if (index > -1) {
							selectedCourses.splice(index, 1);
							selectedCourses = selectedCourses;
						}
					}}
					class="addBtn"
					style="--green: var(--red); --dark-green: var(--dark-red);"
					><span class="material-symbols-outlined plus">remove</span></button
				>
			</div>
		{/each}
		<form method="POST" use:enhance action="?/addCourses">
			<input type="hidden" name="selectedCoursesList" value={selectedCoursesList} />
			<button class="bouncyButton">Confirm</button>
		</form>
	</div>
</dialog>

<style>
	.courseDiv {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
	}
	.addBtn {
		background-color: var(--green);
		border: none;
		color: white;
		padding: 0.5em;
		border-radius: 50%;
		text-align: center;
		cursor: pointer;
	}
	.addBtn:hover {
		background-color: var(--dark-green);
	}
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
	span {
		color: var(--text-color);
	}
</style>
