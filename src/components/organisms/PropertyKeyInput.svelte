<script lang="ts">
	import HasEntityEdit from './HasEntityEdit.svelte';

	import type { Property } from '$lib/frontend/class/Property';
	import { _ } from '$lib/frontend/i18n';
	export let property: Property;
</script>

<label
	>{_('Title')} ({_('Local')})
	<input bind:value={property.keyLocal} />
</label>
<label
	>{_('Title')} ({_('English')})
	<input bind:value={property.keyEn} />
</label>
