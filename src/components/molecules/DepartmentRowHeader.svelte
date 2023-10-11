<script lang="ts">
	import DepartmentTitleInput from './DepartmentTitleInput.svelte';

	import type { Department } from '$lib/frontend/class/Department';
	import { _ } from '$lib/frontend/i18n';
	import DepartmentHeaderStatic from '../atoms/DepartmentHeaderStatic.svelte';
	import EditControlButtons from './EditControlButtons.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	export let department: Department;
	export let onDelete: () => void;
	export let onUp: (() => void) | false;
	export let onDown: (() => void) | false;
	export let onUpdate: (department: Department) => void;
</script>

<div class="justified-flex">
	<div>
		{#if !department.editing}
			<DepartmentHeaderStatic {department} />
		{:else}
			<DepartmentTitleInput bind:department />
		{/if}
	</div>
	<div>
		<EditControlButtons
			{onUp}
			{onDown}
			bind:editing={department.editing}
			onSave={() => {
				onUpdate(department);
				department.editing = false;
			}}
			onDelete={async () => {
				if (!(await myConfirm(_('Are you sure?')))) return;
				department.delete();
				department.editing = false;
				onDelete();
			}}
		/>
	</div>
</div>
