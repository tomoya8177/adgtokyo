<script lang="ts">
	import { myConfirm } from '$lib/frontend/class/Confirm';
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
	export let onDistributionUpdate: (distribution: Distribution) => void;
</script>

<article class="card">
	<div class="justified-flex">
		<div style="flex:1">
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
					onDistributionUpdate(distribution);
					distribution.editing = false;
				}}
				onDelete={async () => {
					if (!(await myConfirm(_('Are you sure?')))) return;
					distribution.delete();
					distribution.editing = false;
					onDelete();
				}}
			/>
		</div>
	</div>
</article>
