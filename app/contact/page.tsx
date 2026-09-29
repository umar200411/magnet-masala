import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { site, whatsappReady } from "@/lib/config";

export const metadata = { title: "Contact" };

export default function Page() {
  return (
    <main id="main" className="wrap page information">
      <p className="eyebrow red">LET’S TALK FLAVOUR</p>
      <h1>A question for<br /><em>Magnet Masala?</em></h1>
      <p className="intro">For product queries, orders, pricing and delivery details, contact us on WhatsApp or email.</p>
      <section aria-labelledby="query-heading">
        <h2 id="query-heading">Send us your query</h2>
        {whatsappReady && <p><a className="button" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Magnet Masala, I have a query about your products.")}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />Chat on WhatsApp</a><br /><span className="muted">+{site.whatsapp}</span></p>}
        {site.email && <div><h3>Email your query</h3><p><a className="text-link" style={{ overflowWrap: "anywhere", maxWidth: "100%" }} href={`mailto:${site.email}?subject=${encodeURIComponent("Magnet Masala query")}`}><Mail size={18} style={{ flexShrink: 0 }} aria-hidden="true" />{site.email}</a></p></div>}
      </section>
      <section>
        <h2>Looking for an answer?</h2>
        <p><Link className="text-link" href="/faq">Read our ordering FAQ</Link> or <Link className="text-link" href="/delivery">check delivery information</Link>.</p>
      </section>
    </main>
  );
}
