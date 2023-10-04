<script lang="ts">
	import { Department } from '$lib/frontend/class/Department';
	import { Property } from '$lib/frontend/class/Property';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { Work } from '$lib/frontend/class/Work';

	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, LocalEnSwitch, onBottomNavButtonClicked } from '$lib/frontend/store';
	import Button from '../atoms/Button.svelte';
	import LocalEngSwitch from '../atoms/LocalEngSwitch.svelte';
	import WorkTitle from './WorkTitle.svelte';
	import type { PageData } from '../../routes/work/[workId]/edit/$types';
	import DepartmentRow from './DepartmentRow.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Distribution } from '$lib/frontend/class/Distribution';
	import DistributionRow from './DistributionRow.svelte';
	import Icon from '../atoms/Icon.svelte';
	import type { Attachment } from '$lib/frontend/class/Attachments';
	import EditControlButtons from '../molecules/EditControlButtons.svelte';
	export let images: Attachment[];
	export let editing = false;
	let id = crypto.randomUUID();
	const onUp = () => {};
	let onDown: (() => void) | false;
	export let isStatic = false;
</script>

<div style="position:relative">
	<figure class="slider" {id}>
		<div style="text-wrap:nowrap">
			{#each images as attachment, index}
				<div
					style="display:inline-block;margin-right: var(--pico-spacing); cursor: pointer; border-radius: var(--pico-border-radius); overflow: hidden;position:relative;"
				>
					<img
						style="height:200px;width:auto;"
						on:click={() => {
							window.open(attachment.url);
						}}
						src={attachment.thumbnailURL}
					/>
					{#if !isStatic}
						<div style="position:absolute;top:0px;right:0px">
							<EditControlButtons
								onUp={index != 0
									? () => {
											attachment.weight = index;
											attachment.update({
												weight: attachment.weight
											});
											const prev = images[index - 1];
											prev.weight += 1;
											prev.update({
												weight: prev.weight
											});
											images.sort((a, b) => (a.weight > b.weight ? 1 : -1));
									  }
									: false}
								onDown={index != images.length - 1
									? () => {
											attachment.weight = index + 2;
											attachment.update({
												weight: attachment.weight
											});
											const next = images[index + 1];
											next.weight -= 1;
											next.update({
												weight: next.weight
											});
											images.sort((a, b) => (a.weight > b.weight ? 1 : -1));
									  }
									: false}
								bind:editing
								onDelete={() => {
									if (!confirm('Are you sure?')) return;
									attachment.delete();
									images = images.filter((a) => a.id !== attachment.id);
								}}
							/>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</figure>
	<div style="position:absolute;left:0;top:100px">
		<Button
			white
			className="secondary"
			icon="chevron_left"
			onclick={() => {
				const slider = document.getElementById(id);
				if (!slider) return;
				slider.scrollLeft -= 200;
			}}
		/>
	</div>
	<div style="position:absolute;right:0;top:100px">
		<Button
			white
			className="secondary"
			icon="chevron_right"
			onclick={() => {
				const slider = document.getElementById(id);
				if (!slider) return;
				slider.scrollLeft += 200;
			}}
		/>
	</div>
</div>

<style>
	.slider {
		scroll-behavior: smooth;
		transition: all 0.5s ease-in-out;
	}

	.slider::-webkit-scrollbar {
		display: none;
	}
</style>
