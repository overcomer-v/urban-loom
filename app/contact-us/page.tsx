"use client";

import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-white text-neutral-900">
      {/* Header */}
      <section className="border-b border-neutral-200 bg-neutral-900 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
            Urban Loom
          </p>

          <h1 className="max-w-3xl text-4xl text-white font-medium font-heading tracking-tight sm:text-5xl lg:text-6xl">
            We’d love to hear from you.
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-400 md:text-base">
            Have a question about an order, a product, or anything else? Reach
            out to us and our team will be happy to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-semibold font-heading">Get in touch</h2>

            <p className="mt-4 max-w-md leading-7 text-base text-neutral-600">
              Whether you need help with an order or simply want to know more
              about Urban Loom, we are here for you.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:hello@urbanloom.com"
                    className="mt-1 block text-neutral-600 transition hover:text-black"
                  >
                    hello@urbanloom.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a
                    href="tel:+2348000000000"
                    className="mt-1 block text-neutral-600 transition hover:text-black"
                  >
                    +234 800 000 0000
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="mt-1 text-neutral-600">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="mt-12 border-t border-neutral-200 pt-8">
              <p className="text-sm text-neutral-500">
                Looking for a quick answer?
              </p>

              <Link
                href="/faq"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
              >
                Visit our FAQ
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Contact Form */}
         <ContactForm/>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-16 text-center sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold font-heading tracking-tight">
            Questions about your order?
          </h2>

          <p className="mt-4 text-neutral-500">
            Have your order number ready and we will help you get things sorted as
            quickly as possible.
          </p>
        </div>
      </section>
    </main>
  );
}


function ContactForm() {
    return(
         <div className="rounded-2xl border border-neutral-200 p-6 sm:p-8">
            <h2 className="text-3xl font-semibold font-heading">Send us a message</h2>

            <form className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Send message
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
    );
}