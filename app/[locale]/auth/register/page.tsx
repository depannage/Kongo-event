"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations , useLocale} from "next-intl";
import { toast } from "sonner";
import { Eye, EyeOff, UserRound } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { useRegister } from "@/shared/hooks/auth.hooks";
import Image from "next/image";

export default function RegisterPage() {
    const t = useTranslations("auth.register");
    const router = useRouter();
    const local=useLocale()
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const { mutate, isPending } = useRegister();

    const canSubmit =
        fullName.trim() && email.trim() && phone.trim() && password.trim() && !isPending;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fullName.trim()) {
            toast.warning("Champ obligatoire", {
                description: "Veuillez saisir votre nom complet.",
            });
            return;
        }

        if (!email.trim()) {
            toast.warning("Champ obligatoire", {
                description: "Veuillez saisir votre adresse email.",
            });
            return;
        }

        if (!phone.trim()) {
            toast.warning("Champ obligatoire", {
                description: "Veuillez saisir votre numéro de téléphone.",
            });
            return;
        }

        if (!password.trim()) {
            toast.warning("Champ obligatoire", {
                description: "Veuillez saisir votre mot de passe.",
            });
            return;
        }

        mutate(
            {
                fullName: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                password,
            },
            {
                onSuccess: () => {
                    toast.success("Compte créé avec succès", {
                        description: "Redirection vers votre espace...",
                    });

                    router.push(`/${local}overview`);
                },
                onError: (error: any) => {
                    const message =
                        error?.response?.data?.message ||
                        error?.response?.data?.error ||
                        error?.message ||
                        "Une erreur est survenue. Veuillez réessayer.";

                    toast.error("Inscription échouée", {
                        description: Array.isArray(message) ? message.join(", ") : message,
                    });
                },
            }
        );
    };

    return (
        <AuthShell>
            <div className="w-full max-w-[500px] rounded bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-blue-50">
                    <Image src="/images/logo.jpeg" alt="logo" width={100} height={100} />
                </div>

                <div className="text-center">
                    <h1 className="text-[22px] font-extrabold text-slate-900">
                        {t("title")}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">{t("description")}</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                    <Field
                        label={t("fullName")}
                        value={fullName}
                        onChange={setFullName}
                        placeholder={t("fullNamePlaceholder")}
                    />

                    <Field
                        label={t("email")}
                        value={email}
                        onChange={setEmail}
                        placeholder={t("emailPlaceholder")}
                        type="email"
                    />

                    <Field
                        label={t("phone")}
                        value={phone}
                        onChange={setPhone}
                        placeholder={t("phonePlaceholder")}
                        type="tel"
                    />

                    <div>
                        <label className="mb-2 block text-xs font-semibold text-slate-700">
                            {t("password")} <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t("passwordPlaceholder")}
                                className="h-12 w-full rounded border border-slate-200 bg-white px-3 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="flex h-12 w-full items-center justify-center rounded bg-blue-600 text-sm font-semibold text-white disabled:bg-blue-200"
                    >
                        {isPending ? (
                            <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        ) : (
                            t("submit")
                        )}
                    </button>
                </form>

                <p className="mt-7 text-center text-sm text-slate-500">
                    {t("hasAccount")}{" "}
                    <a href="../login" className="font-semibold text-blue-600">
                        {t("login")}
                    </a>
                </p>
            </div>
        </AuthShell>
    );
}

function Field({
                   label,
                   placeholder,
                   value,
                   onChange,
                   type = "text",
               }: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">
                {label} <span className="text-red-500">*</span>
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="h-12 w-full rounded border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
        </div>
    );
}
