<script lang="ts">
	import Icon from '$components/UIComponents/Icon.svelte';
	import ChatMessages from '$components/organisms/ChatMessages.svelte';
	import { api } from '$lib/frontend/class/API';
	import { me } from '$lib/frontend/class/User';
	import { _ } from '$lib/frontend/i18n';
	import { toast } from '$lib/frontend/toast';
	import type { ChatMessage } from '$lib/frontend/types/ChatMessage';

	export let open = false;
	export let messages: ChatMessage[] = [];
	let prompt = '';
	let buttonBusy = false;
	let forImage = false;
</script>

<dialog {open}>
	<article>
		<header>
			<a
				href={'#'}
				aria-label="Close"
				class="close"
				on:click={() => {
					open = false;
				}}
			/>
			{_('AI Chat')}
		</header>
		<div class="main">
			<ChatMessages bind:messages />
		</div>
		<footer>
			<div>
				<label>
					{_('Generate Image')}
					<input type="checkbox" role="switch" bind:checked={forImage} />
				</label>
			</div>
			<div class="justified-flex">
				<textarea bind:value={prompt} />
				<button
					aria-busy={buttonBusy}
					on:click={async () => {
						if (prompt == '') return;
						buttonBusy = true;
						messages = [...messages, { text: prompt, from: 'user' }];
						if (forImage) {
							const responses = await api
								.post('/openai/image', {
									prompt: prompt
								})
								.then((res) => res.data);
							console.log(responses);
							if (responses.error) {
								const newMessage = {
									from: 'ai',
									text: responses.error.error.message
								};
								messages = [...messages, newMessage];

								buttonBusy = false;
								prompt = '';
								return;
							}
							const newMessage = {
								from: 'ai',
								text: '',
								images: responses
							};
							messages = [...messages, newMessage];
						} else {
							const response = await api
								.post('/openai', { prompt: prompt, withHistory: true, userId: me.id })
								.then((res) => res.data);
							console.log(response);
							messages = [...messages, { text: response.content, from: 'ai' }];
						}
						buttonBusy = false;
						prompt = '';
					}}
				>
					{#if !buttonBusy}
						<Icon icon="send" />
					{/if}
				</button>
			</div>
		</footer>
	</article>
</dialog>

<style>
	textarea {
		margin-bottom: 0px;
	}
	.main {
		height: 50vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
