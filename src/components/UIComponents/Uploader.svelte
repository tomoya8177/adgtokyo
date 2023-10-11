<script lang="ts">
	import { openPicker } from '$lib/frontend/Upload';
	import { _ } from '$lib/frontend/i18n';
	import Button from '$components/UIComponents/Button.svelte';
	export let onUploadDone: (uploadedFiles: any) => void;
	export let label = _('Upload');
</script>

<Button
	{label}
	className="outline"
	onclick={() => {
		openPicker(onUploadDone);
	}}
	icon="upload"
/>
