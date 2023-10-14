<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from '$lib/frontend/i18n';
	import { BottomInputValue, BottomNavButton } from '$lib/frontend/store';
</script>

<div class="bottom justified-flex nav">
	{#if $page.url.pathname.includes('openai')}
		<div style="flex:1">
			<input type="text" placeholder={_('Prompt')} bind:value={$BottomInputValue} />
		</div>
	{/if}
	{#if $BottomNavButton}
		<div role="group">
			<a
				role="button"
				href={'#'}
				on:click={async () => {
					const bool = await $BottomNavButton.onClick();
					if (bool === false) {
						$BottomNavButton.busy = false;
						return;
					}
					$BottomNavButton.busy = true;
				}}
				aria-busy={$BottomNavButton.busy}
			>
				{$BottomNavButton.label}
			</a>
		</div>
	{/if}
</div>

<style>
	.bottom {
		position: fixed;
		bottom: 0px;
		width: calc(100% - var(--pico-spacing) * 2);
	}
	.nav {
		margin-right: var(--pico-spacing);
		margin-left: var(--pico-spacing);
	}
</style>
