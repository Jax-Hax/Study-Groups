<script>
	import AddTaskPopup from './AddTaskPopup.svelte';

	export let data;
	export let form;
	$: data.custom_todo_data.sort((a, b) => {
		let b_date = new Date(b.due_date);
		let a_date = new Date(a.due_date);
		if (a_date > b_date) {
			return -1;
		} else if (b_date > a_date) {
			return 1;
		} else {
			return 0;
		}
	});
	let showAddTask = false;
	$: if (form?.success == true) {
		showAddTask = false;
	}
	function getColorOfAssignment(assignment) {
		if (assignment.assignment_type === 'Homework') {
			return '#1f5ded';
		} else if (assignment.assignment_type === 'Project') {
			return '#008500';
		} else if (assignment.assignment_type === 'Test/Quiz') {
			return '#e0bc00';
		}
	}
</script>

{#if showAddTask}
	<AddTaskPopup {form} {data} bind:showAddTask />
{/if}
<h1 id="todo-h1">To-Do List</h1>

<div id="grid">
	<button
		class="bouncyButton"
		on:click={() => (showAddTask = true)}
		style="padding: 0.5em 4em; font-size: 30px">Add Task</button
	>
	{#each data.custom_todo_data as todo}
		{@const course = data.course_data.filter((value) => value.course_id === todo.course_id)[0]}
		{#if todo.link !== null && todo.link !== ''}
		<a href={todo.link} target=”_blank”>
		<div class:hover={todo.link !== null && todo.link !== ''}>
			<h1 style="font-size: 2.5rem; letter-spacing: 0">{todo.text}</h1>
			{#if Math.abs(+((new Date() - new Date(todo.due_date)) / (3600000 * 24)).toFixed(1)) > 1}
				<p>
					Due in {Math.abs(+((new Date() - new Date(todo.due_date)) / (3600000 * 24)).toFixed(0))} days
					and {Math.abs(+(((new Date() - new Date(todo.due_date)) / 3600000) % 24).toFixed(1))} hours
				</p>
			{:else}
				<p style="color: var(--red)">
					Due in {Math.abs(+(((new Date() - new Date(todo.due_date)) / 3600000) % 24).toFixed(1))} hours
				</p>
			{/if}
			{#if course}
				<p
					style="border-radius: 1em; width: min(15em,35vw); margin: auto; padding: 0.25em 1em; background-color: {data.user_in_course_data.filter(
						(value) => value.course_id === todo.course_id
					)[0].hex}"
				>
					{course.course_name}
				</p>
			{/if}
			{#if todo.assignment_type !== 'Other'}
				<p
					style="border-radius: 1em; width: min(15em,35vw); margin: auto; padding: 0.25em 1em; background-color: {getColorOfAssignment(
						todo
					)}"
				>
					{todo.assignment_type}
				</p>
			{/if}
		</div></a>{:else}
		<div class:hover={todo.link !== null && todo.link !== ''}>
			<h1 style="font-size: 2.5rem; letter-spacing: 0">{todo.text}</h1>
			{#if Math.abs(+((new Date() - new Date(todo.due_date)) / (3600000 * 24)).toFixed(1)) > 1}
				<p>
					Due in {Math.abs(+((new Date() - new Date(todo.due_date)) / (3600000 * 24)).toFixed(0))} days
					and {Math.abs(+(((new Date() - new Date(todo.due_date)) / 3600000) % 24).toFixed(1))} hours
				</p>
			{:else}
				<p style="color: var(--red)">
					Due in {Math.abs(+(((new Date() - new Date(todo.due_date)) / 3600000) % 24).toFixed(1))} hours
				</p>
			{/if}
			{#if course}
				<p
					style="border-radius: 1em; width: min(15em,35vw); margin: auto; padding: 0.25em 1em; background-color: {data.user_in_course_data.filter(
						(value) => value.course_id === todo.course_id
					)[0].hex}"
				>
					{course.course_name}
				</p>
			{/if}
			{#if todo.assignment_type !== 'Other'}
				<p
					style="border-radius: 1em; width: min(15em,35vw); margin: auto; padding: 0.25em 1em; background-color: {getColorOfAssignment(
						todo
					)}"
				>
					{todo.assignment_type}
				</p>
			{/if}
		</div>
		{/if}
	{/each}
</div>

<style>
	#grid {
		display: flex;
		gap: 1rem;
		flex-direction: column;
		align-items: center;
		padding: 1em;
	}
	a {
		text-decoration: none;
	}
	#grid div {
		background-color: var(--background-4);
		padding: 2em;
		color: var(--text-color);
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		width: 80vw;
		text-align: center;
	}
	@media (max-width: 750px) {
		#grid div {
			width: 15em;
		}
	}

	.hover:hover {
		background-color: var(--background-6);
		cursor: pointer;
	}
	h1,
	p {
		color: inherit;
	}
	#todo-h1 {
		color: var(--text-color);
		text-align: center;
	}
</style>
