<script lang="ts">
	import type { User } from '$lib/frontend/class/User';

	export let size = '4rem';
	export let user: User;
</script>

<div style="width:{size};height:{size};">
	<img src={user.picture} alt={user.nickname} />
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 50%;
	}
</style>
