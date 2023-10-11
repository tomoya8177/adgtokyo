<script lang="ts">
	import type { Department } from '$lib/frontend/class/Department';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import HeadingLabel from '$components/UIComponents/HeadingLabel.svelte';

	export let department: Department;
</script>

<HeadingLabel label={$LocalEnSwitch == 'local' ? department.titleLocal : department.titleEn} />
