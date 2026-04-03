"use client";

import { useState, type ReactNode } from "react";
import { CaretDown, CaretRight, Eye, EyeSlash } from "@phosphor-icons/react";
import { AIPopover } from "../ai-popover";

interface SectionBaseProps {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  visible?: boolean;
  onToggleVisible?: () => void;
  children: ReactNode;
}

export function SectionBase({
  title,
  icon,
  defaultOpen = false,
  visible,
  onToggleVisible,
  children,
}: SectionBaseProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-lg border border-border bg-background overflow-hidden ${visible === false ? "opacity-60" : ""}`}>
      <div className="flex items-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors text-left"
        >
          {open ? (
            <CaretDown size={14} className="text-muted-foreground shrink-0" />
          ) : (
            <CaretRight size={14} className="text-muted-foreground shrink-0" />
          )}
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{title}</span>
        </button>
        {onToggleVisible !== undefined && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleVisible(); }}
            className="px-3 py-3 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            title={visible === false ? "Show section" : "Hide section"}
          >
            {visible === false ? <EyeSlash size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
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

// Textarea with AI improve button
interface TextAreaWithAIProps extends TextAreaProps {
  aiMode?: "rewrite" | "improve";
}

export function TextAreaWithAI({
  value,
  onChange,
  placeholder,
  rows = 3,
  aiMode = "improve",
}: TextAreaWithAIProps) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
      />
      <div className="flex justify-end mt-1">
        <AIPopover currentText={value} onApply={onChange} mode={aiMode} />
      </div>
    </div>
  );
}
