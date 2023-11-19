<div id="sidebar">
    <div class="icon">
        <span
			class="material-symbols-outlined">arrow_back</span
		>
        <div class="sidebar-tooltip">
            test
        </div>
    </div>
</div>
<style>
    #sidebar {
        position: fixed;
        top: 0px;
        left: 0px;
        height: 100vh;
        width: 4rem;
        display: flex;
        flex-direction: column;
        background-color: var(--background-2);
        color: white;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); /*tailwinds shadow-lg*/
    }
    .icon {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        width: 3rem;
        margin: 0 auto;
        background-color: var(--background-5);
        border-radius: 50%;
        cursor: pointer;
        color: var(--text-color);
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
    }
    .icon:hover {
        border-radius: 1em;
        background-color: var(--pop);
    }
    .icon span {
        color: inherit;
        font-size: 23px;
    }
    .sidebar-tooltip{
        width: auto;
        padding: 0.5rem;
        margin: 0.5rem;
        min-width: max-content;
        left: 3.5rem;
        color: white;
    }
</style>