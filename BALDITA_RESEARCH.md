# Baldita — šaltinių auditas (research notes)

Šaltinis: https://baldita.lt/ — perskaityta 2026-08-25.
Puslapiai: `/`, `/apie-mus/`, `/baldai/` ir visi 8 poskyriai, `/lizingas/`, `/buitine-technika/`,
`/furnitura/`, `/atsiliepimai/`, `/kontaktai/`.
Nuotraukos paimtos per WordPress REST API (`/wp-json/wp/v2/media`, 509 įrašai) ir suvestos su
widgetkit galerijų sąrašais, kad būtų aišku, kuri nuotrauka kuriame skyriuje realiai rodoma.

---

## FACT — patvirtinta šaltinyje ir panaudota koncepte

| Faktas | Kur patvirtinta |
|---|---|
| Nestandartinių korpusinių baldų gamyba pagal individualius užsakymus | `/`, `/apie-mus/` |
| Kryptys: virtuvės, spintos (t. p. stumdomomis durimis), svetainės, prieškambaris, vaikų kambarys, kiti baldai | `/` kortelės + `/baldai/` poskyriai |
| Paslaugos: projektavimas · gamyba pagal užsakymą · pristatymas nurodytu adresu · montavimas · dizainerio konsultacijos renkantis baldus ir įmontuojamą buitinę techniką | `/apie-mus/` („Mūsų teikiamos paslaugos“) |
| Projektai pritaikomi konkrečios erdvės išmatavimams, stiliaus reikalavimams ir finansinėms galimybėms | `/baldai/virtuves-baldai/`, `/baldai/svetaines-baldai/`, `/baldai/prieskambario-baldai/` |
| Padeda parinkti projekto sprendimą, spalvas ir furnitūrą | `/`, `/apie-mus/` |
| Garantija: **5 metai furnitūrai, 2 metai pagamintiems baldams** | `/apie-mus/` (pažodžiui) |
| Gamyba Panevėžyje, paslaugos **visoje Lietuvoje** | `/apie-mus/`, `/kontaktai/`, `/` juosta |
| Plokštės: PFLEIDERER GRAJEWO (PL), EGGER (AT), ECOPAL (DE), THERMOPAL (DE/IT), WODEGO (DE); natūraliu lukštu klijuota plokštė; dažytos MDF durelės; stiklas | `/apie-mus/` sąrašas |
| Stalviršiai: HPL dengti medžio drožlių, 10 mm Compact, dirbtinio akmens | `/apie-mus/` |
| Furnitūra: **Blum** (AT), **Häfele** (DE), **Grass** (AT) | `/apie-mus/` |
| Furnitūros tipai: stalčių bėgeliai, lankstai, durelių pakėlimo mechanizmai, virtuvės priedai (cargo krepšiai, džiovyklės), spintų priedai | `/` skyrius „Mūsų naudojama baldų furnitūra“, `/furnitura/` |
| Siūlo įsigyti ir buitinę techniką, plautuves, maišytuvus; sumontavimas nekainuoja papildomai | `/apie-mus/`, `/buitine-technika/` |
| Lizingas su **Inbank**: nuo 50 iki 10 000 Eur, terminas iki 72 mėn. | `/lizingas/` |
| Sertifikuotos, aplinkai saugios medžiagos | `/` trijų punktų juosta, `/apie-mus/` |
| Adresas: Pušaloto g. 211, LT-35291 Panevėžys | `/kontaktai/`, poraštė |
| Užsakymai: Erikas Tomaševičius, +370 608 39394, info@baldita.lt | `/kontaktai/` |
| Projektuotoja: Renata Baliutavičienė, +370 657 64908, projektai@baldita.lt | `/kontaktai/` |
| Darbo laikas: I–V 9:00–17:00, pietūs 12:30–13:30, VI–VII nedirba | `/kontaktai/` |
| Rekvizitai: MB „Mano baldita“, įm. k. 304956995, PVM LT100012473413 | `/kontaktai/` |
| Atsiliepimai (cituoti pažodžiui, su ta pačia data ir parašu) | `/atsiliepimai/` |

Panaudoti atsiliepimai: Daiva Čerkienė (2025-06-11), Inga iš Kauno (2025-02-15),
Vytautas ir Vida (2022-01-21). Tekstas nekeistas, tik sutrumpintas be prasmės iškraipymo —
pilnas variantas lieka šaltinyje.

---

## EXCLUDED — sąmoningai nepanaudota

- **„Dešimtmetį baldus gaminanti Baldita“** (`/apie-mus/`) — KONFLIKTAS su poraštės
  „© 2018 MB „MANO BALDITA““ ir su įmonės kodu, registruotu 2018 m. Tekstas greičiausiai
  pasenęs. Jokio patirties metų skaičiaus koncepte nėra.
- **Konkretūs terminai** („pagaminsime per X savaičių“) — šaltinyje nėra. Nepridėta.
- **Kainos, nuolaidos, avanso dydis** — šaltinyje nėra kaip įmonės sąlygos. Kliento
  atsiliepime minimas 200 Eur avansas nuo 7000 Eur užsakymo, bet tai vieno kliento patirtis,
  ne skelbiama taisyklė — koncepte kaip sąlyga nenaudojama.
- **3D vizualizacijos, eskizai, nemokamas matavimas atvykus** — šaltinyje niekur neminima.
  Nepridėta. Proceso 2 žingsnis suformuluotas tik iš to, kas parašyta: konsultacija,
  projektavimas ir pritaikymas erdvės išmatavimams.
- **Gamybos mastas, darbuotojų skaičius, atlikti projektų kiekiai, apdovanojimai, reitingai** —
  šaltinyje nėra. Nepridėta.
- **Minkšti baldai (AMORE, BOSTON, MELODY, NEVADA · „Quelle“, „Vito“)** — tai perparduodamų
  gamintojų katalogo nuotraukos, ne Balditos gaminiai. Koncepte nerodomos.

---

## NUOTRAUKOS

Visos naudojamos nuotraukos — iš oficialaus baldita.lt (`/wp-content/uploads/...`),
atsisiųstos 2026-08-25 originalia raiška ir tik **apkarpytos bei sumažintos** (be didinimo,
be filtrų, be generavimo). Pilnas sąrašas — `assets-manifest.json`.

**Atmesta kaip ne Balditos darbai** (rasta jų galerijose, bet failų vardai ir vaizdas rodo
svetimą šaltinį — katalogus, stock’ą ar kitas studijas):

- `the-greywall-de-YCL-foto-norbert-tukaj-16.jpg` — YCL Studio projektas, fot. Norbert Tukaj
- `8851ec45890511.5840516de27fd.jpg` — Behance failo vardas
- `1Ef-yUynq3I-min.jpg` — stock nuotraukos ID formatas
- `Interstar-design-woonwand.jpg`, `prodotti-175417-rel04a5…`, `Beige-console-units-min.jpg`,
  `20120802083545-min.jpg`, `563016816a19e63963d5e22aee627fbb-min.jpg`,
  `6ee12d7624bf8de997b8ab4362112e2c.jpg`, `fad19597bf76520d016971aeede09ae8.jpg` — svetimų
  katalogų / vizualizacijų failai
- `AMORE-*-Quelle-*.jpg`, `BOSTON-*`, `MELODY-*`, `NEVADA-*` — perparduodamų sofų katalogas
- `lankstas-blum.jpg`, `stalciu-sistemos.jpg`, `pakelimo-mechanizmai.jpg`,
  `cargo-krepsys-1.jpg`, `kampiniai-mechanizmai.jpg`, `ukine-spinta-1.jpg` — gamintojų
  produktų nuotraukos (400×400). Furnitūros skyriuje vietoj jų naudojama tikra Balditos
  darbo detalė, o gamintojai įvardyti tekstu.

**Kadravimas:** visos nuotraukos apkarpytos tik kompozicijai (4:5, 3:2, 4:3, 1:1). Turinys
nekeistas, nieko nepašalinta ir nepridėta.
