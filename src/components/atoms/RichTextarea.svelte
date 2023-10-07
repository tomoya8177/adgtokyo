<script lang="ts">
	import { PUBLIC_TINYMCE_API_KEY } from '$env/static/public';
	import Editor from '@tinymce/tinymce-svelte';
	export let value: string;
	export let id: string = 'id';
</script>

<main>
	<Editor
		apiKey={PUBLIC_TINYMCE_API_KEY}
		bind:value
		scriptSrc="/tinymce/tinymce.min.js"
		conf={{
			plugins: 'link lists',
			skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide',
			content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
			toolbar:
				'styles fontsize backcolor forecolor  numlist bullist link bold italic underline strikethrough hr align indent outdent',
			menubar: false
		}}
	/>
</main>
