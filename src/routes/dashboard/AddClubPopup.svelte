<script>
	import { enhance } from '$app/forms';
	export let form;
	export let data;
	export let showNewClub; //for use with Already a user? Log in
	let dialog;
	$: if (dialog && showNewClub) dialog.showModal();
	let checked = false;
	let selected;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showNewClub = false)}
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
		<form method="POST" use:enhance action="?/addTodo">
			<h1 style="text-align: center; letter-spacing: 0.05em">Create Club</h1>
			{#if form?.success == false}
				<p class="error">{form.message}</p>
				<!-- Can not just be !form.success or it will show if it is null -->
			{/if}
			<input name="name" required placeholder="Club Name" />
            <textarea name="description" placeholder="Club Description"></textarea>
			<input name="sponsor" required placeholder="Sponsor (Teacher in charge of the club)" />
			<input name="location" required placeholder="Location" />
            <label>
				Starting time:
				<input name="time" type="time" />
			</label>
            <label>
				Ending time:
				<input name="time" type="time" />
			</label>
			<label>
				Repeats <br />
				<select name="assignment_type" bind:value={selected}>
					<option value="Weekly">Weekly</option>
					<option value="Bi-Weekly">Every Other Week</option>
					<option value="Monthly">Monthly</option>
					<option value="Other">Other</option>
				</select>
			</label>
			{#if selected === 'Weekly' || selected === 'Bi-Weekly'}
				<label>
					Day of the week:
					<select name="assignment_type">
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
				</label>
			{:else if selected === 'Monthly'}
				<label>
					First ______ of the week:
					<select name="assignment_type">
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
				</label>
			{:else}
            <label>
				Add dates (you can always add or remove more later):
				<input type="date" name="dueDate" />
			</label>{/if}
			{#if selected === 'Bi-Weekly'}
				<div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1em">
					<h3 style="color: var(--text-color); margin-right: 1em;">Starting next week</h3>
					<input bind:checked type="checkbox" name="publicOrPrivate" id="switch" /><label
						class="toggle"
						for="switch"
					/>
					<h3 style="color: var(--text-color); margin-left: 1em;">Starting in two weeks</h3>
				</div>
			{/if}
            {#if selected !== "Other"}
            <label>
				Final club date (Dates will be auto-generated up until this point):
				<input type="datetime-local" name="dueDate" value={new Date().toISOString().slice(0, 16)} />
			</label>
            {/if}
			<button class="bouncyButton" style="margin-top: 0.5em">Log In</button>
		</form>
	</div>
</dialog>

<style>
    textarea {
        resize: none;
        border-radius: 1em;
        padding: 0.5em;
        background-color: var(--background-2);
        color: var(--text-color);
        border: 0.1em solid var(--pop);
        margin: 0.5em 0
    }
	select {
		color: var(--text-color);
		background-color: var(--background-2);
		border: 0.1em solid var(--pop);
		border-radius: 10px;
		padding: 0.5em;
		width: 100%;
		margin-bottom: 1em;
	}
	form {
		position: relative;
		display: flex;
		width: 100%;
		margin: auto;
		flex-direction: column;
		color: var(--text-color);
		border-radius: 2em;
	}
	input:invalid {
		border: 1px solid red;
	}
	dialog {
		top: 50%;
		left: 50%;
		transform: translate(calc(-50% + 2.5rem), -50%);
		padding: 5em;
		width: 40vw;
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
	input {
		padding: 0.75em 1em;
		border: 0.1em solid #46c759;
		border-radius: 16px;
		background-color: var(--background-1-darkest);
		color: var(--text-color);
		font-size: 18px;
        width: calc(100% - 2em);
		margin-bottom: 0.5em;
	}
	input[type='checkbox'] {
		height: 0;
		width: 0;
		visibility: hidden;
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
