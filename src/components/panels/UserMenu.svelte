<script lang="ts">
	import LocaleSwitch from '$components/UIComponents/LocaleSwitch.svelte';
	import { User, aiChatOpen, auth0, sidebarOpen } from '$lib/frontend/store';
	import Icon from '$components/UIComponents/Icon.svelte';
	import { _ } from '$lib/frontend/i18n';
	import { myPrompt } from '$lib/frontend/class/Prompt';
	import { toast } from '$lib/frontend/toast';
	import UserProfilePicture from '$components/UIComponents/UserProfilePicture.svelte';
	import { me } from '$lib/frontend/class/User';
	import LocalEngSwitch from '$components/UIComponents/LocalEngSwitch.svelte';
</script>

<section style="text-align:right">
	<a
		href={'#'}
		on:click={() => {
			sidebarOpen.set(false);
		}}
	>
		<Icon icon="close" />
	</a>
</section>
{#if me.picture}
	<section style="display:flex;justify-content:center">
		<UserProfilePicture user={me} />
	</section>
{/if}
<ul>
	{#if $User.authenticated}
		<li>
			{_('Logged in as:')}
			{me.nickname}
		</li>
		<li>
			<a
				href={'#'}
				on:click={async () => {
					if (!me) throw new Error('User not found');
					const nickname = await myPrompt(
						_('Enter new nickname. current nickname is :') + me.nickname
					);
					if (!nickname) return;
					await me.update({
						nickname
					});
					toast(_('Nickname updated'));
					setTimeout(() => {
						location.reload();
					}, 1000);
				}}
			>
				<Icon icon="person" />
				{_('Update Nickname')}
			</a>
		</li>
	{/if}
	<li>
		<a
			href={'#'}
			on:click={() => {
				aiChatOpen.set(true);
			}}
		>
			<Icon icon="chat" />
			{_('Chat with AI')}
		</a>
	</li>
	<li>
		<a href="https://adgtokyo.channel.io/home">
			<Icon icon="support_agent" />
			{_('Support')}
		</a>
	</li>
</ul>
<section style="padding-right:1rem;padding-left:1rem">
	{_('Select UI Language')}<br />
	<LocaleSwitch />
	{_('Data Language')}<br />
	<LocalEngSwitch />
	<div style="margin-top:1rem">
		{#if $User.authenticated}
			<button
				style="width:100%"
				on:click={() => {
					$auth0.logout();
				}}>{_('Logout')}</button
			>
		{:else}
			<button
				style="width:100%"
				on:click={() => {
					$auth0.login();
				}}>{_('Login')}/{_('Sign up')}</button
			>
		{/if}
	</div>
</section>

<style>
	ul {
		padding: 1rem;
	}
	li {
		list-style: none;
		border-bottom: 1px solid var(--pico-muted-border-color);
		padding-bottom: var(--pico-spacing);
		padding-top: var(--pico-spacing);
	}
	li a {
		text-decoration: none;
		display: flex;
		gap: 0.4rem;
	}
</style>
