<script lang="ts">
	import { page } from '$app/stores';
	import GoBackToPostList from '$components/UIComponents/GoBackToPostList.svelte';
	import Heading from '$components/UIComponents/Heading.svelte';
	import UserIconNickname from '$components/organisms/UserIconNickname.svelte';
	import type { Content } from '$lib/frontend/class/Content';
	import type { Post } from '$lib/frontend/class/Post';
	import { me } from '$lib/frontend/class/User';
	import { _ } from '$lib/frontend/i18n';
	import { locales } from '$lib/frontend/locales';
	export let post: Post;
	export let content: Content;
</script>

<section>
	<GoBackToPostList />
</section>
{#if post && content}
	<section>
		<div class="justified-flex">
			<div>
				<h3>
					{content.title}
				</h3>
			</div>
			{#if post.userId == me.id}
				<div>
					<mark>
						{post.status}
					</mark>
				</div>
			{:else if post.user}
				<div>
					<UserIconNickname user={post.user} />
				</div>
			{/if}
		</div>
	</section>
	<section>
		<p>
			{@html content.body}
		</p>
	</section>
	<hr />
	<section>
		<Heading label={_('Read this article in other languages')} />
		<div style="display:flex; gap:0.4rem;flex-wrap:wrap">
			{#each locales as locale}
				<a href={`/post/${post.id}/${locale.key}`}>
					{_(locale.name)}
				</a>
			{/each}
		</div>
	</section>
{/if}
