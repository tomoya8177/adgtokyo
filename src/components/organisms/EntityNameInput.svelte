<script lang="ts">
	import { api } from '$lib/frontend/class/API';
	import { Entity } from '$lib/frontend/class/Entity';
	import { _ } from '$lib/frontend/i18n';
	import { search } from '$lib/frontend/search';
	import Icon from '../atoms/Icon.svelte';
	export let inputLocal: string;
	export let inputEn: string;
	export let onExistingClicked: (entity: Entity) => void;
	let possibleDuplicates: any[] = [];
	const findExistingEntity = async (inputLocal: string, inputEn: string) => {
		const keyword = `${inputLocal.length > 3 ? inputLocal : ''} ${
			inputEn.length > 3 ? inputEn : ''
		}`.trim();
		console.log({ keyword });
		if (!keyword) return;
		const personResults = await search(keyword, 'person', 'AND');
		const businessResults = await search(keyword, 'business', 'AND');
		const mergedResults = [...personResults, ...businessResults];
		const promises = mergedResults.map(async (result) => {
			return api.get('/crew/' + result.id).then((res) => res.data);
		});
		const results = await Promise.all(promises);
		possibleDuplicates = results.map((result) => {
			console.log({ result });
			const entity = new Entity(result.person);
			entity.build(result);
			return entity;
		});
		console.log({ possibleDuplicates });
	};
	$: findExistingEntity(inputLocal, inputEn);
</script>

<label
	>{_('Name')} ({_('Local')})
	<input bind:value={inputLocal} />
</label>
<label
	>{_('Name')} ({_('English')})
	<input bind:value={inputEn} />
</label>
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
