<script lang="ts">
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { _ } from '$lib/frontend/i18n';

	export let hasEntity: PropertyHasEntity;
</script>

<label
	>{_('Memo')} ({_('Local')})
	<input bind:value={hasEntity.subtextLocal} />
</label>
<label
	>{_('Memo')} ({_('English')})
	<input bind:value={hasEntity.subtextEn} />
</label>
