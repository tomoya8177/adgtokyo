<script lang="ts">
	import type { Distribution } from '$lib/frontend/class/Distribution';
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import DistributionInput from '../atoms/DistributionInput.svelte';
	import EditControlButtons from '../molecules/EditControlButtons.svelte';
	import DistributionRowStatic from './DistributionRowStatic.svelte';

	export let distribution: Distribution;
	export let onDelete: () => void;
	export let onUp: (() => void) | false;
	export let onDown: (() => void) | false;
</script>

<article>
	<div class="justified-flex">
		<div>
			{#if !distribution.editing}
				<DistributionRowStatic {distribution} />
			{:else}
				<DistributionInput bind:distribution />
			{/if}
		</div>
		<div>
			<EditControlButtons
				{onUp}
				{onDown}
				bind:editing={distribution.editing}
				onSave={() => {
					if (!distribution.validate()) return;
					distribution.update({
						year: distribution.year,
						regionLocal: distribution.regionLocal,
						regionEn: distribution.regionEn
					});
					distribution.editing = false;
				}}
				onDelete={() => {
					if (!confirm(_('Are you sure?'))) return;
					distribution.delete();
					distribution.editing = false;
					onDelete();
				}}
			/>
		</div>
	</div>
</article>
