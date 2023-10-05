<script lang="ts">
	import { Person } from '$lib/frontend/class/Person';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, LocalEnSwitch } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import EntityNameStatic from '../atoms/EntityNameStatic.svelte';
	import PropertyRowStatic from '../atoms/PropertyRowStatic.svelte';
	import DistributionRowStatic from '../organisms/DistributionRowStatic.svelte';
	import type { PageData } from '../../routes/crew/[entityId]/edit/$types';
	import { goto } from '$app/navigation';
	import EditControlButtons from './EditControlButtons.svelte';
	import RichTextarea from '../atoms/RichTextarea.svelte';
	import HasEntitySubtextStatic from './HasEntitySubtextStatic.svelte';
	export let person: Person;
</script>

<div class="grid">
	<label>
		{_('Name')}
		({_('Local')})
		<input bind:value={person.nameLocal} />
	</label>
	<label>
		{_('Name')}
		({_('English')})
		<input bind:value={person.nameEn} />
	</label>
</div>
<label>
	{_('IMDB')}
	<input bind:value={person.imdbURL} type="url" />
</label>
<label>
	{_('Website')}
	<input bind:value={person.officialWebsiteURL} type="url" />
</label>
<label>
	{_('Bio')}
	({_('Local')})
	<RichTextarea bind:value={person.descriptionLocal} />
</label>
<label>
	{_('Bio')}
	({_('English')})
	<RichTextarea bind:value={person.descriptionEn} />
</label>

<style>
	.flex {
		display: flex;
		gap: 1rem;
	}
</style>
