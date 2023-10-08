<script lang="ts">
	import EntityNameStaticSmall from './EntityNameStaticSmall.svelte';

	import HasEntitySubtextStatic from './HasEntitySubtextStatic.svelte';

	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import Icon from '../atoms/Icon.svelte';
	import { onMount } from 'svelte';
	import { api } from '$lib/frontend/class/API';
	import { me } from '$lib/frontend/class/User';
	import { _ } from '$lib/frontend/i18n';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import { User, auth0 } from '$lib/frontend/store';

	export let hasEntity: PropertyHasEntity;
	let checked = false;
	let count = 0;
	let goodJobId = '';
	onMount(async () => {
		const goodJobs = await api
			.get('/api/GoodJob?hasEntityId=' + hasEntity.id)
			.then((res) => res.data);
		if (goodJobs.length > 0) {
			count = goodJobs.length;
			checked = goodJobs.some((goodJob) => goodJob.userId == me.id);
			if (checked) {
				goodJobId = goodJobs.find((goodJob) => goodJob.userId == me.id).id;
			}
		}
	});
</script>

<a
	data-tooltip={_('Good Job!')}
	href={'#'}
	style:opacity={checked ? 1 : 0.5}
	on:click={async () => {
		if (checked) {
			api.delete('/api/GoodJob/' + goodJobId).then((res) => {
				count -= 1;
				checked = false;
			});
		} else {
			console.log('me.id', me.id);
			if ($User.authenticated) {
				api
					.post('/api/GoodJob', {
						hasEntityId: hasEntity.id,
						userId: me.id
					})
					.then((res) => {
						count += 1;
						checked = true;
						goodJobId = res.data.id;
					});
			} else {
				if (await myConfirm(_('Please login/register to give a good job!'))) {
					$auth0.login();
				}
			}
		}
	}}
>
	<Icon icon="thumb_up" />
	{count}
</a>

<style>
	a {
		text-decoration: none;
		display: flex;
	}
</style>
