<script lang="ts">
	import { PromptMessage } from '$lib/frontend/class/Prompt';
	import { _ } from '$lib/frontend/i18n';
	let value: string;
</script>

<dialog open={$PromptMessage.open}>
	<article>
		{$PromptMessage.message}
		<input type="text" bind:value />
		<footer>
			<button
				class="outline"
				on:click={() => {
					$PromptMessage.value = '';
				}}
			>
				{_('Cancel')}
			</button>
			<button
				on:click={() => {
					$PromptMessage.value = value;
				}}
			>
				{_('OK')}
			</button>
		</footer>
	</article>
</dialog>
