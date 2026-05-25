"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    CircleDollarSign,
    CreditCard,
    LayoutDashboard,
    MessageCircle,
    Music,
    Search,
    Settings,
    SlidersHorizontal,
    Star,
    Ticket,
    Users,
    Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSidebar } from "@/contexts/SidebarContext";
import Image from "next/image";

export default function DashboardSidebar() {
    const t = useTranslations("dashboard");
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const [searchTerm, setSearchTerm] = useState("");

    const menuItems = [
        {
            section: t("home"),
            items: [
                { icon: LayoutDashboard, label: t("menu.dashboard"), href: "/overview" },
                { icon: Calendar, label: t("menu.calendars"), href: "/calendars" },
                { icon: CircleDollarSign, label: t("menu.promotions"), href: "/promotions" },
                { icon: Wallet, label: t("menu.payouts"), href: "/payouts" },
            ]
        },
        {
            section: t("management"),
            items: [
                { icon: Users, label: t("menu.users"), href: "/users" },
                { icon: Music, label: t("menu.events"), href: "/events" },
                { icon: Ticket, label: t("menu.tickets"), href: "/tickets" },
                { icon: CreditCard, label: t("menu.earnings"), href: "/earnings" },
                { icon: MessageCircle, label: t("menu.reviews"), href: "/reviews" },
            ]
        },
        {
            section: t("other"),
            items: [
                { icon: SlidersHorizontal, label: t("menu.reports"), href: "/reports" },
                { icon: Settings, label: t("menu.settings"), href: "/settings" },
            ]
        },
    ];

    const filteredMenuItems = menuItems.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(section => section.items.length > 0);

    return (
        <aside className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-50 ${
            isCollapsed ? "w-[80px]" : "w-[280px]"
        }`}>
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center justify-between h-20 px-5 border-b border-slate-100">
                    {!isCollapsed && (
                        <div className="flex items-center gap-2 mt-4">
                            <Image src={"/images/logo.jpeg"} alt={"logo"} width={100} height={50} />
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="flex items-center gap-2 mt-4">
                            <Image src={"/images/logo.jpeg"} alt={"logo"} width={100} height={50} />
                        </div>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
                    </button>
                </div>

                {/* Search */}
                <div className="p-5">
                    {!isCollapsed ? (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                            <Search className="size-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder={t("search")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                            />
                            <span className="text-xs text-slate-400">⌘K</span>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <Search className="size-5 text-slate-400" />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-3 pb-5">
                    {filteredMenuItems.map((section, idx) => (
                        <div key={idx} className="mb-6">
                            {!isCollapsed && (
                                <p className="px-3 text-xs font-semibold text-slate-400 mb-2">{section.section}</p>
                            )}
                            {isCollapsed && (
                                <div className="flex justify-center mb-3">
                                    <div className="w-6 h-px bg-slate-200"></div>
                                </div>
                            )}
                            <div className="space-y-1">
                                {section.items.map((item, itemIdx) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={itemIdx}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                isActive
                                                    ? "bg-slate-100 text-slate-900"
                                                    : "text-slate-600 hover:bg-slate-50"
                                            } ${isCollapsed ? "justify-center" : ""}`}
                                            title={isCollapsed ? item.label : undefined}
                                        >
                                            <Icon className={`size-5 transition-colors ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                                            {!isCollapsed && <span>{item.label}</span>}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
