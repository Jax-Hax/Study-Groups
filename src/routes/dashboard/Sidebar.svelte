<div id="sidebar">
    <div class="icon">
        <span
			class="material-symbols-outlined">home</span
		>
        <div class="sidebar-tooltip">
            Dashboard
        </div>
    </div>
    <div class="icon">
        <span
			class="material-symbols-outlined">lists</span
		>
        <div class="sidebar-tooltip">
            To-Do List
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
        margin-bottom: 1em;
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
        position: absolute;
        width: auto;
        padding: 0.5rem;
        margin: 0.5rem;
        min-width: max-content;
        left: 3.5rem;
        color: var(--text-color);
        background-color: var(--background-2);
        border-radius: 0.75em;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 100ms;
        transform-origin: left;
        scale: 0;
    }
    .icon:hover div {
        scale: 1
    }
</style>