"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Eye,
    EyeOff,
    HelpCircle,
    ScrollText,
    Settings,
    ShieldCheck,
    UserRound,
} from "lucide-react";

export default function LoginPage() {
    const t = useTranslations("auth.login");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="min-h-screen bg-slate-100">
            <section
                className="relative mx-auto flex min-h-screen flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#f8f9fc]"
                style={{
                    backgroundImage: "radial-gradient(#cfd5e2 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                }}
            >
                <div className="flex justify-center pt-8">
                    <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-blue-600 text-white">
              <Settings className="size-4" />
            </span>
                        <span className="text-base font-extrabold text-slate-900">
              Kongo Event
            </span>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center px-4 py-10">
                    <div className="w-full max-w-[430px] rounded-2xl bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-blue-50">
                            <div className="flex size-9 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-sm">
                                <UserRound className="size-4" />
                            </div>
                        </div>

                        <div className="text-center">
                            <h1 className="text-[22px] font-extrabold text-slate-900">
                                {t("title")}
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">{t("description")}</p>
                        </div>

                        <form className="mt-7 space-y-4">
                            <div>
                                <label className="mb-2 block text-xs font-semibold text-slate-700">
                                    {t("email")} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold text-slate-700">
                                    {t("password")} <span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder={t("passwordPlaceholder")}
                                        className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 text-slate-500">
                                    <input type="checkbox" />
                                    {t("remember")}
                                </label>

                                <a href="../forgot-password" className="font-semibold text-blue-600">
                                    {t("forgot")}
                                </a>
                            </div>

                            <button
                                type="button"
                                disabled
                                className="h-11 w-full rounded-md bg-blue-200 text-sm font-semibold text-white"
                            >
                                {t("submit")}
                            </button>
                        </form>

                        <p className="mt-7 text-center text-sm text-slate-500">
                            {t("noAccount")}{" "}
                            <a href="../register" className="font-semibold text-blue-600">
                                {t("register")}
                            </a>
                        </p>
                    </div>
                </div>

                <footer className="flex flex-col gap-3 px-6 pb-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
                    <p>© 2026 Kongo Event. All right reserved.</p>

                    <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" />
              Privacy
            </span>
                        <span className="inline-flex items-center gap-1.5">
              <ScrollText className="size-3.5" />
              Terms
            </span>
                        <span className="inline-flex items-center gap-1.5">
              <HelpCircle className="size-3.5" />
              Get help
            </span>
                    </div>
                </footer>
            </section>
        </main>
    );
}
