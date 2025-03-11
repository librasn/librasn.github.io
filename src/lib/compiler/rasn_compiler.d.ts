/* tslint:disable */
/* eslint-disable */
/**
* @param {string} asn1
* @returns {Generated}
*/
export function compile_to_typescript(asn1: string): Generated;
/**
* @param {string} asn1
* @param {Config} config
* @returns {Generated}
*/
export function compile_to_rust(asn1: string, config: Config): Generated;
/**
* A configuration for the [Rasn] backend
*/
export class Config {
  free(): void;
/**
* @param {boolean} opaque_open_types
* @param {boolean} default_wildcard_imports
* @param {boolean | undefined} [generate_from_impls]
* @param {(string)[] | undefined} [custom_imports]
* @param {(string)[] | undefined} [type_annotations]
*/
  constructor(opaque_open_types: boolean, default_wildcard_imports: boolean, generate_from_impls?: boolean, custom_imports?: (string)[], type_annotations?: (string)[]);
/**
* Stringified paths to items that will be imported into all generated modules with a
* [use declaration](https://doc.rust-lang.org/reference/items/use-declarations.html).
* For example `vec![String::from("my::module::*"), String::from("path::to::my::Struct")]`.
*/
  custom_imports: (string)[];
/**
* The compiler will try to match module import dependencies of the ASN.1
* module as close as possible, importing only those types from other modules
* that are imported in the ASN.1 module. If the `default_wildcard_imports`
* is set to `true` , the compiler will import the entire module using
* the wildcard `*` for each module that the input ASN.1 module imports from.
*/
  default_wildcard_imports: boolean;
/**
* To make working with the generated types a bit more ergonomic, the compiler
* can generate `From` impls for the wrapper inner types in a `CHOICE`, as long
* as the generated impls are not ambiguous.
* This is disabled by default to generate less code, but can be enabled with
* `generate_from_impls` set to `true`.
*/
  generate_from_impls: boolean;
/**
* ASN.1 Open Types are represented as the `rasn::types::Any` type,
* which holds a binary `content`. If `opaque_open_types` is `false`,
* the compiler will generate additional de-/encode methods for
* all rust types that hold an open type.
* For example, bindings for a `SEQUENCE` with a field of Open Type
* value will include a method for explicitly decoding the Open Type field.
* _Non-opaque open types are still experimental. If you have trouble_
* _generating correct bindings, switch back to opaque open types._
*/
  opaque_open_types: boolean;
/**
* Annotations to be added to all generated rust types of the bindings. Each vector element
* will generate a new line of annotations. Note that the compiler will automatically add all pound-derives
* needed by `rasn` __except__ `Eq` and `Hash`, which are needed only when working with `SET`s.
*
* Default: `vec![String::from("#[derive(AsnType, Debug, Clone, Decode, Encode, PartialEq, Eq, Hash)]")]`
*/
  type_annotations: (string)[];
}
/**
*/
export class Generated {
/**
** Return copy of self without private attributes.
*/
  toJSON(): Object;
/**
* Return stringified version of self.
*/
  toString(): string;
  free(): void;
/**
*/
  rust: string;
/**
*/
  warnings: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_config_free: (a: number) => void;
  readonly __wbg_get_config_opaque_open_types: (a: number) => number;
  readonly __wbg_set_config_opaque_open_types: (a: number, b: number) => void;
  readonly __wbg_get_config_default_wildcard_imports: (a: number) => number;
  readonly __wbg_set_config_default_wildcard_imports: (a: number, b: number) => void;
  readonly __wbg_get_config_generate_from_impls: (a: number) => number;
  readonly __wbg_set_config_generate_from_impls: (a: number, b: number) => void;
  readonly __wbg_get_config_custom_imports: (a: number, b: number) => void;
  readonly __wbg_set_config_custom_imports: (a: number, b: number, c: number) => void;
  readonly __wbg_get_config_type_annotations: (a: number, b: number) => void;
  readonly __wbg_set_config_type_annotations: (a: number, b: number, c: number) => void;
  readonly config_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_generated_free: (a: number) => void;
  readonly __wbg_get_generated_rust: (a: number, b: number) => void;
  readonly __wbg_set_generated_rust: (a: number, b: number, c: number) => void;
  readonly __wbg_get_generated_warnings: (a: number, b: number) => void;
  readonly __wbg_set_generated_warnings: (a: number, b: number, c: number) => void;
  readonly compile_to_typescript: (a: number, b: number, c: number) => void;
  readonly compile_to_rust: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
