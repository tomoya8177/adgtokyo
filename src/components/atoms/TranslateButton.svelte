<script lang="ts">
	import { api } from '$lib/frontend/class/API';
	import { _ } from '$lib/frontend/i18n';
	import Icon from './Icon.svelte';

	export let local: string;
	export let en: string;
	let translating = false;
	let translate = async () => {
		if (!local) return;
		translating = true;
		en = await api.post('/translate', { text: local }).then((res) => res.data.translation);
		translating = false;
		console.log(en);
	};
</script>

<a href={'#'} on:click={translate} aria-busy={translating} style="display:flex">
	{_('Translate from local')}</a
>
