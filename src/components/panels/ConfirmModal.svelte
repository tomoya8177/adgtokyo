<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { ConfirmMessage } from '$lib/frontend/store';
	let open: boolean;
	let message: string;
</script>

<dialog open={$ConfirmMessage.open}>
	<article>
		{$ConfirmMessage.message}
		<footer>
			<button
				class="outline"
				on:click={() => {
					$ConfirmMessage.result = false;
				}}
			>
				{_('Cancel')}
			</button>
			<button
				on:click={() => {
					$ConfirmMessage.result = true;
				}}
			>
				{_('OK')}
			</button>
		</footer>
	</article>
</dialog>
