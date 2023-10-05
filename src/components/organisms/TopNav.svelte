<script lang="ts">
	import { api } from '$lib/frontend/class/API';
	import { User, auth0 } from '$lib/frontend/store';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import Icon from '../atoms/Icon.svelte';
	import SearchBox from '../molecules/SearchBox.svelte';
	import Logo from '../atoms/Logo.svelte';
	import { _ } from '$lib/frontend/i18n';
	export let searchKeywords: string;
	export let onKeywordsChange: (value: string) => void;
	let searching = false;
	$: emptySearchBox($page.url.href);
	const emptySearchBox = (url: string) => {
		if (!url.includes('/search')) {
			searchKeywords = '';
		}
	};
</script>

<nav>
	<ul>
		<li style="padding:var(--pico-spacing)">
			<Logo />
		</li>
	</ul>
	<ul>
		<li style="padding:0rem">
			<SearchBox bind:value={searchKeywords} onchange={onKeywordsChange} />
		</li>
	</ul>
	<ul>
		{#if $User.authenticated}
			<li>
				<details class="dropdown">
					<summary role="link">
						<span class="hiddenWithMobile">
							{$User.profile?.nickname}
						</span>
						<Icon icon="menu" /></summary
					>
					<ul dir="rtl">
						<li style="display:flex">
							{_('Logged in as:')}
							{$User.profile?.nickname}
						</li>
						<li>
							<a
								style="display:flex"
								href={'#'}
								on:click={async () => {
									const email = prompt('Enter new email');
									if (!email) return;
									const response = await api.put('/users/' + $User.profile?.sub, { email });
									console.log(response);
								}}
							>
								{_('Change Email')}
								<Icon icon="email" />
							</a>
						</li>
						<li>
							<a style="display:flex" href="https://adgtokyo.channel.io/home">
								{_('Support')}
								<Icon icon="support_agent" />
							</a>
						</li>
						<li>
							<button
								style="width:100%"
								on:click={() => {
									$auth0.logout();
								}}>{_('Logout')}</button
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
					}}>{_('Login')}</a
				>
			</li>
		{/if}
	</ul>
</nav>

<style>
	summary {
		display: flex;
		gap: 0.2rem;
		align-items: center;
		text-decoration: none;
	}
	details summary::after {
		display: none;
	}
	nav {
		margin-right: var(--pico-spacing);
		margin-left: var(--pico-spacing);
	}
</style>
