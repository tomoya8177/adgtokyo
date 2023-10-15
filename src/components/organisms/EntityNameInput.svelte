<script lang="ts">
	import Icon from '$components/UIComponents/Icon.svelte';
	import Searching from '$components/UIComponents/Searching.svelte';
	import { api } from '$lib/frontend/class/API';
	import { Entity } from '$lib/frontend/class/Entity';
	import { _ } from '$lib/frontend/i18n';
	import { search } from '$lib/frontend/search';
	import PairOfInputs from '$components/UIComponents/PairOfInputs.svelte';
	export let inputLocal: string;
	export let inputEn: string;
	export let onExistingClicked: (entity: Entity) => void;
	let possibleDuplicates: any[] = [];
	let searching = false;
	const findExistingEntity = async (inputLocal: string, inputEn: string) => {
		const keyword = `${inputLocal.length > 1 ? inputLocal : ''} ${
			inputEn.length > 2 ? inputEn : ''
		}`.trim();
		if (!keyword) return;
		searching = true;
		const personResults = await search(keyword, 'person', 'AND', true);
		const businessResults = await search(keyword, 'business', 'AND', true);
		const mergedResults = [...personResults, ...businessResults];
		const promises = mergedResults.map(async (result) => {
			return api.get('/crew/' + result.id).then((res) => res.data);
		});
		const results = await Promise.all(promises);
		possibleDuplicates = results.map((result) => {
			const entity = new Entity(result.entity);
			entity.build(result);
			return entity;
		});
		searching = false;
	};
</script>

<PairOfInputs
	label={_('Name')}
	bind:local={inputLocal}
	bind:en={inputEn}
	onInput={async () => {
		findExistingEntity(inputLocal, inputEn);
	}}
/>
{#if searching}
	<Searching />
{/if}
{#if possibleDuplicates.length > 0}
	<div>
		{_('Possible duplicates')}:
	</div>
	{#each possibleDuplicates as option}
		<div>
			<a
				role="button"
				href={'#'}
				style="display:flex;align-items:center;margin-bottom:var(--pico-spacing)"
				on:click={() => onExistingClicked(option)}
			>
				<Icon icon={option.category} />
				<span>
					<small>
						{option.nameLocal}
						{option.nameEn}
						(ID:
						{option.username} )
					</small>
				</span>
			</a>
		</div>
	{/each}
	{_('Or create as new entity')}
{/if}
