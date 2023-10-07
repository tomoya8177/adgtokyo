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
	export let entity: Entity;
</script>

<PairOfInputs bind:local={entity.nameLocal} bind:en={entity.nameEn} label={_('Name')} />
<label>
	{_('IMDb')}
	<input bind:value={entity.imdbURL} type="url" />
</label>
<label>
	{_('Website')}
	<input bind:value={entity.officialWebsiteURL} type="url" />
</label>
<label for="bio-local">
	{_('Bio')}
	({_('Local')})
	<RichTextarea bind:value={entity.descriptionLocal} />
</label>
<label for="bio-en">
	{_('Bio')}
	({_('English')})
	<TranslateButton bind:local={entity.descriptionLocal} bind:en={entity.descriptionEn} />
	<RichTextarea bind:value={entity.descriptionEn} />
</label>
