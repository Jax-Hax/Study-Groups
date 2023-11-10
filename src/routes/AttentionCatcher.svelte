<script>
	export let showSignup;
</script>

<div id="attention">
	<div>
		<h1>___ - Everything Canvas can't give you</h1>
		<p>
			Agendas for all classes (tests, quizzes, assignments, projects, etc), study material, study groups, a summary of the announcements/list of clubs, StudentVue grades, and more!
		</p>
		<button on:click={() => (showSignup = true)} class="bouncyButton"> Sign up </button>
	</div>
	<div>
		<img
			style="max-width: min(50vw,50em); max-height: 50%"
			src="favicon.png"
			alt="the stockshare logo"
		/>
	</div>
</div>

<style>
	#attention {
		background: var(--background-3);
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10em 4vw;
		justify-content: space-between;
		color: var(--text-color);
		gap: 1rem;
	}
	#attention h1 {
		font-size: max(4.5vw, 4em);
		color: var(--text-color);
	}
	#attention p {
		color: var(--text-color);
		font-size: 1.5rem;
		padding-bottom: 2em;
	}
	@media screen and (min-width: 1100px) {
		#attention h1 {
			width: 90%;
		}
		#attention {
			flex-flow: row nowrap;
		}
		#attention p {
			width: 90%;
		}
		#attention img {
			object-fit: contain;
		}
	}
</style>
