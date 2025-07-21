let wasm;

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_0.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_0.set(idx, obj);
    return idx;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_0.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}
/**
 * @param {string} asn1
 * @returns {Generated}
 */
export function compile_to_typescript(asn1) {
    const ptr0 = passStringToWasm0(asn1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.compile_to_typescript(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Generated.__wrap(ret[0]);
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}
/**
 * @param {string} asn1
 * @param {Config} config
 * @returns {Generated}
 */
export function compile_to_rust(asn1, config) {
    const ptr0 = passStringToWasm0(asn1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    _assertClass(config, Config);
    var ptr1 = config.__destroy_into_raw();
    const ret = wasm.compile_to_rust(ptr0, len0, ptr1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Generated.__wrap(ret[0]);
}

const ConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_config_free(ptr >>> 0, 1));
/**
 * A configuration for the [Rasn] backend
 */
export class Config {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConfigFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_config_free(ptr, 0);
    }
    /**
     * ASN.1 Open Types are represented as the `rasn::types::Any` type,
     * which holds a binary `content`. If `opaque_open_types` is `false`,
     * the compiler will generate additional de-/encode methods for
     * all rust types that hold an open type.
     * For example, bindings for a `SEQUENCE` with a field of Open Type
     * value will include a method for explicitly decoding the Open Type field.
     * _Non-opaque open types are still experimental. If you have trouble_
     * _generating correct bindings, switch back to opaque open types._
     * @returns {boolean}
     */
    get opaque_open_types() {
        const ret = wasm.__wbg_get_config_opaque_open_types(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * ASN.1 Open Types are represented as the `rasn::types::Any` type,
     * which holds a binary `content`. If `opaque_open_types` is `false`,
     * the compiler will generate additional de-/encode methods for
     * all rust types that hold an open type.
     * For example, bindings for a `SEQUENCE` with a field of Open Type
     * value will include a method for explicitly decoding the Open Type field.
     * _Non-opaque open types are still experimental. If you have trouble_
     * _generating correct bindings, switch back to opaque open types._
     * @param {boolean} arg0
     */
    set opaque_open_types(arg0) {
        wasm.__wbg_set_config_opaque_open_types(this.__wbg_ptr, arg0);
    }
    /**
     * The compiler will try to match module import dependencies of the ASN.1
     * module as close as possible, importing only those types from other modules
     * that are imported in the ASN.1 module. If the `default_wildcard_imports`
     * is set to `true` , the compiler will import the entire module using
     * the wildcard `*` for each module that the input ASN.1 module imports from.
     * @returns {boolean}
     */
    get default_wildcard_imports() {
        const ret = wasm.__wbg_get_config_default_wildcard_imports(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * The compiler will try to match module import dependencies of the ASN.1
     * module as close as possible, importing only those types from other modules
     * that are imported in the ASN.1 module. If the `default_wildcard_imports`
     * is set to `true` , the compiler will import the entire module using
     * the wildcard `*` for each module that the input ASN.1 module imports from.
     * @param {boolean} arg0
     */
    set default_wildcard_imports(arg0) {
        wasm.__wbg_set_config_default_wildcard_imports(this.__wbg_ptr, arg0);
    }
    /**
     * To make working with the generated types a bit more ergonomic, the compiler
     * can generate `From` impls for the wrapper inner types in a `CHOICE`, as long
     * as the generated impls are not ambiguous.
     * This is disabled by default to generate less code, but can be enabled with
     * `generate_from_impls` set to `true`.
     * @returns {boolean}
     */
    get generate_from_impls() {
        const ret = wasm.__wbg_get_config_generate_from_impls(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * To make working with the generated types a bit more ergonomic, the compiler
     * can generate `From` impls for the wrapper inner types in a `CHOICE`, as long
     * as the generated impls are not ambiguous.
     * This is disabled by default to generate less code, but can be enabled with
     * `generate_from_impls` set to `true`.
     * @param {boolean} arg0
     */
    set generate_from_impls(arg0) {
        wasm.__wbg_set_config_generate_from_impls(this.__wbg_ptr, arg0);
    }
    /**
     * Stringified paths to items that will be imported into all generated modules with a
     * [use declaration](https://doc.rust-lang.org/reference/items/use-declarations.html).
     * For example `vec![String::from("my::module::*"), String::from("path::to::my::Struct")]`.
     * @returns {string[]}
     */
    get custom_imports() {
        const ret = wasm.__wbg_get_config_custom_imports(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Stringified paths to items that will be imported into all generated modules with a
     * [use declaration](https://doc.rust-lang.org/reference/items/use-declarations.html).
     * For example `vec![String::from("my::module::*"), String::from("path::to::my::Struct")]`.
     * @param {string[]} arg0
     */
    set custom_imports(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_config_custom_imports(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Annotations to be added to all generated rust types of the bindings. Each vector element
     * will generate a new line of annotations. Note that the compiler will automatically add all pound-derives
     * needed by `rasn` __except__ `Eq` and `Hash`, which are needed only when working with `SET`s.
     *
     * Default: `vec![String::from("#[derive(AsnType, Debug, Clone, Decode, Encode, PartialEq, Eq, Hash)]")]`
     * @returns {string[]}
     */
    get type_annotations() {
        const ret = wasm.__wbg_get_config_type_annotations(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Annotations to be added to all generated rust types of the bindings. Each vector element
     * will generate a new line of annotations. Note that the compiler will automatically add all pound-derives
     * needed by `rasn` __except__ `Eq` and `Hash`, which are needed only when working with `SET`s.
     *
     * Default: `vec![String::from("#[derive(AsnType, Debug, Clone, Decode, Encode, PartialEq, Eq, Hash)]")]`
     * @param {string[]} arg0
     */
    set type_annotations(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_config_type_annotations(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} opaque_open_types
     * @param {boolean} default_wildcard_imports
     * @param {boolean | null} [generate_from_impls]
     * @param {string[] | null} [custom_imports]
     * @param {string[] | null} [type_annotations]
     */
    constructor(opaque_open_types, default_wildcard_imports, generate_from_impls, custom_imports, type_annotations) {
        var ptr0 = isLikeNone(custom_imports) ? 0 : passArrayJsValueToWasm0(custom_imports, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(type_annotations) ? 0 : passArrayJsValueToWasm0(type_annotations, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.config_new(opaque_open_types, default_wildcard_imports, isLikeNone(generate_from_impls) ? 0xFFFFFF : generate_from_impls ? 1 : 0, ptr0, len0, ptr1, len1);
        this.__wbg_ptr = ret >>> 0;
        ConfigFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const GeneratedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_generated_free(ptr >>> 0, 1));

export class Generated {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Generated.prototype);
        obj.__wbg_ptr = ptr;
        GeneratedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    toJSON() {
        return {
            rust: this.rust,
            warnings: this.warnings,
        };
    }

    toString() {
        return JSON.stringify(this);
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GeneratedFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_generated_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get rust() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_generated_rust(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set rust(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_generated_rust(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get warnings() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_generated_warnings(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set warnings(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_generated_warnings(this.__wbg_ptr, ptr0, len0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_0;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('rasn_compiler_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
