<script>
	import { enhance } from '$app/forms';

	export let selectedCourses;
	export let courseConfirm;
	export let form;
	let dialog;
	let selectedCoursesList;
	$: if (dialog && courseConfirm) dialog.showModal();
	$: {selectedCoursesList = selectedCourses.map((x) => x.course_id + "{$}" + x.hex);};
	import ColorPicker from 'svelte-awesome-color-picker';
	let hex;
	let course_name_color_code_opened = "";
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (courseConfirm = false)}
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
		<p style="text-align: center">Click on the colors to color code your classes</p>
		{#each selectedCourses as course}
			<div class="courseDiv">
				<span on:click={() => {if (course_name_color_code_opened === course.course_name) {course_name_color_code_opened = ""} else {(course_name_color_code_opened = course.course_name)}}} style="padding: 1em; background-color: {course.hex}; border-radius: 0.5em"></span>
				<p style="text-align: center">{course.course_name}</p>
				<p style="text-align: center">({course.course_level})</p>
			</div>
			{#if course_name_color_code_opened === course.course_name}
			<ColorPicker bind:hex={course.hex} isAlpha={false} isInput={false} canChangeMode={false} disableCloseClickOutside={true}/>
			{/if}
			
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
	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 3em;
		width: 60vw;
		max-width: 500px;
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
