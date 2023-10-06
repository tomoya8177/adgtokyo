<script lang="ts">
	import type { Department } from '$lib/frontend/class/Department';
	import { _ } from '$lib/frontend/i18n';
	import { search } from '$lib/frontend/search';
	export let department: Department;
	let duplicates: Department[] = [];
	let fixed = false;
	const searchExisting = async () => {
		const local = department.titleLocal.trim();
		const eng = department.titleEn.trim();
		fixed = false;
		const localAndEng = (local.length > 1 ? local : '') + ' ' + (eng.length > 2 ? eng : '');
		duplicates = await search(localAndEng, 'department', 'AND');
	};
</script>

<div class="grid">
	<label>
		{_('Department')}
		({_('Local')})
		<input
			type="text"
			bind:value={department.titleLocal}
			on:input={async () => {
				searchExisting();
			}}
		/>
	</label>
	<label>
		{_('Department')}
		({_('Local')})
		<input
			type="text"
			bind:value={department.titleEn}
			on:input={async () => {
				searchExisting();
			}}
		/>
	</label>
</div>
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
