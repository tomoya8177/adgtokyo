<script lang="ts">
	import PostCard from '$components/organisms/PostCard.svelte';
	import { Post } from '$lib/frontend/class/Post';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { BottomNavButton } from '$lib/frontend/store';
	import { goto } from '$app/navigation';
	import { _ } from '$lib/frontend/i18n';
	import { me } from '$lib/frontend/class/User';

	export let data: PageData;
	let posts = data.posts
		.filter((post) => post.status == 'published' || post.userId == me.id)
		.map((post) => new Post(post));
	onMount(() => {
		BottomNavButton.set({
			label: _('New Post'),
			onClick: () => {
				goto('/post/create');
			}
		});
	});
</script>

{#each posts as post}
	<PostCard
		{post}
		onDelete={() => {
			posts = posts.filter((p) => p.id != post.id);
		}}
	/>
{/each}
