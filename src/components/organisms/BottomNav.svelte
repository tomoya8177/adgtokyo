<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from '$lib/frontend/i18n';
	import { onBottomNavButtonClicked } from '$lib/frontend/store';
	let mode = 'createWork';
	page.subscribe((page) => {
		switch (page.url.pathname) {
			case '/work/create':
				mode = 'proceedCreatingWork';
				break;
			default:
				mode = 'createWork';
		}
	});
</script>

<div class="container bottom">
	<nav>
		<ul>
			<li>A</li>
		</ul>
		<ul>
			<li>
				{#if mode === 'createWork'}
					<a role="button" href="/work/create">
						{_('Create New Work')}
					</a>
				{/if}
				{#if mode === 'proceedCreatingWork'}
					<button on:click={$onBottomNavButtonClicked}>
						{_('Proceed Creating Work')}
					</button>
				{/if}
			</li>
		</ul>
		<ul>
			<li>A</li>
		</ul>
	</nav>
</div>

<style>
	.bottom {
		position: fixed;
		bottom: -1px;
		width: 100%;
		background-color: var(--background-color);
		margin-left: calc(var(--spacing) * -1);
	}
</style>
