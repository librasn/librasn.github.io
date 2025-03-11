import { writable } from 'svelte/store';

export enum Bindings {
	Typescript,
	Rasn
}

interface CompilerState {
	input: string;
	opaqueOpenTypes: boolean;
	defaultWildcardImports: boolean;
	generateFromImpls: boolean;
	language: Bindings;
	customImports: string[];
	typeAnnotations: string[];
}

const DEFAULT = {
	input: '',
	opaqueOpenTypes: true,
	defaultWildcardImports: false,
	generateFromImpls: false,
	language: Bindings.Rasn,
	customImports: [],
	typeAnnotations: ['#[derive(AsnType, Debug, Clone, Decode, Encode, PartialEq, Eq, Hash)]']
};

export const compilerState = writable<CompilerState>(DEFAULT);

export const load = () => {
	const localCache = localStorage?.getItem('compilerState');
	if (localCache) {
		compilerState.set({ ...DEFAULT, ...JSON.parse(localCache) });
	}
	compilerState.subscribe((value) => {
		if (localStorage) {
			localStorage.compilerState = JSON.stringify(value);
		}
	});
};
