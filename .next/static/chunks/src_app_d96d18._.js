(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_d96d18._.js", {

"[project]/src/app/components/ProductCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
const ProductCard = ({ product, quantity, onBuy, onSell, onSetQuantity })=>{
    const handleQuantityChange = (e)=>{
        const value = Math.max(0, Number(e.target.value));
        onSetQuantity(product, value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-gray-300 rounded-xl p-4 my-4 w-80 shadow-sm bg-white transition duration-300 hover:shadow-md flex flex-col",
        children: [
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-48 rounded-xl mb-3 overflow-hidden",
                children: [
                    " ",
                    product.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: product.image,
                        alt: product.name,
                        layout: "fill",
                        objectFit: "cover",
                        placeholder: "blur",
                        blurDataURL: "/default-placeholder.png",
                        className: "rounded-xl" // Rounded corners for image
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProductCard.tsx",
                        lineNumber: 26,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center text-gray-400",
                        children: "No Image Available"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProductCard.tsx",
                        lineNumber: 35,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/ProductCard.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow",
                children: [
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-1",
                        children: product.name
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProductCard.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600 line-clamp-3 mb-2",
                        children: product.description
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProductCard.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-base font-medium",
                        children: [
                            "NPR ",
                            product.price.toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/ProductCard.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/ProductCard.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSell(product),
                        disabled: quantity === 0,
                        className: `text-sm font-medium rounded-md px-6 py-1 transition duration-300 flex items-center justify-center ${quantity === 0 ? "bg-gray-200 text-gray-500 cursor-default" : "bg-red-500 hover:bg-red-600 text-white"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "-"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ProductCard.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1",
                                children: "Sell"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ProductCard.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            " "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/ProductCard.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        value: quantity,
                        onChange: handleQuantityChange,
                        className: "w-16 text-center text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200",
                        min: 0
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProductCard.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onBuy(product),
                        className: "text-sm font-medium rounded-md px-6 py-1 bg-green-500 hover:bg-green-600 text-white transition duration-300 flex items-center justify-center" // Added flex and justify
                        ,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ProductCard.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1",
                                children: "Buy"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ProductCard.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            " "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/ProductCard.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/ProductCard.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/ProductCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
};
_c = ProductCard;
const __TURBOPACK__default__export__ = ProductCard;
var _c;
__turbopack_refresh__.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/data/product.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "initialProducts": (()=>initialProducts)
});
const initialProducts = [
    {
        id: 8,
        name: "A cup of Nepali tea",
        price: 20,
        description: "Enjoy a warm cup of Nepali tea.",
        category: "Food & Beverages",
        image: "/images/tea.jpg"
    },
    {
        id: 6,
        name: "Wai Wai noodles pack",
        price: 25,
        description: "Instant noodles.",
        category: "Food & Beverages",
        image: "/images/waiwai.png"
    },
    {
        id: 7,
        name: "Sel Roti piece",
        price: 50,
        description: "Traditional Nepali sweet bread.",
        category: "Food & Beverages",
        image: "/images/selroti.jpg"
    },
    {
        id: 2,
        name: "Bhatti ko Chowmein",
        price: 100,
        description: "Stir-fried noodles.",
        category: "Food & Beverages",
        image: "/images/chowmein.webp"
    },
    {
        id: 1,
        name: "Everest Boso Rahit Momo",
        price: 120,
        description: "Delicious Nepali dumplings.",
        category: "Food & Beverages",
        image: "/images/momo.png"
    },
    {
        id: 10,
        name: "One kg of Basmati rice",
        price: 150,
        description: "Premium quality rice.",
        category: "Food & Beverages",
        image: "/images/rice.jpg"
    },
    {
        id: 9,
        name: "Gundruk and Dhido meal",
        price: 300,
        description: "Authentic Nepali cuisine.",
        category: "Food & Beverages",
        image: "/images/gundruk.png"
    },
    {
        id: 43,
        name: "Sekuwa (Grilled Meat)",
        price: 300,
        description: "Spicy grilled meat.",
        category: "Food & Beverages",
        image: "/images/sekuwa.jpg"
    },
    {
        id: 11,
        name: "A bottle of Tuborg beer",
        price: 500,
        description: "Local Nepali alcohol.",
        category: "Food & Beverages",
        image: "/images/tuborg-beer.png"
    },
    {
        id: 12,
        name: "One kg of Yomari",
        price: 500,
        description: "Sweet Newari delicacy.",
        category: "Food & Beverages",
        image: "/images/yomari.webp"
    },
    {
        id: 14,
        name: "Dhaka topi",
        price: 500,
        description: "Nepali national cap.",
        category: "Daily Essentials",
        image: "/images/topi.png"
    },
    {
        id: 46,
        name: "Tongba (Millet Alcohol)",
        price: 500,
        description: "Local alcoholic beverage.",
        category: "Food & Beverages",
        image: "/images/tongba.webp"
    },
    {
        id: 45,
        name: "Samay Baji (Traditional Newari Set)",
        price: 600,
        description: "Traditional Newari feast.",
        category: "Food & Beverages",
        image: "/images/samaybaji.webp"
    },
    {
        id: 17,
        name: "Handmade bamboo basket (Doko)",
        price: 700,
        description: "Useful for carrying goods.",
        category: "Daily Essentials",
        image: "/images/doko.jpg"
    },
    {
        id: 57,
        name: "Cable Car Ride to Chandragiri Hills",
        price: 700,
        description: "Scenic cable car ride.",
        category: "Travel & Experiences",
        image: "/images/cablecar.jpg"
    },
    {
        id: 13,
        name: "Hattichap Chappal",
        price: 800,
        description: "Traditional footwear.",
        category: "Daily Essentials",
        image: "/images/nepal-sandel.webp"
    },
    {
        id: 42,
        name: "One Kg of Chhurpi (Dried Cheese)",
        price: 1000,
        description: "Dried cheese snack.",
        category: "Food & Beverages",
        image: "/images/chhurpi.jpg"
    },
    {
        id: 51,
        name: "Khukuri (Traditional Knife)",
        price: 2000,
        description: "Nepali curved knife.",
        category: "Daily Essentials",
        image: "/images/khukuri.jpg"
    },
    {
        id: 15,
        name: "Pashmina shawl",
        price: 3000,
        description: "Luxurious and warm.",
        category: "Daily Essentials",
        image: "/images/pasmina-shawl.jpg"
    },
    {
        id: 59,
        name: "Rafting in Trishuli River",
        price: 5000,
        description: "Thrilling river adventure.",
        category: "Travel & Experiences",
        image: "/images/rafting.webp"
    },
    {
        id: 5,
        name: "Paragliding in Pokhara",
        price: 7000,
        description: "A thrilling experience in Pokhara.",
        category: "Travel & Experiences",
        image: "/images/paragliding.jpg"
    },
    {
        id: 23,
        name: "Bungy Jump in Bhote Koshi",
        price: 8000,
        description: "Adrenaline-pumping experience.",
        category: "Travel & Experiences",
        image: "/images/bunjee-jump.jpg"
    },
    {
        id: 25,
        name: "Jungle safari in Chitwan",
        price: 12000,
        description: "Explore Nepal's wildlife.",
        category: "Travel & Experiences",
        image: "/images/jungle-safari.jpg"
    },
    {
        id: 58,
        name: "Mountain Flight to See Everest",
        price: 12000,
        description: "Breathtaking views of the Himalayas.",
        category: "Travel & Experiences",
        image: "/images/mountainflight.jpg"
    },
    {
        id: 20,
        name: "Oodni Boutique Saree",
        price: 50000,
        description: "Elegant Indian attire.",
        category: "Luxury & Lifestyle",
        image: "/images/saree.jpg"
    },
    {
        id: 30,
        name: "Trek to Annapurna Base Camp",
        price: 50000,
        description: "Scenic mountain trek.",
        category: "Travel & Experiences",
        image: "/images/annapurna-trek.jpg"
    },
    {
        id: 68,
        name: "Traditional Thangka Painting",
        price: 50000,
        description: "Tibetan Buddhist painting.",
        category: "Luxury & Lifestyle",
        image: "/images/thangka_painting.webp"
    },
    {
        id: 35,
        name: "Hydro project share",
        price: 100000,
        description: "Invest in renewable energy.",
        category: "Business & Investments",
        image: "/images/hydro.jpg"
    },
    {
        id: 28,
        name: "Dio Scooter",
        price: 175000,
        description: "Popular motorbike.",
        category: "Real Estate & Vehicles",
        image: "/images/dio-scooter.png"
    },
    {
        id: 19,
        name: "Iphone 15 Pro",
        price: 200000,
        description: "Latest smartphone.",
        category: "Electronics & Gadgets",
        image: "/images/iphone.jpg"
    },
    {
        id: 41,
        name: "Bajaj Pulsar bike",
        price: 300000,
        description: "Popular motorbike.",
        category: "Real Estate & Vehicles",
        image: "/images/bajaj-pulsar.png"
    },
    {
        id: 29,
        name: "KTM Duke 390",
        price: 800000,
        description: "Farming equipment.",
        category: "Real Estate & Vehicles",
        image: "/images/ktm-duke.jpg"
    },
    {
        id: 67,
        name: "5 Tola Gold",
        price: 837500,
        description: "Elegant gold jewelry.",
        category: "Luxury & Lifestyle",
        image: "/images/gold.jpg"
    },
    {
        id: 75,
        name: "Small Poultry Farm",
        price: 2000000,
        description: "Raise chickens for meat and eggs.",
        category: "Business & Investments",
        image: "/images/Poultry-farm.jpg"
    },
    {
        id: 3,
        name: "Climb Mount Everest",
        price: 2074834,
        description: "An adventure of a lifetime.",
        category: "Travel & Experiences",
        image: "/images/everest.jpg"
    },
    {
        id: 65,
        name: "Luxury SUV (Prado)",
        price: 22200000,
        description: "High-end SUV.",
        category: "Real Estate & Vehicles",
        image: "/images/prado.jpg"
    },
    {
        id: 82,
        name: "House in Kathmandu",
        price: 30000000,
        description: "A modern apartment in the capital city.",
        category: "Real Estate & Vehicles",
        image: "/images/apartment.jpg"
    },
    {
        id: 36,
        name: "A cricket team in Nepal T20 League",
        price: 50000000,
        description: "Own a sports team.",
        category: "Business & Investments",
        image: "/images/nepalt20.jpg"
    },
    {
        id: 37,
        name: "Hotel in Thamel",
        price: 100000000,
        description: "Thriving tourism business.",
        category: "Business & Investments",
        image: "/images/hotel-thamel.jpg"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const e = new Error(`Could not parse module '[project]/src/app/page.tsx'

Unexpected token `div`. Expected jsx identifier`);
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_d96d18._.js.map