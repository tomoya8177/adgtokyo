<script lang="ts">
	import { cookies } from '$lib/frontend/cookies';
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
</script>

<div role="group">
	<a
		href={'#'}
		role="button"
		class:outline={$LocalEnSwitch == 'en'}
		on:click={() => {
			LocalEnSwitch.set('local');
			cookies.set('localEng', 'local');
		}}
	>
		{_('Local')}
	</a>
	<a
		href={'#'}
		role="button"
		class:outline={$LocalEnSwitch == 'local'}
		on:click={() => {
			LocalEnSwitch.set('en');
			cookies.set('localEng', 'en');
		}}
	>
		{_('English')}
	</a>
</div>
