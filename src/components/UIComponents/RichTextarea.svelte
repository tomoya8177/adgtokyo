<script lang="ts">
	import { PUBLIC_TINYMCE_API_KEY } from '$env/static/public';
	import Editor from '@tinymce/tinymce-svelte';
	export let value: string;
</script>

<main>
	<Editor
		apiKey={PUBLIC_TINYMCE_API_KEY}
		bind:value
		scriptSrc="/tinymce/tinymce.min.js"
		conf={{
			plugins: 'link lists image',
			skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide',
			content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
			toolbar:
				'blocks backcolor forecolor numlist bullist link bold italic blockquote underline strikethrough hr align indent outdent image',
			menubar: false
		}}
	/>
</main>
