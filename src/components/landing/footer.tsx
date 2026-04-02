"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GithubLogo } from "@phosphor-icons/react";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <motion.div
        className="absolute -bottom-0.5 left-0 h-px bg-primary"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4 pb-8 md:p-8 md:pb-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs px-2 tracking-wider">
              SKU
            </div>
            <span className="font-semibold">SKU Resume AI Builder</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A free, AI-powered resume builder that helps you create professional
            resumes in minutes.
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/Chuff1021/Skuresume"
              target="_blank"
              className="inline-flex items-center justify-center size-8 rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              <GithubLogo size={18} />
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Resources</h4>
          <div className="flex flex-col gap-2">
            <FooterLink href="/dashboard">Dashboard</FooterLink>
            <FooterLink href="https://github.com/Chuff1021/Skuresume">Source Code</FooterLink>
          </div>
        </div>

        {/* Product */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Product</h4>
          <div className="flex flex-col gap-2">
            <FooterLink href="#features">Features</FooterLink>
            <FooterLink href="#templates">Templates</FooterLink>
          </div>
        </div>

        {/* Copyright */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Legal</h4>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SKU Resume AI Builder
          </p>
          <p className="text-xs text-muted-foreground">
            MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}
