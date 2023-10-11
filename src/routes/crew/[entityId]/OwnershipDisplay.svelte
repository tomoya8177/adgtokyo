<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, LocalEnSwitch, UpdatedData } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import EntityNameStatic from '$components/atoms/EntityNameStatic.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import EntityCreditRow from '$components/organisms/EntityCreditRow.svelte';
	import Heading from '$components/atoms/Heading.svelte';
	import { workCategory } from '$lib/Category';
	import HeadingLabel from '$components/atoms/HeadingLabel.svelte';
	import type { Entity } from '$lib/frontend/class/Entity';
	import ImageSlider from '$components/organisms/ImageSlider.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	export let entity: Entity;
</script>

{#await entity.isOwnedByUser}
	<span aria-busy="true" />{_('Checking Ownership')}
{:then isOwnedByUser}
	{#if isOwnedByUser}
		<mark>
			<img src={isOwnedByUser.picture} class="small-profile-picture" />
			{isOwnedByUser.nickname}
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

<style>
	.small-profile-picture {
		width: 1.2em;
		height: 1.2em;
		border-radius: 50%;
		margin-right: 0.2rem;
	}
</style>
