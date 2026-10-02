"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type QuoteItem = { slug: string; name: string; qty: number };

type Ctx = {
  items: QuoteItem[];
  count: number;
  open: boolean;
  setOpen: (b: boolean) => void;
  add: (i: { slug: string; name: string }) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const KEY = "vv-quote";
const QuoteCtx = createContext<Ctx | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((i: { slug: string; name: string }) => {
    setItems((cur) =>
      cur.some((x) => x.slug === i.slug)
        ? cur.map((x) => (x.slug === i.slug ? { ...x, qty: x.qty + 1 } : x))
        : [...cur, { ...i, qty: 1 }]
    );
    setOpen(true);
  }, []);
  const setQty = useCallback(
    (slug: string, qty: number) =>
      setItems((cur) => (qty < 1 ? cur.filter((x) => x.slug !== slug) : cur.map((x) => (x.slug === slug ? { ...x, qty } : x)))),
    []
  );
  const remove = useCallback((slug: string) => setItems((cur) => cur.filter((x) => x.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.reduce((n, x) => n + x.qty, 0), open, setOpen, add, setQty, remove, clear }),
    [items, open, add, setQty, remove, clear]
  );
  return <QuoteCtx.Provider value={value}>{children}</QuoteCtx.Provider>;
}

export function useQuote() {
  const c = useContext(QuoteCtx);
  if (!c) throw new Error("useQuote must be used inside QuoteProvider");
  return c;
}