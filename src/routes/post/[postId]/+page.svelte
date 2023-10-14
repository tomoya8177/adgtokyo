<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import GoBackToPostList from '$components/UIComponents/GoBackToPostList.svelte';
	import { api } from '$lib/frontend/class/API';
	import type { Content } from '$lib/frontend/class/Content';
	import type { Post } from '$lib/frontend/class/Post';
	import { _, lang } from '$lib/frontend/i18n';
	import { BottomNavButton } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	onMount(() => {
		BottomNavButton.set({
			label: _('Edit This Page'),
			onClick: () => {
				goto(`/post/${$page.params.postId}/edit`);
			}
		});
	});
	let response = api.get(`/post/${$page.params.postId}/${lang.locale}`).then((res) => res.data);
</script>

<GoBackToPostList />

{#await response}
	<span aria-busy={true} />
{:then { content, post }}
	<header>
		<div class="justified-flex">
			<div>
				<h3>
					{content.title}
				</h3>
			</div>
			<div>
				<mark>
					{post.status}
				</mark>
			</div>
		</div>
	</header>
	<p>
		{@html content.body}
	</p>
{:catch error}
	{error.message}
{/await}
