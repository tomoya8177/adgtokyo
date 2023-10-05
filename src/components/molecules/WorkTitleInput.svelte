<script lang="ts">
	import type { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	export let work: Work;
</script>

<div class="grid">
	<label>
		{_('Title')}
		({_('Local')})

		<input type="text" bind:value={work.titleLocal} />
	</label>
	<label>
		{_('Title')}
		({_('English')})
		<input type="text" bind:value={work.titleEn} />
	</label>
</div>
<div class="grid">
	<label>
		{_('Format')}
		({_('Local')})

		<input type="text" bind:value={work.formatLocal} />
	</label>
	<label>
		{_('Format')}
		({_('English')})
		<input type="text" bind:value={work.formatEn} />
	</label>
</div>
