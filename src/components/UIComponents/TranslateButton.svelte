<script lang="ts">
	import { api } from '$lib/frontend/class/API';
	import { _ } from '$lib/frontend/i18n';
	export let local: string;
	export let en: string;
	export let forTitle = true;
	let translating = false;
	let translate = async () => {
		if (!local) return;
		translating = true;
		en = await api.post('/translate', { text: local }).then((res) => res.data.translation);
		if (forTitle) {
			en = en.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
		}
		translating = false;
		console.log(en);
	};
</script>

<a href={'#'} on:click={translate} aria-busy={translating} style="display:flex">
	{_('Translate from local')}</a
>
