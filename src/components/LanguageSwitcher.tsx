import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const langs = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "gu", label: "ગુજરાતી" },
];

const LanguageSwitcher = () => {
  const [current, setCurrent] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("awh-lang") || "en";
    setCurrent(saved);

    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,gu",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
      const s = document.createElement("script");
      s.id = "google-translate-script";
      s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }

    // Apply saved language once the select is available
    if (saved !== "en") {
      const tryApply = (tries = 0) => {
        const sel = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (sel) {
          sel.value = saved;
          sel.dispatchEvent(new Event("change"));
        } else if (tries < 40) {
          setTimeout(() => tryApply(tries + 1), 250);
        }
      };
      tryApply();
    }
  }, []);

  const change = (code: string) => {
    localStorage.setItem("awh-lang", code);
    setCurrent(code);
    const sel = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (sel) {
      sel.value = code === "en" ? "" : code;
      sel.dispatchEvent(new Event("change"));
      if (code === "en") {
        // Force restore by reloading without translate cookies
        setTimeout(() => window.location.reload(), 100);
      }
    } else {
      // Script not ready — reload with cookie fallback
      const host = window.location.hostname;
      const val = `/en/${code}`;
      document.cookie = `googtrans=${val};path=/`;
      document.cookie = `googtrans=${val};path=/;domain=${host}`;
      document.cookie = `googtrans=${val};path=/;domain=.${host}`;
      window.location.reload();
    }
  };

  const currentLabel = langs.find((l) => l.code === current)?.label ?? "English";

  return (
    <>
      <div id="google_translate_element" style={{ position: "absolute", left: "-9999px", top: "-9999px" }} />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-cosmic-silver/80 hover:text-gold transition-colors notranslate">
          <Globe className="h-4 w-4" />
          {currentLabel}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass-gold border-gold/30 notranslate">
          {langs.map((l) => (
            <DropdownMenuItem key={l.code} onClick={() => change(l.code)} className="cursor-pointer">
              {l.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LanguageSwitcher;
