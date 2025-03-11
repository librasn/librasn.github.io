<script lang="ts">
	import { SlideToggle, getModalStore } from '@skeletonlabs/skeleton';
	import { compilerState } from '$lib/compilerState';

	const modalStore = getModalStore();

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

	let annotation = '';
	let customImport = '';

	function addAnnotation() {
		if (annotation.trim() !== '') {
			compilerState.update((v) => ({
				...v,
				typeAnnotations: [...v.typeAnnotations, annotation.trim()]
			}));
			annotation = '';
		}
	}
	function addCustomImport() {
		if (customImport.trim() !== '') {
			compilerState.update((v) => ({
				...v,
				customImports: [...v.customImports, customImport.trim()]
			}));
			customImport = '';
		}
	}
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Compiler Settings</header>
		<form class="modal-form {cForm}">
			<div class="flex flex-row">
				<span class="self-center">Opaque Open Types</span>
				<SlideToggle name="slide" class="ml-4" bind:checked={$compilerState.opaqueOpenTypes} />
			</div>
			<div class="flex flex-row">
				<blockquote class="blockquote">
					ASN.1 Open Types are represented as the <code class="code">rasn::types::Any</code> type,
					which holds a binary <code class="code">content</code>. If this setting is set to
					<code class="code">false</code>, the compiler will generate additional de-/encode methods
					for all rust types that hold an open type. For example, bindings for a
					<code class="code">SEQUENCE</code> with a field of Open Type value will include a method for
					explicitly decoding the Open Type field. Non-opaque open types are still experimental. If you
					have trouble generating correct bindings, switch back to opaque open types.
				</blockquote>
			</div>
			<div class="flex flex-row">
				<span>Default Wildcard Imports</span>
				<SlideToggle
					name="slide"
					class="ml-4"
					bind:checked={$compilerState.defaultWildcardImports}
				/>
			</div>
			<div class="flex flex-row">
				<blockquote class="blockquote">
					The compiler will try to match module import dependencies of the ASN.1 module as close as
					possible, importing only those types from other modules that are imported in the ASN.1
					module. If this setting is set to <code class="code">true</code> , the compiler will
					instead always import the entire module using the wildcard <code class="code">*</code> for
					each module that the input ASN.1 module imports from.
				</blockquote>
			</div>
			<div class="flex flex-row">
				<span>Generate <code class="code">From</code>-Impls</span>
				<SlideToggle name="slide" class="ml-4" bind:checked={$compilerState.generateFromImpls} />
			</div>
			<div class="flex flex-row">
				<blockquote class="blockquote">
					The compiler will generate <code class="code">From</code>-Impls for
					<code class="code">CHOICE</code> bindings, so that types of
					<code class="code">CHOICE</code> options can be easily converted.
				</blockquote>
			</div>
			<div class="flex flex-row">
				<span>Custom Imports</span>
			</div>
			<div class="flex flex-row">
				<ul class="flex flex-wrap gap-2">
					{#if $compilerState.customImports?.length > 0}
						{#each $compilerState.customImports as ann, index}
							<li
								class="flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-surface-500"
							>
								{ann}
								<button
									on:click={() =>
										compilerState.update((v) => ({
											...v,
											customImports: v.customImports.filter((_, i) => i !== index)
										}))}
									class="ml-2 text-blue-500 hover:text-surface-500">x</button
								>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
			<div class="flex flex-row">
				<input
					type="text"
					bind:value={customImport}
					class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-surface-500"
					placeholder="Enter type annotation and press enter"
					on:keydown={(e) => e.key === 'Enter' && (addCustomImport(), e.preventDefault())}
				/>
			</div>
			<div class="flex flex-row">
				<blockquote class="blockquote">
					Stringified paths to items that will be imported into all generated modules with a <code
						class="code">use</code
					>
					declaration. For example <code class="code">my::module::*, path::to::my::Struct</code>
				</blockquote>
			</div>
			<div class="flex flex-row">
				<span>Type Annotations</span>
			</div>
			<div class="flex flex-row">
				<ul class="flex flex-wrap gap-2">
					{#if $compilerState.typeAnnotations?.length > 0}
						{#each $compilerState.typeAnnotations as ann, index}
							<li
								class="flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-surface-500"
							>
								{ann}
								<button
									on:click={() =>
										compilerState.update((v) => ({
											...v,
											typeAnnotations: v.typeAnnotations.filter((_, i) => i !== index)
										}))}
									class="ml-2 text-blue-500 hover:text-surface-500">x</button
								>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
			<div class="flex flex-row">
				<input
					type="text"
					bind:value={annotation}
					class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-surface-500"
					placeholder="Enter type annotation and press enter"
					on:keydown={(e) => e.key === 'Enter' && (addAnnotation(), e.preventDefault())}
				/>
			</div>
			<div class="flex flex-row">
				<blockquote class="blockquote">
					Annotations to be added to all generated rust types of the bindings. Each vector element
					will generate a new line of annotations. Note that the compiler will automatically add all
					pound-derives needed by rasn except <code class="code">Eq</code> and
					<code class="code">Hash</code>, which are needed only when working with
					<code class="code">SET</code>s.
				</blockquote>
			</div>
		</form>
	</div>
{/if}
