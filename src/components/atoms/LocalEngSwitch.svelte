<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	let value: string;
	LocalEnSwitch.subscribe((val) => {
		console.log({ val });
	});
</script>

<div>
	<a
		href={'#'}
		role="button"
		class="leftButton"
		class:outline={$LocalEnSwitch == 'en'}
		on:click={() => {
			LocalEnSwitch.set('local');
		}}
	>
		{_('Local')}
	</a>
	<a
		href={'#'}
		role="button"
		class="rightButton"
		class:outline={$LocalEnSwitch == 'local'}
		on:click={() => {
			LocalEnSwitch.set('en');
		}}
	>
		{_('English')}
	</a>
</div>

<style>
	div {
		display: flex;
		gap: 0px;
	}
	.leftButton {
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}
	.rightButton {
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}
</style>
