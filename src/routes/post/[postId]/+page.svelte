<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { _, lang } from '$lib/frontend/i18n';
	import { onMount } from 'svelte';
	onMount(async () => {
		goto(`/post/${$page.params.postId}/${lang.locale}`);
		return;
	});
</script>

<span aria-busy={true} />
