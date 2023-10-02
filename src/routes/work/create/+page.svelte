<script lang="ts">
	import PropertyRowEdit from './PropertyRowEdit.svelte';

	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { User, auth0, onBottomNavButtonClicked } from '$lib/frontend/store';
	import Button from '../../../components/atoms/Button.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { Property } from '$lib/frontend/class/Property';
	import { Department } from '$lib/frontend/class/Department';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let work = new Work({});
	onMount(() => {
		onBottomNavButtonClicked.set(async () => {
			console.log(work);
			await work.create();
			goto('/work/' + work.id + '/edit');
		});
	});
</script>

{#if $User.authenticated}
	<h2>{_('Create New Work')}</h2>
	<label>
		{_('Title')}
		({_('Local')})

		<input type="text" bind:value={work.titleLocal} />
	</label>
	<label>
		{_('Title')}
		({_('English')})
		<input type="text" bind:value={work.titleEn} />
	</label>
{:else if $User.authenticated === false}
	{_('You need to be logged in to create a work.')}
	<button
		on:click={() => {
			$auth0.login();
		}}
	>
		{_('Login')}
	</button>
{/if}

<style>
	.box {
		border: 1px solid rgba(100, 100, 100, 0.5);
		padding: var(--spacing);
		margin-bottom: var(--spacing);
		border-radius: var(--border-radius);
	}
</style>
