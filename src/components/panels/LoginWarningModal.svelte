<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { auth0 } from '$lib/frontend/store';
</script>

<dialog open>
	<article>
		{_('You need to be logged in.')}
		<footer>
			<button
				class="outline"
				on:click={() => {
					//go back
					history.back();
				}}
			>
				{_('Cancel')}
			</button>
			<button
				on:click={() => {
					$auth0.login();
				}}
			>
				{_('Login')}
			</button>
		</footer>
	</article>
</dialog>
