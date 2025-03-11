let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

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
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

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
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
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

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
* @param {string} asn1
* @returns {Generated}
*/
export function compile_to_typescript(asn1) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(asn1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.compile_to_typescript(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return Generated.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
* @param {string} asn1
* @param {Config} config
* @returns {Generated}
*/
export function compile_to_rust(asn1, config) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(asn1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(config, Config);
        var ptr1 = config.__destroy_into_raw();
        wasm.compile_to_rust(retptr, ptr0, len0, ptr1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return Generated.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

const ConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_config_free(ptr >>> 0));
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
        wasm.__wbg_config_free(ptr);
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
    * @returns {(string)[]}
    */
    get custom_imports() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_config_custom_imports(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Stringified paths to items that will be imported into all generated modules with a
    * [use declaration](https://doc.rust-lang.org/reference/items/use-declarations.html).
    * For example `vec![String::from("my::module::*"), String::from("path::to::my::Struct")]`.
    * @param {(string)[]} arg0
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
    * @returns {(string)[]}
    */
    get type_annotations() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_config_type_annotations(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Annotations to be added to all generated rust types of the bindings. Each vector element
    * will generate a new line of annotations. Note that the compiler will automatically add all pound-derives
    * needed by `rasn` __except__ `Eq` and `Hash`, which are needed only when working with `SET`s.
    *
    * Default: `vec![String::from("#[derive(AsnType, Debug, Clone, Decode, Encode, PartialEq, Eq, Hash)]")]`
    * @param {(string)[]} arg0
    */
    set type_annotations(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_config_type_annotations(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @param {boolean} opaque_open_types
    * @param {boolean} default_wildcard_imports
    * @param {boolean | undefined} [generate_from_impls]
    * @param {(string)[] | undefined} [custom_imports]
    * @param {(string)[] | undefined} [type_annotations]
    */
    constructor(opaque_open_types, default_wildcard_imports, generate_from_impls, custom_imports, type_annotations) {
        var ptr0 = isLikeNone(custom_imports) ? 0 : passArrayJsValueToWasm0(custom_imports, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(type_annotations) ? 0 : passArrayJsValueToWasm0(type_annotations, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.config_new(opaque_open_types, default_wildcard_imports, isLikeNone(generate_from_impls) ? 0xFFFFFF : generate_from_impls ? 1 : 0, ptr0, len0, ptr1, len1);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
}

const GeneratedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_generated_free(ptr >>> 0));
/**
*/
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
        wasm.__wbg_generated_free(ptr);
    }
    /**
    * @returns {string}
    */
    get rust() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_generated_rust(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
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
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_generated_warnings(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
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
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

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
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('rasn_compiler_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
