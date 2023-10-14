<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$lib/frontend/class/API';
	import { Content } from '$lib/frontend/class/Content';
	import { Post } from '$lib/frontend/class/Post';
	import { _, lang } from '$lib/frontend/i18n';
	import { onMount } from 'svelte';
	import PostEditor from '$components/organisms/PostEditor.svelte';
	import { locales } from '$lib/frontend/locales';
	import { goto } from '$app/navigation';
	import { me } from '$lib/frontend/class/User';
	import { BottomNavButton } from '$lib/frontend/store';
	import LocaleSelector from '$components/UIComponents/LocaleSelector.svelte';
	import GoBackToPostList from '$components/UIComponents/GoBackToPostList.svelte';

	let post: Post;
	let content: Content;
	const load = async (locale) => {
		let response = (await api
			.get(`/post/${$page.params.postId}/${locale}`)
			.then((res) => res.data)) as {
			content: Content;
			post: Post;
		};
		post = new Post(response.post);
		content = new Content(response.content);
	};
	onMount(async () => {
		BottomNavButton.set({
			label: _('Update'),
			onClick: async () => {
				$BottomNavButton.busy = true;

				post.userId = me.id;
				await post.update({
					status: post.status
				});
				await content.update({
					title: content.title,
					body: content.body
				});
				if (!updateOtherLocales) {
					$BottomNavButton.busy = false;
					goto(`/post/${post.id}`, {
						invalidateAll: true
					});
					return;
				}
				await Promise.all(
					locales.map(async (locale) => {
						if (locale.key != content.locale) {
							await post.updateOtherLocaleContentFrom(content.locale);
						}
					})
				);
				buttonBusy = false;
				goto(`/post/${post.id}`, {
					invalidateAll: true
				});
			}
		});
		load(lang.locale);
	});
	let buttonBusy = false;
	let updateOtherLocales = false;
</script>

<GoBackToPostList />
{#if post && content}
	<section>
		<LocaleSelector bind:content onChange={() => load(content.locale)} />
		{#key content.id}
			<PostEditor bind:post bind:content />
		{/key}
		<label>
			<input type="checkbox" bind:checked={updateOtherLocales} />
			{_('Update other locales')}
		</label>
	</section>
{/if}
