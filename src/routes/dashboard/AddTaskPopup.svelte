<script>
	import { enhance } from '$app/forms';
	export let form;
	export let data;
	export let showAddTask; //for use with Already a user? Log in
	let dialog;
	$: if (dialog && showAddTask) dialog.showModal();
	let checked = false;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showAddTask = false)}
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
		<form method="POST" class="form" use:enhance action="?/addTodo">
			<h1 style="text-align: center; letter-spacing: 0.05em">Add Task</h1>
			{#if form?.success == false}
				<p class="error">{form.message}</p>
				<!-- Can not just be !form.success or it will show if it is null -->
			{/if}
			<input name="todo" required placeholder="Todo" />
			<label>
				Due Date:
				<input
					type="datetime-local"
					name="dueDate"
					value={new Date().toISOString().slice(0, 16)}
				/>
			</label>
			<label>
				Optional: Add a link
				<input name="link" type="url" placeholder="https://google.com" />
			</label>
			<label>
				Course: <br />
				<select name="course">
					<option value="None">None</option>
					{#each data.course_data as course}
						<option value={course.course_id}>{course.course_name}</option>
					{/each}
				</select>
			</label>
			<label>
				Assignment Type: <br />
				<select name="assignment_type">
					<option value="Homework">Homework</option>
					<option value="Test/Quiz">Test/Quiz</option>
					<option value="Project">Project</option>
					<option value="Other">Other</option>
				</select>
			</label>
			<div style="display: flex; align-items: center; justify-content: center">
				<h3 style="color: var(--text-color); margin-right: 1em;">Private</h3>
				<input bind:checked type="checkbox" name="publicOrPrivate" id="switch" /><label
					class="toggle"
					for="switch"
				/>
				<h3 style="color: var(--text-color); margin-left: 1em;">Public</h3>
			</div>
			{#if checked}
				<p style="text-align:center; margin-top: 0.5em">
					Public: This is for uploading new canvas assignments for everyone to see. Warning: A mod can ban you for any bad content.
				</p>
			{:else}
				<p style="text-align:center; margin-top: 0.5em">Private: This is just for you to see</p>
			{/if}

			<button class="bouncyButton" style="margin-top: 0.5em">Add Task</button>
		</form>
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
