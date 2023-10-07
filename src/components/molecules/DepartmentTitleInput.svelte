<script lang="ts">
	import type { Department } from '$lib/frontend/class/Department';
	import { _ } from '$lib/frontend/i18n';
	import { search } from '$lib/frontend/search';
	import PairOfInputs from '../atoms/PairOfInputs.svelte';
	export let department: Department;
	let duplicates: Department[] = [];
	let fixed = false;
	const searchExisting = async () => {
		const local = department.titleLocal.trim();
		const eng = department.titleEn.trim();
		fixed = false;
		const localAndEng = (local.length > 1 ? local : '') + ' ' + (eng.length > 2 ? eng : '');
		duplicates = await search(localAndEng, 'department', 'AND');
		duplicates = duplicates.map((dep) => {
			dep.mix = (dep.titleLocal + dep.titleEn).trim();
			return dep;
		});
		//filter departments that has the same mix
		duplicates = duplicates.filter(
			(dep, index, self) => index === self.findIndex((t) => t.mix === dep.mix)
		);
	};
</script>

<PairOfInputs
	label={_('Department')}
	bind:local={department.titleLocal}
	bind:en={department.titleEn}
	onInput={async () => {
		searchExisting();
	}}
/>

{#if duplicates.length && !fixed}
	{_('Maybe...')}
	{#each duplicates as dep}
		<div>
			<a
				on:click={() => {
					department.titleLocal = dep.titleLocal;
					department.titleEn = dep.titleEn;
					fixed = true;
				}}
				href={'#'}
			>
				{dep.titleLocal} / {dep.titleEn}
			</a>
		</div>
	{/each}
{/if}
