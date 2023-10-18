<script lang="ts">
	import { goto } from '$app/navigation';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import type { Content } from '$lib/frontend/class/Content';
	import type { Post } from '$lib/frontend/class/Post';
	import { me } from '$lib/frontend/class/User';
	import { _, lang } from '$lib/frontend/i18n';
	import { onMount } from 'svelte';
	import UserIconNickname from './UserIconNickname.svelte';
	import { DateTime } from 'luxon';

	export let post: Post;
	let content: Content;
	onMount(async () => {
		const res = await post.getContent(lang.locale);
		if (!res) return;
		content = res;
		post.getUser();
		post = post;
	});
	export let onDelete: () => void = () => {};
</script>

{#if content}
	<article>
		<header>
			<div>
				<div>
					<a href={`/post/${post.id}/${lang.locale}`} class="contrast">
						<h3>
							{content.title}
						</h3>
					</a>
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
		</header>
		<main>
			<p>
				{content.excerpt}
				<span style="padding:0rem 0.2rem;"> ... </span>
				<a href={`/post/${post.id}/${lang.locale}`} class="contrast">
					{_('Read More')}
				</a>
			</p>
		</main>
		{#if post.userId == me.id}
			<footer>
				<button
					class="secondary"
					on:click={async () => {
						if (!(await myConfirm(_('Are you sure you want to delete this post?')))) return;
						await post.delete();
						onDelete();
					}}
				>
					{_('Delete')}
				</button>
				<button
					on:click={() => {
						goto(`/post/${post.id}/edit`);
					}}
				>
					{_('Edit')}
				</button>
			</footer>
		{/if}
	</article>
{/if}

<style>
	footer {
		display: flex;
		justify-content: flex-end;
		gap: var(--pico-spacing);
	}
</style>
