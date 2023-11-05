<script lang="ts">
	import Auth0 from '$lib/frontend/class/Auth0';
	import { onMount } from 'svelte';
	import { User, aiChatOpen, auth0, loginModalOpen, sidebarOpen } from '$lib/frontend/store';
	import { page } from '$app/stores';
	import TopNav from '$components/panels/TopNav.svelte';
	import { goto } from '$app/navigation';
	import BottomNav from '$components/panels/BottomNav.svelte';
	import Toasts from '$components/panels/Toasts.svelte';
	import ConfirmModal from '$components/panels/ConfirmModal.svelte';
	import { me } from '$lib/frontend/class/User';
	import PromptModal from '$components/panels/PromptModal.svelte';
	import { api, apiClass } from '$lib/frontend/class/API';
	import LoginWarningModal from '$components/panels/LoginWarningModal.svelte';
	import UserMenu from '$components/panels/UserMenu.svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import AiChatModal from '$components/panels/AIChatModal.svelte';
	import Footer from '$components/panels/Footer.svelte';
	import axios from 'axios';
	let loggingIn = true;

	onMount(async () => {
		auth0.set(new Auth0());
		await $auth0.init();
		$User.authenticated = await $auth0.check();
		if ($User.authenticated) {
			const token = await $auth0.getTokenSilently();
			apiClass.setToken(token);
			const response = await axios
				.get('/app/external', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => res.data);
			const profile = await $auth0.getUser();
			if (!profile) {
				return;
			}
			let user = await api.get('/api/User/' + profile.sub).then((res) => res.data);
			if (!user) {
				await api.post('/api/User', {
					id: profile.sub,
					nickname: profile.nickname,
					picture: profile.picture
				});
				user = await api.get('/api/User/' + profile.sub).then((res) => res.data);
			} else {
				if (!user.picture) {
					await api.put('/api/User/' + profile.sub, {
						picture: profile.picture
					});
					user.picture = profile.picture;
				}
				profile.nickname = user.nickname;
				profile.picture = user.picture || profile.picture;
			}
			me.setProfile({ ...profile, subscription: user.subscription, entityId: user.entityId });
		}
		loggingIn = false;
	});
	let searchKeywords = '';
	const onKeywordsChange = (value: string) => {
		if ($page.url.pathname.includes('/search/')) {
			if ($page.url.pathname.includes('/work/')) {
				goto('/search/work/' + searchKeywords);
			} else if ($page.url.pathname.includes('/person/')) {
				goto('/search/person/' + searchKeywords);
			} else if ($page.url.pathname.includes('/business/')) {
				goto('/search/business/' + searchKeywords);
			} else {
				goto('/search/work/' + searchKeywords);
			}
		} else {
			goto('/search/work/' + searchKeywords);
		}
	};
</script>

<div class="height">
	<div class=" header">
		<TopNav bind:searchKeywords {onKeywordsChange} />
	</div>
	<div class="body">
		<div class="container">
			<section>
				<slot />
			</section>
			<section>
				<hr />
				<Footer />
			</section>
		</div>
	</div>
	<div class=" footer">
		<BottomNav />
	</div>
	{#if $sidebarOpen}
		<div
			aria-hidden="true"
			class="sidebarBackground"
			on:click={() => {
				sidebarOpen.set(false);
			}}
			transition:fade
		/>
		<div class="sidebar" transition:fly={{ x: '20rem' }}>
			<article>
				<UserMenu />
			</article>
		</div>
	{/if}
</div>
<Toasts />
<ConfirmModal />
<PromptModal />
<LoginWarningModal bind:open={$loginModalOpen} />
<AiChatModal bind:open={$aiChatOpen} />

<style>
	.sidebarBackground {
		position: fixed;
		right: 0;
		top: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 2;
	}
	.sidebar {
		position: fixed;
		right: 0;
		top: 0;
		bottom: 0;
		width: 20rem;
		height: 100vh;
		background-color: var(--my-background-color);
		box-shadow: var(--pico-card-box-shadow);
		z-index: 2;
	}
	.sidebar article {
		height: 100vh;
		border-radius: 0px;
	}
	.height {
		height: 100dvh;
		overflow: visible;
	}
	.header {
		height: 3.5rem;
		overflow: visible;
		border-bottom: 1px solid var(--pico-muted-border-color);
		box-shadow: var(--pico-card-box-shadow);
		background-color: var(--my-background-color);
	}
	.body {
		height: calc(100dvh - 3.5rem);
		overflow-y: auto;
		padding-bottom: 3.5rem;
	}
	.container {
		padding: var(--pico-spacing);
		position: relative;
	}
	.footer {
		/* box-shadow: var(--pico-card-box-shadow);
		border-top: 1px solid var(--pico-muted-border-color);
		height: 3.5rem;
		overflow: hidden; */
	}
</style>
