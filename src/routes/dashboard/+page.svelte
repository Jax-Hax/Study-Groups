<script>
	import Dashboard from "./Dashboard.svelte";
	import Sidebar from "./Sidebar.svelte";
	import StudentVueLogin from "./StudentVueLogin.svelte";
	import ToDo from "./ToDo.svelte";
	let dashboard = true;
    let todo = false;
	let new_stuff = false;
	let showLogin = true;
	export let form;
	export let data;
</script>
<body>
	<StudentVueLogin {form} {data} bind:showLogin/>
<div class="content">
<Sidebar bind:dashboard bind:todo bind:new_stuff {data}/></div>
{#if dashboard}
<div class="content"><Dashboard {form} {data}/></div>
{:else if todo}
<div class="content"><ToDo {form} {data}/></div>
{/if}</body>
<style>
	.content {
		margin-left: 5rem
	}
	body {
		background-color: var(--background-1-darkest);
	}
</style>