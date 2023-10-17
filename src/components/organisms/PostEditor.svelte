<script lang="ts">
	import RichTextarea from '$components/UIComponents/RichTextarea.svelte';
	import type { Content } from '$lib/frontend/class/Content';
	import type { Post } from '$lib/frontend/class/Post';
	import { _ } from '$lib/frontend/i18n';
	import { User, loginModalOpen } from '$lib/frontend/store';
	import { onMount } from 'svelte';

	export let post: Post;
	export let content: Content;
	let wasDraft = post.status == 'draft';
	let progress = 0;
	post.translatingProgress.subscribe((val) => {
		console.log(val);
		//if NaN, return
		if (isNaN(val)) return;
		if (typeof val == 'number') progress = Math.round(val * 100);
	});
	onMount(() => {
		console.log({ post });
		if (!$User.authenticated) {
			loginModalOpen.set(true);
			return;
		}
	});
</script>

<label>
	{_('Title')}
	<input bind:value={content.title} />
</label>
<label for="dummy">
	{_('Content')}
	<RichTextarea bind:value={content.body} />
</label>
<label>
	{_('Status')}
	<select bind:value={post.status}>
		<option value="draft">{_('Draft')}</option>
		<option value="published">{_('Published')}</option>
	</select>
</label>
<label>
	{_('Publish Date')}
	<input type="date" bind:value={post.publicOn} />
</label>
<progress value={progress} max="100" />
{progress}
