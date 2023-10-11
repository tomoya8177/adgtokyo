<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import Icon from '$components/UIComponents/Icon.svelte';

	export let count: number;
</script>

<div style="display:flex;gap:0.2rem">
	<Icon icon="thumb_up" />
	<span>
		{count}
	</span>
	<small>{_('total Good Jobs')}</small>
</div>
