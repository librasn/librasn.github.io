<script lang="ts">
	import { Config, compile_to_rust, compile_to_typescript } from '$lib/compiler/rasn_compiler';
	import { Bindings, compilerState } from '$lib/compilerState';
	import * as prettier from 'prettier';
	import * as tsPlugin from 'prettier/parser-typescript';
	import * as estreePlugin from 'prettier/plugins/estree';
	import { onDestroy } from 'svelte';

	let backend: Bindings;
	let bindings = '';
	let errors = '';

	let bufferTimeout = undefined;

	const bufferedCompile = () => {
		clearTimeout(bufferTimeout);
		setTimeout(compile, 200);
	};

	const compile = async () => {
		try {
			let { input, opaqueOpenTypes, defaultWildcardImports, language } = $compilerState;
			if (input.length === 0) return;
			const config = new Config(opaqueOpenTypes, defaultWildcardImports);
			if (language === Bindings.Rasn) {
				compileToRust(input, config);
			} else {
				compileToTypescript(input);
			}
		} catch (e: any) {
			errors = e;
		}
	};

	const compileToTypescript = async (input: string) => {
		const { rust, warnings } = compile_to_typescript(input);
		errors = warnings;
		bindings = await prettier.format(rust, {
			parser: 'typescript',
			plugins: [tsPlugin, estreePlugin]
		});
	};

	const compileToRust = (input: string, config: Config) => {
		const { rust, warnings } = compile_to_rust(input, config);
		errors = warnings;
		bindings = rustfmt(rust);
	};

	const rustfmt = (bindings: string) => {
		// @ts-ignore
		const formatted = wasm_bindgen.rustfmt(bindings);
		const err = formatted.error();
		if (err) {
			errors += `\nWARN: Failed to format generated rust code.\n${err}`;
			return bindings;
		} else {
			return formatted.code();
		}
	};

	let unsubscribe = compilerState.subscribe((s) => {
		if (s.language !== backend) {
			backend = s.language;
			bufferedCompile();
		}
	});

	onDestroy(unsubscribe);
</script>

<div
	class="grid flex-grow grid-cols-1 grid-rows-12 content-stretch justify-stretch gap-2 sm:grid-cols-2"
	style="padding: 0.4rem;"
>
	<div class="tooltip flex sm:row-span-10" data-tooltip="Double-click to copy to clipboard">
		<textarea
			class="textarea flex-1 rounded-md"
			placeholder="Paste your ASN.1 here"
			bind:value={$compilerState.input}
			on:input={bufferedCompile}
		/>
	</div>
	<div class="flex sm:row-span-10">
		<textarea
			class="has-tooltip textarea flex-1 rounded-md"
			style="overflow: scroll; resize: none;"
			readonly
			placeholder="Your generated bindings will appear here"
			value={bindings}
		/>
	</div>
	<div
		class="tooltip flex sm:col-span-2 sm:row-span-2"
		data-tooltip="Double-click to copy to clipboard"
	>
		<textarea
			class="textarea flex-1 rounded-md"
			style="overflow: scroll-y; resize: none;"
			readonly
			placeholder="Compiler warnings and errors appear here"
			value={errors}
		/>
	</div>
</div>

<style>
	textarea {
		color: whitesmoke;
		font-size: small;
		background-color: #333;
		font-family: 'Courier New', Courier, monospace;
		white-space: pre-wrap;
		padding: 1rem;
		resize: none;
		line-height: normal;
	}
</style>
