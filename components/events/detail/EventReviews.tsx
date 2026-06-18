"use client";

import { Star } from "lucide-react";
import { useGetPublicEventReviews } from "@/shared/hooks/public-event.hooks";

export default function EventReviews({ slug }: { slug: string }) {
    const { data, isLoading } = useGetPublicEventReviews(slug);
    const reviews = data?.data ?? [];

    if (isLoading) {
        return (
            <section className="py-8">
                <h2 className="mb-4 font-bold text-[#131827]">Reviews</h2>
                <p className="text-sm text-slate-500">Loading reviews...</p>
            </section>
        );
    }

    if (!reviews.length) {
        return (
            <section className="py-8">
                <h2 className="mb-4 font-bold text-[#131827]">Reviews</h2>
                <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-500">
                    No public reviews yet.
                </div>
            </section>
        );
    }

    const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return (
        <section className="py-8">
            <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="font-bold text-[#131827]">Reviews</h2>
                <div className="flex items-center gap-2 text-sm font-bold text-[#0067A8]">
                    <Star className="size-4 fill-[#0067A8]" />
                    {average.toFixed(1)} / 5
                </div>
            </div>

            <div className="space-y-4">
                {reviews.map((review) => (
                    <article key={review.id} className="rounded-lg border border-slate-200 bg-white p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="font-bold text-slate-900">{review.attendeeName}</p>
                                <p className="text-xs text-slate-500">
                                    {new Date(review.createdAt ?? review.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 text-[#0067A8]">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`size-4 ${index < review.rating ? "fill-[#0067A8]" : "fill-transparent"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        {review.title ? <h3 className="mt-4 font-bold text-slate-900">{review.title}</h3> : null}
                        <p className="mt-2 text-sm leading-6 text-slate-600">{review.reviewText}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
