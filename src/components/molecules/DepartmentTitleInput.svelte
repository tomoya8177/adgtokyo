<script lang="ts">
	import type { Department } from '$lib/frontend/class/Department';
	import { _ } from '$lib/frontend/i18n';
	export let department: Department;
</script>

<label>
	{_('Department')}
	({_('Local')})
	<input type="text" bind:value={department.titleLocal} />
</label>
<label>
	{_('Department')}
	({_('Local')})
	<input type="text" bind:value={department.titleEn} />
</label>
