<script>
	import ClassPopup from "./ClassPopup.svelte";

	export let data;
	export let form;
	let courseAssignments;
	$: {
		courseAssignments = data.new_assignments.reduce((acc, assignment) => {
    if (!acc[assignment.course_id]) {
        acc[assignment.course_id] = []; // Initialize the array if it doesn't exist
    }
    acc[assignment.course_id].push({ assignment }); // Push assignment details to the array
    return acc;
}, {})
	}
	let showGpa = false;
	let showGrades = false;
	let showPopup;
	let courseSelected;
</script>

	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div id="gpa">
		<h1>GPA:</h1>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<p class:textshadow={!showGpa} on:click={() => (showGpa = !showGpa)}>
			{#if showGpa}{Math.round(data.gpa * 100) / 100}{:else}Show{/if}
		</p>
		<p>Your GPA for the current quarter</p>
	</div>
	{#if showPopup}
	<ClassPopup {form} {data} bind:showPopup bind:courseSelected />
	{/if}
<div id="grid">
		{#each data.grades as course}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div on:click={() => {courseSelected = course; showPopup = true}}>
				<h1 style="font-size: max(3vw,2.5rem)">{course.course_name}</h1>
				{#if courseAssignments[course.course_id]}
					<p>{courseAssignments[course.course_id].length} new assignment(s)</p>
				{:else}
					<p>0 new assignment(s)</p>
				{/if}
				<p>{course.new_assignments.length} new grade(s)</p>
				<p style="display: inline">Grade:</p>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<p
					style="display: inline"
					class:textshadow={!showGrades}
					on:click={() => (showGrades = !showGrades)}
				>
					{#if showGrades}{course.grade}{:else}Show{/if}
				</p>
			</div>
		{/each}
</div>

<style>
	#grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, 1fr);
		align-items: center;
		padding: 1em;
	}
	#grid div {
		background-color: var(--background-4);
		padding: 2em;
		color: var(--text-color);
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
		cursor: pointer;
	}
	#gpa {
		background-color: var(--background-4);
		padding: 2em;
		color: var(--text-color);
		border-radius: 16px;
		font-size: 1.25em;
		margin: 1rem 1rem 0rem 1rem;
		border-radius: 16px;
		text-align: center;
	}
	#grid div:hover {
		background-color: var(--background-6);
	}
	h1,
	p {
		color: inherit;
	}
	.textshadow {
		color: transparent;
		text-shadow: 0 0 5px var(--text-blur);
		cursor: pointer;
	}
</style>
