<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	export let value = '';
	export let onchange = (value: string) => {};
</script>

<input
	type="search"
	bind:value
	placeholder={`${_('Title')}, ${_('Person')}, ${_('Business')}...`}
	on:change={() => {
		onchange(value);
	}}
/>
