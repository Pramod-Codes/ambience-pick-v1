import { useState } from "react";
import { Bell, ChevronRight, CreditCard, HelpCircle, LogOut, MapPin, User, Wallet, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { BottomNav } from "@/components/BottomNav";
import { UnderlineField } from "@/components/UnderlineField";
import { useApp } from "@/context/AppContext";

const sections = [
  { title: "Personal", rows: [{ id: "personal", icon: User, label: "Personal Information", detail: "Name, email and phone" }, { id: "preferences", icon: MapPin, label: "Travel Preferences", detail: "Make recommendations feel personal" }] },
  { title: "Preferences", rows: [{ id: "notifications", icon: Bell, label: "Notifications", detail: "Booking updates and reminders" }, { id: "payments", icon: CreditCard, label: "Payment Methods", detail: "Visa •••• 4242" }] },
  { title: "Support", rows: [{ id: "support", icon: HelpCircle, label: "Help & Support", detail: "FAQs and contact support" }] },
];

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50 mx-auto flex max-w-[480px] items-end bg-black/60"><div className="w-full rounded-t-[2rem] bg-background px-5 pb-8 pt-4"><div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-foreground" /><div className="mb-5 flex items-center justify-between"><h2 className="font-heading text-xl font-semibold">{title}</h2><button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-muted"><X className="h-5 w-5" /></button></div>{children}</div></div>;
}

export default function Profile() {
  const navigate = useNavigate();
  const { userEmail, signOut } = useApp();
  const [sheet, setSheet] = useState<string | null>(null);
  const [name, setName] = useState("Pramod N");
  const [email, setEmail] = useState(userEmail || "pramod@example.com");
  const [phone, setPhone] = useState("+1 646 456-7891");
  const [notifications, setNotifications] = useState({ booking: true, reminders: true, promotions: false, recommendations: true });
  const [mobility, setMobility] = useState("Most comfortable");

  function close() { setSheet(null); }
  function doSignOut() { signOut(); navigate("/sign-in"); }

  return <Shell className="h-[100dvh] max-h-[100dvh] overflow-hidden"><div className="shrink-0 px-5 pb-5 pt-7"><h1 className="font-heading text-2xl font-bold">Profile</h1><div className="mt-6 flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">PN</div><div><h2 className="font-heading text-lg font-semibold">{name}</h2><p className="text-sm text-muted-foreground">{email}</p></div></div></div><div className="min-h-0 flex-1 overflow-y-auto px-5 pb-24">{sections.map((section) => <section key={section.title}><h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.title}</h3><div className="overflow-hidden rounded-2xl bg-background shadow-card ring-1 ring-border/60">{section.rows.map(({ id, icon: Icon, label, detail }, index) => <button key={id} onClick={() => setSheet(id)} className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/50 ${index ? "border-t border-border" : ""}`}><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><strong className="block text-sm font-medium">{label}</strong><small className="mt-0.5 block truncate text-xs text-muted-foreground">{detail}</small></span><ChevronRight className="h-4 w-4 text-muted-foreground" /></button>)}</div></section>)}<section><h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account</h3><button onClick={() => setSheet("logout")} className="flex w-full items-center gap-3 rounded-2xl bg-background px-4 py-4 text-left text-destructive shadow-card ring-1 ring-border/60"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10"><LogOut className="h-4 w-4" /></span><span className="flex-1 text-sm font-semibold">Sign Out</span><ChevronRight className="h-4 w-4" /></button></section></div><BottomNav />
    {sheet === "personal" && <Sheet title="Personal Information" onClose={close}><div className="space-y-5"><UnderlineField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} /><UnderlineField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><UnderlineField label="Mobile Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /><button onClick={close} className="w-full rounded-full bg-primary py-4 font-semibold text-white">Save Changes</button></div></Sheet>}
    {sheet === "preferences" && <Sheet title="Travel Preferences" onClose={close}><p className="mb-3 text-sm text-muted-foreground">What matters most when choosing a place?</p><div className="grid grid-cols-2 gap-3">{["Most comfortable", "Most affordable", "Fastest route", "Shortest route"].map((item) => <button key={item} onClick={() => setMobility(item)} className={`rounded-xl border px-3 py-4 text-sm ${mobility === item ? "border-primary bg-primary text-white" : "bg-muted/30"}`}>{item}</button>)}</div><button onClick={close} className="mt-6 w-full rounded-full bg-primary py-4 font-semibold text-white">Save Preferences</button></Sheet>}
    {sheet === "notifications" && <Sheet title="Notifications" onClose={close}><div className="space-y-1">{(["booking", "reminders", "promotions", "recommendations"] as const).map((key) => <label key={key} className="flex items-center justify-between border-b border-border py-4 text-sm capitalize"><span>{key === "booking" ? "Booking Updates" : key === "reminders" ? "Trip Reminders" : key === "recommendations" ? "Recommendations" : "Promotional Updates"}</span><input type="checkbox" checked={notifications[key]} onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })} className="h-5 w-5 accent-primary" /></label>)}</div></Sheet>}
    {sheet === "payments" && <Sheet title="Payment Methods" onClose={close}><div className="flex items-center gap-3 rounded-2xl bg-muted p-4"><Wallet className="h-6 w-6 text-primary" /><span className="flex-1"><strong className="block text-sm">Visa •••• 4242</strong><small className="text-xs text-muted-foreground">Primary payment method</small></span><span className="text-xs font-semibold text-success">Active</span></div><button onClick={close} className="mt-5 w-full rounded-full border border-primary py-3 font-semibold text-primary">Add Payment Method</button></Sheet>}
    {sheet === "support" && <Sheet title="Help & Support" onClose={close}><div className="space-y-2">{["Frequently Asked Questions", "Booking Help", "Payment Help", "Contact Support", "Report a Problem"].map((item) => <button key={item} onClick={close} className="flex w-full items-center justify-between rounded-xl bg-muted px-4 py-4 text-sm font-medium">{item}<ChevronRight className="h-4 w-4 text-muted-foreground" /></button>)}</div></Sheet>}
    {sheet === "logout" && <Sheet title="Sign out of Ambience Pick?" onClose={close}><p className="text-sm text-muted-foreground">You can sign back in anytime to access your saved places and bookings.</p><div className="mt-6 grid grid-cols-2 gap-3"><button onClick={close} className="rounded-full border border-border py-3 font-semibold">Cancel</button><button onClick={doSignOut} className="rounded-full bg-destructive py-3 font-semibold text-white">Sign Out</button></div></Sheet>}
  </Shell>;
}
