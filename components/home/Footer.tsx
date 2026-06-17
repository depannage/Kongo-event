
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
                <div>
                    <h2 className="text-xl font-extrabold text-[#0067A8]">
                        {t("brand")}
                    </h2>
                    <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600">
                        {t("description")}
                    </p>

                    <div className="mt-5 flex gap-4 text-gray-500">
                        {/*<Twitter className="h-5 w-5" />*/}
                        {/*<Facebook className="h-5 w-5" />*/}
                        {/*<Instagram className="h-5 w-5" />*/}
                    </div>
                </div>

                <FooterColumn
                    title={t("company.title")}
                    links={[
                        [t("company.about"), "/about"],
                        [t("company.careers"), "/careers"],
                        [t("company.press"), "/press"],
                        [t("company.partners"), "/partners"],
                    ]}
                />

                <FooterColumn
                    title={t("explore.title")}
                    links={[
                        [t("explore.music"), "/events/music"],
                        [t("explore.art"), "/events/art"],
                        [t("explore.tech"), "/events/tech"],
                        [t("explore.nightlife"), "/events/nightlife"],
                    ]}
                />

                <FooterColumn
                    title={t("resources.title")}
                    links={[
                        [t("resources.help"), "/help"],
                        [t("resources.terms"), "/terms"],
                        [t("resources.privacy"), "/privacy"],
                        [t("resources.cookies"), "/cookies"],
                    ]}
                />
            </div>

            <div className="border-t py-8 text-center text-xs text-gray-500">
                {t("copyright")}
            </div>
        </footer>
    );
}

function FooterColumn({
                          title,
                          links,
                      }: {
    title: string;
    links: [string, string][];
}) {
    return (
        <div>
            <h3 className="font-bold text-[#0067A8]">{title}</h3>

            <ul className="mt-5 space-y-4">
                {links.map(([label, href]) => (
                    <li key={href}>
                        <Link href={href} className="text-sm text-gray-600 hover:text-[#0067A8]">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
