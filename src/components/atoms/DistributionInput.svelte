<script lang="ts">
	import type { Distribution } from '$lib/frontend/class/Distribution';
	import { _ } from '$lib/frontend/i18n';
	import PairOfInputs from './PairOfInputs.svelte';
	export let distribution: Distribution;
</script>

<div style="display:flex;gap:var(--pico-spacing)">
	<div style="flex:1">
		<label>
			{_('Year')}
			<input type="text" bind:value={distribution.year} />
		</label>
	</div>
	<div style="flex:2">
		<PairOfInputs
			label={_('Release')}
			bind:local={distribution.regionLocal}
			bind:en={distribution.regionEn}
		/>
	</div>
</div>
