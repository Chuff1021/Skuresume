"use client";

import { useState, type ReactNode } from "react";
import { CaretDown, CaretRight } from "@phosphor-icons/react";

interface SectionBaseProps {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function SectionBase({
  title,
  icon,
  defaultOpen = false,
  children,
}: SectionBaseProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors"
      >
        {open ? (
          <CaretDown size={14} className="text-muted-foreground shrink-0" />
        ) : (
          <CaretRight size={14} className="text-muted-foreground shrink-0" />
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{title}</span>
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

// Reusable form field
interface FieldProps {
  label: string;
  children: ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

// Reusable text input
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
    />
  );
}

// Reusable textarea
interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
    />
  );
}
