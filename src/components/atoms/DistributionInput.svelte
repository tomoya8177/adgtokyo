<script lang="ts">
	import type { Distribution } from '$lib/frontend/class/Distribution';

	import { _ } from '$lib/frontend/i18n';
	export let distribution: Distribution;
</script>

<div class="grid">
	<label>
		{_('Year')}
		<input type="text" bind:value={distribution.year} />
	</label>
	<label>
		{_('Release')}
		({_('Local')})
		<input type="text" bind:value={distribution.regionLocal} />
	</label>
	<label>
		{_('Release')}
		({_('English')})
		<input type="text" bind:value={distribution.regionEn} />
	</label>
</div>
