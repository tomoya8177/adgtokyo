<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	export let url: string;
	export let title: string;
</script>

<section>
	<div style="display:flex; gap:0.4rem;width:fit-content;margin:auto auto">
		<button
			class="secondary"
			data-sharer="twitter"
			data-title={title}
			data-hashtags="awesome, sharer.js"
			data-url={url}><i class="fa-brands fa-x-twitter" /></button
		>
		<button class="secondary" data-sharer="facebook" data-hashtag="hashtag" data-url={url}
			><i class="fa-brands fa-facebook" /></button
		>
		<button class="secondary" data-sharer="line" data-title={title} data-url={url}
			><i class="fa-brands fa-line" /></button
		>
		<button class="secondary" data-sharer="linkedin" data-url={url}
			><i class="fa-brands fa-linkedin" /></button
		>
	</div>
</section>

<style>
</style>
