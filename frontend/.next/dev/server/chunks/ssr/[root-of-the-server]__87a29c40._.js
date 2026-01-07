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
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Mock users database
const MOCK_USERS = {
    "admin@pocketfinds.com": {
        id: "admin-1",
        email: "admin@pocketfinds.com",
        password: "admin123",
        firstName: "Super",
        lastName: "Admin",
        role: "admin",
        trustPoints: 9999,
        badges: [
            "Admin",
            "Verified",
            "Founder"
        ],
        isVerified: true,
        isSuspended: false,
        createdAt: "2024-01-01"
    },
    "owner@pocketfinds.com": {
        id: "owner-1",
        email: "owner@pocketfinds.com",
        password: "owner123",
        firstName: "Fatima",
        lastName: "Khan",
        role: "stall_owner",
        trustPoints: 850,
        badges: [
            "Top Seller",
            "Verified Stall"
        ],
        isVerified: true,
        isSuspended: false,
        createdAt: "2024-01-15",
        stallId: "stall-1"
    },
    "student@pocketfinds.com": {
        id: "student-1",
        email: "student@pocketfinds.com",
        password: "student123",
        firstName: "Rahim",
        lastName: "Ahmed",
        role: "student",
        trustPoints: 320,
        badges: [
            "Foodie",
            "Explorer",
            "Top Reviewer"
        ],
        isVerified: true,
        isSuspended: false,
        createdAt: "2024-02-01"
    }
};
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedUser = localStorage.getItem("pocketfinds_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch  {
                localStorage.removeItem("pocketfinds_user");
            }
        }
        setIsLoading(false);
    }, []);
    const login = async (email, password)=>{
        await new Promise((resolve)=>setTimeout(resolve, 1000)); // Simulate API call
        const mockUser = MOCK_USERS[email.toLowerCase()];
        if (!mockUser || mockUser.password !== password) {
            return {
                success: false,
                error: "Invalid email or password"
            };
        }
        if (mockUser.isSuspended) {
            return {
                success: false,
                error: "Your account has been suspended. Please contact support."
            };
        }
        const { password: _, ...userWithoutPassword } = mockUser;
        setUser(userWithoutPassword);
        localStorage.setItem("pocketfinds_user", JSON.stringify(userWithoutPassword));
        // Redirect based on role
        if (mockUser.role === "admin") {
            router.push("/admin");
        } else if (mockUser.role === "stall_owner") {
            router.push("/dashboard");
        } else {
            router.push("/");
        }
        return {
            success: true
        };
    };
    const signup = async (data)=>{
        await new Promise((resolve)=>setTimeout(resolve, 1500)); // Simulate API call
        if (MOCK_USERS[data.email.toLowerCase()]) {
            return {
                success: false,
                error: "An account with this email already exists"
            };
        }
        const newUser = {
            id: `user-${Date.now()}`,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            phone: data.phone,
            trustPoints: 0,
            badges: [
                "New Member"
            ],
            isVerified: false,
            isSuspended: false,
            createdAt: new Date().toISOString(),
            stallId: data.role === "stall_owner" ? `stall-${Date.now()}` : undefined
        };
        setUser(newUser);
        localStorage.setItem("pocketfinds_user", JSON.stringify(newUser));
        if (data.role === "stall_owner") {
            router.push("/dashboard/setup");
        } else {
            router.push("/");
        }
        return {
            success: true
        };
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("pocketfinds_user");
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
        lineNumber: 184,
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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__87a29c40._.js.map