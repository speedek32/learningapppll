const Learn = (() => {

  const NOTES = [
    {
      id: 'inf02',
      title: 'INF.02 – Sieci i systemy',
      icon: '🖥️',
      color: '#3b82f6',
      sections: [
        {
          heading: 'Model OSI – 7 warstw',
          content: `<table class="learn-table">
<tr><th>#</th><th>Warstwa</th><th>Protokoły / urządzenia</th></tr>
<tr><td>7</td><td>Aplikacji</td><td>HTTP, FTP, SMTP, DNS, DHCP</td></tr>
<tr><td>6</td><td>Prezentacji</td><td>SSL/TLS, kompresja, szyfrowanie</td></tr>
<tr><td>5</td><td>Sesji</td><td>NetBIOS, RPC</td></tr>
<tr><td>4</td><td>Transportu</td><td>TCP (niezawodny), UDP (szybki)</td></tr>
<tr><td>3</td><td>Sieciowa</td><td>IP, ICMP, ARP – <strong>Router</strong></td></tr>
<tr><td>2</td><td>Łącza danych</td><td>Ethernet, MAC, VLAN – <strong>Switch</strong></td></tr>
<tr><td>1</td><td>Fizyczna</td><td>Kable, Hub, sygnały elektryczne</td></tr>
</table>`
        },
        {
          heading: 'Kluczowe porty (zapamiętaj!)',
          content: `<div class="learn-pills">
<span>FTP: 20/21</span><span>SSH: 22</span><span>Telnet: 23</span><span>SMTP: 25/587</span>
<span>DNS: 53</span><span>HTTP: 80</span><span>POP3: 110</span><span>IMAP: 143</span>
<span>HTTPS: 443</span><span>RDP: 3389</span><span>SNMP: 161</span><span>LDAP: 389</span>
</div>`
        },
        {
          heading: 'Adresy prywatne IPv4',
          content: `<table class="learn-table">
<tr><th>Klasa</th><th>Zakres</th><th>Maska domyślna</th></tr>
<tr><td>A</td><td>10.0.0.0 – 10.255.255.255</td><td>/8 (255.0.0.0)</td></tr>
<tr><td>B</td><td>172.16.0.0 – 172.31.255.255</td><td>/12 (255.240.0.0)</td></tr>
<tr><td>C</td><td>192.168.0.0 – 192.168.255.255</td><td>/24 (255.255.255.0)</td></tr>
</table>
<p class="learn-tip">💡 Loopback: 127.0.0.1 | APIPA (brak DHCP): 169.254.x.x</p>`
        },
        {
          heading: 'CIDR – maski podsieci',
          content: `<table class="learn-table">
<tr><th>CIDR</th><th>Maska</th><th>Hostów</th></tr>
<tr><td>/30</td><td>255.255.255.252</td><td>2</td></tr>
<tr><td>/29</td><td>255.255.255.248</td><td>6</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr>
<tr><td>/27</td><td>255.255.255.224</td><td>30</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>62</td></tr>
<tr><td>/25</td><td>255.255.255.128</td><td>126</td></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>254</td></tr>
</table>
<p class="learn-tip">💡 Wzór: liczba hostów = 2^n - 2 (n = bity hosta)</p>`
        },
        {
          heading: 'RAID – poziomy',
          content: `<table class="learn-table">
<tr><th>RAID</th><th>Min. dysków</th><th>Opis</th></tr>
<tr><td>0</td><td>2</td><td>Striping – prędkość, BRAK redundancji</td></tr>
<tr><td>1</td><td>2</td><td>Mirroring – pełna kopia, wolniej</td></tr>
<tr><td>5</td><td>3</td><td>Striping + parzystość, 1 dysk awarii</td></tr>
<tr><td>6</td><td>4</td><td>2 dyski parzystości, 2 dyski awarii</td></tr>
<tr><td>10</td><td>4</td><td>Mirror + Stripe – najlepszy kompromis</td></tr>
</table>`
        },
        {
          heading: 'Polecenia Windows / Linux (matura)',
          content: `<table class="learn-table">
<tr><th>Polecenie</th><th>Działanie</th></tr>
<tr><td>ipconfig /all</td><td>Pełna konfiguracja kart sieciowych</td></tr>
<tr><td>ipconfig /flushdns</td><td>Czyszczenie cache DNS</td></tr>
<tr><td>ping [host]</td><td>Test dostępności – ICMP Echo</td></tr>
<tr><td>tracert / traceroute</td><td>Śledzenie trasy pakietu</td></tr>
<tr><td>nslookup [domena]</td><td>Sprawdzenie rekordów DNS</td></tr>
<tr><td>netstat -an</td><td>Aktywne połączenia i porty</td></tr>
<tr><td>arp -a</td><td>Tablica ARP (IP ↔ MAC)</td></tr>
<tr><td>chmod 755 plik</td><td>rwxr-xr-x (Linux uprawnienia)</td></tr>
</table>`
        }
      ]
    },
    {
      id: 'inf03',
      title: 'INF.03 – Strony i bazy danych',
      icon: '💾',
      color: '#8b5cf6',
      sections: [
        {
          heading: 'HTML5 – ważne tagi',
          content: `<table class="learn-table">
<tr><th>Tag</th><th>Znaczenie</th></tr>
<tr><td>&lt;header&gt;</td><td>Nagłówek strony/sekcji (semantyczny)</td></tr>
<tr><td>&lt;nav&gt;</td><td>Nawigacja</td></tr>
<tr><td>&lt;main&gt;</td><td>Główna treść strony</td></tr>
<tr><td>&lt;article&gt;</td><td>Niezależna treść (post, news)</td></tr>
<tr><td>&lt;section&gt;</td><td>Sekcja tematyczna</td></tr>
<tr><td>&lt;aside&gt;</td><td>Treść poboczna (sidebar)</td></tr>
<tr><td>&lt;footer&gt;</td><td>Stopka strony/sekcji</td></tr>
<tr><td>&lt;figure&gt;</td><td>Ilustracja z podpisem (&lt;figcaption&gt;)</td></tr>
</table>`
        },
        {
          heading: 'CSS – selektory',
          content: `<table class="learn-table">
<tr><th>Selektor</th><th>Wybiera</th></tr>
<tr><td>p</td><td>Wszystkie &lt;p&gt;</td></tr>
<tr><td>.klasa</td><td>Elementy z class="klasa"</td></tr>
<tr><td>#id</td><td>Element z id="id" (unikalny)</td></tr>
<tr><td>div > p</td><td>Bezpośrednie dzieci &lt;p&gt; w &lt;div&gt;</td></tr>
<tr><td>div p</td><td>Wszyscy potomkowie &lt;p&gt; w &lt;div&gt;</td></tr>
<tr><td>a:hover</td><td>Link w stanie najechania</td></tr>
<tr><td>input[type="text"]</td><td>Inputy o typie text</td></tr>
<tr><td>p:first-child</td><td>Pierwsze dziecko będące &lt;p&gt;</td></tr>
</table>`
        },
        {
          heading: 'SQL – najważniejsze polecenia',
          content: `<div class="learn-code">SELECT * FROM users WHERE age > 18 ORDER BY name ASC;

INSERT INTO users (name, email) VALUES ('Jan', 'jan@x.pl');

UPDATE users SET email = 'nowy@x.pl' WHERE id = 5;

DELETE FROM users WHERE id = 5;

SELECT u.name, o.total FROM users u
  INNER JOIN orders o ON u.id = o.user_id;

SELECT category, COUNT(*) as ile FROM products GROUP BY category HAVING COUNT(*) > 5;</div>
<p class="learn-tip">💡 WHERE filtruje wiersze, HAVING filtruje grupy po GROUP BY</p>`
        },
        {
          heading: 'HTTP – kody statusu',
          content: `<div class="learn-pills">
<span>200 OK</span><span>201 Created</span><span>204 No Content</span>
<span>301 Moved Permanently</span><span>302 Found (tymcz.)</span>
<span>400 Bad Request</span><span>401 Unauthorized</span><span>403 Forbidden</span>
<span>404 Not Found</span><span>500 Server Error</span><span>503 Service Unavailable</span>
</div>`
        },
        {
          heading: 'Normalizacja baz danych',
          content: `<table class="learn-table">
<tr><th>Postać</th><th>Warunek</th></tr>
<tr><td>1NF</td><td>Atomowe wartości, brak powtarzających się grup kolumn</td></tr>
<tr><td>2NF</td><td>1NF + każda kolumna zależy od CAŁEGO klucza głównego</td></tr>
<tr><td>3NF</td><td>2NF + brak zależności tranzytywnych (kolumna → kolumna → klucz)</td></tr>
</table>
<p class="learn-tip">💡 Klucz główny (PK): unikalny + NOT NULL. Klucz obcy (FK): referencja do PK innej tabeli</p>`
        },
        {
          heading: 'HTTP metody REST',
          content: `<table class="learn-table">
<tr><th>Metoda</th><th>Akcja CRUD</th><th>Przykład</th></tr>
<tr><td>GET</td><td>Odczyt</td><td>GET /users/5</td></tr>
<tr><td>POST</td><td>Tworzenie</td><td>POST /users</td></tr>
<tr><td>PUT/PATCH</td><td>Aktualizacja</td><td>PUT /users/5</td></tr>
<tr><td>DELETE</td><td>Usunięcie</td><td>DELETE /users/5</td></tr>
</table>`
        }
      ]
    },
    {
      id: 'inf04',
      title: 'INF.04 – Tworzenie aplikacji',
      icon: '⌨️',
      color: '#06b6d4',
      sections: [
        {
          heading: '4 filary OOP',
          content: `<table class="learn-table">
<tr><th>Filar</th><th>Opis</th></tr>
<tr><td>Enkapsulacja</td><td>Ukrycie danych (private) + dostęp przez metody</td></tr>
<tr><td>Dziedziczenie</td><td>Klasa potomna przejmuje właściwości klasy bazowej</td></tr>
<tr><td>Polimorfizm</td><td>Ta sama metoda – różne zachowania w podklasach</td></tr>
<tr><td>Abstrakcja</td><td>Klasy abstrakcyjne i interfejsy – „co", nie „jak"</td></tr>
</table>`
        },
        {
          heading: 'Złożoność algorytmów (Big-O)',
          content: `<table class="learn-table">
<tr><th>Notacja</th><th>Przykład</th><th>Opis</th></tr>
<tr><td>O(1)</td><td>Dostęp do tablicy</td><td>Stały czas</td></tr>
<tr><td>O(log n)</td><td>Binary search</td><td>Logarytmiczny</td></tr>
<tr><td>O(n)</td><td>Przejście przez listę</td><td>Liniowy</td></tr>
<tr><td>O(n log n)</td><td>Merge sort, Heap sort</td><td>Efektywne sortowanie</td></tr>
<tr><td>O(n²)</td><td>Bubble sort, Selection sort</td><td>Wolne dla dużych n</td></tr>
<tr><td>O(2ⁿ)</td><td>Naiwne algorytmy kombin.</td><td>Wykładniczy – unikać</td></tr>
</table>`
        },
        {
          heading: 'Struktury danych',
          content: `<table class="learn-table">
<tr><th>Struktura</th><th>Tryb</th><th>Zastosowanie</th></tr>
<tr><td>Stos (Stack)</td><td>LIFO</td><td>Wywołania funkcji, undo/redo</td></tr>
<tr><td>Kolejka (Queue)</td><td>FIFO</td><td>Zadania w tle, BFS</td></tr>
<tr><td>Lista powiązana</td><td>Sekwencyjna</td><td>Elastyczne dodawanie/usuwanie</td></tr>
<tr><td>Drzewo (BST)</td><td>Hierarchia</td><td>Wyszukiwanie, sortowanie</td></tr>
<tr><td>Hash map</td><td>Klucz→wartość</td><td>Słowniki, cache, bazy danych</td></tr>
</table>`
        },
        {
          heading: 'Wzorce projektowe (Design Patterns)',
          content: `<table class="learn-table">
<tr><th>Wzorzec</th><th>Kategoria</th><th>Zastosowanie</th></tr>
<tr><td>Singleton</td><td>Kreacyjny</td><td>Jedna instancja (config, logger)</td></tr>
<tr><td>Factory</td><td>Kreacyjny</td><td>Tworzenie obiektów bez new</td></tr>
<tr><td>Observer</td><td>Behawioralny</td><td>Event-driven, powiadomienia</td></tr>
<tr><td>MVC</td><td>Architektoniczny</td><td>Model-View-Controller</td></tr>
<tr><td>Decorator</td><td>Strukturalny</td><td>Dodawanie zachowań dynamicznie</td></tr>
</table>`
        },
        {
          heading: 'Git – podstawowe polecenia',
          content: `<div class="learn-code">git init                  # inicjalizacja repo
git clone [url]           # klonowanie
git status                # stan plików
git add .                 # staging wszystkich zmian
git commit -m "opis"      # zapisanie commitu
git push origin main      # wysłanie na serwer
git pull                  # pobranie zmian
git branch [nazwa]        # nowa gałąź
git checkout [branch]     # przełączenie gałęzi
git merge [branch]        # scalanie gałęzi</div>`
        },
        {
          heading: 'Metodyki Agile / Scrum',
          content: `<table class="learn-table">
<tr><th>Element</th><th>Opis</th></tr>
<tr><td>Sprint</td><td>Iteracja 1-4 tyg., dostarczenie przyrostu</td></tr>
<tr><td>Backlog</td><td>Lista user stories/zadań do realizacji</td></tr>
<tr><td>Product Owner</td><td>Zarządza backlogiem, priorytety</td></tr>
<tr><td>Scrum Master</td><td>Moderuje, usuwa przeszkody</td></tr>
<tr><td>Daily Standup</td><td>15-min codzienne spotkanie</td></tr>
<tr><td>Retrospektywa</td><td>Podsumowanie sprintu, ulepszenia</td></tr>
</table>`
        }
      ]
    },
    {
      id: 'ee08',
      title: 'EE.08 – Elektronika',
      icon: '⚡',
      color: '#f59e0b',
      sections: [
        {
          heading: 'Prawa podstawowe',
          content: `<table class="learn-table">
<tr><th>Prawo</th><th>Wzór</th><th>Jednostki</th></tr>
<tr><td>Ohma</td><td>U = I × R</td><td>V = A × Ω</td></tr>
<tr><td>Moc</td><td>P = U × I = I²R = U²/R</td><td>W = V × A</td></tr>
<tr><td>Kirchhoff I (prąd)</td><td>ΣI_wchodzące = ΣI_wychodzące</td><td>A</td></tr>
<tr><td>Kirchhoff II (napięcie)</td><td>ΣU = 0 (w zamkniętej pętli)</td><td>V</td></tr>
</table>
<p class="learn-tip">💡 Szeregowo: R_zast = R1+R2 | Równolegle: 1/R = 1/R1 + 1/R2</p>`
        },
        {
          heading: 'Kod kolorów rezystorów (4 paski)',
          content: `<table class="learn-table">
<tr><th>Kolor</th><th>Cyfra</th><th>Mnożnik</th></tr>
<tr><td style="color:#000">Czarny</td><td>0</td><td>×1</td></tr>
<tr><td style="color:#8B4513">Brązowy</td><td>1</td><td>×10</td></tr>
<tr><td style="color:#dc2626">Czerwony</td><td>2</td><td>×100</td></tr>
<tr><td style="color:#f97316">Pomarańczowy</td><td>3</td><td>×1k</td></tr>
<tr><td style="color:#ca8a04">Żółty</td><td>4</td><td>×10k</td></tr>
<tr><td style="color:#16a34a">Zielony</td><td>5</td><td>×100k</td></tr>
<tr><td style="color:#2563eb">Niebieski</td><td>6</td><td>×1M</td></tr>
<tr><td>Złoty</td><td>–</td><td>×0,1 / ±5%</td></tr>
<tr><td>Srebrny</td><td>–</td><td>×0,01 / ±10%</td></tr>
</table>
<p class="learn-tip">💡 Mnemonik: Czarny Brązowy Czerwony Pomarańczowy Żółty Zielony Niebieski Fioletowy Szary Biały (0-9)</p>`
        },
        {
          heading: 'Bramki logiczne',
          content: `<table class="learn-table">
<tr><th>Bramka</th><th>Symbol</th><th>Opis</th></tr>
<tr><td>AND</td><td>A·B</td><td>1 tylko gdy A=1 AND B=1</td></tr>
<tr><td>OR</td><td>A+B</td><td>1 gdy choć jedno = 1</td></tr>
<tr><td>NOT</td><td>Ā</td><td>Negacja: 0→1, 1→0</td></tr>
<tr><td>NAND</td><td>¬(A·B)</td><td>Odwróć AND – uniwersalna!</td></tr>
<tr><td>NOR</td><td>¬(A+B)</td><td>Odwróć OR – uniwersalna!</td></tr>
<tr><td>XOR</td><td>A⊕B</td><td>1 gdy wejścia różne (parzystość)</td></tr>
</table>`
        },
        {
          heading: 'System binarny ↔ dziesiętny',
          content: `<table class="learn-table">
<tr><th>Bin</th><th>Dec</th><th>Hex</th></tr>
<tr><td>0000</td><td>0</td><td>0</td></tr>
<tr><td>0001</td><td>1</td><td>1</td></tr>
<tr><td>0100</td><td>4</td><td>4</td></tr>
<tr><td>1000</td><td>8</td><td>8</td></tr>
<tr><td>1010</td><td>10</td><td>A</td></tr>
<tr><td>1111</td><td>15</td><td>F</td></tr>
<tr><td>1 0000</td><td>16</td><td>10</td></tr>
</table>
<p class="learn-tip">💡 Bity: 8 bit = 1 bajt. 1 bajt = 0–255 (FF hex). 1 kB = 1024 B</p>`
        },
        {
          heading: 'Elementy elektroniczne – symbole',
          content: `<table class="learn-table">
<tr><th>Symbol</th><th>Element</th><th>Jednostka</th></tr>
<tr><td>R</td><td>Rezystor</td><td>Ω (Ohm)</td></tr>
<tr><td>C</td><td>Kondensator</td><td>F (Farad)</td></tr>
<tr><td>L</td><td>Cewka indukcyjna</td><td>H (Henr)</td></tr>
<tr><td>D</td><td>Dioda</td><td>–</td></tr>
<tr><td>T / Q</td><td>Tranzystor BJT</td><td>–</td></tr>
<tr><td>U / IC</td><td>Układ scalony</td><td>–</td></tr>
</table>`
        }
      ]
    },
    {
      id: 'ee09',
      title: 'EE.09 – Instalacje elektryczne',
      icon: '🔌',
      color: '#f97316',
      sections: [
        {
          heading: 'Kolory przewodów (PN-IEC 60446)',
          content: `<table class="learn-table">
<tr><th>Przewód</th><th>Kolor</th></tr>
<tr><td>PE (ochronny)</td><td>🟡🟢 Żółto-zielony</td></tr>
<tr><td>N (neutralny)</td><td>🔵 Niebieski</td></tr>
<tr><td>L1 (faza)</td><td>🟤 Brązowy</td></tr>
<tr><td>L2 (faza)</td><td>⚫ Czarny</td></tr>
<tr><td>L3 (faza)</td><td>⚪ Szary</td></tr>
</table>
<p class="learn-tip">💡 230V = faza do neutralnego | 400V = faza do fazy (3-fazowe)</p>`
        },
        {
          heading: 'Przekroje przewodów (norma)',
          content: `<table class="learn-table">
<tr><th>Obwód</th><th>Min. przekrój</th></tr>
<tr><td>Oświetlenie</td><td>1,5 mm²</td></tr>
<tr><td>Gniazdka ogólne</td><td>2,5 mm²</td></tr>
<tr><td>Kuchenka elektryczna</td><td>4,0 mm²</td></tr>
<tr><td>Piec, bojler 7kW+</td><td>6,0 mm²</td></tr>
</table>`
        },
        {
          heading: 'Systemy instalacji TN',
          content: `<table class="learn-table">
<tr><th>System</th><th>Opis</th></tr>
<tr><td>TN-S</td><td>Oddzielne PE i N – bezpieczniejszy, nowe budynki</td></tr>
<tr><td>TN-C</td><td>Wspólny PEN – stare instalacje, nie dla gniazdek</td></tr>
<tr><td>TN-C-S</td><td>TN-C w sieci, TN-S w budynku (typowe)</td></tr>
<tr><td>TT</td><td>Własny uziom w budynku (wymagany RCD)</td></tr>
</table>`
        },
        {
          heading: 'Wyłączniki ochronne',
          content: `<table class="learn-table">
<tr><th>Urządzenie</th><th>Skrót</th><th>Chroni przed</th></tr>
<tr><td>Wyłącznik nadprądowy</td><td>MCB</td><td>Przeciążeniem i zwarciem</td></tr>
<tr><td>Różnicowoprądowy</td><td>RCD/RCCB</td><td>Porażeniem (≥30mA)</td></tr>
<tr><td>Kombinowany</td><td>RCBO</td><td>Przeciążenie + porażenie</td></tr>
<tr><td>Ogranicznik przepięć</td><td>SPD</td><td>Przepięciami (piorun)</td></tr>
</table>
<p class="learn-tip">💡 RCD 30mA – ochrona życia. RCD 300mA – ochrona p-pożarowa</p>`
        },
        {
          heading: 'Wzory elektryczne',
          content: `<table class="learn-table">
<tr><th>Wielkość</th><th>Wzór</th></tr>
<tr><td>Moc (1-fazowa)</td><td>P = U × I × cosφ</td></tr>
<tr><td>Moc (3-fazowa)</td><td>P = √3 × U_L × I_L × cosφ</td></tr>
<tr><td>Prędkość synchroniczna</td><td>n = 60 × f / p</td></tr>
<tr><td>Przekładnia trafo</td><td>U1/U2 = n1/n2</td></tr>
</table>
<p class="learn-tip">💡 cosφ = 1 dla obciążenia rezystancyjnego. Silniki: cosφ ≈ 0,7–0,9</p>`
        }
      ]
    },
    {
      id: 'au30',
      title: 'AU.30 – Technik samochodowy',
      icon: '🚗',
      color: '#64748b',
      sections: [
        {
          heading: '4-suwowy cykl pracy silnika',
          content: `<table class="learn-table">
<tr><th>Suw</th><th>Co się dzieje</th></tr>
<tr><td>1. Ssanie</td><td>Tłok ↓, zawór dolotowy otwarty, mieszanka/powietrze wchodzi</td></tr>
<tr><td>2. Sprężanie</td><td>Tłok ↑, oba zawory zamknięte, mieszanka sprężana</td></tr>
<tr><td>3. Praca</td><td>Zapłon → rozprężenie → tłok ↓ – jedyny suw napędowy</td></tr>
<tr><td>4. Wydech</td><td>Tłok ↑, zawór wydechowy otwarty, spaliny wydmuchane</td></tr>
</table>`
        },
        {
          heading: 'Czujniki silnika (ECU)',
          content: `<table class="learn-table">
<tr><th>Czujnik</th><th>Mierzy</th></tr>
<tr><td>MAF (Mass Air Flow)</td><td>Masę powietrza [g/s]</td></tr>
<tr><td>MAP (Manifold Abs. Pressure)</td><td>Ciśnienie w kolektorze</td></tr>
<tr><td>Lambda (O₂)</td><td>Zawartość O₂ w spalinach (λ=1 = idealne)</td></tr>
<tr><td>CKP (korbowód)</td><td>Obroty i pozycja wału korbowego</td></tr>
<tr><td>CMP (rozrząd)</td><td>Pozycja wałka rozrządu</td></tr>
<tr><td>ECT</td><td>Temperatura cieczy chłodzącej</td></tr>
<tr><td>TPS</td><td>Pozycja przepustnicy (gaz)</td></tr>
</table>`
        },
        {
          heading: 'Kody błędów OBD-II',
          content: `<table class="learn-table">
<tr><th>Prefiks</th><th>Dotyczy</th></tr>
<tr><td>P0xxx</td><td>Ogólne (SAE) – napęd</td></tr>
<tr><td>P1xxx</td><td>Specyficzne dla producenta</td></tr>
<tr><td>B0xxx</td><td>Nadwozie (Body)</td></tr>
<tr><td>C0xxx</td><td>Podwozie (Chassis)</td></tr>
<tr><td>U0xxx</td><td>Sieć CAN/komunikacja</td></tr>
</table>
<p class="learn-tip">💡 P0300 = losowe chybienie zapłonu | P0171 = mieszanka za uboga</p>`
        },
        {
          heading: 'Układy bezpieczeństwa (aktywne)',
          content: `<table class="learn-table">
<tr><th>System</th><th>Funkcja</th></tr>
<tr><td>ABS</td><td>Zapobiega blokowaniu kół przy hamowaniu</td></tr>
<tr><td>EBD</td><td>Elektroniczny rozdział siły hamowania (oś P/T)</td></tr>
<tr><td>ESP/ESC</td><td>Stabilizacja toru jazdy, zapobieganie poślizgowi</td></tr>
<tr><td>ASR/TCS</td><td>Kontrola trakcji – ogranicza poślizg napędowy</td></tr>
<tr><td>EPS</td><td>Elektryczne wspomaganie układu kierowniczego</td></tr>
</table>`
        },
        {
          heading: 'Napięcia akumulatora',
          content: `<table class="learn-table">
<tr><th>Stan</th><th>Napięcie</th></tr>
<tr><td>Naładowany</td><td>12,6–12,8 V</td></tr>
<tr><td>50% naładowany</td><td>~12,2 V</td></tr>
<tr><td>Rozładowany</td><td>&lt; 12,0 V</td></tr>
<tr><td>Ładowanie (alternator)</td><td>13,8–14,4 V</td></tr>
</table>`
        }
      ]
    },
    {
      id: 'eka01',
      title: 'EKA.01 – Rachunkowość',
      icon: '📊',
      color: '#10b981',
      sections: [
        {
          heading: 'Równanie bilansowe',
          content: `<div class="learn-formula">AKTYWA = PASYWA</div>
<table class="learn-table">
<tr><th>Aktywa</th><th>Pasywa</th></tr>
<tr><td>Trwałe (> 1 roku): środki trwałe, WNiP, inwestycje długoterm.</td><td>Kapitał własny: kapitał zakładowy, zysk, rezerwy</td></tr>
<tr><td>Obrotowe (≤ 1 roku): zapasy, należności, środki pieniężne</td><td>Zobowiązania: kredyty, pożyczki, zobowiązania wobec dostawców</td></tr>
</table>`
        },
        {
          heading: 'Stawki VAT w Polsce',
          content: `<table class="learn-table">
<tr><th>Stawka</th><th>Dotyczy</th></tr>
<tr><td>23%</td><td>Stawka podstawowa (większość towarów i usług)</td></tr>
<tr><td>8%</td><td>Usługi budowlane, część żywności, restauracje, hotele</td></tr>
<tr><td>5%</td><td>Podstawowe produkty żywnościowe, książki, leki</td></tr>
<tr><td>0%</td><td>Eksport, wewnątrzwspólnotowa dostawa</td></tr>
<tr><td>ZW</td><td>Zwolnione: usługi medyczne, edukacyjne, finansowe</td></tr>
</table>`
        },
        {
          heading: 'Konta – zasada podwójnego zapisu',
          content: `<table class="learn-table">
<tr><th>Typ konta</th><th>Debet (Wn) →</th><th>Kredyt (Ma) →</th></tr>
<tr><td>Aktywa</td><td>Zwiększenie</td><td>Zmniejszenie</td></tr>
<tr><td>Pasywa</td><td>Zmniejszenie</td><td>Zwiększenie</td></tr>
<tr><td>Koszty</td><td>Zwiększenie</td><td>Zmniejszenie</td></tr>
<tr><td>Przychody</td><td>Zmniejszenie</td><td>Zwiększenie</td></tr>
</table>
<p class="learn-tip">💡 Każda operacja: Wn jakiegoś konta = Ma innego konta. Suma Wn = Suma Ma.</p>`
        },
        {
          heading: 'Sprawozdania finansowe',
          content: `<table class="learn-table">
<tr><th>Dokument</th><th>Co pokazuje</th></tr>
<tr><td>Bilans</td><td>Stan majątku (aktywa) i źródła finansowania (pasywa) na dzień</td></tr>
<tr><td>RZiS (P&L)</td><td>Przychody, koszty i wynik finansowy za okres</td></tr>
<tr><td>Cash flow</td><td>Przepływy pieniężne (działaln. operacyjna/inwest./finansowa)</td></tr>
</table>`
        },
        {
          heading: 'ZUS – składki pracownicze (2024)',
          content: `<table class="learn-table">
<tr><th>Składka</th><th>Pracownik</th><th>Pracodawca</th></tr>
<tr><td>Emerytalna</td><td>9,76%</td><td>9,76%</td></tr>
<tr><td>Rentowa</td><td>1,5%</td><td>6,5%</td></tr>
<tr><td>Chorobowa</td><td>2,45%</td><td>–</td></tr>
<tr><td>Wypadkowa</td><td>–</td><td>1,67% (śred.)</td></tr>
<tr><td>Zdrowotna</td><td>9% (do NFZ)</td><td>–</td></tr>
</table>`
        }
      ]
    },
    {
      id: 'bud12',
      title: 'BUD.12 – Technik budownictwa',
      icon: '🏗️',
      color: '#d97706',
      sections: [
        {
          heading: 'Klasy betonu (wytrzymałość na ściskanie)',
          content: `<table class="learn-table">
<tr><th>Klasa</th><th>Wytrzym. char. [MPa]</th><th>Zastosowanie</th></tr>
<tr><td>C12/15</td><td>15</td><td>Podkłady, wylewki niskiej klasy</td></tr>
<tr><td>C16/20</td><td>20</td><td>Lekkie konstrukcje, fundamenty pod lekkie budowle</td></tr>
<tr><td>C20/25</td><td>25</td><td>Fundamenty, stropy, ściany nośne</td></tr>
<tr><td>C25/30</td><td>30</td><td>Konstrukcje mocno obciążone</td></tr>
<tr><td>C30/37+</td><td>37+</td><td>Mosty, wieżowce, specjalne</td></tr>
</table>`
        },
        {
          heading: 'Skale rysunków budowlanych',
          content: `<table class="learn-table">
<tr><th>Skala</th><th>1 cm = ?</th><th>Zastosowanie</th></tr>
<tr><td>1:5000</td><td>50 m</td><td>Mapy, plany sytuacyjne</td></tr>
<tr><td>1:500</td><td>5 m</td><td>Plan zagospodarowania działki</td></tr>
<tr><td>1:100</td><td>1 m</td><td>Rzuty kondygnacji, przekroje</td></tr>
<tr><td>1:50</td><td>50 cm</td><td>Szczegóły konstrukcyjne</td></tr>
<tr><td>1:20</td><td>20 cm</td><td>Węzły, detale</td></tr>
</table>`
        },
        {
          heading: 'Fundamenty – typy',
          content: `<table class="learn-table">
<tr><th>Typ</th><th>Zastosowanie</th></tr>
<tr><td>Ława fundamentowa</td><td>Pod ścianami nośnymi (ciągła)</td></tr>
<tr><td>Stopa fundamentowa</td><td>Pod słupami punktowymi</td></tr>
<tr><td>Płyta fundamentowa</td><td>Słaby grunt, całe podłoże</td></tr>
<tr><td>Pale</td><td>Bardzo słaby grunt, przeniesienie na głębsze warstwy</td></tr>
</table>`
        },
        {
          heading: 'Grubości murów z cegły ceramicznej',
          content: `<table class="learn-table">
<tr><th>Grubość</th><th>Nazwa</th></tr>
<tr><td>6,5 cm</td><td>Mur 1/4 cegły (ażurowy)</td></tr>
<tr><td>12 cm</td><td>Mur 1/2 cegły (na „kant")</td></tr>
<tr><td>25 cm</td><td>Mur 1 cegły</td></tr>
<tr><td>38 cm</td><td>Mur 1,5 cegły</td></tr>
<tr><td>51 cm</td><td>Mur 2 cegły</td></tr>
</table>
<p class="learn-tip">💡 Cegła polska: 25×12×6,5 cm. Do grubości dodaj spoinę ~1 cm</p>`
        },
        {
          heading: 'Kosztorys budowlany – elementy',
          content: `<div class="learn-formula">Cena = R + M + S + KO + Z + VAT</div>
<table class="learn-table">
<tr><th>Symbol</th><th>Składnik</th></tr>
<tr><td>R</td><td>Robocizna (stawki roboczogodzin)</td></tr>
<tr><td>M</td><td>Materiały (wg cen zakupu)</td></tr>
<tr><td>S</td><td>Sprzęt i maszyny</td></tr>
<tr><td>KO</td><td>Koszty ogólne (narzut %)</td></tr>
<tr><td>Z</td><td>Zysk kalkulacyjny (narzut %)</td></tr>
</table>`
        }
      ]
    },
    {
      id: 'ogolny',
      title: 'BHP i Prawo Pracy',
      icon: '⚖️',
      color: '#ef4444',
      sections: [
        {
          heading: 'Kodeks pracy – okresy wypowiedzenia (czas nieokreślony)',
          content: `<table class="learn-table">
<tr><th>Staż pracy</th><th>Okres wypowiedzenia</th></tr>
<tr><td>< 6 miesięcy</td><td>2 tygodnie</td></tr>
<tr><td>≥ 6 mies. do 3 lat</td><td>1 miesiąc</td></tr>
<tr><td>≥ 3 lata</td><td>3 miesiące</td></tr>
</table>`
        },
        {
          heading: 'Urlopy wypoczynkowe (KP art. 154)',
          content: `<table class="learn-table">
<tr><th>Staż pracy</th><th>Wymiar urlopu</th></tr>
<tr><td>< 10 lat</td><td>20 dni roboczych / rok</td></tr>
<tr><td>≥ 10 lat</td><td>26 dni roboczych / rok</td></tr>
</table>
<p class="learn-tip">💡 Urlop na żądanie: 4 dni z puli urlopu wypoczynkowego</p>`
        },
        {
          heading: 'Gaśnice – klasy pożarów',
          content: `<table class="learn-table">
<tr><th>Klasa</th><th>Rodzaj pożaru</th><th>Gaśnica</th></tr>
<tr><td>A</td><td>Ciała stałe (drewno, papier)</td><td>Woda, proszek ABC, CO₂</td></tr>
<tr><td>B</td><td>Ciecze i gazy palne</td><td>Proszek, CO₂, piana</td></tr>
<tr><td>C</td><td>Urządzenia elektryczne</td><td>CO₂, proszek (NIE woda!)</td></tr>
<tr><td>D</td><td>Metale aktywne (Mg, Na)</td><td>Proszek klasy D (specjalny)</td></tr>
<tr><td>F</td><td>Tłuszcze spożywcze</td><td>Gaśnica klasy F, koc</td></tr>
</table>`
        },
        {
          heading: 'Znaki BHP (kolory bezpieczeństwa)',
          content: `<table class="learn-table">
<tr><th>Kolor</th><th>Znaczenie</th></tr>
<tr><td>🔴 Czerwony</td><td>Zakaz, niebezpieczeństwo, sprzęt p-poż.</td></tr>
<tr><td>🟡 Żółty</td><td>Ostrzeżenie, zagrożenie</td></tr>
<tr><td>🔵 Niebieski</td><td>Nakaz, obowiązek</td></tr>
<tr><td>🟢 Zielony</td><td>Bezpieczeństwo, drogi ewakuacyjne</td></tr>
</table>`
        },
        {
          heading: 'Prawo autorskie',
          content: `<div class="learn-formula">Ochrona: 70 lat od śmierci autora</div>
<p style="font-size:0.875rem;line-height:1.6;">
• Twórcy przysługują prawa majątkowe (zbywalne) i osobiste (niezbywalne)<br>
• Licencja Creative Commons (CC): pozwala określić zakres użytkowania<br>
• Plagiat = naruszenie praw autorskich (sankcje karne i cywilne)<br>
• Oprogramowanie chronione jak utwór literacki
</p>`
        }
      ]
    }
  ];

  let activeId = null;

  function init() {}

  function render() {
    const el = document.getElementById('learnContent');
    if (!el) return;

    el.innerHTML = `
      <div class="learn-grid">
        ${NOTES.map(n => `
          <div class="learn-card" data-learn-id="${n.id}" style="--learn-color:${n.color}">
            <div class="learn-card-icon">${n.icon}</div>
            <div class="learn-card-title">${n.title}</div>
            <div class="learn-card-count">${n.sections.length} tematów</div>
          </div>
        `).join('')}
      </div>
      <div id="learnDetail" style="display:none;"></div>`;

    el.querySelectorAll('.learn-card').forEach(card => {
      card.addEventListener('click', () => openNote(card.dataset.learnId));
    });
  }

  function openNote(id) {
    const note = NOTES.find(n => n.id === id);
    if (!note) return;
    activeId = id;

    const detail = document.getElementById('learnDetail');
    const grid   = document.querySelector('.learn-grid');
    if (!detail || !grid) return;

    grid.style.display = 'none';
    detail.style.display = '';

    detail.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;flex-wrap:wrap;">
        <button class="btn-secondary" id="btnLearnBack">← Powrót</button>
        <h2 style="font-size:1.2rem;font-weight:800;letter-spacing:-0.03em;">${note.icon} ${note.title}</h2>
      </div>
      <div class="learn-sections">
        ${note.sections.map(s => `
          <div class="learn-section card" style="margin-bottom:0.75rem;border-left:3px solid ${note.color}">
            <h3 class="learn-section-title">${s.heading}</h3>
            <div class="learn-section-body">${s.content}</div>
          </div>
        `).join('')}
      </div>`;

    document.getElementById('btnLearnBack').addEventListener('click', () => {
      detail.style.display = 'none';
      grid.style.display = '';
      activeId = null;
    });
  }

  return { init, render };
})();
