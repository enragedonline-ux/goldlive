"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

// code, English name, native name
const LANGS: [string, string, string][] = [
  ["en", "English", "English"],
  ["af", "Afrikaans", "Afrikaans"],
  ["sq", "Albanian", "Shqip"],
  ["am", "Amharic", "አማርኛ"],
  ["ar", "Arabic", "العربية"],
  ["hy", "Armenian", "Հայերեն"],
  ["as", "Assamese", "অসমীয়া"],
  ["ay", "Aymara", "Aymar aru"],
  ["az", "Azerbaijani", "Azərbaycan dili"],
  ["bm", "Bambara", "Bamanankan"],
  ["eu", "Basque", "Euskara"],
  ["be", "Belarusian", "Беларуская"],
  ["bn", "Bengali", "বাংলা"],
  ["bho", "Bhojpuri", "भोजपुरी"],
  ["bs", "Bosnian", "Bosanski"],
  ["bg", "Bulgarian", "Български"],
  ["ca", "Catalan", "Català"],
  ["ceb", "Cebuano", "Bisaya"],
  ["zh-CN", "Chinese (Simplified)", "中文（简体）"],
  ["zh-TW", "Chinese (Traditional)", "中文（繁體）"],
  ["co", "Corsican", "Corsu"],
  ["hr", "Croatian", "Hrvatski"],
  ["cs", "Czech", "Čeština"],
  ["da", "Danish", "Dansk"],
  ["dv", "Dhivehi", "ދިވެހި"],
  ["doi", "Dogri", "डोगरी"],
  ["nl", "Dutch", "Nederlands"],
  ["eo", "Esperanto", "Esperanto"],
  ["et", "Estonian", "Eesti"],
  ["ee", "Ewe", "Eʋegbe"],
  ["tl", "Filipino", "Wikang Filipino"],
  ["fi", "Finnish", "Suomi"],
  ["fr", "French", "Français"],
  ["fy", "Frisian", "Frysk"],
  ["gl", "Galician", "Galego"],
  ["ka", "Georgian", "ქართული"],
  ["de", "German", "Deutsch"],
  ["el", "Greek", "Ελληνικά"],
  ["gn", "Guarani", "Avañe'ẽ"],
  ["gu", "Gujarati", "ગુજરાતી"],
  ["ht", "Haitian Creole", "Kreyòl ayisyen"],
  ["ha", "Hausa", "Hausa"],
  ["haw", "Hawaiian", "ʻŌlelo Hawaiʻi"],
  ["he", "Hebrew", "עברית"],
  ["hi", "Hindi", "हिन्दी"],
  ["hmn", "Hmong", "Hmoob"],
  ["hu", "Hungarian", "Magyar"],
  ["is", "Icelandic", "Íslenska"],
  ["ig", "Igbo", "Igbo"],
  ["ilo", "Ilocano", "Ilokano"],
  ["id", "Indonesian", "Bahasa Indonesia"],
  ["ga", "Irish", "Gaeilge"],
  ["it", "Italian", "Italiano"],
  ["ja", "Japanese", "日本語"],
  ["jv", "Javanese", "Basa Jawa"],
  ["kn", "Kannada", "ಕನ್ನಡ"],
  ["kk", "Kazakh", "Қазақша"],
  ["km", "Khmer", "ខ្មែរ"],
  ["rw", "Kinyarwanda", "Ikinyarwanda"],
  ["gom", "Konkani", "कोंकणी"],
  ["ko", "Korean", "한국어"],
  ["kri", "Krio", "Krio"],
  ["ckb", "Kurdish (Sorani)", "کوردی"],
  ["ku", "Kurdish (Kurmanji)", "Kurdî"],
  ["ky", "Kyrgyz", "Кыргызча"],
  ["lo", "Lao", "ລາວ"],
  ["la", "Latin", "Latina"],
  ["lv", "Latvian", "Latviešu"],
  ["ln", "Lingala", "Lingála"],
  ["lt", "Lithuanian", "Lietuvių"],
  ["lg", "Luganda", "Luganda"],
  ["lb", "Luxembourgish", "Lëtzebuergesch"],
  ["mk", "Macedonian", "Македонски"],
  ["mai", "Maithili", "मैथिली"],
  ["mg", "Malagasy", "Malagasy"],
  ["ms", "Malay", "Bahasa Melayu"],
  ["ml", "Malayalam", "മലയാളം"],
  ["mt", "Maltese", "Malti"],
  ["mi", "Maori", "Te Reo Māori"],
  ["mr", "Marathi", "मराठी"],
  ["mni-Mtei", "Manipuri (Meiteilon)", "ꯃꯩꯇꯩꯂꯣꯟ"],
  ["lus", "Mizo", "Mizo ṭawng"],
  ["mn", "Mongolian", "Монгол"],
  ["my", "Myanmar (Burmese)", "မြန်မာ"],
  ["ne", "Nepali", "नेपाली"],
  ["no", "Norwegian", "Norsk"],
  ["ny", "Nyanja (Chichewa)", "Chichewa"],
  ["or", "Odia (Oriya)", "ଓଡ଼ିଆ"],
  ["om", "Oromo", "Afaan Oromoo"],
  ["ps", "Pashto", "پښتو"],
  ["fa", "Persian", "فارسی"],
  ["pl", "Polish", "Polski"],
  ["pt", "Portuguese", "Português"],
  ["pa", "Punjabi", "ਪੰਜਾਬੀ"],
  ["qu", "Quechua", "Runasimi"],
  ["ro", "Romanian", "Română"],
  ["ru", "Russian", "Русский"],
  ["sm", "Samoan", "Gagana Samoa"],
  ["sa", "Sanskrit", "संस्कृतम्"],
  ["gd", "Scots Gaelic", "Gàidhlig"],
  ["sr", "Serbian", "Српски"],
  ["st", "Sesotho", "Sesotho"],
  ["sn", "Shona", "ChiShona"],
  ["sd", "Sindhi", "سنڌي"],
  ["si", "Sinhala", "සිංහල"],
  ["sk", "Slovak", "Slovenčina"],
  ["sl", "Slovenian", "Slovenščina"],
  ["so", "Somali", "Soomaali"],
  ["es", "Spanish", "Español"],
  ["su", "Sundanese", "Basa Sunda"],
  ["sw", "Swahili", "Kiswahili"],
  ["sv", "Swedish", "Svenska"],
  ["tg", "Tajik", "Тоҷикӣ"],
  ["ta", "Tamil", "தமிழ்"],
  ["tt", "Tatar", "Татар"],
  ["te", "Telugu", "తెలుగు"],
  ["th", "Thai", "ไทย"],
  ["ti", "Tigrinya", "ትግርኛ"],
  ["ts", "Tsonga", "Xitsonga"],
  ["tr", "Turkish", "Türkçe"],
  ["tk", "Turkmen", "Türkmen"],
  ["uk", "Ukrainian", "Українська"],
  ["ur", "Urdu", "اردو"],
  ["ug", "Uyghur", "ئۇيغۇر"],
  ["uz", "Uzbek", "O'zbek"],
  ["vi", "Vietnamese", "Tiếng Việt"],
  ["cy", "Welsh", "Cymraeg"],
  ["xh", "Xhosa", "isiXhosa"],
  ["yi", "Yiddish", "ייִדיש"],
  ["yo", "Yoruba", "Yorùbá"],
  ["zu", "Zulu", "isiZulu"],
];

function readCurrentLang(): string {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (!m) return "en";
  const parts = decodeURIComponent(m[1]).split("/");
  const code = parts[2];
  return code && LANGS.some(([c]) => c === code) ? code : "en";
}

function applyLang(code: string) {
  const value = code === "en" ? "" : `/en/${code}`;
  const del = code === "en" ? "; expires=Thu, 01 Jan 1970 00:00:00 GMT" : "";
  document.cookie = `googtrans=${value}${del}; path=/;`;
  try {
    document.cookie = `googtrans=${value}${del}; path=/; domain=${window.location.hostname};`;
  } catch {
    /* ignore */
  }
  window.location.reload();
}

export default function TranslateWidget() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cur, setCur] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCur(readCurrentLang());
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        // Real Google Translate engine stays hidden in the div below;
        // the visible picker is our own themed dropdown.
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      }
    };

    const s = document.createElement("script");
    s.id = "google-translate-script";
    s.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const needle = q.trim().toLowerCase();
  const filtered =
    needle.length === 0
      ? LANGS
      : LANGS.filter(
          ([c, en, nat]) =>
            en.toLowerCase().includes(needle) ||
            nat.toLowerCase().includes(needle) ||
            c.toLowerCase() === needle
        );

  const curName = LANGS.find(([c]) => c === cur)?.[2] ?? "English";

  return (
    <div className="gt-wrap" ref={ref}>
      <button
        type="button"
        className="gt-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Translate page"
      >
        <span aria-hidden="true">🌐</span>
        <span className="gt-cur">{curName}</span>
        <span className="gt-chev" aria-hidden="true">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div className="gt-menu" role="listbox" aria-label="Choose language">
          <div className="gt-search-wrap">
            <input
              autoFocus
              className="gt-search"
              placeholder="Search language…"
              aria-label="Search languages"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="gt-list">
            {filtered.map(([code, en, nat]) => (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={code === cur}
                className={"gt-item" + (code === cur ? " on" : "")}
                onClick={() => applyLang(code)}
              >
                <span className="gt-native">{nat}</span>
                <span className="gt-eng">{en}</span>
                {code === cur && (
                  <span className="gt-check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="gt-empty">No language found</div>
            )}
          </div>
        </div>
      )}
      <div id="google_translate_element" className="gt-hidden" aria-hidden="true" />
    </div>
  );
}
