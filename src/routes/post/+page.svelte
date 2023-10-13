<script lang="ts">
	import PostCard from '$components/organisms/PostCard.svelte';
	import { Post } from '$lib/frontend/class/Post';
	import type { PageData } from './$types';

	export let data: PageData;
	let posts = data.posts.map((post) => new Post(post));
</script>

{#each posts as post}
	<PostCard {post} />
{/each}
