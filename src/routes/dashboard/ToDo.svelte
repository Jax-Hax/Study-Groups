<script>
	import { fade } from 'svelte/transition';
	import AddTaskPopup from './AddTaskPopup.svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let data;
	export let form;
	let assignment_array;
	let checked_assignment;
	$: {
		assignment_array = data.custom_todo_data.concat(data.current_assignments, data.new_assignments);
		assignment_array.sort((a, b) => {
			let b_date = new Date(b.due_date);
			let a_date = new Date(a.due_date);
			let current_date = new Date(); // Get the current date

			// Check if a or b is overdue
			let a_overdue = a_date < current_date;
			let b_overdue = b_date < current_date;

			// Prioritize overdue assignments
			if (a_overdue && !b_overdue) {
				return -1; // a is overdue, so it comes first
			} else if (!a_overdue && b_overdue) {
				return 1; // b is overdue, so it comes first
			} else if (a_overdue && b_overdue) {
				// Both a and b are overdue, prioritize by most overdue
				return a_date - b_date; // Sort by the difference in overdue time
			} else {
				// Neither a nor b is overdue, sort based on due dates
				if (a_date > b_date) {
					return 1;
				} else if (b_date > a_date) {
					return -1;
				} else {
					return 0;
				}
			}
		});
	}
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
	function getIfCustom(userID) {
		if (userID) {
			return 'custom';
		} else {
			return 'canvas';
		}
	}
</script>

<AddTaskPopup {form} {data} bind:showAddTask />
<h1 id="todo-h1">To-Do List</h1>

<div id="grid">
	<button
		class="bouncyButton"
		on:click={() => (showAddTask = true)}
		style="padding: 0.5em 4em; font-size: 30px">Add Task</button
	>
	<!--<form
		method="post"
		use:enhance
		style="margin-left: auto; margin-right: 3em"
		action="?/seenAllAssignments"
	>
		<input type="hidden" name="assignment_id_list" value={data.grades.map((course) => {return course.new_assignments.map((assignment) => {return assignment.assignment_id}).join(",")}).join(',')} />
		<button class="bouncyButton">Seen all new grades</button>
	</form>-->
	{#each assignment_array as todo, i}
		{@const course = data.grades.filter((value) => value.course_id === todo.course_id)[0]}
		{@const due_in = new Date(todo.due_date) - new Date()}
		{#if todo.link !== null && todo.link !== ''}
			<a href={todo.link} target="”_blank”">
				<div class="hover" out:fade>
					<section>
						{#if checked_assignment === todo.assignment_id}<form
								method="POST"
								action="?/deleteTodo"
								use:enhance={() => {
									checked_assignment = '';
									return async ({ update }) => {
										await update();
									};
								}}
							>
								<input type="hidden" value={todo.assignment_id} name="assignment_id" />
								<input type="hidden" value={getIfCustom(todo.user_id)} name="if_custom" />
								<p style="color: var(--text-color)">Are you sure?</p>
								<button type="submit" class="symbolButton"
									><span class="material-symbols-outlined">check</span></button
								>
								<button class="badSymbolButton" on:click={() => (checked_assignment = '')}
									><span class="material-symbols-outlined">close</span></button
								>
							</form>{:else}<button
								on:click={(e) => {
									checked_assignment = todo.assignment_id;
									e.preventDefault();
								}}
								class="bouncyButton"
								style="--pop: var(--dark-red)">Finish</button
							>{/if}
					</section>
					<section style="flex-grow: 2">
						<h1 style="font-size: 2.5rem; letter-spacing: 0">{todo.text}</h1>
						{#if due_in > 0}
							{#if Math.abs(+(due_in / (3600000 * 24)).toFixed(1)) > 1}
								<p>
									Due in {Math.abs(+(due_in / (3600000 * 24)).toFixed(0))} days and {Math.abs(
										+((due_in / 3600000) % 24).toFixed(1)
									)} hour(s)
								</p>
							{:else}
								<p style="color: var(--red)">
									Due in {Math.abs(+((due_in / 3600000) % 24).toFixed(1))} hour(s)
								</p>
							{/if}
						{:else if Math.abs(+(due_in / (3600000 * 24)).toFixed(1)) > 1}
							<p style="color: var(--dark-red)">
								Overdue by {Math.abs(+(due_in / (3600000 * 24)).toFixed(0))} days and {Math.abs(
									+((due_in / 3600000) % 24).toFixed(1)
								)} hour(s)
							</p>
						{:else}
							<p style="color: var(--dark-red)">
								Overdue by {Math.abs(+((due_in / 3600000) % 24).toFixed(1))} hours
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
						{#if todo.assignment_type === 'Test/Quiz' || todo.assignment_type === 'Homework' || todo.assignment_type === 'Project'}
							<p
								style="border-radius: 1em; width: min(15em,35vw); margin: auto; padding: 0.25em 1em; margin-top: 0.5em; background-color: {getColorOfAssignment(
									todo
								)}"
							>
								{todo.assignment_type}
							</p>
						{/if}
						{#if todo.user_id}
							<p
								style="border-radius: 1em; width: min(7.5em,17vw); margin: auto; padding: 0.1em 1em;margin-top: 0.5em;  background-color: gray"
							>
								Custom
							</p>
						{/if}
						{#if todo.new}
							<p
								style="border-radius: 1em; width: min(15em,35vw); margin: auto; padding: 0.25em 1em; margin-top: 0.5em; background-color: var(--dark-red)"
							>
								New
							</p>
						{/if}
					</section>
				</div></a
			>{:else}
			<div out:fade>
				<section>
					{#if checked_assignment === todo.assignment_id}<form
							method="POST"
							action="?/deleteTodo"
							use:enhance={() => {
								checked_assignment = '';
								return async ({ update }) => {
									await update();
								};
							}}
						>
							<input type="hidden" value={todo.assignment_id} name="assignment_id" />
							<input type="hidden" value={getIfCustom(todo.user_id)} name="if_custom" />
							<p style="color: var(--text-color)">Are you sure?</p>
							<button type="submit" class="symbolButton"
								><span class="material-symbols-outlined">check</span></button
							>
							<button class="badSymbolButton" on:click={() => (checked_assignment = '')}
								><span class="material-symbols-outlined">close</span></button
							>
						</form>{:else}<button
							on:click={(e) => {
								checked_assignment = todo.assignment_id;
								e.preventDefault();
							}}
							class="badSymbolButton"
							style="--pop: var(--dark-red)"><span class="material-symbols-outlined">delete</span></button
						>{/if}
				</section>
				<section style="flex-grow: 2">
					<h1 style="font-size: 2.5rem; letter-spacing: 0">{todo.text}</h1>
					{#if due_in > 0}
						{#if Math.abs(+(due_in / (3600000 * 24)).toFixed(1)) > 1}
							<p>
								Due in {Math.abs(+(due_in / (3600000 * 24)).toFixed(0))} days and {Math.abs(
									+((due_in / 3600000) % 24).toFixed(1)
								)} hour(s)
							</p>
						{:else}
							<p style="color: var(--red)">
								Due in {Math.abs(+((due_in / 3600000) % 24).toFixed(1))} hours
							</p>
						{/if}
					{:else if Math.abs(+(due_in / (3600000 * 24)).toFixed(1)) > 1}
						<p style="color: var(--dark-red)">
							Overdue by {Math.abs(+(due_in / (3600000 * 24)).toFixed(0))} days and {Math.abs(
								+((due_in / 3600000) % 24).toFixed(1)
							)} hour(s)
						</p>
					{:else}
						<p style="color: var(--dark-red)">
							Overdue by {Math.abs(+((due_in / 3600000) % 24).toFixed(1))} hours
						</p>
					{/if}
					{#if course}
						<p
							style="border-radius: 1em; width: min(15em,35vw); margin: auto; padding: 0.25em 1em; background-color: {data.user_in_course_data.filter(
								(value) => value.course_id === todo.course_id
							)[0].hex}"
						>
							{course.course_name.replace(/\s*\([^)]*\)$/, '').replace(/\bADV PLACEMENT\b/g, 'AP')}
						</p>
					{/if}
					{#if todo.assignment_type === 'Test/Quiz' || todo.assignment_type === 'Homework' || todo.assignment_type === 'Project'}
						<p
							style="border-radius: 1em; width: min(15em,35vw); margin: auto; padding: 0.25em 1em;margin-top: 0.5em;  background-color: {getColorOfAssignment(
								todo
							)}"
						>
							{todo.assignment_type}
						</p>
					{/if}
					{#if todo.user_id}
						<p
							style="border-radius: 1em; width: min(7.5em,17vw); margin: auto; padding: 0.1em 1em;margin-top: 0.5em;  background-color: gray"
						>
							Custom
						</p>
					{/if}
					{#if todo.new}
						<p
							style="border-radius: 1em; width: min(15em,35vw); margin: auto; padding: 0.25em 1em; margin-top: 0.5em; background-color: var(--dark-red)"
						>
							New
						</p>
					{/if}
				</section>
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
	section {
		color: inherit;
	}
	#grid div {
		background-color: var(--background-4);
		padding: 2em;
		color: var(--text-color);
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		width: max(70vw,5em);
		text-align: center;
		display: flex;
		align-items: center;
	}
	@media (max-width: 750px) {
		#grid div {
			width: 13em;
		}
	}
	.symbolButton {
		border-radius: 50%;
		background-color: var(--green);
		border: none;
		cursor: pointer;
	}
	.symbolButton:hover {
		background-color: var(--dark-green);
	}
	.symbolButton span {
		padding: 0.5em;
		color: white;
		font-size: 1.5rem;
	}
	.badSymbolButton {
		border-radius: 50%;
		background-color: var(--red);
		border: none;
		cursor: pointer;
	}
	.badSymbolButton:hover {
		background-color: var(--dark-red);
	}
	.badSymbolButton span {
		padding: 0.5em;
		color: white;
		font-size: 1.5rem;
	}
	.hover:hover {
		background-color: var(--background-5) !important;
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
