import { __VLS_internalComponent, __VLS_componentsOption, __VLS_name } from './AddProduct.vue';

function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {};
__VLS_intrinsicElements.form; __VLS_intrinsicElements.form;
__VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
__VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label;
__VLS_intrinsicElements.input; __VLS_intrinsicElements.input; __VLS_intrinsicElements.input; __VLS_intrinsicElements.input; __VLS_intrinsicElements.input; __VLS_intrinsicElements.input;
__VLS_intrinsicElements.button; __VLS_intrinsicElements.button;
{
const __VLS_0 = __VLS_intrinsicElements["form"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{ onSubmit: {} as any, }, class: ("bg-white p-6 rounded-md shadow-md"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{ onSubmit: {} as any, }, class: ("bg-white p-6 rounded-md shadow-md"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
let __VLS_5 = { 'submit': __VLS_pickEvent(__VLS_4['submit'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_1, typeof __VLS_2>).onSubmit) };
__VLS_5 = { submit: (__VLS_ctx.submitProduct) };
{
const __VLS_6 = __VLS_intrinsicElements["div"];
const __VLS_7 = __VLS_elementAsFunctionalComponent(__VLS_6);
const __VLS_8 = __VLS_7({ ...{}, class: ("mb-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_6, typeof __VLS_8> & Record<string, unknown>) => void)({ ...{}, class: ("mb-4"), });
const __VLS_9 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8)!;
let __VLS_10!: __VLS_NormalizeEmits<typeof __VLS_9.emit>;
{
const __VLS_11 = __VLS_intrinsicElements["label"];
const __VLS_12 = __VLS_elementAsFunctionalComponent(__VLS_11);
const __VLS_13 = __VLS_12({ ...{}, for: ("product-image"), class: ("block mb-2 text-sm font-medium text-gray-600"), }, ...__VLS_functionalComponentArgsRest(__VLS_12));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_11, typeof __VLS_13> & Record<string, unknown>) => void)({ ...{}, for: ("product-image"), class: ("block mb-2 text-sm font-medium text-gray-600"), });
const __VLS_14 = __VLS_pickFunctionalComponentCtx(__VLS_11, __VLS_13)!;
let __VLS_15!: __VLS_NormalizeEmits<typeof __VLS_14.emit>;
(__VLS_14.slots!).default;
}
{
const __VLS_16 = __VLS_intrinsicElements["input"];
const __VLS_17 = __VLS_elementAsFunctionalComponent(__VLS_16);
const __VLS_18 = __VLS_17({ ...{ onChange: {} as any, }, type: ("file"), id: ("product-image"), name: ("product-image"), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), }, ...__VLS_functionalComponentArgsRest(__VLS_17));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_16, typeof __VLS_18> & Record<string, unknown>) => void)({ ...{ onChange: {} as any, }, type: ("file"), id: ("product-image"), name: ("product-image"), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), });
const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_16, __VLS_18)!;
let __VLS_20!: __VLS_NormalizeEmits<typeof __VLS_19.emit>;
let __VLS_21 = { 'change': __VLS_pickEvent(__VLS_20['change'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_17, typeof __VLS_18>).onChange) };
__VLS_21 = { change: (__VLS_ctx.onFileChange) };
}
(__VLS_9.slots!).default;
}
{
const __VLS_22 = __VLS_intrinsicElements["div"];
const __VLS_23 = __VLS_elementAsFunctionalComponent(__VLS_22);
const __VLS_24 = __VLS_23({ ...{}, class: ("mb-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_23));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_22, typeof __VLS_24> & Record<string, unknown>) => void)({ ...{}, class: ("mb-4"), });
const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_22, __VLS_24)!;
let __VLS_26!: __VLS_NormalizeEmits<typeof __VLS_25.emit>;
{
const __VLS_27 = __VLS_intrinsicElements["label"];
const __VLS_28 = __VLS_elementAsFunctionalComponent(__VLS_27);
const __VLS_29 = __VLS_28({ ...{}, for: ("product-name"), class: ("block mb-2 text-sm font-medium text-gray-600"), }, ...__VLS_functionalComponentArgsRest(__VLS_28));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_27, typeof __VLS_29> & Record<string, unknown>) => void)({ ...{}, for: ("product-name"), class: ("block mb-2 text-sm font-medium text-gray-600"), });
const __VLS_30 = __VLS_pickFunctionalComponentCtx(__VLS_27, __VLS_29)!;
let __VLS_31!: __VLS_NormalizeEmits<typeof __VLS_30.emit>;
(__VLS_30.slots!).default;
}
{
const __VLS_32 = __VLS_intrinsicElements["input"];
const __VLS_33 = __VLS_elementAsFunctionalComponent(__VLS_32);
const __VLS_34 = __VLS_33({ ...{}, type: ("text"), id: ("product-name"), name: ("product-name"), value: ((__VLS_ctx.product.name)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_32, typeof __VLS_34> & Record<string, unknown>) => void)({ ...{}, type: ("text"), id: ("product-name"), name: ("product-name"), value: ((__VLS_ctx.product.name)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), });
const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34)!;
let __VLS_36!: __VLS_NormalizeEmits<typeof __VLS_35.emit>;
}
(__VLS_25.slots!).default;
}
{
const __VLS_37 = __VLS_intrinsicElements["div"];
const __VLS_38 = __VLS_elementAsFunctionalComponent(__VLS_37);
const __VLS_39 = __VLS_38({ ...{}, class: ("mb-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_38));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_37, typeof __VLS_39> & Record<string, unknown>) => void)({ ...{}, class: ("mb-4"), });
const __VLS_40 = __VLS_pickFunctionalComponentCtx(__VLS_37, __VLS_39)!;
let __VLS_41!: __VLS_NormalizeEmits<typeof __VLS_40.emit>;
{
const __VLS_42 = __VLS_intrinsicElements["label"];
const __VLS_43 = __VLS_elementAsFunctionalComponent(__VLS_42);
const __VLS_44 = __VLS_43({ ...{}, for: ("product-group"), class: ("block mb-2 text-sm font-medium text-gray-600"), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_42, typeof __VLS_44> & Record<string, unknown>) => void)({ ...{}, for: ("product-group"), class: ("block mb-2 text-sm font-medium text-gray-600"), });
const __VLS_45 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44)!;
let __VLS_46!: __VLS_NormalizeEmits<typeof __VLS_45.emit>;
(__VLS_45.slots!).default;
}
{
const __VLS_47 = __VLS_intrinsicElements["input"];
const __VLS_48 = __VLS_elementAsFunctionalComponent(__VLS_47);
const __VLS_49 = __VLS_48({ ...{}, type: ("text"), id: ("product-group"), name: ("product-group"), value: ((__VLS_ctx.product.group)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), }, ...__VLS_functionalComponentArgsRest(__VLS_48));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_47, typeof __VLS_49> & Record<string, unknown>) => void)({ ...{}, type: ("text"), id: ("product-group"), name: ("product-group"), value: ((__VLS_ctx.product.group)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), });
const __VLS_50 = __VLS_pickFunctionalComponentCtx(__VLS_47, __VLS_49)!;
let __VLS_51!: __VLS_NormalizeEmits<typeof __VLS_50.emit>;
}
(__VLS_40.slots!).default;
}
{
const __VLS_52 = __VLS_intrinsicElements["div"];
const __VLS_53 = __VLS_elementAsFunctionalComponent(__VLS_52);
const __VLS_54 = __VLS_53({ ...{}, class: ("mb-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_52, typeof __VLS_54> & Record<string, unknown>) => void)({ ...{}, class: ("mb-4"), });
const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54)!;
let __VLS_56!: __VLS_NormalizeEmits<typeof __VLS_55.emit>;
{
const __VLS_57 = __VLS_intrinsicElements["label"];
const __VLS_58 = __VLS_elementAsFunctionalComponent(__VLS_57);
const __VLS_59 = __VLS_58({ ...{}, for: ("product-category"), class: ("block mb-2 text-sm font-medium text-gray-600"), }, ...__VLS_functionalComponentArgsRest(__VLS_58));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_57, typeof __VLS_59> & Record<string, unknown>) => void)({ ...{}, for: ("product-category"), class: ("block mb-2 text-sm font-medium text-gray-600"), });
const __VLS_60 = __VLS_pickFunctionalComponentCtx(__VLS_57, __VLS_59)!;
let __VLS_61!: __VLS_NormalizeEmits<typeof __VLS_60.emit>;
(__VLS_60.slots!).default;
}
{
const __VLS_62 = __VLS_intrinsicElements["input"];
const __VLS_63 = __VLS_elementAsFunctionalComponent(__VLS_62);
const __VLS_64 = __VLS_63({ ...{}, type: ("text"), id: ("product-category"), name: ("product-category"), value: ((__VLS_ctx.product.category)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), }, ...__VLS_functionalComponentArgsRest(__VLS_63));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_62, typeof __VLS_64> & Record<string, unknown>) => void)({ ...{}, type: ("text"), id: ("product-category"), name: ("product-category"), value: ((__VLS_ctx.product.category)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), });
const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64)!;
let __VLS_66!: __VLS_NormalizeEmits<typeof __VLS_65.emit>;
}
(__VLS_55.slots!).default;
}
{
const __VLS_67 = __VLS_intrinsicElements["div"];
const __VLS_68 = __VLS_elementAsFunctionalComponent(__VLS_67);
const __VLS_69 = __VLS_68({ ...{}, class: ("mb-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_68));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_67, typeof __VLS_69> & Record<string, unknown>) => void)({ ...{}, class: ("mb-4"), });
const __VLS_70 = __VLS_pickFunctionalComponentCtx(__VLS_67, __VLS_69)!;
let __VLS_71!: __VLS_NormalizeEmits<typeof __VLS_70.emit>;
{
const __VLS_72 = __VLS_intrinsicElements["label"];
const __VLS_73 = __VLS_elementAsFunctionalComponent(__VLS_72);
const __VLS_74 = __VLS_73({ ...{}, for: ("brand"), class: ("block mb-2 text-sm font-medium text-gray-600"), }, ...__VLS_functionalComponentArgsRest(__VLS_73));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_72, typeof __VLS_74> & Record<string, unknown>) => void)({ ...{}, for: ("brand"), class: ("block mb-2 text-sm font-medium text-gray-600"), });
const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74)!;
let __VLS_76!: __VLS_NormalizeEmits<typeof __VLS_75.emit>;
(__VLS_75.slots!).default;
}
{
const __VLS_77 = __VLS_intrinsicElements["input"];
const __VLS_78 = __VLS_elementAsFunctionalComponent(__VLS_77);
const __VLS_79 = __VLS_78({ ...{}, type: ("text"), id: ("brand"), name: ("brand"), value: ((__VLS_ctx.product.brand)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), }, ...__VLS_functionalComponentArgsRest(__VLS_78));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_77, typeof __VLS_79> & Record<string, unknown>) => void)({ ...{}, type: ("text"), id: ("brand"), name: ("brand"), value: ((__VLS_ctx.product.brand)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), });
const __VLS_80 = __VLS_pickFunctionalComponentCtx(__VLS_77, __VLS_79)!;
let __VLS_81!: __VLS_NormalizeEmits<typeof __VLS_80.emit>;
}
(__VLS_70.slots!).default;
}
{
const __VLS_82 = __VLS_intrinsicElements["div"];
const __VLS_83 = __VLS_elementAsFunctionalComponent(__VLS_82);
const __VLS_84 = __VLS_83({ ...{}, class: ("mb-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_83));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_82, typeof __VLS_84> & Record<string, unknown>) => void)({ ...{}, class: ("mb-4"), });
const __VLS_85 = __VLS_pickFunctionalComponentCtx(__VLS_82, __VLS_84)!;
let __VLS_86!: __VLS_NormalizeEmits<typeof __VLS_85.emit>;
{
const __VLS_87 = __VLS_intrinsicElements["label"];
const __VLS_88 = __VLS_elementAsFunctionalComponent(__VLS_87);
const __VLS_89 = __VLS_88({ ...{}, for: ("product-category-name"), class: ("block mb-2 text-sm font-medium text-gray-600"), }, ...__VLS_functionalComponentArgsRest(__VLS_88));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_87, typeof __VLS_89> & Record<string, unknown>) => void)({ ...{}, for: ("product-category-name"), class: ("block mb-2 text-sm font-medium text-gray-600"), });
const __VLS_90 = __VLS_pickFunctionalComponentCtx(__VLS_87, __VLS_89)!;
let __VLS_91!: __VLS_NormalizeEmits<typeof __VLS_90.emit>;
(__VLS_90.slots!).default;
}
{
const __VLS_92 = __VLS_intrinsicElements["input"];
const __VLS_93 = __VLS_elementAsFunctionalComponent(__VLS_92);
const __VLS_94 = __VLS_93({ ...{}, type: ("text"), id: ("product-category-name"), name: ("product-category-name"), value: ((__VLS_ctx.product.categoryName)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), }, ...__VLS_functionalComponentArgsRest(__VLS_93));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_92, typeof __VLS_94> & Record<string, unknown>) => void)({ ...{}, type: ("text"), id: ("product-category-name"), name: ("product-category-name"), value: ((__VLS_ctx.product.categoryName)), class: ("block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"), });
const __VLS_95 = __VLS_pickFunctionalComponentCtx(__VLS_92, __VLS_94)!;
let __VLS_96!: __VLS_NormalizeEmits<typeof __VLS_95.emit>;
}
(__VLS_85.slots!).default;
}
{
const __VLS_97 = __VLS_intrinsicElements["button"];
const __VLS_98 = __VLS_elementAsFunctionalComponent(__VLS_97);
const __VLS_99 = __VLS_98({ ...{}, type: ("submit"), class: ((__VLS_ctx.newLocal)), }, ...__VLS_functionalComponentArgsRest(__VLS_98));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_97, typeof __VLS_99> & Record<string, unknown>) => void)({ ...{}, type: ("submit"), class: ((__VLS_ctx.newLocal)), });
const __VLS_100 = __VLS_pickFunctionalComponentCtx(__VLS_97, __VLS_99)!;
let __VLS_101!: __VLS_NormalizeEmits<typeof __VLS_100.emit>;
__VLS_styleScopedClasses = (newLocal);
(__VLS_100.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["bg-white"];
__VLS_styleScopedClasses["p-6"];
__VLS_styleScopedClasses["rounded-md"];
__VLS_styleScopedClasses["shadow-md"];
__VLS_styleScopedClasses["mb-4"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["mb-2"];
__VLS_styleScopedClasses["text-sm"];
__VLS_styleScopedClasses["font-medium"];
__VLS_styleScopedClasses["text-gray-600"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["w-full"];
__VLS_styleScopedClasses["py-2"];
__VLS_styleScopedClasses["px-3"];
__VLS_styleScopedClasses["border"];
__VLS_styleScopedClasses["border-gray-300"];
__VLS_styleScopedClasses["rounded-md"];
__VLS_styleScopedClasses["shadow-sm"];
__VLS_styleScopedClasses["focus:outline-none"];
__VLS_styleScopedClasses["focus:ring-indigo-500"];
__VLS_styleScopedClasses["focus:border-indigo-500"];
__VLS_styleScopedClasses["sm:text-sm"];
__VLS_styleScopedClasses["mb-4"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["mb-2"];
__VLS_styleScopedClasses["text-sm"];
__VLS_styleScopedClasses["font-medium"];
__VLS_styleScopedClasses["text-gray-600"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["w-full"];
__VLS_styleScopedClasses["py-2"];
__VLS_styleScopedClasses["px-3"];
__VLS_styleScopedClasses["border"];
__VLS_styleScopedClasses["border-gray-300"];
__VLS_styleScopedClasses["rounded-md"];
__VLS_styleScopedClasses["shadow-sm"];
__VLS_styleScopedClasses["focus:outline-none"];
__VLS_styleScopedClasses["focus:ring-indigo-500"];
__VLS_styleScopedClasses["focus:border-indigo-500"];
__VLS_styleScopedClasses["sm:text-sm"];
__VLS_styleScopedClasses["mb-4"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["mb-2"];
__VLS_styleScopedClasses["text-sm"];
__VLS_styleScopedClasses["font-medium"];
__VLS_styleScopedClasses["text-gray-600"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["w-full"];
__VLS_styleScopedClasses["py-2"];
__VLS_styleScopedClasses["px-3"];
__VLS_styleScopedClasses["border"];
__VLS_styleScopedClasses["border-gray-300"];
__VLS_styleScopedClasses["rounded-md"];
__VLS_styleScopedClasses["shadow-sm"];
__VLS_styleScopedClasses["focus:outline-none"];
__VLS_styleScopedClasses["focus:ring-indigo-500"];
__VLS_styleScopedClasses["focus:border-indigo-500"];
__VLS_styleScopedClasses["sm:text-sm"];
__VLS_styleScopedClasses["mb-4"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["mb-2"];
__VLS_styleScopedClasses["text-sm"];
__VLS_styleScopedClasses["font-medium"];
__VLS_styleScopedClasses["text-gray-600"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["w-full"];
__VLS_styleScopedClasses["py-2"];
__VLS_styleScopedClasses["px-3"];
__VLS_styleScopedClasses["border"];
__VLS_styleScopedClasses["border-gray-300"];
__VLS_styleScopedClasses["rounded-md"];
__VLS_styleScopedClasses["shadow-sm"];
__VLS_styleScopedClasses["focus:outline-none"];
__VLS_styleScopedClasses["focus:ring-indigo-500"];
__VLS_styleScopedClasses["focus:border-indigo-500"];
__VLS_styleScopedClasses["sm:text-sm"];
__VLS_styleScopedClasses["mb-4"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["mb-2"];
__VLS_styleScopedClasses["text-sm"];
__VLS_styleScopedClasses["font-medium"];
__VLS_styleScopedClasses["text-gray-600"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["w-full"];
__VLS_styleScopedClasses["py-2"];
__VLS_styleScopedClasses["px-3"];
__VLS_styleScopedClasses["border"];
__VLS_styleScopedClasses["border-gray-300"];
__VLS_styleScopedClasses["rounded-md"];
__VLS_styleScopedClasses["shadow-sm"];
__VLS_styleScopedClasses["focus:outline-none"];
__VLS_styleScopedClasses["focus:ring-indigo-500"];
__VLS_styleScopedClasses["focus:border-indigo-500"];
__VLS_styleScopedClasses["sm:text-sm"];
__VLS_styleScopedClasses["mb-4"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["mb-2"];
__VLS_styleScopedClasses["text-sm"];
__VLS_styleScopedClasses["font-medium"];
__VLS_styleScopedClasses["text-gray-600"];
__VLS_styleScopedClasses["block"];
__VLS_styleScopedClasses["w-full"];
__VLS_styleScopedClasses["py-2"];
__VLS_styleScopedClasses["px-3"];
__VLS_styleScopedClasses["border"];
__VLS_styleScopedClasses["border-gray-300"];
__VLS_styleScopedClasses["rounded-md"];
__VLS_styleScopedClasses["shadow-sm"];
__VLS_styleScopedClasses["focus:outline-none"];
__VLS_styleScopedClasses["focus:ring-indigo-500"];
__VLS_styleScopedClasses["focus:border-indigo-500"];
__VLS_styleScopedClasses["sm:text-sm"];
}
var __VLS_slots!: {};
// @ts-ignore
[submitProduct, onFileChange, product, product, product, product, product, product, product, product, product, product, newLocal, newLocal,];
return __VLS_slots;
}
