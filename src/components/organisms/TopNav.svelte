<script lang="ts">
	import LocaleSwitch from './LocaleSwitch.svelte';

	import { api } from '$lib/frontend/class/API';
	import { User, auth0 } from '$lib/frontend/store';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import Icon from '../atoms/Icon.svelte';
	import SearchBox from '../molecules/SearchBox.svelte';
	import Logo from '../atoms/Logo.svelte';
	import { _ } from '$lib/frontend/i18n';
	import { myPrompt } from '$lib/frontend/class/Prompt';
	import { toast } from '$lib/frontend/toast';
	import UserProfilePicture from '../atoms/UserProfilePicture.svelte';
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
						{#if $User.profile.picture}
							<UserProfilePicture />
						{:else}
							<hr />
						{/if}
						<li>
							<a
								style="display:flex"
								href={'#'}
								on:click={async () => {
									const nickname = await myPrompt(
										_('Enter new nickname. current nickname is :') + $User.profile?.nickname
									);
									if (!nickname) return;
									const response = await api.put('/users/' + $User.profile?.sub, { nickname });
									toast(_('Nickname updated'));
									setTimeout(() => {
										location.reload();
									}, 1000);
								}}
							>
								{_('Update Nickname')}
								<Icon icon="person" />
							</a>
						</li>

						<li>
							<a style="display:flex" href="https://adgtokyo.channel.io/home">
								{_('Support')}
								<Icon icon="support_agent" />
							</a>
						</li>
						<hr />
						<li>
							{_('Select UI Language')}<br />
							<LocaleSwitch />
						</li>
						<hr />
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
			<li class="padding-small">
				<LocaleSwitch />
			</li>
		{/if}
	</ul>
</nav>

<style>
	.padding-small {
		padding-top: var(--pico-spacing);
		padding-bottom: var(--pico-spacing);
	}
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
