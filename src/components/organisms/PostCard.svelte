<script lang="ts">
	import type { Content } from '$lib/frontend/class/Content';
	import type { Post } from '$lib/frontend/class/Post';
	import { lang } from '$lib/frontend/i18n';
	import { onMount } from 'svelte';

	export let post: Post;
	let contentLoad: Promise<false | Content> = Promise.resolve(false);
	onMount(async () => {
		contentLoad = post.getContent(lang.locale);
	});
</script>

{#await contentLoad}
	<span aria-busy={true} />
{:then content}
	{#if content}
		<article>
			<header>
				<div class="justified-flex">
					<div>
						{content.title}
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
		</article>
	{/if}
{:catch error}
	{error.message}
{/await}
