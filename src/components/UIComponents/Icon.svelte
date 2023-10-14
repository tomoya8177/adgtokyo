<script lang="ts">
	export let icon: string;
	export let size: string = '1.5rem';
	export let color: string = '';
</script>

<span class="material-symbols-outlined" style:font-size={size} style:color>
	{icon}
</span>
