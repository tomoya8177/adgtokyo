<script lang="ts">
	import { Person } from '$lib/frontend/class/Person';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, LocalEnSwitch } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import EntityNameStatic from '../../../../components/atoms/EntityNameStatic.svelte';
	import PropertyRowStatic from '../../../../components/atoms/PropertyRowStatic.svelte';
	import DistributionRowStatic from '../../../../components/organisms/DistributionRowStatic.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import EditControlButtons from '../../../../components/molecules/EditControlButtons.svelte';
	import RichTextarea from '../../../../components/atoms/RichTextarea.svelte';
	import HasEntitySubtextStatic from '../../../../components/molecules/HasEntitySubtextStatic.svelte';
	export let person: Person;
</script>

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
