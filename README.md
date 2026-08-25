# Baldita — svetainės dizaino koncepcija

Vieno puslapio pagrindinio ekrano koncepcija įmonei **MB „Mano baldita“** (baldita.lt).
Statinis HTML/CSS/JS — be karkasų, be kompiliavimo, be priklausomybių.

---

## Kas tai yra

Nepriklausomas dizaino pasiūlymas: kaip galėtų atrodyti Balditos pagrindinis puslapis,
jei jame būtų stipriau parodyti atlikti darbai, aiškiai paaiškinta užsakymo eiga ir
įdėta trumpa užklausos forma.

**Visas turinys — iš oficialios svetainės baldita.lt.** Nė vienas faktas, terminas,
kaina ar atsiliepimas nėra sugalvotas. Visos nuotraukos — Balditos atlikti darbai
iš jų pačių galerijų; jos tik apkarpytos ir sumažintos. Detalus šaltinių sąrašas ir
sąmoningai atmestos nuotraukos — `BALDITA_RESEARCH.md` ir `assets-manifest.json`.

Puslapis pažymėtas `robots: noindex, nofollow`, o viršuje matoma juosta paaiškina,
kad tai koncepcija. Užklausos forma — **demonstracinė**: ji tikrina laukus, bet
duomenų niekur nesiunčia ir nesaugo, ir tai pasakoma vartotojui tiesiai.

---

## Struktūra

```
index.html               visas puslapis
css/styles.css           stiliai (spalvos ir tinklelis — CSS kintamuosiuose :root)
js/main.js               sąveika: meniu, lightbox, atsiradimai, forma
assets/                  30 optimizuotų nuotraukų (WebP) + og.jpg
assets-manifest.json     kiekvienos nuotraukos šaltinio URL ir apdorojimas
BALDITA_RESEARCH.md      faktų auditas: kas patvirtinta, kas atmesta ir kodėl
BALDITA_QA.md            testavimo ataskaita
audit/                   QA ekrano nuotraukos
_source/                 originalios nuotraukos ir darbiniai failai — NEREIKIA kelti
```

Į serverį keliami tik: `index.html`, `css/`, `js/`, `assets/`.

---

## Paleidimas

Bet kuris statinis serveris. Pavyzdžiui:

```bash
python -m http.server 8123 --directory baldita
```

Paskui atsidarykite `http://localhost:8123`.

Talpinimui tinka bet kuris statinis hostingas (GitHub Pages, Netlify, Cloudflare Pages) —
serverio dalies nėra.

---

## Techninės pastabos

- **Šriftai:** Spectral (antraštės) ir DM Sans (tekstas) iš Google Fonts. Abu turi
  pilną lietuvišką rinkinį (ą č ę ė į š ų ū ž) — patikrinta ekrane.
- **Spalvos ir tarpai** aprašyti `:root` kintamaisiais. Norint pakeisti kryptį,
  pakanka pakeisti tokenus.
- **Kontrastas:** visas tekstas atitinka WCAG AA (≥4.5:1 smulkiam, ≥3:1 dideliam).
  Patikrinta skaičiuojant realias atvaizduotas spalvas.
- **Animacijos** naudoja tik `transform`, `opacity` ir `clip-path`, todėl nekelia
  perpiešimo. Su `prefers-reduced-motion: reduce` maketas lieka toks pat, tik be judesio.
- **Klaviatūra:** meniu ir nuotraukų peržiūra veikia be pelės (Tab, Esc, ← →),
  fokusas grįžta į paspaustą elementą.
- **Nuotraukos:** WebP, `loading="lazy"`, nurodyti `width`/`height`, todėl kraunant
  maketas nešokinėja. Bendras svoris — apie 1,9 MB visoms 30 nuotraukų.

---

## Jei koncepcija tinka — ką reikėtų padaryti toliau

1. Prijungti realų formos apdorojimą (el. paštas arba CRM) ir vietoj demonstracinio
   pranešimo rodyti tikrą patvirtinimą.
2. Nuimti `robots: noindex` ir koncepcijos juostą.
3. Sudėti tikslesnius darbų pavadinimus (miestas, metai, medžiagos) — dabar parašai
   aprašo tik tai, kas matoma nuotraukoje, nes daugiau duomenų šaltinyje nėra.
4. Pridėti likusius skyrius (Lizingas, Buitinė technika, Furnitūra, Atsiliepimai)
   kaip atskirus puslapius ta pačia stilistika.
