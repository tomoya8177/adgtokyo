<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { auth0, loginModalOpen } from '$lib/frontend/store';
	export let open = true;
</script>

<dialog {open}>
	<article>
		{_('You need to be logged in.')}
		<footer>
			<button
				class="outline"
				on:click={async () => {
					//go back
					await $auth0.login();

					history.back();
					setTimeout(() => {
						loginModalOpen.set(false);
					}, 100);
				}}
			>
				{_('Cancel')}
			</button>
			<button
				on:click={() => {
					$auth0.login();
				}}
			>
				{_('Login')}/{_('Sign up')}
			</button>
		</footer>
	</article>
</dialog>
