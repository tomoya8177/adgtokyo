<script lang="ts">
	import UserMenu from './UserMenu.svelte';

	import LocaleSwitch from '$components/UIComponents/LocaleSwitch.svelte';

	import { User, auth0, sidebarOpen } from '$lib/frontend/store';
	import { page } from '$app/stores';
	import Icon from '$components/UIComponents/Icon.svelte';
	import SearchBox from '$components/UIComponents/SearchBox.svelte';
	import { _ } from '$lib/frontend/i18n';
	import { myPrompt } from '$lib/frontend/class/Prompt';
	import { toast } from '$lib/frontend/toast';
	import UserProfilePicture from '$components/UIComponents/UserProfilePicture.svelte';
	import { me } from '$lib/frontend/class/User';
	import Logo from '$components/UIComponents/Logo.svelte';
	import { goto } from '$app/navigation';
	import LogoImage from '$components/UIComponents/LogoImage.svelte';
	export let searchKeywords: string;
	export let onKeywordsChange: (value: string) => void;
	let searching = false;
	$: emptySearchBox($page.url.href);
	const emptySearchBox = (url: string) => {
		if (!url.includes('/search')) {
			searchKeywords = '';
		} else {
			searchKeywords = $page.params.keywords;
		}
	};
</script>

<nav>
	<ul>
		<li>
			<LogoImage />
		</li>
		<li style="padding:var(--pico-spacing)" class="hiddenWithMobile">
			<Logo />
		</li>
	</ul>
	<ul>
		<li style="padding:0rem">
			<SearchBox bind:value={searchKeywords} onchange={onKeywordsChange} />
		</li>
	</ul>
	<ul>
		<li style="display:flex;align-items:center">
			<a
				data-testid="navMenu"
				href={'#'}
				style="display:flex;text-decoration:none;align-items:center"
				on:click={() => {
					sidebarOpen.set(true);
				}}
			>
				{#if $User.authenticated}
					<span class="hiddenWithMobile">
						{me.nickname}
					</span>
				{/if}
				<Icon icon="menu" /></a
			>
		</li>
	</ul>
</nav>

<style>
	nav {
		margin-right: var(--pico-spacing);
		margin-left: var(--pico-spacing);
	}
</style>
