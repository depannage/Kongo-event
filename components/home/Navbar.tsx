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
        <header className="absolute left-0 top-0 z-50 w-full">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
                <Link href={getLocalizedHref("/")}>
                    <BrandLogo tone="light" size="sm" />
                </Link>

                <nav className="hidden items-center gap-6 text-sm font-semibold text-white md:flex">
                    <Link href={getLocalizedHref("/")}>{t("home")}</Link>
                    <Link href={getLocalizedHref("/discover")}>{t("events")}</Link>
                    <Link href={getLocalizedHref("/marketplace")}>{t("marketplace")}</Link>
                    <Link href={getLocalizedHref("/buses")}>{t("buses")}</Link>
                    <Link href={getLocalizedHref("/flights")}>{t("flights")}</Link>
                    <Link href={getLocalizedHref("/vouchers")}>{t("vouchers")}</Link>
                    <Link href={getLocalizedHref("/stay")}>{t("stay")}</Link>
                </nav>

                <div className="flex items-center gap-3">
                    {/*<Link*/}
                    {/*    href={pathname}*/}
                    {/*    locale={nextLocale}*/}
                    {/*    className="rounded-xl border border-white/30 px-4 py-2 text-sm font-bold text-white"*/}
                    {/*>*/}
                    {/*    {nextLocale.toUpperCase()}*/}
                    {/*</Link>*/}

                    <Link
                        href={getLocalizedHref("/auth?mode=login")}
                        className="hidden rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white md:block"
                    >
                        {t("login")}
                    </Link>

                    <Link
                        href={getLocalizedHref("/auth?mode=register")}
                        className="rounded-xl bg-[#0067A8] px-5 py-3 text-sm font-bold text-white"
                    >
                        {t("signup")}
                    </Link>
                </div>
            </div>
        </header>
    );
}
