<script lang="ts">
	import { page } from '$app/stores';
	import LocalEngSwitch from '$components/UIComponents/LocalEngSwitch.svelte';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, onBottomNavButtonClicked } from '$lib/frontend/store';
	let mode = 'createWork';
</script>

<nav>
	<ul />
	<ul />
	<ul>
		{#if $BottomNavButton}
			<li>
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
			</li>
		{/if}
	</ul>
</nav>

<style>
	.bottom {
		position: fixed;
		bottom: 0px;
		width: 100%;
	}
	nav {
		margin-right: var(--pico-spacing);
		margin-left: var(--pico-spacing);
	}
</style>
