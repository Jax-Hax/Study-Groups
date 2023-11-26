<script>
	import ClassMod from './ClassMod.svelte';
    import Sidebar from './Sidebar.svelte';
	let class_mod = true;
	let school_admin = false;
	export let form;
	export let data;
</script>

<body>
	<div class="content">
		<Sidebar bind:school_admin bind:class_mod {data} />
	</div>
	{#if mod_dashboard}
		<div class="content"><ClassMod {form} {data} /></div>
	{:else if school_admin}
	{/if}</body
>

<style>
	.content {
		margin-left: 5rem;
	}
	body {
		background-color: var(--background-1-darkest);
	}
</style>
