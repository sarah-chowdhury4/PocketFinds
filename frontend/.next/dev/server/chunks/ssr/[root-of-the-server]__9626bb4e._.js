module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/frontend/src/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/frontend/src/lib/language-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const translations = {
    // Navigation
    home: {
        en: "Home",
        bn: "হোম"
    },
    explore: {
        en: "Explore",
        bn: "অন্বেষণ"
    },
    map: {
        en: "Map",
        bn: "মানচিত্র"
    },
    favorites: {
        en: "Favorites",
        bn: "পছন্দের"
    },
    profile: {
        en: "Profile",
        bn: "প্রোফাইল"
    },
    // Common
    search: {
        en: "Search",
        bn: "অনুসন্ধান"
    },
    searchPlaceholder: {
        en: "Search stalls, food items...",
        bn: "স্টল, খাবার অনুসন্ধান করুন..."
    },
    viewAll: {
        en: "View All",
        bn: "সব দেখুন"
    },
    loading: {
        en: "Loading...",
        bn: "লোড হচ্ছে..."
    },
    // Home
    welcomeBack: {
        en: "Welcome back",
        bn: "স্বাগতম"
    },
    discoverStalls: {
        en: "Discover Amazing Food Stalls",
        bn: "দারুণ খাবারের স্টল আবিষ্কার করুন"
    },
    trendingStalls: {
        en: "Trending Stalls",
        bn: "ট্রেন্ডিং স্টল"
    },
    nearbyStalls: {
        en: "Nearby Stalls",
        bn: "কাছাকাছি স্টল"
    },
    categories: {
        en: "Categories",
        bn: "বিভাগ"
    },
    recommendedForYou: {
        en: "Recommended for You",
        bn: "আপনার জন্য সুপারিশ"
    },
    // Categories
    allCategories: {
        en: "All Categories",
        bn: "সব বিভাগ"
    },
    snacks: {
        en: "Snacks",
        bn: "স্ন্যাকস"
    },
    beverages: {
        en: "Beverages",
        bn: "পানীয়"
    },
    meals: {
        en: "Meals",
        bn: "খাবার"
    },
    desserts: {
        en: "Desserts",
        bn: "মিষ্টি"
    },
    streetFood: {
        en: "Street Food",
        bn: "স্ট্রিট ফুড"
    },
    // Stall
    menu: {
        en: "Menu",
        bn: "মেনু"
    },
    reviews: {
        en: "Reviews",
        bn: "রিভিউ"
    },
    about: {
        en: "About",
        bn: "সম্পর্কে"
    },
    location: {
        en: "Location",
        bn: "অবস্থান"
    },
    openNow: {
        en: "Open Now",
        bn: "এখন খোলা"
    },
    closed: {
        en: "Closed",
        bn: "বন্ধ"
    },
    discount: {
        en: "Discount",
        bn: "ছাড়"
    },
    offer: {
        en: "Offer",
        bn: "অফার"
    },
    // Reviews
    writeReview: {
        en: "Write a Review",
        bn: "রিভিউ লিখুন"
    },
    rating: {
        en: "Rating",
        bn: "রেটিং"
    },
    helpful: {
        en: "Helpful",
        bn: "সহায়ক"
    },
    report: {
        en: "Report",
        bn: "রিপোর্ট"
    },
    // User
    signIn: {
        en: "Sign In",
        bn: "সাইন ইন"
    },
    signUp: {
        en: "Sign Up",
        bn: "সাইন আপ"
    },
    signOut: {
        en: "Sign Out",
        bn: "সাইন আউট"
    },
    myFavorites: {
        en: "My Favorites",
        bn: "আমার পছন্দের"
    },
    myBookmarks: {
        en: "My Bookmarks",
        bn: "আমার বুকমার্ক"
    },
    trustPoints: {
        en: "Trust Points",
        bn: "ট্রাস্ট পয়েন্ট"
    },
    settings: {
        en: "Settings",
        bn: "সেটিংস"
    },
    notifications: {
        en: "Notifications",
        bn: "নোটিফিকেশন"
    },
    // Actions
    addToFavorites: {
        en: "Add to Favorites",
        bn: "পছন্দে যোগ করুন"
    },
    removeFromFavorites: {
        en: "Remove from Favorites",
        bn: "পছন্দ থেকে সরান"
    },
    bookmark: {
        en: "Bookmark",
        bn: "বুকমার্ক"
    },
    removeBookmark: {
        en: "Remove Bookmark",
        bn: "বুকমার্ক সরান"
    },
    share: {
        en: "Share",
        bn: "শেয়ার"
    },
    directions: {
        en: "Directions",
        bn: "দিকনির্দেশ"
    },
    // Admin
    dashboard: {
        en: "Dashboard",
        bn: "ড্যাশবোর্ড"
    },
    manageStalls: {
        en: "Manage Stalls",
        bn: "স্টল পরিচালনা"
    },
    manageUsers: {
        en: "Manage Users",
        bn: "ব্যবহারকারী পরিচালনা"
    },
    analytics: {
        en: "Analytics",
        bn: "বিশ্লেষণ"
    },
    // Stall Owner
    myStall: {
        en: "My Stall",
        bn: "আমার স্টল"
    },
    editMenu: {
        en: "Edit Menu",
        bn: "মেনু সম্পাদনা"
    },
    addItem: {
        en: "Add Item",
        bn: "আইটেম যোগ করুন"
    },
    updateItem: {
        en: "Update Item",
        bn: "আইটেম আপডেট"
    },
    deleteItem: {
        en: "Delete Item",
        bn: "আইটেম মুছুন"
    }
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("en");
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key)=>{
        return translations[key]?.[language] || key;
    }, [
        language
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/src/lib/language-context.tsx",
        lineNumber: 110,
        columnNumber: 10
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
}),
"[project]/frontend/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API configuration and helper functions
__turbopack_context__.s([
    "authAPI",
    ()=>authAPI,
    "default",
    ()=>__TURBOPACK__default__export__,
    "menuAPI",
    ()=>menuAPI,
    "stallsAPI",
    ()=>stallsAPI
]);
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:4000/api") || 'http://localhost:4000/api';
// Get auth token from localStorage
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
};
// Generic fetch wrapper
async function fetchAPI(endpoint, options = {}) {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
    }
    return data;
}
const authAPI = {
    login: async (email, password)=>{
        return fetchAPI('/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        });
    },
    signup: async (data)=>{
        return fetchAPI('/user/signup', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};
const menuAPI = {
    getMenuByStall: async (stallId)=>{
        return fetchAPI(`/menu/${stallId}`);
    },
    createItem: async (itemData)=>{
        return fetchAPI('/menu', {
            method: 'POST',
            body: JSON.stringify(itemData)
        });
    },
    updateItem: async (itemId, updates)=>{
        return fetchAPI(`/menu/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    },
    deleteItem: async (itemId)=>{
        return fetchAPI(`/menu/${itemId}`, {
            method: 'DELETE'
        });
    }
};
const stallsAPI = {
    getAll: async ()=>{
        // TODO: Implement when backend route is available
        return [];
    },
    getById: async (stallId)=>{
        // TODO: Implement when backend route is available
        return null;
    }
};
const __TURBOPACK__default__export__ = fetchAPI;
}),
"[project]/frontend/src/lib/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedUser = localStorage.getItem("pocketfinds_user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch  {
                localStorage.removeItem("pocketfinds_user");
                localStorage.removeItem("token");
            }
        }
        setIsLoading(false);
    }, []);
    const login = async (email, password)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].login(email, password);
            // Store token and user data
            localStorage.setItem("token", response.token);
            localStorage.setItem("pocketfinds_user", JSON.stringify(response.user));
            setUser(response.user);
            // Redirect based on role
            if (response.role === "admin") {
                router.push("/admin");
            } else if (response.role === "stall owner") {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Login failed"
            };
        }
    };
    const signup = async (data)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].signup(data);
            // Store token and user data
            localStorage.setItem("token", response.token);
            localStorage.setItem("pocketfinds_user", JSON.stringify({
                email: response.email,
                type: response.role,
                id: response.userId,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone
            }));
            setUser({
                email: response.email,
                type: response.role,
                id: response.userId,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone
            });
            if (response.role === "stall owner") {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Signup failed"
            };
        }
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("pocketfinds_user");
        localStorage.removeItem("token");
        router.push("/login");
    };
    const updateProfile = (data)=>{
        if (user) {
            const updatedUser = {
                ...user,
                ...data
            };
            setUser(updatedUser);
            localStorage.setItem("pocketfinds_user", JSON.stringify(updatedUser));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            signup,
            logout,
            updateProfile
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/src/lib/auth-context.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
}),
"[project]/frontend/src/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = 'system' } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        style: {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)'
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
"[project]/frontend/src/app/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/theme-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/language-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/auth-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/sonner.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        disableTransitionOnChange: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
                        richColors: true,
                        position: "top-right"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/providers.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/providers.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/providers.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/providers.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9626bb4e._.js.map