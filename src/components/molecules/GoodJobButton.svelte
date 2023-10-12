<script lang="ts">
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import Icon from '$components/UIComponents/Icon.svelte';
	import { api } from '$lib/frontend/class/API';
	import { me } from '$lib/frontend/class/User';
	import { _ } from '$lib/frontend/i18n';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import { User, auth0 } from '$lib/frontend/store';
	import { GoodJob } from '$lib/frontend/class/GoodJob';

	export let filmography: PropertyHasEntity;
	export let goodJobs: GoodJob[];
	$: goodJob = goodJobs.find((goodJob) => goodJob.userId == me.id) || (false as GoodJob | false);
</script>

<a
	class:secondary={!goodJob}
	data-tooltip={_('Good Job!')}
	href={'#'}
	on:click={async () => {
		if (goodJob) {
			await goodJob.delete();
			goodJobs = goodJobs.filter((g) => {
				if (!goodJob) return false;
				return g.id != goodJob.id;
			});
		} else {
			if ($User.authenticated) {
				const newGoodJob = new GoodJob({
					hasEntityId: filmography.id,
					userId: me.id
				});
				await newGoodJob.create();
				goodJobs = [...goodJobs, newGoodJob];
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
		padding-right: 1.5rem;
		padding-left: 1rem;
	}
</style>
