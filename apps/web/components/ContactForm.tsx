"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle your form submission logic here (e.g., fetch API, Server Action)
    setSubmitted(true);
  };

  return (
    <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Send Us a Message</h2>
        <p className="text-xs text-slate-500 mt-1">
          Fill out the form below and our team will get back to you within 24–48
          business hours.
        </p>
      </div>

      {submitted ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm">
          <p className="font-semibold">Thank you for getting in touch!</p>
          <p className="text-xs text-emerald-700 mt-1">
            Your message has been sent. Our team will review it and reply
            shorty.
          </p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="full-name"
                className="block text-xs font-bold text-slate-700"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="full-name"
                required
                placeholder="e.g. Jane Doe"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="jane@organization.org"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label
              htmlFor="subject"
              className="block text-xs font-bold text-slate-700"
            >
              Inquiry Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="e.g. Health Systems Integration Partnership"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block text-xs font-bold text-slate-700"
            >
              Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              required
              placeholder="How can we help you or collaborate?"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 resize-y"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      )}
    </Card>
  );
}
