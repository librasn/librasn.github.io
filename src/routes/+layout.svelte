<script lang="ts">
	import '../app.css';
	import { AppBar, RadioGroup, RadioItem, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Bindings, load, compilerState } from '$lib/compilerState';
	import { onMount } from 'svelte';
	import { init } from '$lib';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Settings from '$lib/components/Settings.svelte';

	initializeStores();
	const modalStore = getModalStore();
	const modalComponent = { ref: Settings };

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	onMount(() => {
		init();
		// @ts-ignore
		wasm_bindgen('./wasm_rustfmt_bg.wasm');
		load();
	});
</script>

<div class="flex h-dvh flex-col">
	<Modal />
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<img
			class="bar-title"
			slot="lead"
			src="favicon.png"
			alt="rasn project logo"
			style="max-height: 3rem;"
		/>
		<h2 class="bar-title invisible sm:visible">
			generating <a
				href="https://github.com/librasn"
				target="_blank"
				class="px-0 text-purple-400"
				style="display: inline;">rasn</a
			>
			bindings and TS types for ASN.1 data types
		</h2>
		<div class="flex flex-row" slot="trail">
			<RadioGroup>
				<RadioItem bind:group={$compilerState.language} name="justify" value={Bindings.Rasn}
					>rasn</RadioItem
				>
				<RadioItem bind:group={$compilerState.language} name="justify" value={Bindings.Typescript}
					>typescript</RadioItem
				>
			</RadioGroup>
			<span class="badge-icon ml-4 self-center" on:click={() => modalStore.trigger(modal)}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>
			</span>
		</div>
	</AppBar>
	<slot />
</div>