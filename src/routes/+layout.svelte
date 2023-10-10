<script lang="ts">
	import Auth0 from '$lib/frontend/class/Auth0';
	import { onMount } from 'svelte';
	import { User, auth0 } from '$lib/frontend/store';
	import { page } from '$app/stores';
	import TopNav from '$components/organisms/TopNav.svelte';
	import { goto } from '$app/navigation';
	import BottomNav from '$components/organisms/BottomNav.svelte';
	import Toasts from '$components/organisms/Toasts.svelte';
	import ConfirmModal from '$components/panels/ConfirmModal.svelte';
	import { User as UserClass, me } from '$lib/frontend/class/User';
	import PromptModal from '$components/panels/PromptModal.svelte';
	import { api } from '$lib/frontend/class/API';
	let loggingIn = true;

	onMount(async () => {
		auth0.set(new Auth0());
		await $auth0.init();
		$User.authenticated = await $auth0.check();
		if ($User.authenticated) {
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
			me.id = profile.sub;
			console.log({ user });
			$User.user = new UserClass(user || {});
			$User.profile = profile;
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

{#if loggingIn}
	<div
		style="
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
				display: flex;
					justify-content:center;
					align-items:center;
					"
	>
		<span aria-busy={true}>Loading...</span>
	</div>
{:else}
	<div class="height">
		<div class=" header">
			<TopNav bind:searchKeywords {onKeywordsChange} />
		</div>
		<div class="body">
			<div class="container">
				<slot />
			</div>
		</div>
		<div class=" footer">
			<BottomNav />
		</div>
	</div>
{/if}
<Toasts />
<ConfirmModal />
<PromptModal />

<style>
	.height {
		height: 100dvh;
		overflow: visible;
	}
	.header {
		height: 3.5rem;
		overflow: visible;
		border-bottom: 1px solid var(--pico-card-border-color);
		box-shadow: var(--pico-card-box-shadow);
		background-color: var(--my-background-color);
	}
	.body {
		height: calc(100dvh - 7rem);
		overflow-y: auto;
	}
	.container {
		padding: var(--pico-spacing);
		position: relative;
	}
	.footer {
		box-shadow: var(--pico-card-box-shadow);
		border-top: 1px solid var(--pico-card-border-color);
		height: 3.5rem;
		overflow: hidden;
	}
</style>
