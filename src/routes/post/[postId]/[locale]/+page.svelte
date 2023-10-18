<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import PostPanel from '$components/panels/PostPanel.svelte';
	import { api } from '$lib/frontend/class/API';
	import type { Post } from '$lib/frontend/class/Post';
	import { me } from '$lib/frontend/class/User';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	export let data: PageData;
	let post: Post = data.post;
	onMount(() => {
		BottomNavButton.set({
			label: _('Edit This Page'),
			onClick: () => {
				if (post.userId != me.id) {
					myConfirm(_('You are not the author of this post.'));
					return false;
				} else {
					goto(`/post/${$page.params.postId}/edit`);
				}
			}
		});
	});
</script>

<svelte:head>
	<title>{post.content?.title} | ADG Tokyo</title>
</svelte:head>
<PostPanel {post} content={post.content} />
