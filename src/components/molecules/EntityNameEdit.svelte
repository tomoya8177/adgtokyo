<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, LocalEnSwitch, User } from '$lib/frontend/store';
	import RichTextarea from '../atoms/RichTextarea.svelte';
	import type { Entity } from '$lib/frontend/class/Entity';
	import PairOfInputs from '../atoms/PairOfInputs.svelte';
	import TranslateButton from '../atoms/TranslateButton.svelte';
	import { me } from '$lib/frontend/class/User';
	import { onMount } from 'svelte';
	export let entity: Entity;
	onMount(() => {
		console.log({ me });
	});
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
{#if me.isPro && me.entityId == entity.id}
	<label for="bio-local">
		{_('Bio')}
		({_('Local')})
		<RichTextarea bind:value={entity.descriptionLocal} />
	</label>
	<label for="bio-en">
		{_('Bio')}
		({_('English')})
		<TranslateButton
			bind:local={entity.descriptionLocal}
			bind:en={entity.descriptionEn}
			forTitle={false}
		/>
		<RichTextarea bind:value={entity.descriptionEn} />
	</label>
{/if}
