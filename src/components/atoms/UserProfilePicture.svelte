<script lang="ts">
	import { User } from '$lib/frontend/store';
	export let size = '4rem';
</script>

<div style="width:{size};height:{size}">
	<img src={$User.profile.picture} alt={$User.profile.nickname} />
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
