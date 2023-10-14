<script lang="ts">
	import UserIconNickname from './UserIconNickname.svelte';

	import { _ } from '$lib/frontend/i18n';
	import { goto } from '$app/navigation';
	import type { Entity } from '$lib/frontend/class/Entity';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import UserProfilePicture from '$components/UIComponents/UserProfilePicture.svelte';
	export let entity: Entity;
</script>

<div>
	{#await entity.isOwnedByUser}
		<span aria-busy="true" />{_('Checking Ownership')}
	{:then isOwnedByUser}
		{#if isOwnedByUser}
			<mark>
				<UserIconNickname user={isOwnedByUser} />
			</mark>
		{:else}
			<a
				on:click={async () => {
					if (
						await myConfirm(
							_(
								'Please contact support for claiming the entity ownership. Do you want to proceed to the support form?'
							)
						)
					) {
						goto('https://adgtokyo.channel.io/home');
					}
				}}
				href={'#'}>{_('Claim this is me')}</a
			>
		{/if}
	{/await}
</div>

<style>
	mark {
		display: flex;
		gap: 0.4rem;
		align-items: center;
	}
	.small-profile-picture {
		width: 1.2em;
		height: 1.2em;
		border-radius: 50%;
		margin-right: 0.2rem;
	}
</style>
