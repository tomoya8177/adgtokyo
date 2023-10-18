<script lang="ts">
	import SocialIcons from './SocialIcons.svelte';

	import GoBackToPostList from '$components/UIComponents/GoBackToPostList.svelte';
	import Heading from '$components/UIComponents/Heading.svelte';
	import UserIconNickname from '$components/organisms/UserIconNickname.svelte';
	import type { Content } from '$lib/frontend/class/Content';
	import type { Post } from '$lib/frontend/class/Post';
	import { me } from '$lib/frontend/class/User';
	import { _, lang } from '$lib/frontend/i18n';
	import { locales } from '$lib/frontend/locales';
	import { DateTime } from 'luxon';
	import { goto } from '$app/navigation';
	export let post: Post;
	export let content: Content;
</script>

<section>
	<GoBackToPostList />
</section>
{#if post && content}
	<section>
		<div>
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
	<SocialIcons title={content.title} url={`/post/${post.id}/${content.locale}`} />
	<section>
		<Heading label={_('Read this article in other languages')} />
		<div style="display:flex; gap:0.4rem;flex-wrap:wrap">
			{#each locales as locale}
				<a
					href={'#'}
					on:click={() => {
						location.href = `/post/${post.id}/${locale.key}`;
					}}
				>
					{_(locale.name)}
				</a>
			{/each}
		</div>
	</section>
{/if}

<style>
</style>
