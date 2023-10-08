<script lang="ts">
	import ImageSlider from '../../../../components/organisms/ImageSlider.svelte';

	import { Department } from '$lib/frontend/class/Department';
	import { Work } from '$lib/frontend/class/Work';

	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, User } from '$lib/frontend/store';
	import Button from '../../../../components/atoms/Button.svelte';
	import WorkTitle from '../../../../components/organisms/WorkTitle.svelte';
	import type { PageData } from './$types';
	import DepartmentRow from '../../../../components/organisms/DepartmentRow.svelte';
	import { onMount } from 'svelte';
	import { Distribution } from '$lib/frontend/class/Distribution';
	import DistributionRow from '../../../../components/organisms/DistributionRow.svelte';
	import { Attachment } from '$lib/frontend/class/Attachments';
	import Uploader from '../../../../components/atoms/Uploader.svelte';
	import Heading from '../../../../components/atoms/Heading.svelte';
	import LoginWarningModal from '../../../../components/panels/LoginWarningModal.svelte';
	import { toast } from '$lib/frontend/toast';
	import { Property } from '$lib/frontend/class/Property';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	export let data: PageData;
	let work = new Work(data.work);
	work.build(data);
	onMount(() => {
		BottomNavButton.set({
			label: _('Done Editing'),
			onClick: async () => {
				if (work.editing) {
					await workUpdate(work);
				}
				await Promise.all(
					work.distributions.map((dis) => {
						if (dis.editing) {
							return distributionUpdate(dis);
						}
						return Promise.resolve();
					})
				);
				await Promise.all(
					work.departments.map(async (dep) => {
						await Promise.all(
							dep.properties.map(async (prop) => {
								await Promise.all(
									prop.hasEntities.map((hasEntity) => {
										if (hasEntity.editing) {
											return hasEntityUpdate(hasEntity);
										}
										return Promise.resolve();
									})
								);
								if (prop.editing) {
									return propertyUpdate(prop);
								}
								return Promise.resolve();
							})
						);
						if (dep.editing) {
							return departmentUpdate(dep);
						}
						return Promise.resolve();
					})
				);

				goto(`/work/${work.id}#updated`, {
					invalidateAll: true
				});
				//				location.href = `/work/${work.id}`;
			}
		});
	});
	const hasEntityUpdate = async (hasEntity: PropertyHasEntity) => {
		if (!hasEntity.validate()) return;
		hasEntity.update({
			subtextLocal: hasEntity.subtextLocal,
			subtextEn: hasEntity.subtextEn
		});
		hasEntity.editing = false;
	};
	const propertyUpdate = async (property: Property) => {
		if (!property.validate()) return;
		property.update({
			keyLocal: property.keyLocal,
			keyEn: property.keyEn
		});
		property.editing = false;
	};
	const departmentUpdate = async (department: Department) => {
		if (!department.validate()) return;
		department.update({
			titleLocal: department.titleLocal,
			titleEn: department.titleEn
		});
		department.editing = false;
	};
	const distributionUpdate = async (distribution: Distribution) => {
		if (!distribution.validate()) return;
		distribution.update({
			year: distribution.year,
			regionLocal: distribution.regionLocal,
			regionEn: distribution.regionEn
		});
		distribution.editing = false;
	};
	const workUpdate = async (work: Work) => {
		if (!work.validate()) return;
		work.update({
			titleLocal: work.titleLocal,
			titleEn: work.titleEn,
			descriptionLocal: work.descriptionLocal,
			descriptionEn: work.descriptionEn,
			imdbURL: work.imdbURL,
			officialWebsiteURL: work.officialWebsiteURL,
			videoURL: work.videoURL,
			category: work.category
		});
		work.editing = false;
	};
</script>

{#if $User.authenticated}
	<WorkTitle bind:work onUpdate={workUpdate} />
	<hr />
	<Heading label={_('Images')} />
	{#if work.attachments.length}
		<ImageSlider bind:images={work.attachments} bind:editing={work.editing} />
	{/if}
	<Uploader
		label={_('Upload Images')}
		onUploadDone={async (files) => {
			const promises = files.map((file) => {
				return new Attachment({
					filename: file.filename,
					attachedTo: work.id,
					userId: $User.profile.sub,
					url: file.url,
					handle: file.handle
				}).create();
			});
			work.attachments = [...work.attachments, ...(await Promise.all(promises))];
		}}
	/>
	<hr />
	<Heading label={_('Release Info')} />
	{#each work.distributions as distribution, index}
		<DistributionRow
			onDelete={() => {
				work.distributions = work.distributions.filter((d) => d.id !== distribution.id);
			}}
			onDistributionUpdate={distributionUpdate}
			onUp={index != 0
				? () => {
						distribution.weight = index;
						distribution.update({
							weight: distribution.weight
						});
						const prev = work.distributions[index - 1];
						prev.weight += 1;
						prev.update({
							weight: prev.weight
						});
						work.distributions.sort((a, b) => (a.weight > b.weight ? 1 : -1));
				  }
				: false}
			onDown={index != work.distributions.length - 1
				? () => {
						distribution.weight = index + 2;
						distribution.update({
							weight: distribution.weight
						});
						const next = work.distributions[index + 1];
						next.weight -= 1;
						next.update({
							weight: next.weight
						});
						work.distributions.sort((a, b) => (a.weight > b.weight ? 1 : -1));
				  }
				: false}
			bind:distribution
		/>
	{/each}
	<Button
		className="outline"
		icon="add"
		label={_('Add Release')}
		onclick={async () => {
			const distribution = await new Distribution({
				weight: work.distributions.length + 1,
				workId: work.id
			}).create();
			distribution.editing = true;
			work.distributions = [...work.distributions, distribution];
		}}
	/>
	<hr />
	<Heading label={_('Crew List')} />
	{#each work.departments as department, index}
		<DepartmentRow
			onUpdate={departmentUpdate}
			onPropertyUpdate={propertyUpdate}
			onHasEntityUpdate={hasEntityUpdate}
			onUp={index != 0
				? () => {
						department.weight = index;
						department.update({
							weight: department.weight
						});
						const prev = work.departments[index - 1];
						prev.weight += 1;
						prev.update({
							weight: prev.weight
						});
						work.departments.sort((a, b) => (a.weight > b.weight ? 1 : -1));
				  }
				: false}
			onDown={index != work.departments.length - 1
				? () => {
						department.weight = index + 2;
						department.update({
							weight: department.weight
						});
						const next = work.departments[index + 1];
						next.weight -= 1;
						next.update({
							weight: next.weight
						});
						work.departments.sort((a, b) => (a.weight > b.weight ? 1 : -1));
				  }
				: false}
			{department}
			onDelete={() => {
				work.departments = work.departments.filter((d) => d.id !== department.id);
			}}
		/>
	{/each}
	<Button
		className="outline"
		icon="add"
		label={_('Add Department')}
		onclick={async () => {
			const department = await new Department({
				weight: work.departments.length + 1,
				workId: work.id
			}).create();
			const property = await new Property({
				departmentId: department.id,
				weight: 1
			}).create();
			property.editing = true;
			const hasEntity = await new PropertyHasEntity({
				propertyId: property.id,
				weight: 1
			}).create();
			hasEntity.editing = true;
			property.hasEntities = [hasEntity];
			department.properties = [property];
			department.editing = true;

			work.departments = [...work.departments, department];
		}}
	/>
{:else if $User.authenticated === false}
	<LoginWarningModal />
{/if}
