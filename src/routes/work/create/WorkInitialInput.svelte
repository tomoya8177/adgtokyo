<script lang="ts">
	import PropertyRowEdit from '../../../components/organisms/PropertyRow.svelte';

	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, User, auth0, onBottomNavButtonClicked } from '$lib/frontend/store';
	import Button from '../../../components/atoms/Button.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { Property } from '$lib/frontend/class/Property';
	import { Department } from '$lib/frontend/class/Department';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { History } from '$lib/frontend/class/History';
	export let work: Work;
</script>

<label>
	{_('Title')}
	({_('Local')})

	<input type="text" bind:value={work.titleLocal} />
</label>
<label>
	{_('Title')}
	({_('English')})
	<input type="text" bind:value={work.titleEn} />
</label>

<style>
	.box {
		border: 1px solid rgba(100, 100, 100, 0.5);
		padding: var(--pico-spacing);
		margin-bottom: var(--pico-spacing);
		border-radius: var(--pico-border-radius);
	}
</style>
