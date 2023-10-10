<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import Icon from '$components/atoms/Icon.svelte';

	export let url: string;
</script>

<a role="button" href={url} target="_blank" style="display:flex">
	<Icon icon="theaters" />
	IMDb
</a>
