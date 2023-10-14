<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import Button from '$components/UIComponents/Button.svelte';
	import type { Attachment } from '$lib/frontend/class/Attachments';
	import EditControlButtons from '$components/molecules/EditControlButtons.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	export let images: Attachment[];
	export let editing = false;
	let id = crypto.randomUUID();
	export let isStatic = false;
</script>

<div style="position:relative" class="container">
	<figure class="slider" {id}>
		<div style="white-space:nowrap">
			{#each images as attachment, index}
				<div class="image">
					<a href={attachment.url} target="_blank">
						<img
							alt={attachment.filename}
							style="height:200px;width:auto;"
							src={attachment.thumbnailURL}
						/>
					</a>
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
								onDelete={async () => {
									if (!(await myConfirm('Are you sure?'))) return;
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
	<div style="position:absolute;left:0;top:100px" class="circleButton arrow">
		<Button
			icon="chevron_left"
			onclick={() => {
				const slider = document.getElementById(id);
				if (!slider) return;
				slider.scrollLeft -= 200;
			}}
		/>
	</div>
	<div style="position:absolute;right:0;top:100px;" class="circleButton arrow">
		<Button
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
	.circleButton {
		border-radius: 50%;
		height: 2.5rem;
		width: 2.5rem;
		overflow: hidden;
		display: flex;
	}
	.slider {
		scroll-behavior: smooth;
		transition: all 0.5s ease-in-out;
	}

	.slider::-webkit-scrollbar {
		display: none;
	}
	.image {
		display: inline-block;
		margin-right: calc(var(--pico-spacing) / 2);
		cursor: pointer;
		border-radius: var(--pico-border-radius);
		overflow: hidden;
		position: relative;
	}
	.arrow {
		opacity: 0;
		transition: all 0.5s ease-in-out;
	}
	.container:hover .arrow {
		opacity: 1;
	}
</style>
