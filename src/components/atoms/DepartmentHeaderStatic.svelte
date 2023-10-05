<script lang="ts">
	import type { Department } from '$lib/frontend/class/Department';
	import { LocalEnSwitch } from '$lib/frontend/store';

	export let department: Department;
</script>

<div class="label">
	<small>
		{#if $LocalEnSwitch == 'local'}
			{department.titleLocal}
		{:else}
			{department.titleEn}
		{/if}
	</small>
</div>

<style>
	.label {
		font-weight: 600;
		padding: 0.2rem;
		padding-left: 0.4rem;
		width: 100%;
		background-color: rgb(145, 158, 186);
		color: var(--pico-background-color);
		border-radius: var(--pico-border-radius);
		line-height: 1rem;
		margin-bottom: var(--pico-spacing);
	}
</style>
