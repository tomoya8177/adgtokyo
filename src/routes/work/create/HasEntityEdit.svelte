<script lang="ts">
	import type { Property } from '$lib/frontend/class/Property';
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { User, auth0 } from '$lib/frontend/store';
	import Button from '../../../components/atoms/Button.svelte';
	let work = new Work({});
	export let hasEntity: PropertyHasEntity;
	let inputLocal: string = '';
	let inputEn: string = '';
</script>

<div>
	<div>
		<label
			>Name (Local)
			<input bind:value={inputLocal} />
		</label>
	</div>
	<div>
		<label
			>Name (English)
			<input bind:value={inputEn} />
		</label>
	</div>
</div>
