<script lang="ts">
	import TranslateButton from '$components/UIComponents/TranslateButton.svelte';
	import { _ } from '$lib/frontend/i18n';
	export let label: string;
	export let local: string;
	export let en: string;
	export let onInput: () => void = () => {};
</script>

<div class="grid">
	<label>
		{label}
		({_('Local')})

		<input type="text" bind:value={local} on:input={onInput} />
	</label>
	<label>
		<div style="display:flex">
			{label}
			({_('English')})
			<TranslateButton bind:local bind:en />
		</div>
		<input type="text" bind:value={en} on:input={onInput} />
	</label>
</div>
