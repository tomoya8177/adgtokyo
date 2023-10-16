<script lang="ts">
	import { page } from '$app/stores';
	import GoBackToPostList from '$components/UIComponents/GoBackToPostList.svelte';
	import Heading from '$components/UIComponents/Heading.svelte';
	import Icon from '$components/UIComponents/Icon.svelte';
	import UserIconNickname from '$components/organisms/UserIconNickname.svelte';
	import type { Content } from '$lib/frontend/class/Content';
	import type { Post } from '$lib/frontend/class/Post';
	import { me } from '$lib/frontend/class/User';
	import { _, lang } from '$lib/frontend/i18n';
	import { locales } from '$lib/frontend/locales';
	import { onMount } from 'svelte';
	import { DateTime } from 'luxon';
	export let post: Post;
	export let content: Content;
	onMount(() => {
		window.Sharer.init();
	});
</script>

<section>
	<GoBackToPostList />
</section>
{#if post && content}
	<section>
		<div class="justified-flex">
			<div>
				<h1>
					{content.title}
				</h1>
			</div>
			<div>
				{#if post.userId == me.id}
					<mark>
						{post.status}
					</mark>
				{:else if post.user}
					<div>
						<UserIconNickname user={post.user} />
					</div>
				{/if}
				{#if post.publicOn}
					<div>
						{DateTime.fromISO(post.publicOn)
							.setLocale(lang.locale.substring(0, 2))
							.toLocaleString()}
					</div>
				{/if}
			</div>
		</div>
	</section>
	<section>
		<p>
			{@html content.body}
		</p>
	</section>
	<hr />
	<section>
		<div style="display:flex; gap:0.4rem;width:fit-content;margin:auto auto">
			<button
				class="secondary"
				data-sharer="twitter"
				data-title={content.title}
				data-hashtags="awesome, sharer.js"
				data-url={`/post/${post.id}/${content.locale}`}
				>Share on <i class="fa-brands fa-x-twitter" /></button
			>
			<button
				class="secondary"
				data-sharer="facebook"
				data-hashtag="hashtag"
				data-url={`/post/${post.id}/${content.locale}`}
				>Share on <i class="fa-brands fa-facebook" /></button
			>
			<button
				class="secondary"
				data-sharer="line"
				data-title={content.title}
				data-url={`/post/${post.id}/${content.locale}`}
				>Share on <i class="fa-brands fa-line" /></button
			>
			<button
				class="secondary"
				data-sharer="linkedin"
				data-url={`/post/${post.id}/${content.locale}`}
				>Share on <i class="fa-brands fa-linkedin" /></button
			>
		</div>
	</section>
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
