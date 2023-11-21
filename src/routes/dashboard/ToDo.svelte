<script>
	import AddTaskPopup from "./AddTaskPopup.svelte";

	export let data;
	export let form;
	$: data.custom_todo_data.sort((a, b) => {
		let b_date = new Date(b.due_date);
        let a_date = new Date(a.due_date);
        if (a_date > b_date) {
			return -1;
		}
        else if (b_date > a_date) {
            return 1;
        }
        else{
            return 0;
        }
	});
	let showAddTask = false;
</script>
{#if showAddTask}
			<AddTaskPopup {form} {data} bind:showAddTask />
		{/if}
<h1 id="todo-h1">To-Do List</h1>

<div id="grid">
	<button class="bouncyButton" on:click={() => (showAddTask = true)} style="padding: 0.5em 4em; font-size: 30px">Add Task</button>
	{#each data.custom_todo_data as todo}
    {@const course = data.course_data.filter(value => value.course_id === todo.course_id)[0]}
		<div>
            <p>{todo.text}</p>
            {#if Math.abs(+(((new Date() - new Date(todo.due_date))/ (3600000* 24)) ).toFixed(1)) > 1}
			<p>Due in {Math.abs(+(((new Date() - new Date(todo.due_date))/ (3600000* 24)) ).toFixed(1))} days and {Math.abs(+(((new Date() - new Date(todo.due_date))/ 3600000) % 24).toFixed(1))} hours</p>
            {:else}
            <p style="color: var(--red)">Due in {Math.abs(+(((new Date() - new Date(todo.due_date))/ 3600000) % 24).toFixed(1))} hours</p>
            {/if}
			
			<p style="border-radius: 1em; padding: 0.25em 1em; background-color: {data.user_in_course_data.filter(value => value.course_id === todo.course_id)[0].hex}">{course.course_name}</p>
		</div>
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
	#grid div:hover {
		background-color: var(--background-6);
	}
	h1,
	p {
		color: inherit;
	}
    #todo-h1{
        color: var(--text-color);
        text-align: center;
    }
</style>
