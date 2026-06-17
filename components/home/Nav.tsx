"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useLocalizedPath } from "@/shared/hooks/useLocalizedPath";
import { BrandLogo } from "@/components/website/BrandLogo";

export default function Navbar() {
    const t = useTranslations("navigation");
    const locale = useLocale();
    const pathname = usePathname();
    const { getLocalizedHref } = useLocalizedPath();

    const nextLocale = locale === "en" ? "fr" : "en";

    return (
        <header className="absolute left-0 top-0 z-50 w-full bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
                <Link href={getLocalizedHref("/")}>
                    <BrandLogo size="sm" />
                </Link>

                <nav className="hidden items-center gap-8 text-sm font-semibold text-gray-800 md:flex">
                    <Link href={getLocalizedHref("/discover")}>{t("discover")}</Link>
                    <Link href={getLocalizedHref("/help")}>{t("help")}</Link>
                    <Link href={getLocalizedHref("/organizers/vanguard-productions")}>{t("organizer")}</Link>
                </nav>

                <div className="flex items-center gap-3">
                    {/*<Link*/}
                    {/*    href={pathname}*/}
                    {/*    locale={nextLocale}*/}
                    {/*    className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700"*/}
                    {/*>*/}
                    {/*    {nextLocale.toUpperCase()}*/}
                    {/*</Link>*/}

                    <Link
                        href={getLocalizedHref("/auth?mode=login")}
                        className="hidden rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors md:block"
                    >
                        {t("login")}
                    </Link>

                    <Link
                        href={getLocalizedHref("/auth?mode=register")}
                        className="rounded-xl bg-[#0067A8] px-5 py-3 text-sm font-bold text-white hover:bg-[#005690] transition-colors"
                    >
                        {t("signup")}
                    </Link>
                </div>
            </div>
        </header>
    );
}
