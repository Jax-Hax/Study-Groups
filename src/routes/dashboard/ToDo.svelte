<script>
	export let data;
	export let form;
	$: data.custom_todo_data.sort((a, b) => {
		let b_date = new Date(b.due_date);
        let a_date = new Date(a.due_date);
        if (a_date > b_date) {
			return 1;
		}
        else if (b_date > a_date) {
            return -1;
        }
        else{
            return 0;
        }
	});
</script>
<h1 id="todo-h1">To-Do List</h1>
<div id="grid">
	{#each data.custom_todo_data as todo}
		<div>
			<h1>{new Date(todo.due_date)}</h1>
			<p>_ new assignments</p>
			<p>_ new grades</p>
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
