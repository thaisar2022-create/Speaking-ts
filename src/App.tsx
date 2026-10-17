/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';

// ADD LESSON WEBSITE LINKS HERE ONLY. Example: 1: "https://example.com/unit-1/"
// Unit contents are hosted separately; this home page stays lightweight.
const DEFAULT_UNIT_LINKS: Record<number, string> = {
  1: "https://speaking-u1.thaisar.org/",
  2: "https://speaking-u2.thaisar.org/",
  3: "https://speaking-u3.thaisar.org/",
  4: "https://speaking-u4.thaisar.org/",
  5: "https://speaking-u5.thaisar.org/",
  6: "https://speaking-u6.thaisar.org/",
  7: "https://speaking-u7.thaisar.org/",
  8: "https://speaking-u8.thaisar.org/",
  9: "https://speaking-u9.thaisar.org/",
  10: "https://speaking-u10.thaisar.org/",
  11: "https://speaking-u11.thaisar.org/"
};

interface UnitItem {
  id: number;
  numStr: string;
  title: string;
}

const UNITS: UnitItem[] = [
  { id: 1, numStr: "01", title: "မိတ်ဆက်ခြင်း" },
  { id: 2, numStr: "02", title: "နှုတ်ဆက်ခြင်း" },
  { id: 3, numStr: "03", title: "ကိန်းဂဏန်းများ" },
  { id: 4, numStr: "04", title: "ဈေးဝယ်ခြင်း" },
  { id: 5, numStr: "05", title: "အချိန်" },
  { id: 6, numStr: "06", title: "ရက်စွဲ" },
  { id: 7, numStr: "07", title: "အစားအစာ" },
  { id: 8, numStr: "08", title: "လမ်းညွှန်ခြင်း" },
  { id: 9, numStr: "09", title: "ကျန်းမာရေး" },
  { id: 10, numStr: "10", title: "အလုပ်အကိုင်များ" },
  { id: 11, numStr: "11", title: "မိုးလေဝသ" },
];

export default function App() {
  const [unitLinks] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('thaisar_unit_links');
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = { ...DEFAULT_UNIT_LINKS };
        for (const [k, v] of Object.entries(parsed)) {
          if (typeof v === 'string' && v.trim()) {
            merged[Number(k)] = v.trim();
          }
        }
        return merged;
      }
    } catch {
      // Fallback to defaults
    }
    return DEFAULT_UNIT_LINKS;
  });

  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 3400);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleUnitClick = (e: React.MouseEvent<HTMLAnchorElement>, unitId: number) => {
    const rawLink = unitLinks[unitId];
    if (typeof rawLink === 'string' && /^https?:\/\//i.test(rawLink.trim())) {
      // Valid web link: allow native anchor navigation with target="_blank"
      return;
    }

    e.preventDefault();
    showToast(`Unit ${unitId} အတွက် Website Link မချိတ်ရသေးပါ။`);
  };

  return (
    <>
      <header className="header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="Thaisar - ထိုင်းစာ ပင်မစာမျက်နှာ">
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczPdI1G1R7rNQMlLmGKxxGKzzfFfP9JMLDzkYaOaUv57fBHq1iLV-TK_gvpPCUzjXijjQWzjCZT8ZhIPCyttdygHy5-z84D20Nw-uqtznA67Gr73oGo=w2400"
              alt="Thaisar - ထိုင်းစာ Logo"
              width={43}
              height={43}
              onError={(e) => {
                // Fallback to local logo if remote image fails to load
                const target = e.currentTarget;
                if (!target.src.includes('school-logo')) {
                  target.src = '/school-logo.webp';
                }
              }}
            />
            <span>
              <strong className="brand-name">Thaisar - ထိုင်းစာ</strong>
              <small className="brand-sub">THAI LANGUAGE SCHOOL</small>
            </span>
          </a>
          <span className="header-pill">11 UNITS</span>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="shell">
            <h1>ထိုင်းစကားပြော သင်ခန်းစာများ</h1>
            <p>
              ထိုင်းစကားပြောသီးသန့် လေ့လာလိုသူများအတွက် ရည်ရွယ်ပါတယ်။ ထိုင်းစကားလုံးအဓိပ္ပာယ်များ၊ ဝါကျများ၊ အမေးအဖြေများအပြင် လေ့လာထားတဲ့ သင်ခန်းစာတွေကို ပိုမိုမှတ်မိစေရန် လေ့ကျင့်ခန်းများလည်း ထည့်သွင်းပေးထားပါတယ်။
            </p>
            <div className="yellow-line" aria-hidden="true" />
          </div>
        </section>

        <section className="shell main" id="unit-list">
          <div className="section-heading">
            <div>
              <h2>သင်ခန်းစာ ရွေးချယ်ရန်</h2>
              <p>သင်ယူလိုတဲ့ အခန်းကို နှိပ်ပါ</p>
            </div>
            <span className="count">01 – 11</span>
          </div>

          <div className="unit-grid">
            {UNITS.map((unit) => {
              const link = unitLinks[unit.id];
              const isValidLink = typeof link === 'string' && /^https?:\/\//i.test(link.trim());
              const href = isValidLink ? link.trim() : '#unit-list';

              return (
                <a
                  key={unit.id}
                  className="unit-card"
                  data-unit={unit.id}
                  href={href}
                  target={isValidLink ? '_blank' : undefined}
                  onClick={(e) => handleUnitClick(e, unit.id)}
                  aria-label={`Unit ${unit.id} — ${unit.title} သင်ခန်းစာ ဝင်ရန်`}
                  rel={isValidLink ? 'noopener noreferrer' : undefined}
                >
                  <div className="card-top">
                    <span className="unit-num">{unit.numStr}</span>
                    <svg
                      className="book-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 20V6C9.7 4.4 6.7 4.3 3 5.5v13c3.7-1.2 6.7-1.1 9 1.5Zm0 0V6c2.3-1.6 5.3-1.7 9-.5v13c-3.7-1.2-6.7-1.1-9 1.5Z" />
                    </svg>
                  </div>
                  <span className="unit-title">{unit.title}</span>
                  <span className="unit-go">
                    သင်ခန်းစာ ဝင်ရန် <span aria-hidden="true">↗</span>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="note">
            <span className="note-icon" aria-hidden="true">
              ⓘ
            </span>
            <span>Unit Website Link များကို နောက်မှ ချိတ်ဆက်ပါမယ်။ ယခု Frontend မှာ သင်ခန်းစာ Data မပါသေးပါ။</span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell">
          <b>Thaisar - ထိုင်းစာ</b> · Thai Language School © 2026
        </div>
      </footer>

      <div
        id="toast"
        className={`toast ${toastVisible ? 'show' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>
    </>
  );
}
