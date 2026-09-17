import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Container from "./Container";

const shopLinks = [
  { label: "Shop all", href: "/shop" },
  { label: "New arrivals", href: "/shop?type=newarrivals" },
  { label: "Categories", href: "/categories" },
  { label: "Your cart", href: "/cart" },
];

const supportLinks = [
  { label: "About Urban Loom", href: "/about" },
  { label: "Contact us", href: "/contact-us" },
  { label: "My orders", href: "/orders" },
  { label: "Sign in", href: "/signin" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-neutral-950 text-white">
      <Container className="w-full px-4 py-12 md:px-12 md:py-16 xl:px-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1fr] lg:gap-8">
          <section>
            <Link href="/" className="font-heading text-3xl font-semibold tracking-wide">
              URBAN LOOM
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-400">
              Modern essentials and elevated streetwear, made for every expression of your style.
            </p>
            <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition hover:text-neutral-300">
              Shop the collection <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>

          <FooterLinks title="Shop" links={shopLinks} />
          <FooterLinks title="Support" links={supportLinks} />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-300">Connect</h2>
            <div className="mt-5 space-y-4 text-sm text-neutral-400">
              <a href="mailto:hello@urbanloom.com" className="flex items-center gap-2 transition hover:text-white">
                <Mail className="h-4 w-4" /> hello@urbanloom.com
              </a>
              <Link href="/contact-us" className="flex items-center gap-2 transition hover:text-white">
                <MapPin className="h-4 w-4" /> Lagos, Nigeria
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Urban Loom. All rights reserved.</p>
          <p>Designed for everyday expression.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-300">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-neutral-400">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
