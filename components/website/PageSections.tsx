import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  CreditCard,
  Info,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Ticket,
  User,
} from "lucide-react";
import { EventCard, TicketListCard } from "./EventCards";
import { WebsiteFooter, WebsiteNav, SocialButtons } from "./SiteChrome";
import { LocalizedLink } from "./LocalizedLink";
import { BrandLogo } from "./BrandLogo";
import {
  accountTickets,
  categories,
  faqs,
  sampleEvents,
  websiteImages,
} from "./website-data";

export function AboutPage() {
  const team = ["Sarah Oenkins", "Marcus Thorne", "Elena Rodriguez", "David Chen"];
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav active="Help" />
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <p className="text-sm font-extrabold uppercase tracking-widest text-[#005995]">
          Our purpose
        </p>
        <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-tight text-slate-950 md:text-7xl">
          We build bridges between{" "}
          <span className="text-[#005995]">human connection</span> and live
          experiences.
        </h1>
        <p className="mt-8 max-w-4xl text-xl leading-9 text-slate-600">
          Kongo Event is a premium marketplace dedicated to seamless discovery
          and booking of events. We believe live experiences are the heartbeat
          of culture.
        </p>
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 md:px-10">
          <h2 className="text-4xl font-extrabold text-slate-950">
            The journey of reimagining ticketing.
          </h2>
          <p className="text-lg leading-8 text-slate-600">
            Founded in 2018, Kongo Event began with a simple observation: the
            digital gap between local organizers and their audiences was
            widening.
          </p>
          <p className="text-lg leading-8 text-slate-600">
            Today, we serve users across continents, providing infrastructure
            for everything from intimate shows to massive festivals.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 md:grid-cols-3 md:px-10">
          {[
            ["2.4M", "Active Monthly Users"],
            ["15M+", "Tickets Processed"],
            ["42", "Countries Reached"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border bg-[#F5F7FC] p-10">
              <p className="text-5xl font-extrabold text-[#005995]">{value}</p>
              <p className="mt-3 font-bold text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-10">
        <h2 className="text-4xl font-extrabold text-slate-950">Meet the Visionaries</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          A diverse team of engineers, designers, and event lovers changing how
          you experience the world.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {team.map((member) => (
            <article key={member} className="text-left">
              <div className="relative h-80 overflow-hidden rounded-xl bg-slate-200">
                <Image src={websiteImages.portrait} alt={member} fill className="object-cover" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold">{member}</h3>
              <p className="font-bold text-[#005995]">Leadership Team</p>
            </article>
          ))}
        </div>
      </section>
      <WebsiteFooter />
    </main>
  );
}

export function ContactPage() {
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav active="Help" />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="rounded-2xl bg-[#0872B8] px-10 py-24 text-white md:px-24">
          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
            Get in Touch with Our Team
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/80">
            Have questions about an event or need technical support? We're here
            to help you create and discover unforgettable experiences.
          </p>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form className="rounded-xl border bg-white p-10 shadow-sm">
            <h2 className="text-4xl font-extrabold">Send us a message</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Field label="Full Name" placeholder="John Doe" />
              <Field label="Email Address" placeholder="john@example.com" />
            </div>
            <Field label="Subject" placeholder="Event Inquiry" className="mt-6" />
            <label className="mt-6 block">
              <span className="font-bold text-slate-700">Message</span>
              <textarea className="mt-3 min-h-40 w-full rounded-lg bg-[#F0F3F9] p-5 outline-none" placeholder="How can we help you?" />
            </label>
            <button className="mt-8 rounded-lg bg-[#005995] px-8 py-4 font-extrabold text-white">
              Send Message
            </button>
          </form>
          <div className="space-y-8">
            <div className="rounded-xl bg-slate-200 p-10">
              <h2 className="text-3xl font-extrabold">Office Information</h2>
              <InfoLine icon={MapPin} title="Location" text="123 Event Plaza, Suite 500, Kinshasa, DRC" />
              <InfoLine icon={Phone} title="Phone" text="+243 81 000 0000" />
              <InfoLine icon={Mail} title="Email" text="support@kongoevent.com" />
            </div>
            <div className="relative h-80 overflow-hidden rounded-xl bg-slate-900">
              <Image src={websiteImages.map} alt="Map" fill className="object-cover opacity-70" />
              <div className="absolute bottom-6 left-6 rounded-lg bg-white px-5 py-3 font-extrabold text-[#005995]">
                Main Headquarters
              </div>
            </div>
          </div>
        </div>
      </section>
      <FaqCompact />
      <WebsiteFooter />
    </main>
  );
}

export function HelpPage() {
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav active="Help" />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="rounded-2xl bg-[#0872B8] px-10 py-24 text-white md:px-24">
          <h1 className="text-6xl font-extrabold">Help Center</h1>
          <p className="mt-6 max-w-3xl text-xl text-white/80">
            Find answers to common questions about ticketing, hosting events,
            and managing your account at Kongo Event.
          </p>
          <div className="mt-10 flex max-w-xl items-center gap-4 rounded-full bg-white px-6 py-4 text-slate-600">
            <Search className="h-6 w-6" />
            <input className="w-full bg-transparent outline-none" placeholder="Search for questions..." />
          </div>
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-3">
            <p className="mb-5 text-sm font-extrabold uppercase tracking-widest text-slate-500">Categories</p>
            {faqs.map((group, index) => (
              <a key={group.title} className={`flex items-center gap-3 rounded-lg px-5 py-4 font-bold ${index === 0 ? "bg-[#D9EAFE] text-[#005995]" : "text-slate-600"}`}>
                <group.icon className="h-5 w-5" />
                {group.title}
              </a>
            ))}
          </aside>
          <div className="space-y-14">
            {faqs.map((group) => (
              <section key={group.title}>
                <div className="mb-6 flex items-center gap-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#27B7F5] text-white">
                    <group.icon className="h-6 w-6" />
                  </span>
                  <h2 className="text-4xl font-extrabold">{group.title}</h2>
                </div>
                <div className="space-y-4">
                  {group.questions.map((question) => (
                    <FaqItem key={question} question={question} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="rounded-2xl border border-[#C7DFFF] p-16 text-center">
          <h2 className="text-4xl font-extrabold">Still need help?</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">Our support team is available 24/7 to assist with specific queries.</p>
          <div className="mt-8 flex justify-center gap-4">
          <LocalizedLink href="/contact" className="rounded-lg bg-[#005995] px-8 py-4 font-extrabold text-white">Contact Support</LocalizedLink>
            <button className="rounded-lg border border-slate-300 px-8 py-4 font-extrabold">Live Chat</button>
          </div>
        </div>
      </section>
      <WebsiteFooter />
    </main>
  );
}

export function CategoryPage({ name = "Rhythms of the Night" }: { name?: string }) {
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav />
      <section className="relative h-[560px] overflow-hidden bg-black text-white">
        <Image src={websiteImages.hero} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
          <span className="w-fit rounded-full bg-[#27B7F5] px-4 py-2 text-sm font-extrabold uppercase">Top Category</span>
          <h1 className="mt-8 text-6xl font-extrabold">{name}</h1>
          <p className="mt-5 max-w-2xl text-xl text-white/80">Experience the pulse of the city with curated concerts, festivals, and underground music events.</p>
          <div className="mt-8 flex gap-4">
            <LocalizedLink href="/discover" className="rounded-lg bg-[#0872B8] px-8 py-4 font-extrabold">Explore Lineup</LocalizedLink>
            <button className="rounded-lg bg-white/20 px-8 py-4 font-extrabold backdrop-blur">View Trending</button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="-mt-32 mb-12 rounded-xl bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-[1fr_180px_180px_220px]">
            <Field label="Search Music" placeholder="Artists or genres..." />
            <Field label="When" placeholder="This Weekend" />
            <Field label="Where" placeholder="City or Venue" />
            <button className="self-end rounded-lg bg-[#005995] px-6 py-4 font-extrabold text-white">Find Music</button>
          </div>
        </div>
        <h2 className="text-4xl font-extrabold">Live Music Events</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {sampleEvents.slice(0, 4).map((event) => <EventCard key={event.id} event={event} compact />)}
        </div>
      </section>
      <section className="bg-[#171C23] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="text-4xl font-extrabold">Legendary Music Venues</h2>
          <p className="mt-4 max-w-2xl text-white/60">Discover stages that have hosted history.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-[1.3fr_1fr]">
            <ImageTile title="The Royal Symphony Hall" large />
            <div className="grid gap-6">
              <ImageTile title="Pulse Arena" />
              <ImageTile title="The Jazz Attic" />
            </div>
          </div>
        </div>
      </section>
      <NewsletterBand />
      <WebsiteFooter />
    </main>
  );
}

export function CityPage({ city = "London" }: { city?: string }) {
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav />
      <section className="relative h-[540px] overflow-hidden bg-black text-white">
        <Image src={websiteImages.city} alt={city} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 md:px-10">
          <span className="w-fit rounded-full bg-[#0872B8] px-4 py-2 text-sm font-extrabold uppercase">Major Destination</span>
          <h1 className="mt-4 text-6xl font-extrabold">{city}</h1>
          <p className="mt-4 max-w-2xl text-xl text-white/85">Discover the pulse of the city. From historic theatres to cutting-edge electronic venues.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1fr_340px] md:px-10">
        <div>
          <h2 className="text-4xl font-extrabold">Featured Events in {city}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {sampleEvents.slice(0, 4).map((event) => <EventCard key={event.id} event={event} compact />)}
          </div>
          <h2 className="mt-16 text-4xl font-extrabold">Popular Venues</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["Barbican Centre", "Royal Opera House", "The O2 Arena"].map((venue) => (
              <ImageTile key={venue} title={venue} />
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-xl bg-[#0872B8] p-8 text-white shadow-lg">
            <p>Current Weather</p>
            <p className="mt-4 text-5xl font-light">14°C</p>
            <p className="mt-6 text-sm text-white/75">Perfect for a museum visit or a cozy jazz night.</p>
          </div>
          <div className="rounded-xl bg-slate-200 p-8">
            <h3 className="text-2xl font-extrabold">Why visit {city}?</h3>
            {["Unmatched History", "West End Magic", "Global Gastronomy"].map((item) => (
              <p key={item} className="mt-6 text-slate-700"><strong>{item}</strong><br />Explore culture, venues, and premium experiences.</p>
            ))}
          </div>
        </aside>
      </section>
      <WebsiteFooter />
    </main>
  );
}

export function CheckoutPage() {
  return (
    <main className="bg-[#F5F7FC]">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          <LocalizedLink href="/">
            <BrandLogo />
          </LocalizedLink>
          <p className="font-bold text-slate-500">Secure Checkout</p>
          <LocalizedLink href="/events/nebula-global-contemporary-music-arts-festival-2024" className="font-bold text-slate-600">Cancel</LocalizedLink>
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_360px] md:px-10">
        <div className="space-y-8">
          <CheckoutPanel title="Attendee Information" icon={User}>
            <div className="space-y-6">
              {[1, 2].map((ticket) => (
                <div key={ticket} className="rounded-lg border p-6">
                  <p className="mb-6 font-extrabold uppercase tracking-widest text-slate-500">Ticket {ticket}: {ticket === 1 ? "Standard Admission" : "VIP Lounge Access"}</p>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="First Name" placeholder="e.g. Jean" />
                    <Field label="Last Name" placeholder="e.g. Kabamba" />
                  </div>
                  {ticket === 1 && <Field label="Email Address" placeholder="jean.k@example.com" className="mt-5" />}
                </div>
              ))}
            </div>
          </CheckoutPanel>
          <CheckoutPanel title="Select your Seat" icon={Ticket}>
            <div className="h-[520px] rounded-lg bg-slate-200" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {["Zone A", "Zone B", "Zone C"].map((zone, index) => (
                <button key={zone} className={`rounded-lg border p-5 text-left ${index === 0 ? "border-[#005995] bg-[#F2FAFF]" : "bg-white"}`}>
                  <strong>{zone}</strong>
                  <p className="text-sm text-slate-500">{index === 0 ? "Front Row" : index === 1 ? "Middle Section" : "Balcony"}</p>
                </button>
              ))}
            </div>
          </CheckoutPanel>
          <CheckoutPanel title="Payment Method" icon={CreditCard}>
            <div className="grid gap-4 md:grid-cols-2">
              <button className="rounded-lg border-2 border-[#005995] bg-[#F2FAFF] p-6 font-extrabold text-[#005995]">Credit Card</button>
              <button className="rounded-lg border p-6 font-extrabold text-slate-400">Mobile Money</button>
            </div>
            <Field label="Card Number" placeholder="0000 0000 0000 0000" className="mt-6" />
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="Expiry Date" placeholder="MM / YY" />
              <Field label="CVC" placeholder="123" />
            </div>
          </CheckoutPanel>
        </div>
        <aside className="h-fit rounded-xl border bg-white shadow-sm">
          <div className="relative h-48 overflow-hidden rounded-t-xl">
            <Image src={websiteImages.hero} alt="Event" fill className="object-cover" />
          </div>
          <div className="space-y-4 p-6">
            <SummaryRow label="1x Standard Admission" value="$45.00" />
            <SummaryRow label="1x VIP Lounge Access" value="$120.00" />
            <SummaryRow label="Service Fees" value="$12.50" />
            <div className="flex gap-2 border-t pt-5">
              <input className="min-w-0 flex-1 rounded-lg bg-[#F0F3F9] px-4 py-3 outline-none" placeholder="Promo Code" />
              <button className="rounded-lg bg-[#0872B8] px-4 font-extrabold text-white">Apply</button>
            </div>
            <SummaryRow label="Total" value="$177.50" strong />
            <LocalizedLink href="/order-success" className="block rounded-lg bg-[#005995] py-4 text-center font-extrabold text-white">Complete Purchase</LocalizedLink>
            <p className="text-center text-xs font-bold text-slate-500">Encrypted & Secure Payment</p>
          </div>
        </aside>
      </section>
      <WebsiteFooter />
    </main>
  );
}

export function OrderSuccessPage() {
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav />
      <section className="mx-auto max-w-7xl px-6 py-20 text-center md:px-10">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#DDEAF6] text-[#005995]">
          <Check className="h-14 w-14" />
        </div>
        <h1 className="mt-10 text-6xl font-extrabold">Order Successful!</h1>
        <p className="mt-5 text-xl text-slate-600">Your tickets are ready. We've sent a confirmation email to user@example.com</p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-xl border bg-white p-8 text-left shadow-sm">
            <p className="font-extrabold uppercase tracking-widest text-slate-500">Order ID</p>
            <h2 className="text-3xl font-extrabold">#KE-8842-1092</h2>
            <p className="mt-8 text-lg">Saturday, Oct 12, 2024 • 7:00 PM</p>
            <p className="mt-3 text-lg">Kinshasa Arena, DR Congo</p>
            <div className="mt-8 border-t pt-6">
              <SummaryRow label="VIP Experience Pass × 2" value="$150.00" />
              <SummaryRow label="Service Fee" value="$12.50" />
              <SummaryRow label="Total Paid" value="$162.50" strong />
            </div>
          </div>
          <div>
            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <div className="mx-auto flex h-48 w-48 items-center justify-center bg-slate-200">
                <Ticket className="h-20 w-20" />
              </div>
              <p className="mt-5">Scan at the entrance</p>
              <button className="mt-5 w-full rounded-lg bg-[#005995] py-4 font-extrabold text-white">Download PDF Tickets</button>
            </div>
            <div className="mt-8 rounded-xl bg-slate-200 p-8">
              <p className="font-extrabold">Invite your friends</p>
              <SocialButtons />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <h2 className="text-4xl font-extrabold">Discover Similar Events</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {sampleEvents.slice(0, 4).map((event) => <EventCard key={event.id} event={event} compact />)}
        </div>
      </section>
      <WebsiteFooter />
    </main>
  );
}

export function OrganizerProfilePage() {
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav active="Organizer" />
      <section className="relative h-[380px] bg-black">
        <Image src={websiteImages.hero} alt="Organizer" fill className="object-cover opacity-80" />
      </section>
      <section className="border-b bg-gradient-to-r from-slate-900/70 to-slate-700/50 text-white">
        <div className="mx-auto flex max-w-7xl items-end gap-8 px-6 py-8 md:px-10">
          <div className="relative -mt-24 h-40 w-40 overflow-hidden rounded-xl border-4 border-white bg-slate-200 shadow-xl">
            <Image src={websiteImages.portrait} alt="Organizer" fill className="object-cover" />
          </div>
          <div className="pb-2">
            <h1 className="text-4xl font-extrabold">Vanguard Productions</h1>
            <p className="mt-2 text-xl text-white/80">Premium Experience Architect</p>
          </div>
          <button className="ml-auto rounded-lg bg-[#005995] px-8 py-4 font-extrabold">Follow</button>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[360px_1fr] md:px-10">
        <aside className="space-y-8">
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-extrabold">About</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Vanguard Productions has been at the forefront of luxury event curation since 2012.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Stat value="124" label="Events Held" />
              <Stat value="8.5k" label="Followers" />
            </div>
          </div>
          <ImageTile title="San Francisco, CA" />
        </aside>
        <div>
          <h2 className="text-4xl font-extrabold">Upcoming Events</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {sampleEvents.slice(0, 2).map((event) => <EventCard key={event.id} event={event} />)}
          </div>
          <h2 className="mt-16 text-4xl font-extrabold">Past Highlights</h2>
          <div className="mt-8 space-y-5">
            {sampleEvents.slice(2, 4).map((event) => (
              <article key={event.id} className="flex items-center gap-6 rounded-xl bg-slate-100 p-5">
                <div className="relative h-24 w-32 overflow-hidden rounded-lg">
                  <Image src={event.image} alt={event.title} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-widest text-slate-500">June 2024</p>
                  <h3 className="text-2xl font-extrabold">{event.title}</h3>
                  <p className="text-slate-600">{event.venue} • 12k Attendees</p>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-500" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <WebsiteFooter />
    </main>
  );
}

export function AuthPage() {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden bg-black text-white lg:block">
        <Image src={websiteImages.hero} alt="Kongo Event" fill className="object-cover opacity-60" />
        <div className="relative z-10 flex h-full flex-col justify-between p-16">
          <LocalizedLink href="/">
            <BrandLogo tone="light" />
          </LocalizedLink>
          <div>
            <h1 className="text-6xl font-extrabold leading-tight">Experience the <span className="block text-[#27B7F5]">Unforgettable.</span></h1>
            <p className="mt-8 max-w-xl text-xl leading-8 text-white/85">Join thousands of event enthusiasts and organizers.</p>
          </div>
          <div className="w-fit rounded-lg border border-white/30 bg-white/10 px-6 py-5 backdrop-blur">Trusted by 50k+ attendees</div>
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl">
          <BrandLogo />
          <h2 className="mt-5 text-4xl font-extrabold">Join the community</h2>
          <p className="mt-3 text-slate-600">Sign up to start discovering and managing events.</p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <button className="rounded-lg border py-4 font-bold">Google</button>
            <button className="rounded-lg border py-4 font-bold">Facebook</button>
          </div>
          <div className="my-8 flex items-center gap-4 text-xs font-bold uppercase text-slate-500"><span className="h-px flex-1 bg-slate-200" />Or continue with email<span className="h-px flex-1 bg-slate-200" /></div>
          <Field label="Full Name" placeholder="John Doe" />
          <Field label="Email Address" placeholder="name@example.com" className="mt-5" />
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Field label="Password" placeholder="Password" />
            <Field label="Confirm Password" placeholder="Password" />
          </div>
          <button className="mt-8 w-full rounded-lg bg-[#005995] py-4 text-xl font-extrabold text-white">Sign Up →</button>
          <p className="mt-6 text-center text-slate-600">Already have an account? <button className="font-bold text-[#005995]">Log In</button></p>
        </div>
      </section>
    </main>
  );
}

export function AccountProfilePage() {
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav />
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[280px_1fr] md:px-10">
        <AccountSidebar active="Profile" />
        <div className="rounded-xl border bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-extrabold">Personal Information</h1>
          <p className="mt-3 text-xl text-slate-600">Manage your profile details and preferences.</p>
          <div className="mt-8 border-t pt-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="First Name" placeholder="Marcus" />
              <Field label="Last Name" placeholder="Holloway" />
            </div>
            <Field label="Email Address" placeholder="marcus.h@kongo.com" className="mt-6" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Field label="Phone Number" placeholder="+1 (555) 000-1234" />
              <Field label="Location" placeholder="San Francisco, CA" />
            </div>
            <button className="mt-8 rounded-lg bg-[#005995] px-8 py-4 font-extrabold text-white">Save Changes</button>
          </div>
        </div>
      </section>
      <WebsiteFooter />
    </main>
  );
}

export function MyTicketsPage() {
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav />
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[280px_1fr] md:px-10">
        <AccountSidebar active="My Tickets" />
        <div>
          <h1 className="text-4xl font-extrabold">My Tickets</h1>
          <p className="mt-3 text-xl text-slate-600">View and manage all your upcoming and past event experiences.</p>
          <div className="mt-8 flex gap-8 border-b">
            <button className="border-b-2 border-[#005995] pb-4 font-extrabold text-[#005995]">Upcoming Tickets (2)</button>
            <button className="pb-4 font-bold text-slate-500">Past Tickets</button>
          </div>
          <div className="mt-8 space-y-8">
            {accountTickets.map((ticket) => <TicketListCard key={ticket.id} ticket={ticket} />)}
          </div>
        </div>
      </section>
      <WebsiteFooter />
    </main>
  );
}

export function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return (
    <main className="bg-[#F5F7FC]">
      <WebsiteNav />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <h1 className="text-6xl font-extrabold text-[#005995]">{privacy ? "Privacy Policy" : "Terms of Service"}</h1>
        <p className="mt-6 max-w-3xl text-xl text-slate-600">Last updated: May 24, 2024. Please read this information carefully before using Kongo Event.</p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 lg:grid-cols-[260px_1fr] md:px-10">
        <aside className="hidden space-y-3 lg:block">
          {["Introduction", "User Accounts", "Ticket Sales", "Security", "Liability & Legal"].map((item, index) => (
            <a key={item} className={`block rounded-lg px-5 py-4 font-bold ${index === 0 ? "bg-[#D9EAFE] text-[#005995]" : "text-slate-600"}`}>{item}</a>
          ))}
        </aside>
        <article className="rounded-xl border bg-white p-10 shadow-sm">
          {(privacy
            ? ["Data Collection", "How We Use Your Information", "Cookies and Tracking", "Third-Party Sharing", "User Rights", "Security Measures"]
            : ["Introduction", "User Accounts", "Ticket Sales & Payments", "Prohibited Conduct", "Liability & Legal"]
          ).map((title, index) => (
            <section key={title} className="border-b py-8 last:border-b-0">
              <h2 className="text-3xl font-extrabold">{index + 1}. {title}</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Kongo Event provides a secure marketplace for discovering, booking, and managing live experiences. We collect and process only the information needed to operate the platform, support users, and comply with legal obligations.
              </p>
            </section>
          ))}
          <div className="mt-10 rounded-xl bg-[#0872B8] p-8 text-white">
            <h3 className="text-xl font-extrabold">Have questions?</h3>
            <p className="mt-2 text-white/80">Our team is ready to help with legal or privacy requests.</p>
          </div>
        </article>
      </section>
      <WebsiteFooter />
    </main>
  );
}

function FaqCompact() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
      <p className="mt-4 text-slate-600">Quick answers to questions you might have.</p>
      <div className="mt-10 space-y-4 text-left">
        {["How do I purchase tickets for an event?", "What is the refund policy?", "How can I host my own event?", "Is my payment information secure?"].map((question) => (
          <FaqItem key={question} question={question} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ question }: { question: string }) {
  return (
    <button className="flex w-full items-center justify-between rounded-xl border bg-white p-6 text-left text-xl font-extrabold">
      {question}
      <ChevronDown className="h-5 w-5 text-[#005995]" />
    </button>
  );
}

function Field({ label, placeholder, className = "" }: { label: string; placeholder: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="font-bold text-slate-700">{label}</span>
      <input className="mt-3 w-full rounded-lg bg-[#F0F3F9] px-5 py-4 outline-none" placeholder={placeholder} />
    </label>
  );
}

function InfoLine({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="mt-8 flex gap-5">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D8EAF8] text-[#005995]"><Icon className="h-5 w-5" /></span>
      <p><strong>{title}</strong><br />{text}</p>
    </div>
  );
}

function ImageTile({ title, large = false }: { title: string; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-black ${large ? "h-96" : "h-48"}`}>
      <Image src={websiteImages.venue} alt={title} fill className="object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <h3 className="absolute bottom-6 left-6 text-2xl font-extrabold text-white">{title}</h3>
    </div>
  );
}

function NewsletterBand() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="rounded-3xl bg-[#0872B8] p-14 text-white">
        <h2 className="text-4xl font-extrabold">Don't miss a beat. Get early access to tickets.</h2>
        <div className="mt-8 flex max-w-xl gap-4">
          <input className="min-w-0 flex-1 rounded-lg bg-white px-5 py-4 text-slate-900 outline-none" placeholder="Enter your email" />
          <button className="rounded-lg bg-[#27B7F5] px-8 font-extrabold">Subscribe</button>
        </div>
      </div>
    </section>
  );
}

function CheckoutPanel({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border bg-white p-8 shadow-sm">
      <h2 className="mb-8 flex items-center gap-4 text-3xl font-extrabold"><Icon className="h-7 w-7 text-[#005995]" />{title}</h2>
      {children}
    </section>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "text-3xl font-extrabold" : "text-lg font-bold"}`}>
      <span>{label}</span>
      <span className={strong ? "text-[#005995]" : ""}>{value}</span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-[#F0F3F9] p-5 text-center">
      <p className="text-2xl font-extrabold text-[#005995]">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  );
}

function AccountSidebar({ active }: { active: string }) {
  const items = ["Profile", "My Tickets", "Saved", "Security"];
  return (
    <aside className="h-fit rounded-xl border bg-white p-8 shadow-sm">
      <div className="text-center">
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-slate-200">
          <Image src={websiteImages.portrait} alt="User" fill className="object-cover" />
        </div>
        <h2 className="mt-5 text-2xl font-extrabold">Marcus Holloway</h2>
        <p className="text-sm text-slate-500">marcus.h@kongo.com</p>
      </div>
      <nav className="mt-8 border-t pt-6">
        {items.map((item) => (
          <LocalizedLink key={item} href={item === "My Tickets" ? "/account/tickets" : "/account/profile"} className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-4 font-bold ${active === item ? "bg-[#D9EAFE] text-[#005995]" : "text-slate-600"}`}>
            <User className="h-5 w-5" />
            {item}
          </LocalizedLink>
        ))}
      </nav>
    </aside>
  );
}
