<script lang="ts">
	import DepartmentTitleInput from './DepartmentTitleInput.svelte';

	import type { Department } from '$lib/frontend/class/Department';
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import Button from '../atoms/Button.svelte';
	import DepartmentHeaderStatic from '../atoms/DepartmentHeaderStatic.svelte';
	import EditControlButtons from './EditControlButtons.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	export let department: Department;
	export let onDelete: () => void;
	export let onUp: (() => void) | false;
	export let onDown: (() => void) | false;
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
				if (!department.validate()) return;
				department.update({
					titleLocal: department.titleLocal,
					titleEn: department.titleEn
				});
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
