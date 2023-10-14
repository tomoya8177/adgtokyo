<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PostPanel from '$components/panels/PostPanel.svelte';
	import { api } from '$lib/frontend/class/API';
	import { Content } from '$lib/frontend/class/Content';
	import { Post } from '$lib/frontend/class/Post';
	import { me } from '$lib/frontend/class/User';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton } from '$lib/frontend/store';
	import { onMount } from 'svelte';

	let post: Post;
	let content: Content;
	onMount(async () => {
		let response = await api
			.get(`/post/${$page.params.postId}/${$page.params.locale}`)
			.then((res) => res.data);
		post = new Post(response.post);
		await post.getUser();
		post = post;
		content = new Content(response.content);
		if (post.userId != me.id) {
			BottomNavButton.set({
				label: _('New Post'),
				onClick: () => {
					goto('/post/create');
				}
			});
			return;
		}
		BottomNavButton.set({
			label: _('Edit This Page'),
			onClick: () => {
				goto(`/post/${$page.params.postId}/edit`);
			}
		});
	});
</script>

<svelte:head>
	<title>{content?.title} | ADG Tokyo</title>
</svelte:head>
<PostPanel {post} {content} />
