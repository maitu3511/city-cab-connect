import { useEffect } from "react";
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
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "bn", label: "বাংলা" },
];

const setCookie = (lang: string) => {
  const value = `/en/${lang}`;
  // domain variants — Google Translate reads this cookie
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
  const root = "." + window.location.hostname.split(".").slice(-2).join(".");
  document.cookie = `googtrans=${value};path=/;domain=${root}`;
};

const getCurrent = () => {
  const m = document.cookie.match(/googtrans=\/[a-z-]+\/([a-z-]+)/i);
  return m ? m[1] : "en";
};

const LanguageSwitcher = () => {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: langs.map((l) => l.code).join(","),
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
    const s = document.createElement("script");
    s.id = "google-translate-script";
    s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const change = (code: string) => {
    setCookie(code);
    window.location.reload();
  };

  const current = langs.find((l) => l.code === getCurrent()) ?? langs[0];

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-cosmic-silver/80 hover:text-gold transition-colors notranslate">
          <Globe className="h-4 w-4" />
          {current.label}
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
