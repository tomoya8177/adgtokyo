<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
</script>

<div class="container bottom">
	<nav>
		<ul>
			<li>A</li>
		</ul>
		<ul>
			<li>
				<a role="button" href="/work/create">
					{_('Create New Work')}
				</a>
			</li>
		</ul>
		<ul>
			<li>A</li>
		</ul>
	</nav>
</div>

<style>
	.bottom {
		position: fixed;
		bottom: -1px;
		width: 100%;
		background-color: var(--background-color);
		margin-left: calc(var(--spacing) * -1);
	}
</style>
