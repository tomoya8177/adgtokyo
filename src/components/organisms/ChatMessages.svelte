<script lang="ts">
	import BottomNav from '$components/panels/BottomNav.svelte';
	import { api } from '$lib/frontend/class/API';
	import { me } from '$lib/frontend/class/User';
	import { nl2br } from '$lib/frontend/nl2br';
	import { BottomInputValue, BottomNavButton } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import UserIconNickname from './UserIconNickname.svelte';
	import type { ChatMessage } from '$lib/frontend/types/ChatMessage';
	export let messages: ChatMessage[] = [];
</script>

{#each messages as message}
	<div class="message {message.from}">
		<small>
			{#if message.from == 'user'}
				<div style="display: inline-block">
					<UserIconNickname user={me} />
				</div>
			{:else}
				AI
			{/if}
		</small><br />
		{@html nl2br(message.text)}
		{#if message.images?.length}
			<figure>
				<div>
					{#each message.images || [] as image}
						<img src={image.url} />
					{/each}
				</div>
			</figure>
		{/if}
	</div>
{/each}

<style>
	figure div {
		display: flex;
		flex-wrap: nowrap;
		gap: var(--pico-spacing);
	}
	figure div img {
		max-width: 10rem;
		max-height: 10rem;
		border-radius: var(--pico-border-radius);
	}
	.message {
		margin: var(--pico-spacing);
		padding: var(--pico-spacing);
		border-radius: var(--pico-border-radius);
		border: 1px solid var(--pico-muted-border-color);
	}
	.message.user {
		text-align: right;
	}
	article {
		max-height: none;
	}
</style>
