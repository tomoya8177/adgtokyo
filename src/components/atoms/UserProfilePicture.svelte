<script lang="ts">
	import { me } from '$lib/frontend/class/User';
	export let size = '4rem';
</script>

<div style="width:{size};height:{size}">
	<img src={me.picture} alt={me.nickname} />
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
