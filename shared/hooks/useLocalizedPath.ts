import { usePathname } from "next/navigation";

export function useLocalizedPath() {
    const pathname = usePathname();

    const getCurrentLocale = () => {
        const segments = pathname.split("/");
        const locale = segments[1];
        const validLocales = ["fr", "en", "ln"];
        return validLocales.includes(locale) ? locale : "fr";
    };

    const getLocalizedHref = (href: string) => {
        const locale = getCurrentLocale();
        const cleanHref = href.startsWith("/") ? href.slice(1) : href;
        return `/${locale}/${cleanHref}`;
    };

    const isActive = (href: string) => {
        const currentPath = pathname.split("/").slice(2).join("/");
        return currentPath === href || (href === "" && currentPath === "");
    };

    return { getCurrentLocale, getLocalizedHref, isActive };
}
