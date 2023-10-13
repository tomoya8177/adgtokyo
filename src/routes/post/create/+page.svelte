<script lang="ts">
	import { goto } from '$app/navigation';
	import RichTextarea from '$components/UIComponents/RichTextarea.svelte';
	import { Content } from '$lib/frontend/class/Content';
	import { Post } from '$lib/frontend/class/Post';
	import { currentTimestamp } from '$lib/frontend/currentTimestamp';
	import { _, lang } from '$lib/frontend/i18n';
	import { locales } from '$lib/frontend/locales';
	import { User, loginModalOpen } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let post = new Post({});
	let content = new Content({
		postId: post.id,
		locale: lang.locale
	});
	let wasDraft = post.status == 'draft';
	onMount(() => {
		if (!$User.authenticated) {
			loginModalOpen.set(true);
			return;
		}
	});
	let buttonBusy = false;
</script>

<label>
	{_('Language')}
	<select bind:value={content.locale}>
		{#each locales as locale}
			<option value={locale.key}>{_(locale.name)}</option>
		{/each}
	</select>
</label>

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
{#if post.status == 'published'}
	<p>Other languages will be generated upon saving this.</p>
{/if}
<button
	aria-busy={buttonBusy}
	on:click={async () => {
		buttonBusy = true;
		if (post.status == 'published' && wasDraft) {
			post.publicAt = currentTimestamp();
		}
		await post.create();
		console.log({ post });
		await content.create();

		await Promise.all(
			locales.map(async (locale) => {
				if (locale.key != content.locale) {
					await post.generateOtherLocaleContentFrom(content.locale);
				}
			})
		);
		buttonBusy = false;
		goto(`/post`, {
			invalidateAll: true
		});
	}}>{_('Create')}</button
>
