<script lang="ts">
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import Icon from '../atoms/Icon.svelte';
	import { api } from '$lib/frontend/class/API';
	import { me } from '$lib/frontend/class/User';
	import { _ } from '$lib/frontend/i18n';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import { User, auth0 } from '$lib/frontend/store';

	export let filmography: PropertyHasEntity;
	export let goodJobs: any[];
	$: goodJob = goodJobs.find((goodJob) => goodJob.userId == me.id);
</script>

<a
	class:secondary={!goodJob}
	data-tooltip={_('Good Job!')}
	href={'#'}
	on:click={async () => {
		if (goodJob) {
			await api.delete('/api/GoodJob/' + goodJob.id);
			goodJobs = goodJobs.filter((g) => g.id != goodJob.id);
		} else {
			if ($User.authenticated) {
				const res = await api
					.post('/api/GoodJob', {
						hasEntityId: filmography.id,
						userId: me.id
					})
					.then((res) => res.data);
				goodJobs = [...goodJobs, res];
			} else {
				if (await myConfirm(_('Please login/register to give a good job!'))) {
					$auth0.login();
				}
			}
		}
	}}
>
	<Icon icon="thumb_up" />
	{goodJobs.length}
</a>

<style>
	a {
		text-decoration: none;
		display: flex;
		padding-right: 2rem;
		padding-left: 2rem;
	}
</style>
