<script lang="ts">
	import { Toasts } from '$lib/frontend/store';
	import { fade } from 'svelte/transition';
</script>

{#if $Toasts.filter((toast) => toast.options.position == 'bottom-center').length}
	<div class="toastsContainerBottom" transition:fade>
		{#each $Toasts.filter((toast) => toast.options.position == 'bottom-center') as toast}
			<div class={`toast ${toast.options.style} ${toast.options.position}`} transition:fade>
				{toast.message}
			</div>
		{/each}
	</div>
{/if}
{#if $Toasts.filter((toast) => toast.options.position == 'top-center').length}
	<div class="toastsContainerTop" transition:fade>
		{#each $Toasts.filter((toast) => toast.options.position == 'top-center') as toast}
			<div class={`toast ${toast.options.style} ${toast.options.position}`} transition:fade>
				{toast.message}
			</div>
		{/each}
	</div>
{/if}

<style>
	.toastsContainerTop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 1000;
	}
	.toastsContainerBottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1rem;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		z-index: 1000;
		margin-bottom: 4rem;
	}
	.toast {
		padding: var(--pico-spacing);
		border-radius: var(--pico-border-radius);
		box-shadow: var(--pico-shadow);
		max-width: 90vw;
		width: 20rem;
		text-align: center;
		margin-bottom: var(--pico-spacing);
	}

	.toast.success {
		background: rgb(100, 200, 100);
		color: white;
	}
	.toast.error {
		background: var(--pico-primary);
		color: white;
	}
	.toast.info {
		background: rgb(100, 100, 200);
		color: white;
	}
</style>
