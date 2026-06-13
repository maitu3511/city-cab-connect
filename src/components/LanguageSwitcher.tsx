import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const langs = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "gu", label: "ગુજરાતી" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const change = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("awh-lang", code);
  };
  const current = langs.find((l) => l.code === i18n.language) ?? langs[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-cosmic-silver/80 hover:text-gold transition-colors">
        <Globe className="h-4 w-4" />
        {current.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-gold border-gold/30">
        {langs.map((l) => (
          <DropdownMenuItem key={l.code} onClick={() => change(l.code)} className="cursor-pointer">
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
