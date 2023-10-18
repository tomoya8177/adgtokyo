<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PostPanel from '$components/panels/PostPanel.svelte';
	import { api } from '$lib/frontend/class/API';
	import type { Post } from '$lib/frontend/class/Post';
	import { me } from '$lib/frontend/class/User';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton } from '$lib/frontend/store';
	import type { PageData } from './$types';
	export let data: PageData;
	let post: Post = data.post;

	const load = async (locale) => {
		if (post.userId != me.id) {
			BottomNavButton.set({
				label: _('New Post'),
				onClick: () => {
					goto('/post/create');
				}
			});
			return;
		} else {
			BottomNavButton.set({
				label: _('Edit This Page'),
				onClick: () => {
					goto(`/post/${$page.params.postId}/edit`);
				}
			});
		}
	};
	$: load($page.params.locale);
</script>

<svelte:head>
	<title>{post.content?.title} | ADG Tokyo</title>
</svelte:head>
<PostPanel {post} content={post.content} />
