/** @type {import("prettier").Config} */
export default {
    importOrder: [
        "^next($|/.*$)",
        "^react($|/.*$)",
        "<BUILTIN_MODULES>",
        "<THIRD_PARTY_MODULES>",
        "<TYPES>",
        "",
        "^@/(.*)$",
        "<TYPES>^@/(.*)$",
        "",
        "^[./]",
        "<TYPES>^[./]",
        "",
        "^(?!.*[.]css$)[./].*$",
        ".css$",
    ],
    plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
    printWidth: 120,
    semi: false,
    tabWidth: 4,
}
