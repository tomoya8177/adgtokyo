<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { goto } from '$app/navigation';
	import type { Entity } from '$lib/frontend/class/Entity';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import UserProfilePicture from '$components/UIComponents/UserProfilePicture.svelte';
	import type { User } from '$lib/frontend/class/User';
	export let user: User;
</script>

<div>
	<UserProfilePicture {user} size="1.2rem" />
	{user.nickname}
</div>

<style>
	div {
		display: flex;
		gap: 0.4rem;
		align-items: center;
	}
</style>
