"use client";

import { useMemo, useState } from "react";
import {
    Bell,
    CheckCircle2,
    ChevronDown,
    CircleDollarSign,
    CreditCard,
    Eye,
    EyeOff,
    Globe2,
    LinkIcon,
    LockKeyhole,
    Save,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSidebar } from "@/contexts/SidebarContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

type SettingsTab =
    | "general"
    | "plan"
    | "account"
    | "billing"
    | "tax"
    | "link"
    | "language"
    | "password"
    | "notifications";

export default function SettingsPage() {
    const t = useTranslations("settings");
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");
    const { isCollapsed } = useSidebar();

    const tabs = useMemo(
        () => [
            { key: "general" as const, label: t("tabs.general") },
            { key: "plan" as const, label: t("tabs.plan") },
            { key: "account" as const, label: t("tabs.account") },
            { key: "billing" as const, label: t("tabs.billing") },
            { key: "tax" as const, label: t("tabs.tax") },
            { key: "link" as const, label: t("tabs.link") },
            { key: "language" as const, label: t("tabs.language") },
            { key: "password" as const, label: t("tabs.password") },
            { key: "notifications" as const, label: t("tabs.notifications") },
        ],
        [t]
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <DashboardSidebar />

            <div className={`transition-all duration-300 ${
                isCollapsed ? "lg:ml-[80px]" : "lg:ml-[280px]"
            }`}>
                <DashboardNavbar />

                <main className="p-4 sm:p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-950">
                                {t("title")}
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                {t("breadcrumbOther")} / <span className="text-slate-900 font-medium">{t("title")}</span>
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                                {t("cancel")}
                            </button>
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all hover:shadow-md">
                                <Save className="size-4" />
                                {t("save")}
                            </button>
                        </div>
                    </div>

                    {/* Settings Container */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
                            {/* Sidebar Tabs */}
                            <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r bg-slate-50/30">
                                <div className="p-4">
                                    <div className="flex gap-2 overflow-x-auto lg:block lg:space-y-1 pb-2 lg:pb-0">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`shrink-0 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-all lg:w-full ${
                                                    activeTab === tab.key
                                                        ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                                                        : "text-slate-600 hover:bg-white/50"
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </aside>

                            {/* Content */}
                            <section className="min-h-[600px] p-5 lg:p-8">
                                {activeTab === "general" && <GeneralSection t={t} />}
                                {activeTab === "plan" && <PlanSection t={t} />}
                                {activeTab === "account" && <AccountSection t={t} />}
                                {activeTab === "billing" && <BillingSection t={t} />}
                                {activeTab === "tax" && <TaxSection t={t} />}
                                {activeTab === "link" && <LinkAccountSection t={t} />}
                                {activeTab === "language" && <LanguageSection t={t} />}
                                {activeTab === "password" && <PasswordSection t={t} />}
                                {activeTab === "notifications" && <NotificationsSection t={t} />}
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// ==================== Section Header Component ====================
function SectionHeader({
                           icon,
                           title,
                           description,
                       }: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="mb-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {icon}
                </div>
                <div>
                    <h2 className="text-xl font-extrabold text-slate-950">{title}</h2>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
            </div>
        </div>
    );
}

// ==================== Form Components ====================
function Field({
                   label,
                   required,
                   children,
                   helpText,
               }: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
    helpText?: string;
}) {
    return (
        <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
            {helpText && <p className="mt-1 text-xs text-slate-400">{helpText}</p>}
        </div>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
        />
    );
}

function Select({
                    defaultValue,
                    children,
                    onChange,
                }: {
    defaultValue?: string;
    children: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
    return (
        <div className="relative">
            <select
                defaultValue={defaultValue}
                onChange={onChange}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
            >
                {children}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        </div>
    );
}

// ==================== General Section ====================
function GeneralSection({ t }: { t: any }) {
    return (
        <div>
            <SectionHeader
                icon={<UserRound className="size-5" />}
                title={t("general.title")}
                description={t("general.description")}
            />

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label={t("general.companyName")} required>
                        <Input defaultValue="Kongo Event" />
                    </Field>

                    <Field label={t("general.industry")} required>
                        <Select defaultValue="music">
                            <option value="music">Music & Entertainment</option>
                            <option value="business">Business & Conference</option>
                            <option value="sport">Sports</option>
                            <option value="education">Education</option>
                        </Select>
                    </Field>

                    <Field label={t("general.currency")} required>
                        <Select defaultValue="usd">
                            <option value="usd">US Dollar (USD)</option>
                            <option value="cdf">Congolese Franc (CDF)</option>
                            <option value="eur">Euro (EUR)</option>
                        </Select>
                    </Field>

                    <Field label={t("general.timezone")} required>
                        <Select defaultValue="cat">
                            <option value="pst">Pacific Standard Time (PST)</option>
                            <option value="est">Eastern Standard Time (EST)</option>
                            <option value="cat">Central Africa Time (CAT)</option>
                            <option value="utc">UTC</option>
                        </Select>
                    </Field>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-4">{t("general.address")}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label={t("general.addressName")} required>
                            <Input defaultValue="Main Office" />
                        </Field>

                        <Field label={t("general.country")} required>
                            <Select defaultValue="cd">
                                <option value="us">United States</option>
                                <option value="cd">DR Congo</option>
                                <option value="fr">France</option>
                                <option value="be">Belgium</option>
                            </Select>
                        </Field>

                        <Field label={t("general.city")} required>
                            <Input defaultValue="Kinshasa" />
                        </Field>

                        <Field label={t("general.postalCode")} required>
                            <Input defaultValue="KIN+243" />
                        </Field>

                        <Field label={t("general.addressLine")} required>
                            <Input defaultValue="123 Avenue de la République, Gombe" />
                        </Field>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==================== Plan Section ====================
function PlanSection({ t }: { t: any }) {
    const [selectedPlan, setSelectedPlan] = useState("pro");

    const plans = [
        {
            id: "basic",
            name: "Basic Plan",
            price: "$24",
            period: "month",
            badge: "Popular",
            features: [
                "Up to 2 staff members",
                "Basic analytics",
                "Email support",
                "100 tickets per event",
            ]
        },
        {
            id: "pro",
            name: "Pro Plan",
            price: "$64",
            period: "month",
            badge: "Current Plan",
            features: [
                "Up to 10 staff members",
                "Advanced analytics",
                "Priority support",
                "Unlimited tickets",
                "Fraud analysis",
                "Custom branding",
            ]
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: "$124",
            period: "month",
            badge: "Best Value",
            features: [
                "Unlimited staff members",
                "Custom analytics",
                "24/7 dedicated support",
                "Unlimited tickets",
                "Advanced fraud protection",
                "API access",
                "White-label solution",
            ]
        },
    ];

    return (
        <div>
            <SectionHeader
                icon={<CircleDollarSign className="size-5" />}
                title={t("plan.title")}
                description={t("plan.description")}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`rounded-2xl border p-6 transition-all cursor-pointer hover:shadow-lg ${
                            selectedPlan === plan.id
                                ? "border-blue-500 bg-blue-50/20 ring-2 ring-blue-500/20"
                                : "border-slate-200 hover:border-slate-300"
                        }`}
                        onClick={() => setSelectedPlan(plan.id)}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-extrabold text-slate-900">{plan.name}</h3>
                            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                {plan.badge}
                            </span>
                        </div>

                        <div className="mb-4">
                            <p className="text-3xl font-extrabold text-slate-900">
                                {plan.price}
                                <span className="ml-1 text-sm font-medium text-slate-500">/{plan.period}</span>
                            </p>
                        </div>

                        <div className="space-y-2 mb-6">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                    <CheckCircle2 className="size-4 text-blue-600 shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            selectedPlan === plan.id
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}>
                            {selectedPlan === plan.id ? "Current Plan" : "Upgrade"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ==================== Account Section ====================
function AccountSection({ t }: { t: any }) {
    return (
        <div>
            <SectionHeader
                icon={<UserRound className="size-5" />}
                title={t("account.title")}
                description={t("account.description")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={t("account.firstName")} required>
                    <Input defaultValue="Robert" />
                </Field>

                <Field label={t("account.lastName")} required>
                    <Input defaultValue="Johnson" />
                </Field>

                <Field label={t("account.email")} required>
                    <Input type="email" defaultValue="robert@kongoevent.com" />
                </Field>

                <Field label={t("account.phone")} required>
                    <Input type="tel" defaultValue="+243 123 456 789" />
                </Field>

                <Field label={t("account.role")}>
                    <Input defaultValue="Organization Administrator" disabled className="bg-slate-50" />
                </Field>

                <Field label={t("account.memberSince")}>
                    <Input defaultValue="January 15, 2024" disabled className="bg-slate-50" />
                </Field>
            </div>
        </div>
    );
}

// ==================== Billing Section ====================
function BillingSection({ t }: { t: any }) {
    return (
        <div>
            <SectionHeader
                icon={<CreditCard className="size-5" />}
                title={t("billing.title")}
                description={t("billing.description")}
            />

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label={t("billing.cardName")} required>
                        <Input defaultValue="Robert Johnson" />
                    </Field>

                    <Field label={t("billing.cardNumber")} required>
                        <Input defaultValue="4242 4242 4242 4242" />
                    </Field>

                    <Field label={t("billing.expiry")} required>
                        <Input defaultValue="12/2028" />
                    </Field>

                    <Field label={t("billing.cvc")} required>
                        <Input type="password" defaultValue="123" />
                    </Field>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                        💡 Your payment information is encrypted and secure. We use industry-standard SSL encryption.
                    </p>
                </div>

                <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                    + Add backup payment method
                </button>
            </div>
        </div>
    );
}

// ==================== Tax Section ====================
function TaxSection({ t }: { t: any }) {
    return (
        <div>
            <SectionHeader
                icon={<ShieldCheck className="size-5" />}
                title={t("tax.title")}
                description={t("tax.description")}
            />

            <div className="mb-8 overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-5 py-3 font-semibold text-slate-600">{t("tax.country")}</th>
                        <th className="px-5 py-3 font-semibold text-slate-600">{t("tax.collecting")}</th>
                        <th className="px-5 py-3 font-semibold text-slate-600">{t("tax.percentage")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b border-slate-100">
                        <td className="px-5 py-4 font-medium">United States</td>
                        <td className="px-5 py-4">Sales Tax</td>
                        <td className="px-5 py-4">10%</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                        <td className="px-5 py-4 font-medium">DR Congo</td>
                        <td className="px-5 py-4">VAT</td>
                        <td className="px-5 py-4">16%</td>
                    </tr>
                    <tr>
                        <td className="px-5 py-4 font-medium">European Union</td>
                        <td className="px-5 py-4">VAT</td>
                        <td className="px-5 py-4">20%</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={t("tax.fullName")} required>
                    <Input defaultValue="Robert Johnson" />
                </Field>

                <Field label={t("tax.countryTreaty")} required>
                    <Select defaultValue="cd">
                        <option value="us">United States</option>
                        <option value="cd">DR Congo</option>
                        <option value="fr">France</option>
                    </Select>
                </Field>

                <Field label={t("tax.residence")} required>
                    <Input defaultValue="Kinshasa, DR Congo" />
                </Field>

                <Field label={t("tax.taxId")}>
                    <Input placeholder="Enter your tax ID (optional)" />
                </Field>
            </div>
        </div>
    );
}

// ==================== Link Account Section ====================
function LinkAccountSection({ t }: { t: any }) {
    return (
        <div>
            <SectionHeader
                icon={<LinkIcon className="size-5" />}
                title={t("link.title")}
                description={t("link.description")}
            />

            <div className="space-y-4">
                <Field label="Instagram">
                    <Input defaultValue="https://www.instagram.com/kongoevent" />
                </Field>

                <Field label="Facebook">
                    <Input defaultValue="https://www.facebook.com/kongoevent" />
                </Field>

                <Field label="Twitter/X">
                    <Input defaultValue="https://www.twitter.com/kongoevent" />
                </Field>

                <Field label="YouTube">
                    <Input defaultValue="https://www.youtube.com/kongoevent" />
                </Field>

                <Field label="LinkedIn">
                    <Input placeholder="https://www.linkedin.com/company/kongoevent" />
                </Field>

                <Field label="TikTok">
                    <Input placeholder="https://www.tiktok.com/@kongoevent" />
                </Field>
            </div>
        </div>
    );
}

// ==================== Language Section ====================
function LanguageSection({ t }: { t: any }) {
    return (
        <div>
            <SectionHeader
                icon={<Globe2 className="size-5" />}
                title={t("language.title")}
                description={t("language.description")}
            />

            <div className="space-y-8">
                <div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-4">{t("language.timeTitle")}</h3>
                    <Field label={t("language.timeZone")}>
                        <Select defaultValue="cat">
                            <option value="pst">Pacific Standard Time (PST)</option>
                            <option value="est">Eastern Standard Time (EST)</option>
                            <option value="cat">Central Africa Time (CAT)</option>
                            <option value="utc">Coordinated Universal Time (UTC)</option>
                        </Select>
                    </Field>
                </div>

                <div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-4">{t("language.languageTitle")}</h3>
                    <Field label={t("language.language")}>
                        <Select defaultValue="en">
                            <option value="en">English (United States)</option>
                            <option value="fr">Français</option>
                            <option value="ln">Lingala</option>
                            <option value="sw">Swahili</option>
                        </Select>
                    </Field>
                </div>

                <div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-4">Date Format</h3>
                    <Field label="Preferred date format">
                        <Select defaultValue="mm/dd/yyyy">
                            <option value="mm/dd/yyyy">MM/DD/YYYY (US)</option>
                            <option value="dd/mm/yyyy">DD/MM/YYYY (EU)</option>
                            <option value="yyyy-mm-dd">YYYY-MM-DD (ISO)</option>
                        </Select>
                    </Field>
                </div>
            </div>
        </div>
    );
}

// ==================== Password Section ====================
function PasswordSection({ t }: { t: any }) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div>
            <SectionHeader
                icon={<LockKeyhole className="size-5" />}
                title={t("password.title")}
                description={t("password.description")}
            />

            <div className="space-y-6 max-w-lg">
                <Field label={t("password.currentPassword")} required>
                    <PasswordInput
                        value="12345678"
                        show={showCurrentPassword}
                        onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
                    />
                </Field>

                <Field label={t("password.newPassword")} required helpText={t("password.hint")}>
                    <PasswordInput
                        show={showNewPassword}
                        onToggle={() => setShowNewPassword(!showNewPassword)}
                    />
                </Field>

                <Field label={t("password.confirmPassword")} required>
                    <PasswordInput
                        show={showConfirmPassword}
                        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                </Field>

                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <p className="text-sm text-amber-800">
                        🔒 Password requirements: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character.
                    </p>
                </div>
            </div>
        </div>
    );
}

function PasswordInput({ show, onToggle, value }: { show: boolean; onToggle: () => void; value?: string }) {
    return (
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                defaultValue={value}
                placeholder="Enter password"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </div>
    );
}

// ==================== Notifications Section ====================
function NotificationsSection({ t }: { t: any }) {
    const [notifications, setNotifications] = useState({
        transactionConfirmation: true,
        transactionEdited: false,
        transactionInvoice: true,
        transactionCancelled: true,
        transactionRefund: true,
        paymentError: true,
        marketingEmails: false,
        weeklyDigest: true,
    });

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const notificationItems = [
        { key: "transactionConfirmation", title: t("notifications.items.transactionConfirmation.title"), description: t("notifications.items.transactionConfirmation.description") },
        { key: "transactionEdited", title: t("notifications.items.transactionEdited.title"), description: t("notifications.items.transactionEdited.description") },
        { key: "transactionInvoice", title: t("notifications.items.transactionInvoice.title"), description: t("notifications.items.transactionInvoice.description") },
        { key: "transactionCancelled", title: t("notifications.items.transactionCancelled.title"), description: t("notifications.items.transactionCancelled.description") },
        { key: "transactionRefund", title: t("notifications.items.transactionRefund.title"), description: t("notifications.items.transactionRefund.description") },
        { key: "paymentError", title: t("notifications.items.paymentError.title"), description: t("notifications.items.paymentError.description") },
    ];

    return (
        <div>
            <SectionHeader
                icon={<Bell className="size-5" />}
                title={t("notifications.title")}
                description={t("notifications.description")}
            />

            <div className="space-y-6">
                {notificationItems.map((item) => (
                    <div
                        key={item.key}
                        className="flex items-start justify-between gap-5 py-4 border-b border-slate-100 last:border-0"
                    >
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{item.title}</h3>
                            <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                        </div>

                        <Toggle
                            enabled={notifications[item.key as keyof typeof notifications]}
                            onChange={() => toggleNotification(item.key as keyof typeof notifications)}
                        />
                    </div>
                ))}

                <div className="pt-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Email Preferences</h3>

                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-5">
                            <div>
                                <h4 className="font-medium text-slate-800">Marketing emails</h4>
                                <p className="text-sm text-slate-500">Receive updates about new features and promotions</p>
                            </div>
                            <Toggle enabled={notifications.marketingEmails} onChange={() => toggleNotification("marketingEmails")} />
                        </div>

                        <div className="flex items-start justify-between gap-5">
                            <div>
                                <h4 className="font-medium text-slate-800">Weekly digest</h4>
                                <p className="text-sm text-slate-500">Get a summary of your event activity every week</p>
                            </div>
                            <Toggle enabled={notifications.weeklyDigest} onChange={() => toggleNotification("weeklyDigest")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`relative h-6 w-11 rounded-full transition-all ${
                enabled ? "bg-blue-600" : "bg-slate-200"
            }`}
        >
            <span
                className={`absolute top-[2px] size-5 rounded-full bg-white shadow-sm transition-all ${
                    enabled ? "right-[2px]" : "left-[2px]"
                }`}
            />
        </button>
    );
}
