<script lang="ts">
	import { goto } from '$app/navigation';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import type { Content } from '$lib/frontend/class/Content';
	import type { Post } from '$lib/frontend/class/Post';
	import { me } from '$lib/frontend/class/User';
	import { _, lang } from '$lib/frontend/i18n';
	import { onMount } from 'svelte';
	import UserIconNickname from './UserIconNickname.svelte';

	export let post: Post;
	let contentLoad: Promise<false | Content> = Promise.resolve(false);
	onMount(async () => {
		contentLoad = post.getContent(lang.locale);
		post.getUser();
		post = post;
	});
	export let onDelete: () => void = () => {};
</script>

{#await contentLoad}
	<article>
		<span aria-busy={true} />
	</article>
{:then content}
	{#if content}
		<article>
			<header>
				<div class="justified-flex">
					<div>
						<a href={`/post/${post.id}`} class="contrast">
							<strong>
								{content.title}
							</strong>
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
					</div>
				</div>
			</header>
			<main>
				<p>
					{@html content.body}
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
{:catch error}
	{error.message}
{/await}

<style>
	main {
		max-height: 10rem;
		overflow-y: auto;
	}
	footer {
		display: flex;
		justify-content: flex-end;
		gap: var(--pico-spacing);
	}
</style>
