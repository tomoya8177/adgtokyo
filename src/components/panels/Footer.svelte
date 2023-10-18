<script lang="ts">
	import LogoImage from '$components/UIComponents/LogoImage.svelte';
	import { lang } from '$lib/frontend/i18n';
</script>

<div style="display:flex;justify-content:center; align-items:center;gap:1rem">
	<LogoImage size="3rem" />
	<a class="secondary" href={`/post/7252ba67-0393-472e-b9b0-fb4e18dcef9e/${lang.locale}`}>
		WHO WE ARE
	</a>
	<a class="secondary" href={`/post/160167a9-fe40-444c-9fbc-f59ceef185d1/${lang.locale}`}>
		OUR VISION
	</a>
</div>
