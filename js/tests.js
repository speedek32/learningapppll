const Tests = (() => {

  // ============================================================
  // QUESTION BANK – Popular Polish vocational exams
  // ============================================================
  const CATEGORIES = [
    {
      id: 'inf02', name: 'INF.02 – Sieci i systemy', icon: '🖥️',
      desc: 'Administracja i eksploatacja systemów komputerowych i lokalnych sieci.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Który model sieci opisuje komunikację jako zbiór 7 warstw?', opts: ['TCP/IP','OSI','IEEE 802.11','SNA'], ans: 1, exp: 'Model OSI dzieli komunikację na 7 warstw: fizyczną, łącza danych, sieciową, transportową, sesji, prezentacji i aplikacji.' },
        { q: 'Adres IP 192.168.1.0/24 należy do klasy:', opts: ['A','B','C','D'], ans: 2, exp: 'Adresy 192.0.0.0–223.255.255.255 to klasa C. Maska /24 = 255.255.255.0.' },
        { q: 'Protokół DHCP służy do:', opts: ['Szyfrowania transmisji','Automatycznego przydzielania adresów IP','Tłumaczenia nazw DNS','Zarządzania plikami'], ans: 1, exp: 'DHCP (Dynamic Host Configuration Protocol) automatycznie przydziela adresy IP klientom sieci.' },
        { q: 'Domyślny system plików dysków Windows to:', opts: ['ext4','FAT32','NTFS','HFS+'], ans: 2, exp: 'NTFS (New Technology File System) obsługuje duże pliki, uprawnienia, szyfrowanie EFS i jest domyślny dla Windows.' },
        { q: 'Polecenie "ipconfig /flushdns" służy do:', opts: ['Odświeżenia IP','Wyczyszczenia cache DNS','Sprawdzenia trasy','Wyłączenia karty'], ans: 1, exp: 'Czyści lokalny cache rekordów DNS, rozwiązując problemy z rozpoznawaniem nazw domen.' },
        { q: 'Protokół SSH działa domyślnie na porcie:', opts: ['21','22','23','80'], ans: 1, exp: 'SSH (Secure Shell) używa portu 22. Porty: FTP=21, Telnet=23, HTTP=80.' },
        { q: 'Które urządzenie pracuje na warstwie 3 modelu OSI?', opts: ['Switch','Hub','Router','Repeater'], ans: 2, exp: 'Router pracuje na warstwie sieciowej (3) – trasuje pakiety na podstawie adresów IP.' },
        { q: 'Maska 255.255.255.0 odpowiada prefiksowi:', opts: ['/16','/24','/28','/32'], ans: 1, exp: '255.255.255.0 = 24 jedynkowe bity = /24.' },
        { q: 'VPN tworzy:', opts: ['Sieć bezprzewodową','Szyfrowany tunel przez internet','Lokalną sieć LAN','Bezpieczną stronę www'], ans: 1, exp: 'VPN (Virtual Private Network) tworzy szyfrowany tunel przez publiczną sieć.' },
        { q: 'Protokół FTP domyślnie używa portów:', opts: ['25 i 110','20 i 21','80 i 443','22 i 23'], ans: 1, exp: 'FTP używa portu 21 (kontrolny) i 20 (dane).' },
        { q: 'RAID 1 to:', opts: ['Striping – rozłożenie danych','Mirroring – lustrzane odbicie','Parzystość','Kombinacja stripingu i parzystości'], ans: 1, exp: 'RAID 1 (mirroring) zapisuje identyczne dane na dwóch lub więcej dyskach.' },
        { q: 'Polecenie "ping" wysyła pakiety:', opts: ['TCP SYN','UDP','ICMP Echo Request','ARP'], ans: 2, exp: 'Ping używa ICMP Echo Request/Reply do sprawdzania dostępności hosta.' },
        { q: 'Adres 172.16.0.1 jest adresem:', opts: ['Publicznym klasy B','Prywatnym','Multicastowym','Loopback'], ans: 1, exp: 'Zakres 172.16.0.0/12 (172.16–172.31) to prywatna przestrzeń adresowa.' },
        { q: 'Pliki konfiguracyjne Linux są zazwyczaj w katalogu:', opts: ['/bin','/etc','/home','/usr'], ans: 1, exp: '/etc (editable text configurations) zawiera pliki konfiguracyjne systemowe.' },
        { q: 'HTTPS używa portu:', opts: ['80','8080','443','8443'], ans: 2, exp: 'HTTPS (HTTP Secure) domyślnie używa portu 443, szyfrując komunikację TLS/SSL.' },
        { q: 'Polecenie "tracert" (Windows) / "traceroute" (Linux) służy do:', opts: ['Testowania prędkości','Śledzenia trasy pakietów','Skanowania portów','Konfiguracji DNS'], ans: 1, exp: 'Traceroute wyświetla ścieżkę (routery pośrednie) jaką przebywają pakiety do celu.' },
        { q: 'Protokół SMTP służy do:', opts: ['Pobierania poczty','Wysyłania poczty e-mail','Przeglądania stron','Transferu plików'], ans: 1, exp: 'SMTP (Simple Mail Transfer Protocol) port 25/587 – wysyłanie poczty e-mail.' },
        { q: 'Co to jest NAT?', opts: ['Protokół szyfrowania','Tłumaczenie adresów sieciowych','Typ kabla sieciowego','Standard Wi-Fi'], ans: 1, exp: 'NAT (Network Address Translation) tłumaczy prywatne adresy IP na publiczne, umożliwiając dostęp do internetu wielu urządzeniom.' },
        { q: 'Switch pracuje na warstwie:', opts: ['1 – fizycznej','2 – łącza danych','3 – sieciowej','4 – transportowej'], ans: 1, exp: 'Switch zarządza ruchem na podstawie adresów MAC – warstwa 2 (łącza danych).' },
        { q: 'Pełne znaczenie skrótu DNS to:', opts: ['Dynamic Network System','Domain Name System','Data Name Server','Digital Network Service'], ans: 1, exp: 'DNS (Domain Name System) tłumaczy nazwy domen (np. google.com) na adresy IP.' },
      ]
    },
    {
      id: 'inf03', name: 'INF.03 – Programowanie i bazy danych', icon: '💾',
      desc: 'Tworzenie i administrowanie stronami internetowymi oraz bazami danych.',
      time: 45, passScore: 50,
      questions: [
        { q: 'W HTML tag <strong> służy do:', opts: ['Tworzenia linku','Pogrubienia tekstu','Wstawiania obrazka','Tworzenia tabeli'], ans: 1, exp: '<strong> oznacza tekst ważny – wyświetla go pogrubioną czcionką. Do formatowania wizualnego lepiej używać CSS.' },
        { q: 'Selektor CSS "#menu" wybiera element z:', opts: ['Klasą "menu"','ID "menu"','Tagiem "menu"','Atrybutem "menu"'], ans: 1, exp: '# w CSS oznacza selektor ID. Klasy oznaczamy kropką (.), tagi bez prefiksu.' },
        { q: 'W JavaScript typeof "hello" zwraca:', opts: ['"text"','"string"','"char"','"word"'], ans: 1, exp: 'typeof sprawdza typ wartości. Dla ciągów znaków zwraca "string".' },
        { q: 'SQL – polecenie SELECT służy do:', opts: ['Usuwania danych','Pobierania danych','Tworzenia tabeli','Aktualizacji danych'], ans: 1, exp: 'SELECT pobiera dane z bazy. Przykład: SELECT * FROM users WHERE age > 18;' },
        { q: 'HTTP status 404 oznacza:', opts: ['Serwer niedostępny','Zasób nieznaleziony','Brak autoryzacji','Przekierowanie'], ans: 1, exp: '404 Not Found – serwer nie znalazł żądanego zasobu. 500=błąd serwera, 401=brak autoryzacji, 301=przekierowanie.' },
        { q: 'W Pythonie lista definiowana jest przez:', opts: ['{}','[]','()','<>'], ans: 1, exp: 'Lista w Pythonie: [1, 2, 3]. Słowniki: {}, krotki: (), sety: set().' },
        { q: 'Co robi SQL polecenie DELETE FROM users WHERE id=5?', opts: ['Ukrywa użytkownika 5','Trwale usuwa wiersz gdzie id=5','Tworzy kopię wiersza 5','Zmienia id użytkownika 5'], ans: 1, exp: 'DELETE usuwa wiersze z tabeli. WHERE ogranicza które – bez WHERE usuwa WSZYSTKIE wiersze!' },
        { q: 'CSS właściwość "display: flex" włącza:', opts: ['Animację','Flexbox – elastyczny układ','Siatkę (grid)','Tryb inline'], ans: 1, exp: 'Flexbox ułatwia rozmieszczenie elementów w rzędzie lub kolumnie z automatycznym rozkładem przestrzeni.' },
        { q: 'Klucz główny (PRIMARY KEY) w bazie danych:', opts: ['Może się powtarzać','Jednoznacznie identyfikuje wiersz','Może być NULL','Jest opcjonalny'], ans: 1, exp: 'PRIMARY KEY jednoznacznie identyfikuje każdy wiersz w tabeli – musi być unikalny i nie może być NULL.' },
        { q: 'Git commit zapisuje:', opts: ['Zmiany na serwer','Snapshot zmian w lokalnym repozytorium','Kopię pliku na dysku','Plik konfiguracyjny'], ans: 1, exp: 'git commit tworzy punkt kontrolny (snapshot) zmian w lokalnym repozytorium. git push wysyła je na serwer.' },
        { q: 'W HTML atrybut "href" jest używany w tagu:', opts: ['<img>','<a>','<div>','<p>'], ans: 1, exp: '<a href="url"> tworzy hiperłącze. href (hypertext reference) zawiera adres docelowy.' },
        { q: 'Pętla FOR w Pythonie "for i in range(5)" wykona się:', opts: ['4 razy','5 razy','6 razy','Nieskończenie'], ans: 1, exp: 'range(5) generuje liczby 0,1,2,3,4 – pętla wykona się 5 razy (i = 0 do 4).' },
        { q: 'SQL JOIN łączy:', opts: ['Dwie bazy danych','Wiersze z różnych tabel na podstawie warunku','Dwie kolumny','Dwa serwery'], ans: 1, exp: 'JOIN (np. INNER JOIN, LEFT JOIN) łączy wiersze z powiązanych tabel przez wspólne klucze (np. id).' },
        { q: 'HTTPS vs HTTP – główna różnica to:', opts: ['Szybkość','Szyfrowanie transmisji','Rozmiar strony','Typ serwera'], ans: 1, exp: 'HTTPS szyfruje dane między przeglądarką a serwerem używając TLS/SSL. Ważne dla bezpieczeństwa haseł i danych.' },
        { q: 'Zmienna "const" w JavaScript:', opts: ['Może być zmieniona','Nie może być ponownie przypisana','Automatycznie staje się globalna','Może być tylko liczbą'], ans: 1, exp: 'const deklaruje stałą – nie można przypisać nowej wartości, choć obiekt/tablica mogą być modyfikowane wewnętrznie.' },
      ]
    },
    {
      id: 'ee08', name: 'EE.08 – Elektronika', icon: '⚡',
      desc: 'Montaż i eksploatacja urządzeń elektronicznych i elektroenergetycznych.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Prawo Ohma: U = I × R oznacza, że napięcie równa się:', opts: ['Oporowi podzielonemu przez prąd','Iloczynowi natężenia i rezystancji','Sumie prądu i oporu','Różnicy prądu i oporu'], ans: 1, exp: 'U = I × R: napięcie [V] = natężenie [A] × rezystancja [Ω]. Stąd I = U/R, R = U/I.' },
        { q: 'Kondensator w obwodzie DC (prąd stały) po naładowaniu:', opts: ['Przewodzi prąd','Blokuje przepływ prądu','Wzmacnia napięcie','Działa jak opornik'], ans: 1, exp: 'Kondensator naładowany do napięcia zasilania blokuje prąd stały. Przepuszcza prąd zmienny (AC).' },
        { q: 'Dioda LED emituje światło gdy jest:', opts: ['Spolaryzowana zaporowo','Spolaryzowana przewodząco','Połączona równolegle z rezystorem','Pracuje przy napięciu odwrotnym'], ans: 1, exp: 'LED świeci gdy anoda (+) ma wyższy potencjał niż katoda (–) – polaryzacja przewodząca.' },
        { q: 'Jednostka pojemności elektrycznej to:', opts: ['Henr [H]','Farad [F]','Om [Ω]','Wat [W]'], ans: 1, exp: 'Pojemność mierzona w Faradach [F]. Praktycznie używa się pF, nF, μF (kondensatory są małe).' },
        { q: 'Rezystory w połączeniu szeregowym – wypadkowy opór:', opts: ['Jest mniejszy od najmniejszego','Jest równy najmniejszemu','Jest sumą wszystkich','Jest iloczynem podzielonym przez sumę'], ans: 2, exp: 'Szeregowo: R = R1 + R2 + ... Opór rośnie. Równolegle: 1/R = 1/R1 + 1/R2 + ...' },
        { q: 'Tranzystor BJT może pracować jako:', opts: ['Tylko wzmacniacz','Tylko klucz elektroniczny','Wzmacniacz, klucz lub oscylator','Tylko prostownik'], ans: 2, exp: 'BJT (bipolarny tranzystor złączowy) pracuje w trybie aktywnym (wzmacniacz), nasycenia/odcięcia (klucz).' },
        { q: 'Multimetr na zakresie DCV mierzy:', opts: ['Prąd stały','Napięcie stałe','Rezystancję','Pojemność'], ans: 1, exp: 'DCV = Direct Current Voltage. ACV = napięcie przemienne, DCA = prąd stały, Ω = rezystancja.' },
        { q: 'Układ scalony NE555 to popularny:', opts: ['Mikroprocesor','Timer/generator sygnałów','Przetwornik ADC','Stabilizator napięcia'], ans: 1, exp: 'NE555 to wszechstronny timer – stosowany do generowania impulsów, opóźnień, PWM.' },
        { q: 'Dioda Zenera stabilizuje:', opts: ['Prąd','Napięcie','Rezystancję','Pojemność'], ans: 1, exp: 'Dioda Zenera pracuje w obszarze przebicia zaporowego utrzymując stałe napięcie – idealna do stabilizatorów.' },
        { q: 'Symbol Ω oznacza jednostkę:', opts: ['Mocy elektrycznej','Rezystancji','Natężenia prądu','Napięcia'], ans: 1, exp: 'Ω (Om) – jednostka rezystancji (oporu elektrycznego) w układzie SI.' },
        { q: 'Moc elektryczna obliczana jest ze wzoru:', opts: ['P = U + I','P = U × I','P = U / I','P = U² × I'], ans: 1, exp: 'P [W] = U [V] × I [A]. Moc to iloczyn napięcia i natężenia prądu.' },
        { q: 'Kondensator elektrolityczny musi być podłączony z:', opts: ['Zachowaniem biegunowości','Dowolną polaryzacją','Szeregowo z cewką','Równolegle do diody'], ans: 0, exp: 'Kondensatory elektrolityczne są spolaryzowane – odwrotne podłączenie grozi ich uszkodzeniem lub wybuchem.' },
        { q: 'Tranzystor jako klucz elektroniczny pracuje w stanie:', opts: ['Aktywnym','Nasycenia i odcięcia','Liniowym','Dyfuzji'], ans: 1, exp: 'Klucz: stan nasycenia = tranzystor "otwarty" (przewodzi), stan odcięcia = "zamknięty" (nie przewodzi).' },
        { q: 'Ferromagnetyk charakteryzuje się:', opts: ['Bardzo małą przenikalnością magnetyczną','Bardzo dużą przenikalnością magnetyczną','Brakiem właściwości magnetycznych','Odpychaniem od magnesów'], ans: 1, exp: 'Ferromagnetyki (żelazo, nikiel, kobalt) mają bardzo dużą przenikalność magnetyczną i dają się silnie namagnesować.' },
        { q: 'Alternator w samochodzie generuje prąd:', opts: ['Stały (DC) bezpośrednio','Zmienny (AC) prostowany na DC','Wyłącznie stały DC','Tylko impulsowy'], ans: 1, exp: 'Alternator produkuje AC, który jest prostowany przez mostek diodowy na DC ładujący akumulator.' },
      ]
    },
    {
      id: 'au30', name: 'AU.30 – Technik samochodowy', icon: '🚗',
      desc: 'Organizacja i prowadzenie procesu obsługi pojazdów samochodowych.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Złącze OBD-II służy do:', opts: ['Ładowania akumulatora','Diagnostyki komputerowej pojazdu','Podłączania radia','Sterowania klimatyzacją'], ans: 1, exp: 'OBD-II to standard diagnostyczny (od 1996/2001) umożliwiający odczyt kodów błędów i parametrów pracy silnika.' },
        { q: 'Kod błędu P0300 oznacza:', opts: ['Błąd czujnika tlenu','Losowe chybienie zapłonu','Niskie ciśnienie oleju','Błąd skrzyni biegów'], ans: 1, exp: 'P0300 = Random/Multiple Cylinder Misfire Detected. P0301-P0308 to konkretne cylindry.' },
        { q: 'Czujnik MAF mierzy:', opts: ['Temperaturę silnika','Masę zasysanego powietrza','Ciśnienie oleju','Prędkość obrotową'], ans: 1, exp: 'MAF (Mass Air Flow) mierzy masę powietrza wchodzącego do silnika dla obliczenia dawki paliwa przez ECU.' },
        { q: 'Układ ABS zapobiega:', opts: ['Aquaplaningowi','Blokowaniu kół podczas hamowania','Przekroczeniu prędkości','Zużyciu opon'], ans: 1, exp: 'ABS (Anti-lock Braking System) zapobiega blokowaniu kół, zachowując sterowność podczas gwałtownego hamowania.' },
        { q: 'Czujnik lambda monitoruje:', opts: ['Poziom oleju','Skład mieszanki paliwowo-powietrznej','Temperaturę cieczy','Ciśnienie wtrysku'], ans: 1, exp: 'Czujnik lambda mierzy zawartość O₂ w spalinach, korygując mieszankę do wartości stechiometrycznej λ=1.' },
        { q: 'Naładowany akumulator 12V ma napięcie spoczynkowe ok.:', opts: ['10,5 V','11,0 V','12,6–12,8 V','14,4 V'], ans: 2, exp: 'Pełny akumulator: 12,6–12,8V. Alternator ładuje 13,8–14,4V. Poniżej 12,0V akumulator jest rozładowany.' },
        { q: 'Common Rail pracuje pod ciśnieniem:', opts: ['5–10 bar','50–100 bar','200–2500 bar','0,5–3 bar'], ans: 2, exp: 'Systemy CR pracują pod 200–2500 bar, zapewniając precyzyjny wtrysk i niską emisję spalin.' },
        { q: 'Turbosprężarka służy do:', opts: ['Chłodzenia silnika','Doładowania – zwiększenia ciśnienia powietrza','Oczyszczania spalin','Redukcji zużycia oleju'], ans: 1, exp: 'Turbo napędzane gazami wydechowymi sprężza powietrze dolotowe, zwiększając moc i efektywność silnika.' },
        { q: 'Układ ESP (Electronic Stability Program) zapobiega:', opts: ['Nadmiernemu zużyciu paliwa','Utracie przyczepności bocznej','Blokowaniu kół','Przegrzaniu silnika'], ans: 1, exp: 'ESP wykrywa poślizg i selektywnie hamuje koła, zapobiegając bocznemu poślizgowi i utrzymując tor jazdy.' },
        { q: 'Filtr DPF w samochodzie diesla pełni funkcję:', opts: ['Filtrowania paliwa','Wychwytywania sadzy z spalin','Oczyszczania oleju','Filtrowania powietrza'], ans: 1, exp: 'DPF (Diesel Particulate Filter) zatrzymuje cząstki stałe (sadzę) ze spalin, redukując emisję PM2.5.' },
        { q: 'Układ EGR (Exhaust Gas Recirculation) recyrkuluje:', opts: ['Paliwo z powrotem do zbiornika','Spaliny z powrotem do komory spalania','Chłodziwo','Olej silnikowy'], ans: 1, exp: 'EGR kieruje część spalin z powrotem do cylindrów, obniżając temperaturę spalania i emisję NOx.' },
        { q: 'Moment obrotowy silnika mierzy się w:', opts: ['Watach [W]','Kilowatach [kW]','Niutonometrach [Nm]','Obrotach na minutę [rpm]'], ans: 2, exp: 'Moment obrotowy (torque) mierzy się w Nm (niutonometrach). Moc w kW lub KM (konie mechaniczne).' },
      ]
    },
    {
      id: 'eka01', name: 'EKA.01 – Rachunkowość', icon: '📊',
      desc: 'Prowadzenie rachunkowości i rozliczanie podatków oraz składek ZUS.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Bilans przedsiębiorstwa to zestawienie:', opts: ['Przychodów i kosztów','Aktywów i pasywów','Wpływów i wydatków','Zysków i strat'], ans: 1, exp: 'Bilans pokazuje aktywa (majątek) i pasywa (źródła finansowania) na dany dzień. Aktywa = Pasywa.' },
        { q: 'VAT to podatek:', opts: ['Dochodowy od osób prawnych','Od towarów i usług','Od nieruchomości','Od czynności cywilnoprawnych'], ans: 1, exp: 'VAT (Value Added Tax) = podatek od towarów i usług. W Polsce stawki: 23%, 8%, 5%, 0%.' },
        { q: 'Konto debetowe (Wn) w rachunkowości oznacza:', opts: ['Zmniejszenie aktywów','Zwiększenie aktywów lub kosztów','Zwiększenie pasywów','Zmniejszenie kosztów'], ans: 1, exp: 'Debet (Wn) zwiększa aktywa i koszty, zmniejsza pasywa i przychody. Kredyt (Ma) – odwrotnie.' },
        { q: 'Faktura VAT powinna zawierać:', opts: ['Datę urodzenia sprzedawcy','NIP sprzedawcy i nabywcy','Podpis notarialny','Pieczęć bankową'], ans: 1, exp: 'Obowiązkowe elementy faktury: NIP sprzedawcy/nabywcy, data, numer, stawka i kwota VAT.' },
        { q: 'EBIT to wynik finansowy:', opts: ['Po odjęciu podatku','Przed odsetkami i podatkiem','Po odjęciu amortyzacji','Przed amortyzacją'], ans: 1, exp: 'EBIT (Earnings Before Interest and Taxes) – zysk operacyjny przed odsetkami i opodatkowaniem.' },
        { q: 'Amortyzacja to:', opts: ['Spłata długu','Stopniowe zużycie środków trwałych ujęte w kosztach','Podatek od środków trwałych','Przychód ze sprzedaży'], ans: 1, exp: 'Amortyzacja systematycznie rozlicza wartość środków trwałych (maszyn, budynków) w czasie ich użytkowania.' },
        { q: 'Rok podatkowy w Polsce zazwyczaj pokrywa się z:', opts: ['Rokiem szkolnym (wrzesień-czerwiec)','Rokiem kalendarzowym (styczeń-grudzień)','Kwartałem fiskalnym','Rokiem finansowym UE'], ans: 1, exp: 'Standardowo rok podatkowy = rok kalendarzowy. Przedsiębiorcy mogą wybrać inny rok obrotowy.' },
        { q: 'Składki ZUS są odprowadzane do:', opts: ['Urzędu Skarbowego','Zakładu Ubezpieczeń Społecznych','Narodowego Funduszu Zdrowia','Ministerstwa Finansów'], ans: 1, exp: 'ZUS (Zakład Ubezpieczeń Społecznych) zbiera składki na ubezpieczenia emerytalne, rentowe, chorobowe i wypadkowe.' },
        { q: 'Rachunek zysków i strat pokazuje:', opts: ['Stan majątku firmy','Przychody i koszty w danym okresie','Przepływy gotówkowe','Zobowiązania firmy'], ans: 1, exp: 'Rachunek zysków i strat (RZiS/P&L) prezentuje przychody, koszty i wynik finansowy za dany okres.' },
        { q: 'Stawka podstawowa VAT w Polsce wynosi:', opts: ['8%','15%','23%','25%'], ans: 2, exp: 'Podstawowa stawka VAT w Polsce to 23%. Stawki obniżone: 8% (usługi budowlane, żywność) i 5% (podstawowe produkty spożywcze).' },
      ]
    },
    {
      id: 'frk01', name: 'FRK.01 – Fryzjer', icon: '✂️',
      desc: 'Wykonywanie zabiegów fryzjerskich: strzyżenie, koloryzacja, stylizacja.',
      time: 30, passScore: 50,
      questions: [
        { q: 'Środki do koloryzacji włosów zawierają jako utleniacz:', opts: ['Kwas octowy','Nadtlenek wodoru (H₂O₂)','Alkohol etylowy','Sól kuchenna'], ans: 1, exp: 'H₂O₂ (woda utleniona) otwiera łuskę włosa i utlenia melaninę, umożliwiając rozjaśnienie i koloryzację.' },
        { q: 'Trwała ondulacja (trwała) działa przez:', opts: ['Podgrzewanie włosa','Redukowanie i utlenianie wiązań dwusiarczkowych','Nakładanie żelu','Wyłącznie mechaniczne zwijanie'], ans: 1, exp: 'Trwała ondulacja: płyn I redukuje wiązania S-S, nawijanie na wałki, płyn II (neutralizator) utlenia i utrwala nową formę.' },
        { q: 'pH skóry głowy jest:', opts: ['Silnie zasadowe (9-11)','Lekko kwaśne (4,5-5,5)','Obojętne (7)','Silnie kwaśne (1-3)'], ans: 1, exp: 'Zdrowa skóra głowy ma pH 4,5-5,5 (lekko kwaśne). Szampony powinny mieć zbliżone pH.' },
        { q: 'Technika balejaż (balayage) to:', opts: ['Koloryzacja całych włosów','Ręczne malowanie pasemek od środka długości','Rozjaśnianie czepkową','Farbowanie korzeni'], ans: 1, exp: 'Balejaż (fr. balayer = zamiatać) – ręczne malowanie farby dla naturalnego efektu przejścia koloru.' },
        { q: 'Przed koloryzacją chemiczną należy wykonać:', opts: ['Test alergiczny (patch test)','Test na porowatość','Zabieg keratynowy','Odżywianie błotem'], ans: 0, exp: 'Patch test (próba uczuleniowa) wykonywana 48h przed koloryzacją sprawdza reakcję skóry na składniki farby.' },
        { q: 'Strzyżenie "na mokro" jest wskazane gdy:', opts: ['Włosy są kręcone i grube','Chcemy precyzyjnie strzyc kąty i linie','Włosy są bardzo cienkie','Robimy strzyżenie nożyczkami do degażowania'], ans: 1, exp: 'Mokre włosy są cięższe i łatwiej je precyzyjnie strzyc, szczególnie przy ostrych liniach i geometrycznych cięciach.' },
        { q: 'Nożyczki degażujące (cieniujące) służą do:', opts: ['Cięcia równej linii','Przerzedzania i cieniowania włosów','Tworzenia fryzur undercut','Przycinania linii konturowych'], ans: 1, exp: 'Nożyczki z ząbkowanym ostrzem wycinają co drugi/trzeci włos, redukując objętość i tworząc miękkie przejścia.' },
        { q: 'Koło barw wskazuje, że barwą dopełniającą do koloru fioletowego jest:', opts: ['Niebieski','Żółty','Czerwony','Zielony'], ans: 1, exp: 'Kolory dopełniające (komplementarne) leżą naprzeciwko siebie na kole barw: fiolet ↔ żółty. Wzajemnie się neutralizują.' },
        { q: 'Rozjaśnianie włosów niszczy przede wszystkim:', opts: ['Keratynę cortexu','Melaninę (pigment) włosa','Warstwę łuski (cuticle)','Hydrofilowe wiązania'], ans: 1, exp: 'Melanina (eumelanina ciemna, feomelanina żółta/ruda) nadaje kolor – utleniacze ją rozkładają rozjaśniając włos.' },
        { q: 'Szampon przeciwłupieżowy zawiera zazwyczaj:', opts: ['Kolagen','Pirition cynku lub siarczkek selenu','Kwas hialuronowy','Witaminę C'], ans: 1, exp: 'Pirition cynku (ZnPT) i siarczkek selenu to składniki aktywne zwalczające grzyb Malassezia powodujący łupież.' },
      ]
    },
    {
      id: 'han01', name: 'HAN.01 – Sprzedaż i obsługa klienta', icon: '🛒',
      desc: 'Obsługa klienta, sprzedaż detaliczna, gospodarka magazynowa.',
      time: 30, passScore: 50,
      questions: [
        { q: 'Reklamacja konsumenta złożona przez internet musi być rozpatrzona w ciągu:', opts: ['7 dni','14 dni','30 dni','60 dni'], ans: 1, exp: 'Zgodnie z polskim prawem (ustawa o prawach konsumenta) sprzedawca ma 14 dni na odpowiedź na reklamację.' },
        { q: 'FIFO w magazynie oznacza:', opts: ['Last In First Out','First In First Out','Fast Inventory For Orders','Fixed Index for Output'], ans: 1, exp: 'FIFO (First In, First Out) – towar przyjęty jako pierwszy wydawany jako pierwszy. Ważne dla produktów z datą ważności.' },
        { q: 'Konsument ma prawo zwrócić zakup online bez podania przyczyny w ciągu:', opts: ['7 dni','14 dni','30 dni','60 dni'], ans: 1, exp: 'Przy sprzedaży na odległość (internet) konsument ma 14 dni na odstąpienie od umowy bez podania przyczyny.' },
        { q: 'Marża handlowa obliczana jest jako:', opts: ['Cena sprzedaży','Cena sprzedaży minus cena zakupu','Cena zakupu plus VAT','Koszt transportu plus cena zakupu'], ans: 1, exp: 'Marża = cena sprzedaży – cena zakupu. Marża procentowa = (marża / cena sprzedaży) × 100%.' },
        { q: 'Faktura korygująca wystawiana jest gdy:', opts: ['Wystawiamy nową fakturę','Błąd/zmiana w już wystawionej fakturze','Zaliczka została zapłacona','Klient prosi o duplikat'], ans: 1, exp: 'Faktura korygująca (korekta) poprawia błędy lub odzwierciedla zmiany po wystawieniu pierwotnej faktury (zwroty, rabaty).' },
        { q: 'Cross-selling to technika sprzedaży polegająca na:', opts: ['Obniżaniu ceny produktu','Proponowaniu produktów komplementarnych','Sprzedaży droższego produktu','Tworzeniu pakietów'], ans: 1, exp: 'Cross-selling = sprzedaż krzyżowa – proponowanie produktów uzupełniających (np. do laptopa: torba i myszka).' },
        { q: 'Paragon fiskalny musi być wydrukowany:', opts: ['Tylko przy płatności gotówką','Tylko przy zakupach powyżej 450 zł','Przy każdej sprzedaży na rzecz osoby prywatnej','Tylko w sklepach stacjonarnych'], ans: 2, exp: 'Przy sprzedaży na rzecz osób fizycznych sprzedawca ma obowiązek wydać paragon z kasy rejestrującej.' },
        { q: 'Magazyn wysokiego składowania to:', opts: ['Sklep wielopiętrowy','Regałowy magazyn do składowania towarów na dużych wysokościach','Chłodnia spożywcza','Strefa wysyłkowa'], ans: 1, exp: 'Magazyn wysokiego składowania (WS) używa wysokich regałów i wózków widłowych lub automatycznych układnic.' },
        { q: 'NPS (Net Promoter Score) mierzy:', opts: ['Zysk netto przedsiębiorstwa','Lojalność i satysfakcję klientów','Wskaźnik rotacji towarów','Marżę zysku'], ans: 1, exp: 'NPS pyta klientów "jak bardzo polecisz nas znajomym" (0-10). Promotorzy (9-10) – Krytycy (0-6) = NPS.' },
        { q: 'Etykieta cenowa produktu musi zawierać:', opts: ['Datę produkcji','Cenę brutto (z VAT)','Numer seryjny','Kraj producenta'], ans: 1, exp: 'Cena detaliczna na etykiecie musi być podana w kwocie brutto (z podatkiem VAT) – to cena, którą płaci konsument.' },
      ]
    },
    {
      id: 'hgt02', name: 'HGT.02 – Gastronomia i Hotelarstwo', icon: '🍽️',
      desc: 'Obsługa gości, technologia gastronomiczna, zasady HACCP.',
      time: 30, passScore: 50,
      questions: [
        { q: 'HACCP w gastronomii to system:', opts: ['Obsługi rachunkowości','Analizy zagrożeń i krytycznych punktów kontroli','Zarządzania personelem','Rezerwacji stolików'], ans: 1, exp: 'HACCP (Hazard Analysis Critical Control Points) to obowiązkowy system zapewnienia bezpieczeństwa żywności.' },
        { q: 'Temperatura przechowywania surowego mięsa powinna wynosić:', opts: ['0-4°C','5-10°C','10-15°C','Poniżej -18°C (mrożone)'], ans: 0, exp: 'Surowe mięso przechowujemy w 0-4°C. Mięso mielone i drób: 0-2°C. Mrożone: poniżej -18°C.' },
        { q: 'Kolejność mycia naczyń w gastronomii (ręczne) to:', opts: ['Płukanie → mycie → dezynfekcja','Mycie → płukanie → dezynfekcja','Dezynfekcja → mycie → suszenie','Mycie → dezynfekcja → płukanie'], ans: 1, exp: 'Prawidłowa kolejność: 1. mycie ciepłą wodą z detergentem, 2. płukanie czystą wodą, 3. dezynfekcja.' },
        { q: 'Standard obsługi "Silver Service" to:', opts: ['Obsługa przy kasie','Serwowanie potraw łyżką i widelcem z półmiska bezpośrednio na talerz gościa','Samoobsługa z bufetu','Obsługa przez okienko'], ans: 1, exp: 'Silver Service (obsługa srebrna/angielska) – kelner serwuje potrawy ze wspólnego półmiska na talerz gościa.' },
        { q: 'Occupancy rate (wskaźnik obłożenia) hotelu obliczamy:', opts: ['Przychód/liczba pokoi','Sprzedane pokoje/dostępne pokoje × 100%','Goście/personel × 100%','Cena pokoju/średnia rynkowa'], ans: 1, exp: 'Occupancy = (liczba sprzedanych pokoi / liczba dostępnych pokoi) × 100%. Kluczowy wskaźnik efektywności hotelu.' },
        { q: 'Alergen nr 1 w prawie UE (wymagający oznaczenia) to:', opts: ['Cukier','Gluten (pszenica i pokrewne)','Skrobia ziemniaczana','Kazeina mleczna'], ans: 1, exp: 'Rozporządzenie UE 1169/2011 wymaga oznaczania 14 alergenów, w tym zbóż zawierających gluten (pszenica, żyto, jęczmień, owies).' },
        { q: 'Metoda "mise en place" w gastronomii oznacza:', opts: ['Sposób krojenia warzyw','Przygotowanie stanowiska pracy przed serwisem','Sposób składania serwetek','Technikę platerowania'], ans: 1, exp: 'Mise en place (fr. "wszystko na swoim miejscu") – przygotowanie i ustawienie wszystkich składników/narzędzi przed pracą.' },
        { q: 'Check-in w hotelu to:', opts: ['Wymeldowanie gościa','Przyjęcie i zameldowanie gościa','Rezerwacja pokoju','Sprzątanie pokoju'], ans: 1, exp: 'Check-in = zameldowanie/przyjęcie gościa na początku pobytu. Check-out = wymeldowanie przy wyjeździe.' },
      ]
    },
    {
      id: 'ogolny', name: '📖 Wiedza ogólna zawodowa', icon: '📖',
      desc: 'BHP, prawo pracy, podstawy prawa i kwalifikacji zawodowych.',
      time: 30, passScore: 50,
      questions: [
        { q: 'BHP to skrót od:', opts: ['Bezpieczeństwo i Higiena Pracy','Bezpieczeństwo i Higiena Pracownika','Biuro Higieny i Pracy','Bieżąca Higiena Pracodawcy'], ans: 0, exp: 'BHP – Bezpieczeństwo i Higiena Pracy. Zasady i przepisy chroniące zdrowie i życie pracowników.' },
        { q: 'Minimalny wiek pracownika młodocianego w Polsce to:', opts: ['15 lat','16 lat','18 lat','21 lat'], ans: 0, exp: 'Pracownik młodociany: 15-18 lat. Zatrudnienie w celu przygotowania zawodowego na zasadach KP art. 190-206.' },
        { q: 'Przy stażu 3 lat okres wypowiedzenia umowy o pracę na czas nieokreślony wynosi:', opts: ['2 tygodnie','1 miesiąc','3 miesiące','6 miesięcy'], ans: 2, exp: 'Kodeks pracy: staż < 6 mies. = 2 tyg., 6 mies.–3 lata = 1 mies., ≥ 3 lata = 3 miesiące.' },
        { q: 'Gaśnica ABC NIE nadaje się do gaszenia:', opts: ['Pożarów drewna','Cieczy palnych','Urządzeń elektrycznych','Metali aktywnych (Mg, Na)'], ans: 3, exp: 'Gaśnice ABC: A (ciała stałe), B (ciecze), C (gazy/elektryczne). Do metali aktywnych wymagana gaśnica klasy D.' },
        { q: 'Zasada FIFO w magazynowaniu oznacza:', opts: ['Last In First Out','First In First Out','Rotacja produktów wg ciężaru','Magazynowanie wg daty produkcji'], ans: 1, exp: 'FIFO (First In, First Out) – towar przyjęty jako pierwszy wychodzi jako pierwszy. Kluczowe przy produktach z datą ważności.' },
        { q: 'Faktura VAT musi zawierać:', opts: ['Datę urodzenia sprzedawcy','NIP sprzedawcy i nabywcy','Podpis dyrektora','Pieczęć bankową'], ans: 1, exp: 'Obowiązkowe elementy faktury VAT: NIP obu stron, data wystawienia, numer kolejny, stawka VAT, kwota netto i brutto.' },
        { q: 'Prawo autorskie w Polsce chroni utwór przez:', opts: ['10 lat od śmierci','50 lat od śmierci','70 lat od śmierci autora','100 lat od publikacji'], ans: 2, exp: 'Prawo autorskie chroni utwór przez 70 lat po śmierci twórcy (dyrektywa UE, ustawa o prawie autorskim).' },
        { q: 'Ergonomia to nauka o:', opts: ['Zarządzaniu czasem','Dostosowaniu pracy do możliwości człowieka','Normach bezpieczeństwa','Organizacji pracy zmianowej'], ans: 1, exp: 'Ergonomia (gr. ergon=praca, nomos=prawo) – nauka o dostosowaniu środowiska i narzędzi do możliwości psychofizycznych człowieka.' },
        { q: 'Urlop wypoczynkowy pracownika ze stażem powyżej 10 lat wynosi:', opts: ['14 dni roboczych','20 dni roboczych','26 dni roboczych','30 dni roboczych'], ans: 2, exp: 'KP art. 154: staż < 10 lat = 20 dni urlopu, staż ≥ 10 lat = 26 dni urlopu (przelicznik: 7-8h/dzień).' },
        { q: 'Minimalne wynagrodzenie za pracę w Polsce jest ustalane:', opts: ['Przez pracodawców','Rozporządzeniem Rady Ministrów','Przez związki zawodowe','Przez GUS'], ans: 1, exp: 'Minimalne wynagrodzenie ustalane jest corocznie Rozporządzeniem Rady Ministrów po negocjacjach Rady Dialogu Społecznego.' },
        { q: 'Uprawnienia SEP Grupy 1 E1 dotyczą urządzeń do napięcia:', opts: ['230V','1 kV','15 kV','110 kV'], ans: 1, exp: 'Świadectwo kwalifikacyjne SEP E1 (eksploatacja) i D1 (dozór) dla Grupy 1 obejmuje urządzenia do 1 kV.' },
        { q: 'PIP to skrót od:', opts: ['Polskie Instytucje Pracy','Państwowa Inspekcja Pracy','Publiczny Instytut Prawa','Powiatowa Izba Pracownicza'], ans: 1, exp: 'PIP (Państwowa Inspekcja Pracy) kontroluje przestrzeganie prawa pracy i BHP przez pracodawców.' },
      ]
    },
    {
      id: 'custom', name: '✏️ Własne pytania', icon: '✏️',
      desc: 'Twoje własne pytania testowe (funkcja w budowie).',
      time: 30, passScore: 50,
      questions: []
    }
  ];

  let quizState = null;
  let timerInterval = null;

  // ── Menu ──────────────────────────────────────────────────────

  function showMenu() {
    document.getElementById('testsMenu').style.display = '';
    document.getElementById('testsQuiz').style.display = 'none';
    document.getElementById('testsResult').style.display = 'none';
    renderCategories();
    renderHistory();
    loadCustomQuestions();
  }

  async function loadCustomQuestions() {
    const customCat = CATEGORIES.find(c => c.id === 'custom');
    if (!customCat) return;

    if (!Auth.getUser()) {
      customCat.questions = [];
      customCat.desc = 'Zaloguj się, żeby używać własnych pytań.';
      renderCategories();
      return;
    }

    try {
      const questions = await Auth.apiFetch('/api/questions');
      customCat.questions = questions.map(q => ({
        q:    q.question,
        opts: q.options,
        ans:  q.answer,
        exp:  q.explanation || '',
      }));
      customCat.desc = questions.length
        ? `${questions.length} własnych pytań z zakładki Tematy.`
        : 'Brak pytań. Dodaj je w zakładce Tematy → Własne pytania.';
      customCat.time = Math.max(5, Math.ceil(Math.min(questions.length, 20) * 1.5));
      renderCategories();
    } catch {
      customCat.questions = [];
      customCat.desc = 'Nie udało się załadować własnych pytań.';
      renderCategories();
    }
  }

  function renderCategories() {
    const el = document.getElementById('testCategories');
    el.innerHTML = CATEGORIES.map(cat => {
      const qCount = cat.questions.length;
      return `
        <div class="test-cat-card${cat.id === 'custom' ? ' test-cat-custom' : ''}" data-cat="${cat.id}">
          <div class="test-cat-icon">${cat.icon}</div>
          <div class="test-cat-name">${cat.name}</div>
          <div class="test-cat-desc">${cat.desc}</div>
          <div class="test-cat-meta">
            <span>📋 ${qCount} pytań</span>
            <span>⏱ ${cat.time} min</span>
            <span>✅ Próg: ${cat.passScore}%</span>
          </div>
        </div>`;
    }).join('');

    el.querySelectorAll('.test-cat-card').forEach(card => {
      card.addEventListener('click', () => startQuiz(card.dataset.cat));
    });
  }

  function renderHistory() {
    const results = Storage.getResults();
    const el = document.getElementById('testHistory');
    if (!results.length) { el.innerHTML = '<p class="empty-msg">Brak historii testów.</p>'; return; }
    el.innerHTML = results.slice(0, 10).map(r => {
      const pct = Math.round(r.score / r.total * 100);
      const pass = pct >= (r.passScore || 50);
      return `<div class="history-item">
        <span class="history-score ${pass ? 'pass' : 'fail'}">${pct}%</span>
        <span class="history-meta">${r.category} • ${Storage.formatDate(r.date)}</span>
        <span style="font-size:0.85rem;color:var(--text-muted)">${r.score}/${r.total} pkt</span>
      </div>`;
    }).join('');
  }

  // ── Quiz ──────────────────────────────────────────────────────

  function startQuiz(catId) {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat || !cat.questions.length) {
      if (catId === 'custom') {
        alert('Brak własnych pytań. Dodaj je w zakładce Tematy → Własne pytania.');
      } else {
        alert('Brak pytań w tej kategorii.');
      }
      return;
    }

    const shuffled = [...cat.questions].sort(() => Math.random() - 0.5).slice(0, Math.min(20, cat.questions.length));
    quizState = {
      cat, questions: shuffled,
      answers: new Array(shuffled.length).fill(null),
      current: 0, startTime: Date.now(),
      timeLeft: cat.time * 60, finished: false
    };

    document.getElementById('testsMenu').style.display = 'none';
    document.getElementById('testsQuiz').style.display = '';
    document.getElementById('testsResult').style.display = 'none';
    document.getElementById('quizTitle').textContent = cat.name;

    startTimer();
    renderQuestion();
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!quizState || quizState.finished) { clearInterval(timerInterval); return; }
      quizState.timeLeft--;
      updateTimerDisplay();
      if (quizState.timeLeft <= 0) { clearInterval(timerInterval); finishQuiz(true); }
    }, 1000);
  }

  function updateTimerDisplay() {
    const el = document.getElementById('quizTimer');
    const t = quizState.timeLeft;
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    el.textContent = `⏱ ${m}:${s}`;
    el.className = 'quiz-timer' + (t <= 60 ? ' danger' : t <= 300 ? ' warning' : '');
  }

  function renderQuestion() {
    const { questions, answers, current } = quizState;
    const q = questions[current];
    document.getElementById('quizProgress').textContent = `Pytanie ${current + 1}/${questions.length}`;
    document.getElementById('questionNum').textContent = `Pytanie ${current + 1} z ${questions.length}`;
    document.getElementById('questionText').textContent = q.q;

    const opts = document.getElementById('optionsList');
    const letters = ['A','B','C','D'];
    opts.innerHTML = q.opts.map((opt, i) =>
      `<button class="option-btn${answers[current] === i ? ' selected' : ''}" data-idx="${i}">
        <span class="option-letter">${letters[i]}</span>
        <span>${escHtml(opt)}</span>
      </button>`
    ).join('');

    opts.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => selectOption(parseInt(btn.dataset.idx)));
    });

    document.getElementById('btnPrevQ').disabled = current === 0;
    document.getElementById('btnNextQ').textContent = current === questions.length - 1 ? 'Zakończ →' : 'Następne →';
  }

  function selectOption(idx) {
    quizState.answers[quizState.current] = idx;
    renderQuestion();
  }

  function finishQuiz(timeUp = false) {
    clearInterval(timerInterval);
    quizState.finished = true;

    const { questions, answers, cat } = quizState;
    let score = 0;
    answers.forEach((ans, i) => { if (ans === questions[i].ans) score++; });
    const pct = Math.round(score / questions.length * 100);
    const passed = pct >= cat.passScore;

    Gamification.recordTestResult(score, questions.length, passed);

    const result = {
      id: Storage.uid(), category: cat.name,
      score, total: questions.length, passScore: cat.passScore,
      answers: answers.map((ans, i) => ({
        q: questions[i].q, given: ans, correct: questions[i].ans,
        exp: questions[i].exp || '', opts: questions[i].opts
      })),
      date: new Date().toISOString()
    };

    Storage.saveResult(result);
    Auth.syncResult(result);   // sync to server when logged in
    showResult(result, timeUp);
    App.updateDashboard();
  }

  // ── Results + Ask AI ──────────────────────────────────────────

  function showResult(result, timeUp = false) {
    document.getElementById('testsQuiz').style.display = 'none';
    document.getElementById('testsResult').style.display = '';

    const pct = Math.round(result.score / result.total * 100);
    const pass = pct >= result.passScore;
    const letters = ['A','B','C','D'];

    document.getElementById('resultCard').innerHTML = `
      ${timeUp ? '<p style="color:var(--warning);font-weight:600;margin-bottom:0.75rem;">⏰ Czas minął!</p>' : ''}
      <div class="result-score ${pass ? 'pass' : 'fail'}">${pct}%</div>
      <div class="result-label">${pass ? '🎉 Zaliczone!' : '😔 Niezaliczone. Próbuj dalej!'}</div>
      <div class="result-details">
        <div class="result-detail"><strong>${result.score}</strong><small>Poprawne</small></div>
        <div class="result-detail"><strong>${result.total - result.score}</strong><small>Błędne</small></div>
        <div class="result-detail"><strong>${result.total}</strong><small>Łącznie</small></div>
        <div class="result-detail"><strong>${result.passScore}%</strong><small>Próg</small></div>
      </div>`;

    const reviewHtml = result.answers.map((a, i) => {
      const correct = a.given === a.correct;
      const askBtn = !correct
        ? `<button class="btn-ask-ai" data-q="${escAttr(a.q)}" data-correct="${escAttr(a.opts[a.correct])}" data-wrong="${a.given !== null ? escAttr(a.opts[a.given]) : 'nie odpowiedziałem'}">🤖 Wyjaśnij AI</button>`
        : '';
      return `<div class="review-item ${correct ? 'correct' : 'wrong'}">
        <div class="review-q">${i + 1}. ${escHtml(a.q)}</div>
        <div class="review-answers">
          ${!correct && a.given !== null ? `<div class="review-wrong">✗ Twoja: ${letters[a.given]}. ${escHtml(a.opts[a.given])}</div>` : ''}
          ${!correct && a.given === null ? `<div class="review-wrong">✗ Brak odpowiedzi</div>` : ''}
          <div class="review-correct">✓ Poprawna: ${letters[a.correct]}. ${escHtml(a.opts[a.correct])}</div>
          ${a.exp ? `<div class="review-explanation">💡 ${escHtml(a.exp)}</div>` : ''}
        </div>
        ${askBtn}
        <div class="ai-explanation" id="aiExp${i}" style="display:none;"></div>
      </div>`;
    }).join('');

    document.getElementById('resultReview').innerHTML = `<h2 style="margin-bottom:1rem;">📋 Przegląd odpowiedzi</h2>${reviewHtml}`;

    // Wire Ask AI buttons
    document.querySelectorAll('.btn-ask-ai').forEach((btn, idx) => {
      btn.addEventListener('click', () => askAIExplanation(btn, idx));
    });
  }

  async function askAIExplanation(btn, idx) {
    const q = btn.dataset.q;
    const correct = btn.dataset.correct;
    const wrong = btn.dataset.wrong;
    const expEl = document.getElementById(`aiExp${idx}`);

    btn.disabled = true;
    btn.textContent = '⏳ AI myśli...';
    expEl.style.display = 'block';
    expEl.textContent = '...';

    const settings = Storage.getSettings();
    const provider = settings.provider || 'local';
    const prompt = `W teście egzaminu zawodowego było pytanie: "${q}". Uczeń odpowiedział: "${wrong}", ale poprawna odpowiedź to: "${correct}". Wyjaśnij w 2-3 zdaniach PO POLSKU dlaczego "${correct}" jest prawidłową odpowiedzią.`;

    try {
      let reply;
      if (provider === 'local') {
        if (!window.LocalAI || window.LocalAI.getStatus() !== 'ready') {
          reply = `ℹ️ Lokalny AI nie jest załadowany. Otwórz zakładkę Asystent AI i wyślij wiadomość, żeby go pobrać, a potem wróć tutaj.`;
        } else {
          reply = await window.LocalAI.generate('Jesteś pomocnym tutorem do polskich egzaminów zawodowych. Odpowiadaj po polsku, krótko.', [{ role: 'user', content: prompt }]);
        }
      } else if (provider === 'gemini') {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${settings.model || 'gemini-1.5-flash'}:generateContent?key=${settings.apiKey}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 300 } })
        });
        const data = await res.json();
        reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '(brak odpowiedzi)';
      } else {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
          body: JSON.stringify({ model: settings.model || 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], max_tokens: 200 })
        });
        const data = await res.json();
        reply = data.choices?.[0]?.message?.content || '(brak odpowiedzi)';
      }

      expEl.innerHTML = `🤖 <strong>AI wyjaśnia:</strong> ${escHtml(reply)}`;
      btn.textContent = '✅ Wyjaśniono';
    } catch (err) {
      expEl.textContent = `❌ Błąd: ${err.message}`;
      btn.disabled = false;
      btn.textContent = '🔄 Spróbuj ponownie';
    }
  }

  // ── Helpers ───────────────────────────────────────────────────

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function escAttr(str) {
    return String(str).replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  // Events
  document.getElementById('btnNextQ').addEventListener('click', () => {
    const { questions, current } = quizState;
    if (current === questions.length - 1) {
      const unanswered = quizState.answers.filter(a => a === null).length;
      if (unanswered > 0 && !confirm(`${unanswered} pytań bez odpowiedzi. Zakończyć test?`)) return;
      finishQuiz();
    } else {
      quizState.current++; renderQuestion();
    }
  });

  document.getElementById('btnPrevQ').addEventListener('click', () => {
    if (quizState.current > 0) { quizState.current--; renderQuestion(); }
  });

  document.getElementById('btnEndQuiz').addEventListener('click', () => {
    if (confirm('Zakończyć test? Twoje odpowiedzi zostaną zapisane.')) finishQuiz();
  });

  document.getElementById('btnBackToTests').addEventListener('click', () => {
    clearInterval(timerInterval);
    quizState = null;
    showMenu();
    App.updateDashboard();
  });

  function startCustomQuiz(customQuestions) {
    if (!customQuestions.length) return;

    // Normalise custom question format to match the quiz engine format
    const normalised = customQuestions.map(q => ({
      q:    q.question,
      opts: q.options,
      ans:  q.answer,
      exp:  q.explanation || '',
    }));

    const fakeCat = {
      name: 'Własne pytania',
      passScore: 50,
      time: Math.ceil(normalised.length * 1.5), // ~1.5 min per question
    };

    quizState = {
      cat: fakeCat,
      questions: normalised,
      answers: new Array(normalised.length).fill(null),
      current: 0,
      startTime: Date.now(),
      timeLeft: fakeCat.time * 60,
      finished: false,
    };

    document.getElementById('testsMenu').style.display    = 'none';
    document.getElementById('testsQuiz').style.display    = '';
    document.getElementById('testsResult').style.display  = 'none';
    document.getElementById('quizTitle').textContent      = 'Własne pytania';

    startTimer();
    renderQuestion();
  }

  function getCategories() { return CATEGORIES; }

  return { showMenu, getCategories, startCustomQuiz };
})();
