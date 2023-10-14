<script lang="ts">
	import PostEditor from '$components/organisms/PostEditor.svelte';
	import { goto } from '$app/navigation';
	import { Content } from '$lib/frontend/class/Content';
	import { Post } from '$lib/frontend/class/Post';
	import { me } from '$lib/frontend/class/User';
	import { _, lang } from '$lib/frontend/i18n';
	import { locales } from '$lib/frontend/locales';
	import { BottomNavButton, User, loginModalOpen } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import LocaleSelector from '$components/UIComponents/LocaleSelector.svelte';

	let post = new Post({});
	let content = new Content({
		postId: post.id,
		locale: lang.locale
	});
	let wasDraft = post.status == 'draft';
	onMount(() => {
		if (!$User.authenticated) {
			loginModalOpen.set(true);
			return;
		}
		BottomNavButton.set({
			label: _('Create'),
			onClick: async () => {
				if (!$BottomNavButton) return;
				$BottomNavButton.busy = true;

				post.userId = me.id;
				await post.create();
				await content.create();

				await post.generateOtherLocaleContentFrom(content.locale);
				$BottomNavButton.busy = false;
				goto(`/post`, {
					invalidateAll: true
				});
			}
		});
	});
	let buttonBusy = false;
</script>

{#if $User.authenticated}
	<LocaleSelector bind:content />
	<PostEditor bind:post bind:content />
	<button
		aria-busy={buttonBusy}
		on:click={async () => {
			buttonBusy = true;

			post.userId = me.id;
			await post.create();
			await content.create();

			await Promise.all(
				locales.map(async (locale) => {
					if (locale.key != content.locale) {
						await post.generateOtherLocaleContentFrom(content.locale);
					}
				})
			);
			buttonBusy = false;
			goto(`/post`, {
				invalidateAll: true
			});
		}}>{_('Create')}</button
	>
{/if}
