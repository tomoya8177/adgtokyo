<script lang="ts">
	import { api } from '$lib/frontend/class/API';
	import { User, auth0 } from '$lib/frontend/store';
	import Icon from '../atoms/Icon.svelte';
</script>

<nav>
	<ul>
		<li><a href="#" class="secondary">A</a></li>
	</ul>
	<ul>
		<li><strong>ADG Tokyo</strong></li>
	</ul>
	<ul>
		{#if $User.authenticated}
			<li>
				<details role="list" dir="rtl">
					<summary aria-haspopup="listbox" role="link">
						{$User.profile?.nickname}
						<Icon icon="menu" /></summary
					>
					<ul role="listbox">
						<li>
							<a
								href={'#'}
								on:click={async () => {
									const email = prompt('Enter new email');
									if (!email) return;
									const response = await api.put('/users/' + $User.profile?.sub, { email });
									console.log(response);
								}}
							>
								Chang Email
							</a>
						</li>
						<li>
							<a
								href={'#'}
								on:click={() => {
									$auth0.logout();
								}}>Logout</a
							>
						</li>
					</ul>
				</details>
			</li>
		{:else}
			<li>
				<a
					href={'#'}
					on:click={() => {
						$auth0.login();
					}}>Login</a
				>
			</li>
		{/if}
	</ul>
</nav>

<style>
	details[role='list'] summary::after {
		display: none;
	}
	nav {
		margin-right: var(--spacing);
		margin-left: var(--spacing);
	}
</style>
