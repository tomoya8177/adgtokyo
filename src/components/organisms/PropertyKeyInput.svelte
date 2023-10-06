<script lang="ts">
	import HasEntityEdit from './HasEntityEdit.svelte';

	import type { Property } from '$lib/frontend/class/Property';
	import { _ } from '$lib/frontend/i18n';
	import { search } from '$lib/frontend/search';
	export let property: Property;
	let fixed = false;
	let duplicates: Property[] = [];
	const searchExisting = async () => {
		const local = property.keyLocal.trim();
		const eng = property.keyEn.trim();
		fixed = false;
		const localAndEng = (local.length > 1 ? local : '') + ' ' + (eng.length > 2 ? eng : '');
		duplicates = await search(localAndEng, 'property', 'AND');
	};
</script>

<div class="grid">
	<label
		>{_('Title')} ({_('Local')})
		<input
			bind:value={property.keyLocal}
			on:input={async () => {
				searchExisting();
			}}
		/>
	</label>
	<label
		>{_('Title')} ({_('English')})
		<input
			bind:value={property.keyEn}
			on:input={async () => {
				searchExisting();
			}}
		/>
	</label>
</div>
{#if duplicates.length && !fixed}
	{_('Maybe...')}
	{#each duplicates as prop}
		<div>
			<a
				on:click={() => {
					property.keyLocal = prop.keyLocal;
					property.keyEn = prop.keyEn;
					fixed = true;
				}}
				href={'#'}
			>
				{prop.keyLocal} / {prop.keyEn}
			</a>
		</div>
	{/each}
{/if}
