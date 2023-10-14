<script lang="ts">
	import ChatMessages from '../../components/organisms/ChatMessages.svelte';

	import BottomNav from '$components/panels/BottomNav.svelte';
	import { api } from '$lib/frontend/class/API';
	import { me } from '$lib/frontend/class/User';
	import { nl2br } from '$lib/frontend/nl2br';
	import { BottomInputValue, BottomNavButton } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	let messages: {
		from: 'user' | 'ai';
		text: string;
	}[] = [];
	onMount(() => {
		BottomNavButton.set({
			label: 'Ask Question',
			onClick: async () => {
				$BottomNavButton.busy = true;
				if ($BottomInputValue == '') return;
				messages = [...messages, { text: $BottomInputValue, from: 'user' }];
				const response = await api
					.post('/openai', { prompt: $BottomInputValue, withHistory: true, userId: me.id })
					.then((res) => res.data);
				console.log(response);
				messages = [...messages, { text: response.content, from: 'ai' }];
				$BottomNavButton.busy = false;
				BottomInputValue.set('');
				return false; //to set the busy state false
			}
		});
	});
</script>

<ChatMessages bind:messages />
