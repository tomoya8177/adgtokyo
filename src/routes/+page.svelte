<script lang="ts">
	import { goto } from '$app/navigation';
	import { Work } from '$lib/frontend/class/Work';
	import { BottomNavButton } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _ } from '$lib/frontend/i18n';
	import { Attachment } from '$lib/frontend/class/Attachments';
	import WorkCard from '$components/organisms/WorkCard.svelte';
	import TopSlideShow from '$components/atoms/TopSlideShow.svelte';
	import Heading from '$components/UIComponents/Heading.svelte';
	import { fade, slide } from 'svelte/transition';
	import { Post } from '$lib/frontend/class/Post';
	import PostCard from '$components/organisms/PostCard.svelte';
	import axios from 'axios';
	import Footer from '$components/panels/Footer.svelte';
	export let data: PageData;
	let posts = data.posts.map((post) => new Post(post));
	let searchKeywords: { keyword: string; label: string; category: string }[] = [];
	let works = data.works.map((work) => {
		work.attachments = data.attachments
			.filter((attachment) => attachment.attachedTo == work.id)
			.map((attachment) => {
				return new Attachment(attachment);
			});
		return new Work(work);
	});
	let selectedWorks: Work[] = [];
	onMount(async () => {
		BottomNavButton.set({
			label: _('Create New Work'),
			onClick: () => {
				goto(`/work/create`);
			}
		});
		//rotate works every 4 seconds
		//rotateWorks();
		setInterval(rotateWorks, 8000);
		searchKeywords = await axios.get('/searchKeywords.json').then((res) => res.data);
		console.log({ searchKeywords });
	});
	let rotateIndex = 0;
	const rotateWorks = () => {
		rotateIndex++;
		if (rotateIndex >= works.length) rotateIndex = 0;
	};
</script>

<svelte:head>
	<title>ADG Tokyo</title>
</svelte:head>
<section>
	<TopSlideShow {searchKeywords} />
</section>
<section>
	<Heading label={_('Recently Added Posts')} />
	{#each posts as post, index}
		<PostCard {post} />
	{/each}
	<div style="text-align:right">
		<a href="/post">{_('See All Posts')}</a>
	</div>
</section>
<section>
	<Heading label={_('Recently Added Works')} />

	{#each works as work, index}
		{#if index >= rotateIndex && index <= rotateIndex + 2}
			<div transition:slide>
				<WorkCard {work} />
			</div>
		{/if}
	{/each}
</section>
