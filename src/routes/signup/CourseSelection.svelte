<script>
	import { enhance } from '$app/forms';
	export let form;
	let text = 'Import from StudentVue';
</script>

<div class="dialog">
    <h1 style="text-align: center;">Class selection</h1>
    {#each form.courseOptions as course}
    <div style="display: flex;">
    <p class="course">{course}</p>
    <button on:click={() => {const index = form.courseOptions.indexOf(course); if(index > -1) {console.log("her"); form.courseOptions.splice(index,1)}}}>aa</button>
</div>
    {/each}
</div>

<style>
    .course{
        font-size: 25px
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
	input:invalid {
		border: 1px solid red;
	}
	.dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 3em;
		width: 60vw;
		max-width: 600px;
		border: none;
		border-radius: 1em;
		background-color: var(--background-5);
	}
	h1,
	p,
	label {
		color: var(--text-color);
	}
	input {
		padding: 0.75em 1em 0.75em;
		border: 0.1em solid #46c759;
		border-radius: 16px;
		background-color: var(--background-1-darkest);
		color: var(--text-color);
		font-size: 18px;
		width: 92%;
		margin-bottom: 0.5em;
	}
	select {
		padding: 0.75em 1em 0.75em;
		border-radius: 16px;
		background-color: var(--background-1-darkest);
		color: var(--text-color);
		font-size: 14px;
		width: 100%;
		margin-bottom: 0.5em;
	}
	.already {
		cursor: pointer;
		text-align: center;
	}
	.already:hover {
		color: var(--pop);
		text-decoration: underline;
	}
	input::placeholder {
		font-family: 'Material Symbols Outlined';
		font-weight: normal;
		font-style: normal;
		font-size: 24px; /* Preferred icon size */
		display: inline-block;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;

		/* Support for all WebKit browsers. */
		-webkit-font-smoothing: antialiased;
		/* Support for Safari and Chrome. */
		text-rendering: optimizeLegibility;

		/* Support for Firefox. */
		-moz-osx-font-smoothing: grayscale;

		/* Support for IE. */
		font-feature-settings: 'liga';
	}
	.error {
		text-align: center;
		color: red;
	}
</style>
