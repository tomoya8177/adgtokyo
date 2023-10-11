<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import RichTextarea from '$components/UIComponents/RichTextarea.svelte';
	import type { Entity } from '$lib/frontend/class/Entity';
	import PairOfInputs from '$components/UIComponents/PairOfInputs.svelte';
	import { me } from '$lib/frontend/class/User';
	import { onMount } from 'svelte';
	import TranslateButton from '$components/UIComponents/TranslateButton.svelte';
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
