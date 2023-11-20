<script>
	import Dashboard from "./Dashboard.svelte";
	import Sidebar from "./Sidebar.svelte";
	import ToDo from "./ToDo.svelte";
	let dashboard = true;
    let todo = false;
	export let form;
	export let data;
</script>
<body>
<div class="content">
<Sidebar bind:dashboard bind:todo/></div>
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