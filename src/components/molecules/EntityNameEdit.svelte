<script lang="ts">
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
	import type { Entity } from '$lib/frontend/class/Entity';
	import PairOfInputs from '../atoms/PairOfInputs.svelte';
	import TranslateButton from '../atoms/TranslateButton.svelte';
	export let person: Entity;
</script>

<PairOfInputs bind:local={person.nameLocal} bind:en={person.nameEn} label={_('Name')} />
<label>
	{_('IMDB')}
	<input bind:value={person.imdbURL} type="url" />
</label>
<label>
	{_('Website')}
	<input bind:value={person.officialWebsiteURL} type="url" />
</label>
<label for="bio-local">
	{_('Bio')}
	({_('Local')})
	<RichTextarea bind:value={person.descriptionLocal} />
</label>
<label for="bio-en">
	{_('Bio')}
	({_('English')})
	<TranslateButton bind:local={person.descriptionLocal} bind:en={person.descriptionEn} />
	<RichTextarea bind:value={person.descriptionEn} />
</label>
