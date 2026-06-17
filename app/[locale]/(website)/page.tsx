import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import HomeContent from "@/components/home/HomeContent";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#F5F7FC]">
            <Navbar />
            <HeroSection />
            <HomeContent />
        </main>
    );
}
