<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, onBottomNavButtonClicked } from '$lib/frontend/store';
	import LocalEngSwitch from '../atoms/LocalEngSwitch.svelte';
	let mode = 'createWork';
</script>

<nav>
	<ul />
	<ul />
	<ul>
		{#if $BottomNavButton}
			<li>
				<div>
					<a role="button" href={'#'} on:click={$BottomNavButton.onClick}>
						{$BottomNavButton.label}
					</a>
				</div>
			</li>
		{/if}
		<li>
			<LocalEngSwitch />
		</li>
	</ul>
</nav>

<style>
	.bottom {
		position: fixed;
		bottom: 0px;
		width: 100%;
	}
</style>
