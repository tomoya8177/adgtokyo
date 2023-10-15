<script lang="ts">
	import ImageSlider from '$components/organisms/ImageSlider.svelte';

	import { Department } from '$lib/frontend/class/Department';
	import { Work } from '$lib/frontend/class/Work';

	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, User } from '$lib/frontend/store';
	import Button from '$components/UIComponents/Button.svelte';
	import WorkTitle from '$components/organisms/WorkTitle.svelte';
	import type { PageData } from './$types';
	import DepartmentRow from '$components/organisms/DepartmentRow.svelte';
	import { onMount } from 'svelte';
	import { Distribution } from '$lib/frontend/class/Distribution';
	import DistributionRow from '$components/organisms/DistributionRow.svelte';
	import { Attachment } from '$lib/frontend/class/Attachments';
	import Uploader from '$components/UIComponents/Uploader.svelte';
	import Heading from '$components/UIComponents/Heading.svelte';
	import LoginWarningModal from '$components/panels/LoginWarningModal.svelte';
	import { Property } from '$lib/frontend/class/Property';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { goto } from '$app/navigation';
	import { me } from '$lib/frontend/class/User';
	export let data: PageData;
	let departmentButtonBusy = false;
	let work = new Work(data.work);
	work.build(data);
	onMount(() => {
		BottomNavButton.set({
			label: _('Done Editing'),
			onClick: async () => {
				$BottomNavButton.busy = true;
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
				const promises: Promise<any>[] = [];
				work.departments.forEach((dep) => {
					dep.properties.forEach((prop) => {
						prop.hasEntities.forEach((hasEntity) => {
							if (hasEntity.editing) {
								promises.push(hasEntityUpdate(hasEntity));
							}
						});
						if (prop.editing) {
							promises.push(propertyUpdate(prop));
						}
					});
					if (dep.editing) {
						promises.push(departmentUpdate(dep));
					}
				});
				const response = await Promise.all(promises);
				console.log(response);
				if (response.includes(false)) {
					return false;
				}
				goto(`/work/${work.id}#updated`, {
					invalidateAll: true
				});
				//				location.href = `/work/${work.id}`;
			}
		});
	});
	const hasEntityUpdate = async (hasEntity: PropertyHasEntity): Promise<boolean> => {
		if (!hasEntity.validate()) return false;
		if (hasEntity.anew) {
			await hasEntity.create();
			hasEntity.anew = false;
		} else {
			await hasEntity.update({
				subtextLocal: hasEntity.subtextLocal,
				subtextEn: hasEntity.subtextEn,
				entityId: hasEntity.entityId
			});
		}
		hasEntity.editing = false;
		return true;
	};
	const propertyUpdate = async (property: Property): Promise<boolean> => {
		if (!property.validate()) return false;
		await property.update({
			keyLocal: property.keyLocal,
			keyEn: property.keyEn
		});
		property.editing = false;
		return true;
	};
	const departmentUpdate = async (department: Department): Promise<boolean> => {
		if (!department.validate()) return false;
		await department.update({
			titleLocal: department.titleLocal,
			titleEn: department.titleEn
		});
		department.editing = false;
		return true;
	};
	const distributionUpdate = async (distribution: Distribution): Promise<boolean> => {
		if (!distribution.validate()) return false;
		await distribution.update({
			year: distribution.year,
			regionLocal: distribution.regionLocal,
			regionEn: distribution.regionEn
		});
		distribution.editing = false;
		return true;
	};
	const workUpdate = async (work: Work): Promise<boolean> => {
		if (!work.validate()) return false;
		await work.update({
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
		return true;
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
					userId: me.sub,
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
		busy={departmentButtonBusy}
		className="outline"
		icon="add"
		label={_('Add Department')}
		onclick={async () => {
			departmentButtonBusy = true;
			const department = await new Department({
				weight: work.departments.length + 1,
				workId: work.id
			}).create();
			const property = await new Property({
				departmentId: department.id,
				weight: 1
			}).create();
			property.editing = true;
			const hasEntity = new PropertyHasEntity({
				propertyId: property.id,
				weight: 1,
				anew: true
			});

			hasEntity.editing = true;
			property.hasEntities = [hasEntity];
			department.properties = [property];
			department.editing = true;

			work.departments = [...work.departments, department];
			departmentButtonBusy = false;
		}}
	/>
{:else if $User.authenticated === false}
	<LoginWarningModal />
{/if}
