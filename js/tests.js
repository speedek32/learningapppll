const Tests = (() => {

  // ============================================================
  // QUESTION BANK – Polish vocational exams (egzaminy zawodowe)
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
        { q: 'Polecenie "tracert" / "traceroute" służy do:', opts: ['Testowania prędkości','Śledzenia trasy pakietów','Skanowania portów','Konfiguracji DNS'], ans: 1, exp: 'Traceroute wyświetla ścieżkę (routery pośrednie) jaką przebywają pakiety do celu.' },
        { q: 'Protokół SMTP służy do:', opts: ['Pobierania poczty','Wysyłania poczty e-mail','Przeglądania stron','Transferu plików'], ans: 1, exp: 'SMTP (Simple Mail Transfer Protocol) port 25/587 – wysyłanie poczty e-mail.' },
        { q: 'Co to jest NAT?', opts: ['Protokół szyfrowania','Tłumaczenie adresów sieciowych','Typ kabla sieciowego','Standard Wi-Fi'], ans: 1, exp: 'NAT (Network Address Translation) tłumaczy prywatne adresy IP na publiczne.' },
        { q: 'Switch pracuje na warstwie:', opts: ['1 – fizycznej','2 – łącza danych','3 – sieciowej','4 – transportowej'], ans: 1, exp: 'Switch zarządza ruchem na podstawie adresów MAC – warstwa 2 (łącza danych).' },
        { q: 'Pełne znaczenie skrótu DNS to:', opts: ['Dynamic Network System','Domain Name System','Data Name Server','Digital Network Service'], ans: 1, exp: 'DNS (Domain Name System) tłumaczy nazwy domen (np. google.com) na adresy IP.' },
        { q: 'VLAN umożliwia:', opts: ['Zwiększenie prędkości łącza','Logiczne segmentowanie sieci w obrębie jednego switcha','Szyfrowanie ruchu sieciowego','Bezprzewodowy dostęp do sieci'], ans: 1, exp: 'VLAN (Virtual LAN) pozwala podzielić fizyczną sieć na odizolowane segmenty logiczne.' },
        { q: 'Protokół RDP domyślnie używa portu:', opts: ['22','23','3389','5900'], ans: 2, exp: 'RDP (Remote Desktop Protocol) firmy Microsoft działa na porcie TCP 3389.' },
        { q: 'Adres loopback IPv4 to:', opts: ['0.0.0.0','10.0.0.1','127.0.0.1','192.168.0.1'], ans: 2, exp: '127.0.0.1 (localhost) – adres pętli zwrotnej używany do testowania stosu sieciowego komputera.' },
        { q: 'RAID 5 wymaga minimum:', opts: ['2 dysków','3 dysków','4 dysków','5 dysków'], ans: 1, exp: 'RAID 5 potrzebuje min. 3 dysków. Rozkłada dane i parzystość po wszystkich dyskach – jeden dysk może ulec awarii.' },
        { q: 'Polecenie "netstat" służy do:', opts: ['Konfiguracji sieci','Wyświetlania aktywnych połączeń sieciowych','Testowania DNS','Skanowania sieci'], ans: 1, exp: 'netstat (network statistics) wyświetla otwarte połączenia, porty nasłuchujące i tablice routingu.' },
        { q: 'Protokół POP3 służy do:', opts: ['Wysyłania e-mail','Pobierania e-mail ze serwera (usuwa z serwera)','Synchronizacji e-mail między urządzeniami','Szyfrowania poczty'], ans: 1, exp: 'POP3 (Post Office Protocol 3) pobiera pocztę i domyślnie usuwa ją z serwera (port 110/995).' },
        { q: 'Active Directory to usługa:', opts: ['Zarządzania plikami','Katalogowa Microsoft do zarządzania użytkownikami i zasobami','Backup danych','Monitoringu sieci'], ans: 1, exp: 'AD (Active Directory) to usługa katalogowa Windows Server – zarządza użytkownikami, grupami, zasadami GPO.' },
        { q: 'Która maska sieci odpowiada /28?', opts: ['255.255.255.0','255.255.255.192','255.255.255.240','255.255.255.248'], ans: 2, exp: '/28 = 28 jedynek = 11111111.11111111.11111111.11110000 = 255.255.255.240. Daje 16 adresów (14 użytecznych).' },
        { q: 'Protokół SNMP służy do:', opts: ['Przesyłania plików','Monitorowania i zarządzania urządzeniami sieciowymi','Szyfrowania połączeń','Przydzielania adresów IP'], ans: 1, exp: 'SNMP (Simple Network Management Protocol) pozwala monitorować i konfigurować urządzenia sieciowe (routery, switche).' },
        { q: 'Czym jest DMZ w kontekście sieci?', opts: ['Protokół szyfrowania','Strefa zdemilitaryzowana – segment sieci między internetem a LAN','Typ adresu IP','Standard bezprzewodowy'], ans: 1, exp: 'DMZ (DeMilitarized Zone) to sieć pośrednia między internetem a siecią wewnętrzną – tu umieszcza się serwery publiczne.' },
        { q: 'Polecenie "nslookup" służy do:', opts: ['Testowania połączenia','Sprawdzania rekordów DNS dla domeny','Konfiguracji IP','Skanowania portów'], ans: 1, exp: 'nslookup (name server lookup) odpytuje serwery DNS o rekordy dla podanej domeny (A, MX, NS, CNAME).' },
        { q: 'Firewall działający na warstwie aplikacji to:', opts: ['Packet filter','Stateful firewall','Proxy/WAF','Bridge firewall'], ans: 2, exp: 'Proxy/WAF (Web Application Firewall) analizuje ruch na poziomie warstwy 7 (aplikacji), rozumie protokoły HTTP, FTP.' },
        { q: 'Ile adresów hostów jest dostępnych w sieci /26?', opts: ['30','62','126','254'], ans: 1, exp: '/26 = maska 255.255.255.192, 64 adresy łącznie. 64 - 2 (sieć i broadcast) = 62 adresy dla hostów.' },
        { q: 'Linux polecenie "chmod 755 plik" nadaje uprawnienia:', opts: ['rwxrwxrwx','rwxr-xr-x','rw-r--r--','rwxrwxr-x'], ans: 1, exp: '7=rwx (właściciel), 5=r-x (grupa), 5=r-x (pozostali). 755 to standardowe uprawnienia dla pliku wykonywalnego.' },
        { q: 'Protokół IMAP w porównaniu do POP3:', opts: ['Jest szybszy','Synchronizuje pocztę pozostawiając ją na serwerze','Używa mniejszego portu','Nie obsługuje folderów'], ans: 1, exp: 'IMAP (Internet Message Access Protocol) synchronizuje foldery między urządzeniami, nie usuwa poczty z serwera (port 143/993).' },
      ]
    },
    {
      id: 'inf03', name: 'INF.03 – Strony i bazy danych', icon: '💾',
      desc: 'Tworzenie i administrowanie stronami internetowymi oraz bazami danych.',
      time: 45, passScore: 50,
      questions: [
        { q: 'W HTML tag <strong> służy do:', opts: ['Tworzenia linku','Pogrubienia tekstu','Wstawiania obrazka','Tworzenia tabeli'], ans: 1, exp: '<strong> oznacza tekst ważny – wyświetla go pogrubioną czcionką. Do formatowania wizualnego lepiej używać CSS.' },
        { q: 'Selektor CSS "#menu" wybiera element z:', opts: ['Klasą "menu"','ID "menu"','Tagiem "menu"','Atrybutem "menu"'], ans: 1, exp: '# w CSS oznacza selektor ID. Klasy oznaczamy kropką (.), tagi bez prefiksu.' },
        { q: 'W JavaScript typeof "hello" zwraca:', opts: ['"text"','"string"','"char"','"word"'], ans: 1, exp: 'typeof sprawdza typ wartości. Dla ciągów znaków zwraca "string".' },
        { q: 'SQL – polecenie SELECT służy do:', opts: ['Usuwania danych','Pobierania danych','Tworzenia tabeli','Aktualizacji danych'], ans: 1, exp: 'SELECT pobiera dane z bazy. Przykład: SELECT * FROM users WHERE age > 18;' },
        { q: 'HTTP status 404 oznacza:', opts: ['Serwer niedostępny','Zasób nieznaleziony','Brak autoryzacji','Przekierowanie'], ans: 1, exp: '404 Not Found – serwer nie znalazł żądanego zasobu. 500=błąd serwera, 401=brak autoryzacji, 301=przekierowanie.' },
        { q: 'W Pythonie lista definiowana jest przez:', opts: ['{}','[]','()','<>'], ans: 1, exp: 'Lista w Pythonie: [1, 2, 3]. Słowniki: {}, krotki: (), sety: set().' },
        { q: 'Co robi DELETE FROM users WHERE id=5?', opts: ['Ukrywa użytkownika 5','Trwale usuwa wiersz gdzie id=5','Tworzy kopię wiersza 5','Zmienia id użytkownika 5'], ans: 1, exp: 'DELETE usuwa wiersze z tabeli. WHERE ogranicza które – bez WHERE usuwa WSZYSTKIE wiersze!' },
        { q: 'CSS właściwość "display: flex" włącza:', opts: ['Animację','Flexbox – elastyczny układ','Siatkę (grid)','Tryb inline'], ans: 1, exp: 'Flexbox ułatwia rozmieszczenie elementów w rzędzie lub kolumnie z automatycznym rozkładem przestrzeni.' },
        { q: 'Klucz główny (PRIMARY KEY) w bazie danych:', opts: ['Może się powtarzać','Jednoznacznie identyfikuje wiersz','Może być NULL','Jest opcjonalny'], ans: 1, exp: 'PRIMARY KEY jednoznacznie identyfikuje każdy wiersz w tabeli – musi być unikalny i nie może być NULL.' },
        { q: 'Git commit zapisuje:', opts: ['Zmiany na serwer','Snapshot zmian w lokalnym repozytorium','Kopię pliku na dysku','Plik konfiguracyjny'], ans: 1, exp: 'git commit tworzy punkt kontrolny (snapshot) zmian w lokalnym repozytorium. git push wysyła je na serwer.' },
        { q: 'W HTML atrybut "href" jest używany w tagu:', opts: ['<img>','<a>','<div>','<p>'], ans: 1, exp: '<a href="url"> tworzy hiperłącze. href (hypertext reference) zawiera adres docelowy.' },
        { q: 'Pętla "for i in range(5)" w Pythonie wykona się:', opts: ['4 razy','5 razy','6 razy','Nieskończenie'], ans: 1, exp: 'range(5) generuje liczby 0,1,2,3,4 – pętla wykona się 5 razy.' },
        { q: 'SQL JOIN łączy:', opts: ['Dwie bazy danych','Wiersze z różnych tabel na podstawie warunku','Dwie kolumny','Dwa serwery'], ans: 1, exp: 'JOIN (np. INNER JOIN, LEFT JOIN) łączy wiersze z powiązanych tabel przez wspólne klucze.' },
        { q: 'HTTPS vs HTTP – główna różnica to:', opts: ['Szybkość','Szyfrowanie transmisji TLS/SSL','Rozmiar strony','Typ serwera'], ans: 1, exp: 'HTTPS szyfruje dane między przeglądarką a serwerem używając TLS/SSL.' },
        { q: 'Zmienna "const" w JavaScript:', opts: ['Może być zmieniona','Nie może być ponownie przypisana','Automatycznie staje się globalna','Może być tylko liczbą'], ans: 1, exp: 'const deklaruje stałą – nie można przypisać nowej wartości, choć obiekt/tablica mogą być modyfikowane wewnętrznie.' },
        { q: 'Normalizacja bazy danych do 1NF wymaga:', opts: ['Kluczy obcych','Atomowych (niepodzielnych) wartości w kolumnach','Usunięcia duplikatów wierszy','Trzech tabel'], ans: 1, exp: '1NF (Pierwsza Postać Normalna): każda kolumna musi przechowywać wartości atomowe (niepodzielne).' },
        { q: 'W CSS selektor "div > p" wybiera:', opts: ['Wszystkie <p> wewnątrz <div>','Bezpośrednie dzieci <p> elementu <div>','<div> i <p> jednocześnie','<p> sąsiadujące z <div>'], ans: 1, exp: 'Selektor > (child combinator) wybiera tylko bezpośrednie dzieci. div p wybiera wszystkich potomków.' },
        { q: 'Metoda HTTP POST służy do:', opts: ['Pobierania danych','Wysyłania/tworzenia danych na serwerze','Usuwania zasobu','Aktualizacji zasobu'], ans: 1, exp: 'POST wysyła dane do serwera (np. formularz, nowy rekord). GET – pobiera. PUT/PATCH – aktualizuje. DELETE – usuwa.' },
        { q: 'SQL GROUP BY służy do:', opts: ['Sortowania wyników','Grupowania wierszy dla funkcji agregujących','Filtrowania wyników','Łączenia tabel'], ans: 1, exp: 'GROUP BY grupuje wiersze o tych samych wartościach, umożliwiając użycie COUNT, SUM, AVG, MAX, MIN.' },
        { q: 'Tag HTML5 <article> jest przykładem elementu:', opts: ['Inline','Blokowego semantycznego','Pustego','Formularza'], ans: 1, exp: '<article>, <section>, <nav>, <header>, <footer> to semantyczne elementy blokowe HTML5 opisujące strukturę treści.' },
        { q: 'Właściwość CSS "position: absolute" pozycjonuje element:', opts: ['Względem okna przeglądarki','Względem najbliższego przodka z position != static','Na stałej pozycji przy scrollowaniu','Obok poprzedniego elementu'], ans: 1, exp: 'absolute pozycjonuje względem najbliższego elementu nadrzędnego z position: relative/absolute/fixed.' },
        { q: 'Klucz obcy (FOREIGN KEY) w SQL:', opts: ['Identyfikuje unikalnie każdy wiersz','Łączy rekord z rekordem w innej tabeli','Szyfruje dane kolumny','Automatycznie inkrementuje wartość'], ans: 1, exp: 'FOREIGN KEY odnosi się do PRIMARY KEY innej tabeli, tworząc relację i zapewniając integralność referencyjną.' },
        { q: 'W JavaScript "=== " oznacza porównanie:', opts: ['Tylko wartości','Wartości i typów danych (ścisłe)','Przypisanie','Referencji do obiektów'], ans: 1, exp: '=== (strict equality) porównuje wartość ORAZ typ. "5" === 5 zwraca false. == (luźne) zrobiłoby koercję typów.' },
        { q: 'PHP jest językiem:', opts: ['Klienckim (front-end)','Serwerowym (back-end)','Kompilowanym do natywnego kodu','Wyłącznie do baz danych'], ans: 1, exp: 'PHP działa na serwerze, generując dynamiczne strony HTML. Klient otrzymuje gotowy HTML, nie widzi kodu PHP.' },
        { q: 'Responsywny design (RWD) osiągamy głównie przez:', opts: ['JavaScript po stronie serwera','CSS Media Queries i elastyczne układy','Flash','Oddzielne strony mobilne'], ans: 1, exp: 'Media Queries (@media) pozwalają stosować różne style CSS dla różnych rozmiarów ekranu. Wraz z flex/grid tworzą RWD.' },
        { q: 'SQL HAVING różni się od WHERE tym, że:', opts: ['Działa szybciej','Filtruje grupy po użyciu GROUP BY','Obsługuje wartości NULL','Może używać aliasów'], ans: 1, exp: 'WHERE filtruje wiersze PRZED grupowaniem. HAVING filtruje grupy PO zastosowaniu GROUP BY i funkcji agregujących.' },
        { q: 'Atak SQL Injection polega na:', opts: ['Przeciążeniu serwera','Wstrzyknięciu kodu SQL do formularza wejściowego','Kradzieży sesji','Phishingu'], ans: 1, exp: 'SQL Injection: atakujący wpisuje kod SQL w formularzu, który wykonuje się w bazie. Zapobiega PDO z parametrami.' },
        { q: 'CSS Flexbox właściwość "justify-content: center" wyrównuje elementy:', opts: ['Pionowo do środka','Poziomo do środka wzdłuż głównej osi','Do lewej','Do prawej'], ans: 1, exp: 'justify-content dotyczy osi głównej (domyślnie poziomej). align-items dotyczy osi poprzecznej (pionowej).' },
      ]
    },
    {
      id: 'inf04', name: 'INF.04 – Tworzenie aplikacji', icon: '⌨️',
      desc: 'Projektowanie, programowanie i testowanie aplikacji desktopowych i mobilnych.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Programowanie obiektowe (OOP) opiera się na 4 filarach. Który z nich ukrywa wewnętrzne szczegóły klasy?', opts: ['Dziedziczenie','Polimorfizm','Hermetyzacja (enkapsulacja)','Abstrakcja'], ans: 2, exp: 'Enkapsulacja (hermetyzacja) ukrywa stan wewnętrzny obiektu, udostępniając go tylko przez metody publiczne (gettery/settery).' },
        { q: 'Dziedziczenie w OOP pozwala:', opts: ['Ukryć dane','Klasie potomnej przejąć właściwości i metody klasy bazowej','Tworzyć obiekty bez klas','Wykonywać kod wielowątkowo'], ans: 1, exp: 'Dziedziczenie: klasa pochodna (child) dziedziczy atrybuty i metody klasy bazowej (parent), może je rozszerzać/nadpisywać.' },
        { q: 'Polimorfizm oznacza:', opts: ['Jeden obiekt wiele klas','Ta sama metoda zachowuje się inaczej w zależności od obiektu','Brak dziedziczenia','Statyczne typowanie'], ans: 1, exp: 'Polimorfizm: metoda o tej samej nazwie działa inaczej w różnych klasach. Np. draw() inaczej w Circle i Rectangle.' },
        { q: 'Złożoność algorytmu O(n²) oznacza:', opts: ['Stały czas wykonania','Czas rośnie liniowo','Czas rośnie kwadratowo wraz z n','Czas logarytmiczny'], ans: 2, exp: 'O(n²) – np. bubble sort – czas rośnie kwadratowo. O(1)=stały, O(n)=liniowy, O(log n)=logarytmiczny, O(n log n)=n log n.' },
        { q: 'Stos (stack) to struktura danych działająca w trybie:', opts: ['FIFO','LIFO','RANDOM','FILO i LIFO to to samo'], ans: 1, exp: 'Stos (stack): LIFO (Last In First Out) – ostatni dodany, pierwszy wyjęty. Operacje: push (dodaj), pop (usuń wierzchołek).' },
        { q: 'Kolejka (queue) to struktura danych działająca w trybie:', opts: ['LIFO','FIFO','Random Access','Sorted'], ans: 1, exp: 'Kolejka (queue): FIFO (First In First Out) – pierwszy dodany, pierwszy wyjęty. Jak kolejka w sklepie.' },
        { q: 'Wzorzec projektowy Singleton gwarantuje:', opts: ['Wiele instancji klasy','Dokładnie jedną instancję klasy w programie','Dziedziczenie między klasami','Leniwe inicjowanie wszystkich klas'], ans: 1, exp: 'Singleton: wzorzec kreacyjny zapewniający, że klasa ma tylko jedną instancję i udostępniający globalny dostęp do niej.' },
        { q: 'Wzorzec MVC dzieli aplikację na:', opts: ['Moduły, Widoki, Komponenty','Model, Widok, Kontroler','Menedżer, Validator, Compiler','Makro, Vendor, Cache'], ans: 1, exp: 'MVC: Model (dane/logika), View (interfejs), Controller (obsługuje żądania, łączy Model z View). Popularny w web (Laravel, Django).' },
        { q: 'TDD (Test-Driven Development) polega na:', opts: ['Testowaniu po napisaniu kodu','Pisaniu testów PRZED implementacją','Automatycznym generowaniu testów','Testowaniu przez użytkowników'], ans: 1, exp: 'TDD: cykl Red-Green-Refactor. 1. Napisz test (który pada), 2. Napisz minimalny kod by test przeszedł, 3. Refaktoruj.' },
        { q: 'Interfejs (interface) w OOP to:', opts: ['Klasa z pełną implementacją','Kontrakt definiujący co klasa musi implementować','Typ zmiennej','Biblioteka zewnętrzna'], ans: 1, exp: 'Interfejs definiuje JAKIE metody musi zawierać klasa (bez implementacji). Klasa "implementuje" interfejs.' },
        { q: 'Git branch służy do:', opts: ['Usuwania commitów','Tworzenia niezależnej linii rozwoju kodu','Synchronizacji z serwerem','Tagowania wersji'], ans: 1, exp: 'Gałęzie (branches) pozwalają rozwijać funkcje niezależnie od gałęzi głównej (main/master). Potem merge łączy gałęzie.' },
        { q: 'Rekurencja to:', opts: ['Pętla while','Funkcja wywołująca samą siebie','Metoda klasy potomnej','Typ zmiennej globalnej'], ans: 1, exp: 'Rekurencja: funkcja wywołuje samą siebie z uproszczonym argumentem. Wymaga warunku bazowego (base case), by nie zapętlić.' },
        { q: 'Agile to metodologia wytwarzania oprogramowania oparta na:', opts: ['Szczegółowym planie na cały projekt','Iteracyjnych sprintach i ciągłym dostarczaniu wartości','Modelu kaskadowym','Braku dokumentacji'], ans: 1, exp: 'Agile: iteracyjne sprinty (1-4 tyg.), częste dostarczanie, adaptacja na zmiany, bliska współpraca z klientem.' },
        { q: 'Scrum definiuje rolę "Product Owner" jako:', opts: ['Lidera technicznego','Właściciela backlogu produktu i priorytetyzacji','Moderatora spotkań','Testera jakości'], ans: 1, exp: 'Product Owner: zarządza backlogiem (listą zadań), priorytetyzuje user stories, reprezentuje interesy biznesu.' },
        { q: 'Unit test (test jednostkowy) testuje:', opts: ['Całą aplikację','Integrację z bazą danych','Najmniejszą możliwą jednostkę kodu (funkcja/metoda)','Interfejs użytkownika'], ans: 2, exp: 'Unit test weryfikuje poprawność pojedynczej funkcji/metody w izolacji od reszty systemu (moking zależności).' },
        { q: 'Diagram klas UML przedstawia:', opts: ['Przepływ danych w czasie','Klasy, ich atrybuty, metody i relacje między nimi','Kolejność wywołań metod','Przypadki użycia systemu'], ans: 1, exp: 'Diagram klas UML: klasy jako prostokąty z sekcjami (nazwa, atrybuty, metody), linie = relacje (dziedziczenie, asocjacja).' },
        { q: 'Wyjątek (exception) w programowaniu to:', opts: ['Błąd składni (syntax error)','Zdarzenie w trakcie wykonania zakłócające normalny przepływ','Ostrzeżenie kompilatora','Typ zmiennej'], ans: 1, exp: 'Wyjątek: błąd w czasie wykonania (runtime). Obsługiwany przez try-catch-finally. Lepsze niż sprawdzanie kodów błędu.' },
        { q: 'Algorytm binarnego wyszukiwania wymaga tablicy:', opts: ['Nieuporządkowanej','Posortowanej','Z duplikatami','Wielowymiarowej'], ans: 1, exp: 'Binary Search: działa tylko na posortowanych tablicach. Złożoność O(log n) – wielokrotnie lepsze od liniowego O(n).' },
        { q: 'Hermetyzacja w Javie/C++ osiągana jest przez:', opts: ['Słowo kluczowe static','Modyfikatory dostępu (private, protected, public)','Interfejsy','Dziedziczenie wielokrotne'], ans: 1, exp: 'private: dostęp tylko w klasie. protected: klasa + potomne. public: wszędzie. Pola powinny być private, dostęp przez metody.' },
        { q: 'Garbage Collector w językach jak Java/Python:', opts: ['Kompiluje kod','Automatycznie zwalnia pamięć po nieużywanych obiektach','Optymalizuje pętle','Obsługuje wyjątki'], ans: 1, exp: 'GC automatycznie zarządza pamięcią, usuwając obiekty do których nie ma już referencji. W C/C++ robi to programista ręcznie.' },
        { q: 'REST API używa metod HTTP. Jaką metodę stosujemy do usuwania zasobu?', opts: ['GET','POST','PUT','DELETE'], ans: 3, exp: 'RESTful API: GET (pobierz), POST (utwórz), PUT/PATCH (aktualizuj), DELETE (usuń). Zasoby jako URL (np. /users/5).' },
        { q: 'JSON (JavaScript Object Notation) to format:', opts: ['Kompresji plików','Wymiany danych tekstowych','Grafiki wektorowej','Konfiguracji baz danych'], ans: 1, exp: 'JSON to lekki format tekstowy do wymiany danych. Oparty na parach klucz-wartość. Szeroko używany w REST API.' },
        { q: 'Które sortowanie ma złożoność O(n log n) w przypadku średnim?', opts: ['Bubble sort','Selection sort','Merge sort','Insertion sort'], ans: 2, exp: 'Merge sort (sortowanie przez scalanie): zawsze O(n log n). Bubble i selection sort: O(n²). Insertion: O(n²) śred., O(n) najlep.' },
        { q: 'Słowo kluczowe "abstract" przy klasie oznacza:', opts: ['Klasa bez metod','Klasa której nie można bezpośrednio instancjonować','Klasa statyczna','Klasa tylko do odczytu'], ans: 1, exp: 'Klasa abstrakcyjna: może zawierać metody abstrakcyjne (bez implementacji), nie można tworzyć jej instancji bezpośrednio.' },
        { q: 'Wzorzec Observer (obserwator) stosuje się gdy:', opts: ['Chcemy jednej instancji klasy','Obiekt musi powiadamiać inne o zmianach swojego stanu','Chcemy opóźnić tworzenie obiektów','Potrzebujemy adaptera do API'], ans: 1, exp: 'Observer: obiekt (Subject) utrzymuje listę obserwatorów i powiadamia ich o zmianach. Podstawa event-driven programming.' },
      ]
    },
    {
      id: 'ee08', name: 'EE.08 – Elektronika', icon: '⚡',
      desc: 'Montaż i eksploatacja urządzeń elektronicznych i elektroenergetycznych.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Prawo Ohma: U = I × R. Natężenie prądu to:', opts: ['U × R','U / R','R / U','U + R'], ans: 1, exp: 'Z prawa Ohma: I = U/R. Napięcie U [V], natężenie I [A], rezystancja R [Ω].' },
        { q: 'Kondensator w obwodzie DC po naładowaniu:', opts: ['Przewodzi prąd','Blokuje przepływ prądu','Wzmacnia napięcie','Działa jak opornik'], ans: 1, exp: 'Kondensator naładowany blokuje prąd stały. Przepuszcza prąd zmienny (AC).' },
        { q: 'Dioda LED świeci gdy:', opts: ['Spolaryzowana zaporowo','Spolaryzowana przewodząco','Połączona szeregowo z cewką','Przy napięciu odwrotnym'], ans: 1, exp: 'LED świeci gdy anoda (+) ma wyższy potencjał niż katoda (–) – polaryzacja przewodząca.' },
        { q: 'Jednostka pojemności elektrycznej to:', opts: ['Henr [H]','Farad [F]','Om [Ω]','Wat [W]'], ans: 1, exp: 'Pojemność mierzona w Faradach [F]. Praktycznie: pF, nF, μF.' },
        { q: 'Rezystory szeregowe – wypadkowy opór:', opts: ['Mniejszy od najmniejszego','Równy najmniejszemu','Suma wszystkich','Iloczyn / suma'], ans: 2, exp: 'Szeregowo: R = R1 + R2 + ... Równolegle: 1/R = 1/R1 + 1/R2 (mniejszy niż każdy).' },
        { q: 'Tranzystor BJT może pracować jako:', opts: ['Tylko wzmacniacz','Tylko klucz','Wzmacniacz lub klucz elektroniczny','Tylko prostownik'], ans: 2, exp: 'BJT pracuje w trybie aktywnym (wzmacniacz) lub nasycenia/odcięcia (klucz cyfrowy).' },
        { q: 'Multimetr na zakresie DCV mierzy:', opts: ['Prąd stały','Napięcie stałe','Rezystancję','Pojemność'], ans: 1, exp: 'DCV = Direct Current Voltage. ACV = napięcie przemienne, DCA = prąd stały, Ω = rezystancja.' },
        { q: 'Układ NE555 to popularny:', opts: ['Mikroprocesor','Timer/generator sygnałów','Przetwornik ADC','Stabilizator liniowy'], ans: 1, exp: 'NE555 to wszechstronny timer – impulsy, opóźnienia, PWM, generatory przebiegów prostokątnych.' },
        { q: 'Dioda Zenera stabilizuje:', opts: ['Prąd','Napięcie na stałym poziomie','Rezystancję','Pojemność'], ans: 1, exp: 'Dioda Zenera w przebicia zaporowym utrzymuje stałe napięcie – podstawa prostych stabilizatorów.' },
        { q: 'Moc elektryczna P =', opts: ['U + I','U × I','U / I','U² / I'], ans: 1, exp: 'P [W] = U [V] × I [A]. Wzór pomocniczy: P = I²R = U²/R.' },
        { q: 'Kondensator elektrolityczny musi być podłączony:', opts: ['Z zachowaniem biegunowości','Dowolnie','Szeregowo z cewką','Równolegle do diody'], ans: 0, exp: 'Kondensatory elektrolityczne są spolaryzowane – odwrotne podłączenie = uszkodzenie lub wybuch.' },
        { q: 'Tranzystor jako klucz pracuje w:', opts: ['Trybie aktywnym','Nasyceniu i odcięciu','Trybie liniowym','Dyfuzji'], ans: 1, exp: 'Klucz: nasycenie = przewodzi (ON), odcięcie = nie przewodzi (OFF). Podstawa bramek logicznych.' },
        { q: 'Alternator generuje prąd:', opts: ['Stały DC bezpośrednio','Zmienny AC prostowany na DC','Tylko stały DC','Impulsowy'], ans: 1, exp: 'Alternator produkuje AC prostowany przez mostek Graetza (4 diody) na DC ładujące akumulator 12V.' },
        { q: 'Bramka logiczna AND daje wynik 1 gdy:', opts: ['Oba wejścia = 0','Jedno wejście = 1','Oba wejścia = 1','Wejścia są różne'], ans: 2, exp: 'AND (iloczyn logiczny): 1 tylko gdy A=1 AND B=1. Tabela prawdy: 00→0, 01→0, 10→0, 11→1.' },
        { q: 'Bramka logiczna OR daje wynik 0 gdy:', opts: ['Oba wejścia = 1','Jedno wejście = 1','Oba wejścia = 0','Wejścia są różne'], ans: 2, exp: 'OR (suma logiczna): 0 tylko gdy A=0 AND B=0. Wynik 1 gdy choć jedno wejście = 1.' },
        { q: 'Rezystor 4-pasmowy: brązowy-czarny-czerwony-złoty ma wartość:', opts: ['102 Ω ±5%','1000 Ω ±5%','1200 Ω ±5%','10200 Ω ±10%'], ans: 1, exp: 'Brązowy=1, Czarny=0, Czerwony=×100, Złoty=±5%. 1,0,×100 = 1000Ω = 1kΩ ±5%.' },
        { q: 'Liczba binarna 1010 w systemie dziesiętnym to:', opts: ['8','10','12','16'], ans: 1, exp: '1×8 + 0×4 + 1×2 + 0×1 = 8+2 = 10. System binarny: każdy bit to potęga 2.' },
        { q: 'Oscyloskop służy do:', opts: ['Pomiaru rezystancji','Wizualizacji przebiegów napięcia w czasie','Generowania sygnałów','Programowania mikrokontrolerów'], ans: 1, exp: 'Oscyloskop wyświetla przebieg napięcia (oś Y) w czasie (oś X). Mierzy częstotliwość, amplitudę, fazę.' },
        { q: 'Tranzystor MOSFET sterowany jest przez:', opts: ['Prąd bazy','Napięcie bramki (Gate)','Prąd kolektora','Napięcie emitera'], ans: 1, exp: 'MOSFET (polowy): sterowanie napięciowe – napięcie na bramce (Gate) tworzy kanał między drenem (Drain) a źródłem (Source).' },
        { q: 'Układ TTL pracuje przy napięciu zasilania:', opts: ['1,8 V','3,3 V','5 V','12 V'], ans: 2, exp: 'Logika TTL (Transistor-Transistor Logic) pracuje przy VCC = 5V. Logika CMOS: 3,3V lub 5V. Nowe układy: 1,8V/3,3V.' },
        { q: 'Prostownik mostkowy (Graetza) zbudowany jest z:', opts: ['1 diody','2 diod','4 diod','6 diod'], ans: 2, exp: 'Mostek Graetza: 4 diody w konfiguracji H. Prostuje oba półokresy AC na DC (prostownik pełnookresowy).' },
        { q: 'Częstotliwość prądu zmiennego w Polsce wynosi:', opts: ['50 Hz','60 Hz','100 Hz','230 Hz'], ans: 0, exp: 'W Polsce i Europie: 50 Hz, 230V (faza). W USA: 60 Hz, 120V. Okres T = 1/f = 20 ms.' },
        { q: 'Przetwornik ADC zamienia:', opts: ['Sygnał cyfrowy na analogowy','Sygnał analogowy na cyfrowy','DC na AC','Częstotliwość na napięcie'], ans: 1, exp: 'ADC (Analog-to-Digital Converter): np. mikrofon → próbkowanie → liczba binarna. DAC robi odwrotnie.' },
        { q: 'Jednostka indukcyjności cewki to:', opts: ['Farad [F]','Om [Ω]','Henr [H]','Wat [W]'], ans: 2, exp: 'Indukcyjność mierzona w Henrach [H]. Cewka magazynuje energię w polu magnetycznym (kondensator – elektrycznym).' },
        { q: 'Filtr RC górnoprzepustowy przepuszcza:', opts: ['Niskie częstotliwości','Wysokie częstotliwości','Tylko jedną częstotliwość','Prąd stały'], ans: 1, exp: 'Filtr górnoprzepustowy RC: przy niskich f kondensator blokuje. Przy wysokich f przepuszcza. Dolnoprzepustowy – odwrotnie.' },
        { q: 'Napięcie zasilania baterii 9V podłączone do rezystora 1kΩ daje prąd:', opts: ['0,9 mA','9 mA','90 mA','900 mA'], ans: 1, exp: 'I = U/R = 9V / 1000Ω = 0,009A = 9mA. Prawo Ohma w praktyce.' },
      ]
    },
    {
      id: 'ee09', name: 'EE.09 – Instalacje elektryczne', icon: '🔌',
      desc: 'Montaż, uruchamianie i konserwacja instalacji elektrycznych budynków.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Napięcie fazowe sieci niskiego napięcia w Polsce wynosi:', opts: ['110 V','230 V','400 V','24 V'], ans: 1, exp: '230V – napięcie między fazą (L) a przewodem neutralnym (N). Napięcie między dwiema fazami = 400V (trójfazowe).' },
        { q: 'Bezpiecznik różnicowoprądowy (RCD/RCCB) chroni przed:', opts: ['Przeciążeniem','Porażeniem prądem elektrycznym przez człowieka','Zwarciami','Przepięciami'], ans: 1, exp: 'RCD wykrywa różnicę prądów (prąd wyciekający przez ciało człowieka ≥30 mA) i wyłącza obwód w ms.' },
        { q: 'Kolor przewodu ochronnego PE w instalacji elektrycznej to:', opts: ['Niebieski','Brązowy','Żółto-zielony','Szary'], ans: 2, exp: 'PE (Protective Earth) = żółto-zielony. N (neutralny) = niebieski. L1=brązowy, L2=czarny, L3=szary.' },
        { q: 'Przekrój przewodu jest ważny bo:', opts: ['Wpływa tylko na kolor','Określa maksymalny dopuszczalny prąd','Decyduje o napięciu','Wpływa na częstotliwość'], ans: 1, exp: 'Im większy przekrój (mm²), tym więcej prądu może płynąć. Zbyt mały przekrój = przegrzanie i pożar.' },
        { q: 'Wyłącznik nadprądowy (bezpiecznik automatyczny) chroni przed:', opts: ['Porażeniem prądem','Przeciążeniem i zwarciami','Przepięciami atmosferycznymi','Zanikiem napięcia'], ans: 1, exp: 'Wyłącznik automatyczny (MCB) chroni przewody przed nadmiernym prądem spowodowanym przeciążeniem lub zwarciem.' },
        { q: 'System instalacji TN-S charakteryzuje się:', opts: ['Brakiem uziemienia','Wspólnym przewodem PEN','Oddzielnym przewodem PE i N','Izolowanym punktem neutralnym'], ans: 2, exp: 'TN-S: oddzielne przewody PE (ochronny) i N (neutralny) przez całą instalację. Bezpieczniejsze niż TN-C.' },
        { q: 'Miernik cęgowy mierzy prąd:', opts: ['Przez dotyk do przewodu','Bez przerywania obwodu (w polu magnetycznym)','Tylko prąd stały','Tylko prąd wyłączony'], ans: 1, exp: 'Cęgi mierzą natężenie przez indukcję magnetyczną – zakładają się na przewód bez przerywania obwodu.' },
        { q: 'Silnik asynchroniczny (indukcyjny) trójfazowy pracuje:', opts: ['Z synchroniczną prędkością wirowania','Z prędkością nieco mniejszą niż pole magnetyczne (poślizg)','Wyłącznie na prądzie stałym','Bez strat mocy'], ans: 1, exp: 'Silnik indukcyjny: wirnik obraca się wolniej niż pole (poślizg s). Synchroniczny: n = 60f/p (f=50Hz, p=liczba par biegunów).' },
        { q: 'Transformator służy do:', opts: ['Zmiany częstotliwości prądu','Zmiany napięcia prądu przemiennego','Prostowania AC na DC','Magazynowania energii'], ans: 1, exp: 'Transformator zmienia napięcie AC przez indukcję elektromagnetyczną. U1/U2 = n1/n2 (stosunek zwojów).' },
        { q: 'Przy pomiarach elektrycznych megaomomierz mierzy:', opts: ['Małe rezystancje (mΩ)','Izolację kabli (MΩ)','Napięcia wysokie','Prąd zwarciowy'], ans: 1, exp: 'Megaomomierz (megger) mierzy bardzo duże rezystancje izolacji (MΩ-GΩ) przykładając napięcie próbne 500-1000V.' },
        { q: 'Przekrój minimalny przewodu fazowego w instalacji mieszkaniowej dla gniazdek wynosi:', opts: ['1,0 mm²','1,5 mm²','2,5 mm²','4,0 mm²'], ans: 2, exp: 'Norma: gniazdka i obwody ogólne – min. 2,5 mm². Oświetlenie – min. 1,5 mm². Im większy prąd, tym grubszy przewód.' },
        { q: 'Prąd zwarciowy jest niebezpieczny bo:', opts: ['Ma niskie napięcie','Może być bardzo duży (kA) powodując pożar i zniszczenia','Ma wysoką częstotliwość','Płynie tylko przez człowieka'], ans: 1, exp: 'Zwarcie (zerowy opór) powoduje prąd ograniczony tylko impedancją sieci – może osiągnąć tysiące amperów.' },
        { q: 'Tabliczka znamionowa silnika elektrycznego podaje:', opts: ['Tylko moc','Moc, napięcie, prąd, prędkość obrotową, klasę izolacji','Tylko napięcie','Tylko prąd'], ans: 1, exp: 'Tabliczka znamionowa (nameplate) zawiera wszystkie parametry nominalne: P[kW], U[V], I[A], n[obr/min], cosφ, klasę izolacji.' },
        { q: 'Pomiar napięcia miernikiem wykonujemy:', opts: ['Szeregowo z obwodem','Równolegle do mierzonego elementu','Bez żadnego połączenia','Po odłączeniu zasilania'], ans: 1, exp: 'Woltomierz (pomiar napięcia): równolegle. Amperomierz (pomiar prądu): szeregowo. Omomierz: na wyłączonym obwodzie.' },
        { q: 'Ochrona przeciwporażeniowa podstawowa (dawna ochrona przed dotykiem bezpośrednim) to:', opts: ['Uziemienie','Izolacja elementów czynnych (pod napięciem)','Wyłączniki różnicowoprądowe','Ogrodzeń elektryczne'], ans: 1, exp: 'Ochrona podstawowa: izolacja, osłony, ogrodzenia – zapobiega kontaktowi z częściami czynnymi (pod napięciem).' },
        { q: 'Liczba obrotów silnika synchronicznego (Hz=50, 2 pary biegunów) to:', opts: ['1000 obr/min','1500 obr/min','3000 obr/min','750 obr/min'], ans: 1, exp: 'n = 60f/p = 60×50/2 = 1500 obr/min. Przy 1 parze biegunów: 3000 rpm. Przy 4 parach: 750 rpm.' },
        { q: 'Klasa izolacji silnika H oznacza dopuszczalną temperaturę:', opts: ['105°C','130°C','155°C','180°C'], ans: 3, exp: 'Klasy izolacji: A=105°C, E=120°C, B=130°C, F=155°C, H=180°C. Im wyższa klasa, tym droższa izolacja.' },
        { q: 'Instalacja odgromowa (LPS) składa się z:', opts: ['Wyłączników różnicowoprądowych','Zwodów, przewodów odprowadzających i uziomów','Transformatorów bezpieczeństwa','Kondensatorów wyrównawczych'], ans: 1, exp: 'LPS: zwody (piorunochron) → przewody odprowadzające → uziom. Chroni budynek przed bezpośrednim uderzeniem pioruna.' },
        { q: 'Wyłącznik nadprądowy C16 oznacza:', opts: ['Krzywa B, 16A','Krzywa C, prąd nominalny 16A','16 biegunów','Rezystancja 16Ω'], ans: 1, exp: 'C16: krzywa wyzwalania C (dla silników, transformatorów – wyższy prąd rozruchowy), prąd nominalny 16A.' },
        { q: 'Uprawnienia SEP grupy 1 wymagane są do eksploatacji urządzeń:', opts: ['Tylko cieplnych','Elektrycznych do 1kV (kategoria E)','Wyłącznie wysokiego napięcia','Tylko gazowych'], ans: 1, exp: 'SEP Gr.1 E – eksploatacja urządzeń elektrycznych do 1kV. D – dozór. Wymagane świadectwo kwalifikacyjne.' },
        { q: 'Cosφ (cosinus phi) w energetyce oznacza:', opts: ['Sprawność silnika','Współczynnik mocy (stosunek mocy czynnej do pozornej)','Temperaturę uzwojeń','Napięcie szczytowe'], ans: 1, exp: 'cosφ = P/S (moc czynna/pozorna). cosφ=1 = obciążenie czysto rezystancyjne. Niski cosφ = duże straty, kary od dostawcy.' },
      ]
    },
    {
      id: 'au30', name: 'AU.30 – Technik samochodowy', icon: '🚗',
      desc: 'Organizacja i prowadzenie procesu obsługi pojazdów samochodowych.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Złącze OBD-II służy do:', opts: ['Ładowania akumulatora','Diagnostyki komputerowej pojazdu','Podłączania radia','Sterowania klimatyzacją'], ans: 1, exp: 'OBD-II to standard diagnostyczny (od 1996/2001) umożliwiający odczyt kodów błędów ECU.' },
        { q: 'Kod błędu P0300 oznacza:', opts: ['Błąd czujnika tlenu','Losowe chybienie zapłonu','Niskie ciśnienie oleju','Błąd skrzyni biegów'], ans: 1, exp: 'P0300 = Random/Multiple Cylinder Misfire Detected. P0301-P0308 to konkretne cylindry.' },
        { q: 'Czujnik MAF mierzy:', opts: ['Temperaturę silnika','Masę zasysanego powietrza','Ciśnienie oleju','Prędkość obrotową'], ans: 1, exp: 'MAF (Mass Air Flow) mierzy masę powietrza wchodzącego do silnika dla obliczenia dawki paliwa przez ECU.' },
        { q: 'Układ ABS zapobiega:', opts: ['Aquaplaningowi','Blokowaniu kół podczas hamowania','Przekroczeniu prędkości','Zużyciu opon'], ans: 1, exp: 'ABS (Anti-lock Braking System) zapobiega blokowaniu kół, zachowując sterowność podczas hamowania.' },
        { q: 'Czujnik lambda (sonda lambda) monitoruje:', opts: ['Poziom oleju','Zawartość O₂ w spalinach','Temperaturę cieczy','Ciśnienie wtrysku'], ans: 1, exp: 'Czujnik lambda mierzy O₂ w spalinach, korygując mieszankę do wartości stechiometrycznej λ=1 (14,7:1).' },
        { q: 'Naładowany akumulator 12V ma napięcie spoczynkowe ok.:', opts: ['10,5 V','11,0 V','12,6–12,8 V','14,4 V'], ans: 2, exp: 'Pełny akumulator: 12,6–12,8V. Alternator ładuje 13,8–14,4V. Poniżej 12,0V = rozładowany.' },
        { q: 'Common Rail pracuje pod ciśnieniem:', opts: ['5–10 bar','50–100 bar','200–2500 bar','0,5–3 bar'], ans: 2, exp: 'Systemy CR pracują pod 200–2500 bar, zapewniając precyzyjny wtrysk i niską emisję.' },
        { q: 'Turbosprężarka służy do:', opts: ['Chłodzenia silnika','Doładowania – sprężania powietrza dolotowego','Oczyszczania spalin','Redukcji zużycia oleju'], ans: 1, exp: 'Turbo napędzane gazami wydechowymi sprężza powietrze dolotowe, zwiększając moc silnika.' },
        { q: 'Układ ESP zapobiega:', opts: ['Zużyciu paliwa','Utracie przyczepności bocznej i bocznemu poślizgowi','Blokowaniu kół','Przegrzaniu silnika'], ans: 1, exp: 'ESP (Electronic Stability Program) selektywnie hamuje koła, zapobiegając poślizgowi.' },
        { q: 'Filtr DPF w dieslu:', opts: ['Filtruje paliwo','Wychwytuje sadzę ze spalin','Oczyszcza olej','Filtruje powietrze dolotowe'], ans: 1, exp: 'DPF (Diesel Particulate Filter) zatrzymuje cząstki stałe (sadzę). Wymaga periodycznej regeneracji.' },
        { q: 'Układ EGR recyrkuluje:', opts: ['Paliwo do zbiornika','Spaliny do komory spalania','Chłodziwo','Olej silnikowy'], ans: 1, exp: 'EGR kieruje część spalin z powrotem do cylindrów, obniżając temperaturę i emisję NOx.' },
        { q: 'Moment obrotowy mierzy się w:', opts: ['Watach [W]','Kilowatach [kW]','Niutonometrach [Nm]','Obrotach [rpm]'], ans: 2, exp: 'Moment obrotowy (torque) = Nm. Moc = kW lub KM (1 KM = 0,736 kW).' },
        { q: 'Silnik 4-suwowy ma cykl pracy:', opts: ['Ssanie–Sprężanie–Praca–Wydech','Ssanie–Praca–Sprężanie–Wydech','Sprężanie–Ssanie–Wydech–Praca','Praca–Ssanie–Sprężanie–Wydech'], ans: 0, exp: '4 suwy: 1-Ssanie (dolot mieszanki), 2-Sprężanie, 3-Praca (zapłon/rozprężanie), 4-Wydech.' },
        { q: 'Koło zamachowe silnika służy do:', opts: ['Chłodzenia silnika','Wyrównywania nierówności biegu silnika','Sterowania wtryskiem','Napędu alternatora'], ans: 1, exp: 'Koło zamachowe magazynuje energię kinetyczną, wyrównując pracę silnika między suwami pracy.' },
        { q: 'Rozrząd z paskiem zębatym należy wymieniać zgodnie z:', opts: ['Kolorem paska','Przebiegiem podanym przez producenta','Wzrokiem mechanika','Tylko po awarii'], ans: 1, exp: 'Zerwanie paska rozrządu w silniku DOHC/SOHC może zniszczyć zawory i tłoki. Wymiana wg DTR (60–160 tys. km).' },
        { q: 'Skrzynia biegów CVT to:', opts: ['Manualna z 6 biegami','Automatyczna z bezstopniowym przekładnią','Półautomatyczna DSG','Sekwencyjna wyścigowa'], ans: 1, exp: 'CVT (Continuously Variable Transmission): bezstopniowa skrzynia biegów – płynnie zmienia przełożenie bez stopni.' },
        { q: 'Układ hamulcowy ABS+EBD:', opts: ['ABS to hamulce tarczowe, EBD to bębnowe','ABS zapobiega blokowaniu, EBD rozdziela siłę hamowania między osie','Oba systemy robią to samo','EBD zastępuje ABS w nowszych autach'], ans: 1, exp: 'ABS: zapobiega blokowaniu kół. EBD (Electronic Brakeforce Distribution): optymalnie rozkłada siłę hamowania.' },
        { q: 'Ciecz chłodząca (płyn do chłodnicy) ma zadanie:', opts: ['Smarowania silnika','Odprowadzania ciepła z silnika','Czyszczenia wtryskiwaczy','Chłodzenia hamulców'], ans: 1, exp: 'Płyn chłodniczy (mieszanina wody i glikolu etylenowego) odprowadza ciepło z silnika do chłodnicy.' },
        { q: 'Czujnik MAP (Manifold Absolute Pressure) mierzy:', opts: ['Masę powietrza','Ciśnienie bezwzględne w kolektorze dolotowym','Temperaturę spalin','Ciśnienie oleju'], ans: 1, exp: 'MAP mierzy ciśnienie w kolektorze dolotowym. Alternatywa dla MAF – silnik przelicza dawkę paliwa z ciśnienia.' },
        { q: 'Układ climatronik różni się od klimatyzacji tym, że:', opts: ['Jest głośniejszy','Automatycznie utrzymuje zadaną temperaturę','Chłodzi mocniej','Nie używa freonu'], ans: 1, exp: 'Climatronic = automatyczna klimatyzacja z czujnikami temperatury. Standardowa klimatyzacja: ręczna regulacja.' },
        { q: 'Hamulce tarczowe vs bębnowe – główna zaleta tarczowych:', opts: ['Tańsze w produkcji','Lepsze chłodzenie i skuteczność hamowania','Lżejsze','Prostsze w naprawie'], ans: 1, exp: 'Hamulce tarczowe: lepsza dyspersja ciepła (wentylowane), szybsza odpowiedź, lepsza modulacja siły hamowania.' },
      ]
    },
    {
      id: 'eka01', name: 'EKA.01 – Rachunkowość', icon: '📊',
      desc: 'Prowadzenie rachunkowości i rozliczanie podatków oraz składek ZUS.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Bilans przedsiębiorstwa to zestawienie:', opts: ['Przychodów i kosztów','Aktywów i pasywów','Wpływów i wydatków','Zysków i strat'], ans: 1, exp: 'Bilans pokazuje aktywa (majątek) i pasywa (źródła finansowania) na dany dzień. Aktywa = Pasywa.' },
        { q: 'VAT to podatek:', opts: ['Dochodowy od osób prawnych','Od towarów i usług','Od nieruchomości','Od czynności cywilnoprawnych'], ans: 1, exp: 'VAT = podatek od towarów i usług. Stawki w Polsce: 23%, 8%, 5%, 0%.' },
        { q: 'Konto debetowe (Wn) zwiększa:', opts: ['Pasywa i przychody','Aktywa i koszty','Tylko zobowiązania','Tylko kapitał'], ans: 1, exp: 'Debet (Wn): zwiększa aktywa i koszty, zmniejsza pasywa i przychody. Kredyt (Ma): odwrotnie.' },
        { q: 'Faktura VAT musi zawierać:', opts: ['Datę urodzenia sprzedawcy','NIP sprzedawcy i nabywcy','Podpis notarialny','Pieczęć bankową'], ans: 1, exp: 'Elementy faktury: NIP sprzedawcy/nabywcy, data, numer, stawka VAT, kwota netto i brutto.' },
        { q: 'EBIT to wynik finansowy:', opts: ['Po odjęciu podatku','Przed odsetkami i podatkiem','Po odjęciu amortyzacji','Przed amortyzacją'], ans: 1, exp: 'EBIT = Earnings Before Interest and Taxes – zysk operacyjny przed odsetkami i opodatkowaniem.' },
        { q: 'Amortyzacja to:', opts: ['Spłata długu','Stopniowe zużycie środków trwałych ujęte w kosztach','Podatek od środków trwałych','Przychód ze sprzedaży'], ans: 1, exp: 'Amortyzacja systematycznie rozlicza wartość środków trwałych w czasie ich użytkowania.' },
        { q: 'Składki ZUS odprowadzane są do:', opts: ['Urzędu Skarbowego','Zakładu Ubezpieczeń Społecznych','NFZ','Ministerstwa Finansów'], ans: 1, exp: 'ZUS (Zakład Ubezpieczeń Społecznych) zbiera składki na ubezpieczenia emerytalne, rentowe, chorobowe i wypadkowe.' },
        { q: 'Rachunek zysków i strat pokazuje:', opts: ['Stan majątku firmy','Przychody i koszty w danym okresie','Przepływy gotówkowe','Zobowiązania firmy'], ans: 1, exp: 'RZiS (P&L) prezentuje przychody, koszty i wynik finansowy za dany okres.' },
        { q: 'Podstawowa stawka VAT w Polsce:', opts: ['8%','15%','23%','25%'], ans: 2, exp: 'Podstawowa stawka VAT = 23%. Obniżone: 8% (budownictwo, część żywności), 5% (podstawowe produkty).' },
        { q: 'Rok podatkowy w Polsce:', opts: ['Wrzesień–czerwiec','Styczeń–grudzień (rok kalendarzowy)','Kwartał fiskalny','Rok finansowy UE'], ans: 1, exp: 'Rok podatkowy = rok kalendarzowy. Przedsiębiorcy mogą wybrać inny rok obrotowy.' },
        { q: 'Aktywa trwałe to składniki majątku:', opts: ['Przeznaczone do sprzedaży w ciągu roku','Użytkowane przez okres dłuższy niż 12 miesięcy','Wyłącznie nieruchomości','Środki pieniężne'], ans: 1, exp: 'Aktywa trwałe: użytkowane powyżej 1 roku (grunty, maszyny, wyposażenie, WNiP). Aktywa obrotowe: do 1 roku.' },
        { q: 'PIT-36 składa osoba:', opts: ['Prowadząca JDG na ryczałcie','Osiągająca dochody z zagranicy lub kilku źródeł na skali','Pracująca na umowie o pracę','Rozliczająca VAT'], ans: 1, exp: 'PIT-36: dochody z działalności gosp. na zasadach ogólnych, dochody z zagranicy, najem. PIT-37: praca/zlecenia.' },
        { q: 'Należność a zobowiązanie – różnica:', opts: ['Są tym samym','Należność = ktoś nam jest winien; zobowiązanie = my jesteśmy winni','Należność = koszt; zobowiązanie = przychód','Dotyczą tylko środków trwałych'], ans: 1, exp: 'Należność: kwota, którą ktoś jest nam winny (nasz majątek). Zobowiązanie: kwota, którą my jesteśmy winni (nasze długi).' },
        { q: 'Wskaźnik rentowności ROE mierzy:', opts: ['Płynność finansową','Zysk netto do kapitału własnego','Zadłużenie firmy','Rotację zapasów'], ans: 1, exp: 'ROE (Return on Equity) = zysk netto / kapitał własny × 100%. Mierzy efektywność generowania zysku z kapitału właściciela.' },
        { q: 'Metoda LIFO w wycenie zapasów oznacza:', opts: ['First In First Out','Last In First Out (ostatni wchodzi, pierwszy wychodzi)','Wycena wg najniższej ceny','Wycena wg ceny rynkowej'], ans: 1, exp: 'LIFO (Last In First Out): ostatnio przyjęte towary rozchodowane jako pierwsze. W Polsce ograniczone przepisami.' },
        { q: 'Sprawozdanie finansowe obejmuje:', opts: ['Tylko bilans','Bilans, RZiS, informację dodatkową (i cash flow dla większych)','Tylko rachunek zysków i strat','Tylko zestawienie zmian kapitału'], ans: 1, exp: 'Roczne sprawozdanie finansowe: bilans + RZiS + informacja dodatkowa. Większe firmy: + cash flow + zmiany kapitału.' },
        { q: 'Podatek dochodowy od osób prawnych (CIT) wynosi w Polsce:', opts: ['9% lub 19% (w zależności od przychodu)','15%','23%','20%'], ans: 0, exp: 'CIT: 9% dla małych podatników (przychód do 2 mln EUR) oraz nowych firm. 19% standardowo.' },
        { q: 'Konta zespołu 4 w planie kont dotyczą:', opts: ['Aktywów','Kosztów według rodzajów','Przychodów','Rozrachunków'], ans: 1, exp: 'Plan kont: 0-środki trwałe, 1-pieniężne, 2-rozrachunki, 3-materiały, 4-koszty rodzajowe, 7-przychody.' },
        { q: 'Składka zdrowotna ZUS jest odprowadzana do:', opts: ['ZUS','Narodowego Funduszu Zdrowia (NFZ)','Urzędu Skarbowego','Funduszu Pracy'], ans: 1, exp: 'Składka zdrowotna trafia do NFZ (Narodowy Fundusz Zdrowia). Składki emerytalne/rentowe/chorobowe – do ZUS.' },
        { q: 'Leasing operacyjny to:', opts: ['Zakup ratalny środka trwałego','Dzierżawa z opcją wykupu, raty jako koszt podatkowy','Pożyczka bankowa','Faktoring wierzytelności'], ans: 1, exp: 'Leasing operacyjny: rata = koszt podatkowy w 100%. Środek trwały w księgach leasingodawcy. Popularny dla samochodów.' },
      ]
    },
    {
      id: 'bud12', name: 'BUD.12 – Technik budownictwa', icon: '🏗️',
      desc: 'Wykonywanie robót budowlanych, kosztorysowanie, dokumentacja techniczna.',
      time: 45, passScore: 50,
      questions: [
        { q: 'Beton B25 oznacza wytrzymałość na ściskanie:', opts: ['25 kN','25 MPa (N/mm²)','25 kg/cm²','2500 kPa'], ans: 1, exp: 'Klasa betonu B25 (C20/25 wg Eurokodu): wytrzymałość charakterystyczna na ściskanie 25 MPa = 25 N/mm².' },
        { q: 'Fundament ławowy stosuje się pod:', opts: ['Słupy punktowe','Ściany nośne i rzędy słupów','Całą powierzchnię budynku','Maszyny przemysłowe'], ans: 1, exp: 'Ławy fundamentowe: pod ścianami nośnymi (ciągłe). Stopy: pod słupami. Płyty: całe podłoże (słaby grunt).' },
        { q: 'Zbrojenie w betonie pełni funkcję:', opts: ['Dekoracyjną','Przejęcia naprężeń rozciągających (beton słaby na rozciąganie)','Poprawy izolacji termicznej','Uszczelnienia betonu'], ans: 1, exp: 'Beton dobrze pracuje na ściskanie (25 MPa), słabo na rozciąganie (~2 MPa). Stal przejmuje siły rozciągające.' },
        { q: 'Izolacja termiczna budynku najczęściej wykonywana jest z:', opts: ['Cegły ceramicznej','Styropianu (EPS) lub wełny mineralnej','Betonu komórkowego','Płytek ceramicznych'], ans: 1, exp: 'Styropian (EPS) i wełna mineralna mają niskie λ (przewodność cieplna) – dobra izolacja. Beton komórkowy – ściana.' },
        { q: 'Mur z cegły ceramicznej pełnej na zaprawie cementowo-wapiennej: grubość 25 cm to:', opts: ['Mur 1/4 cegły','Mur 1 cegły','Mur 1/2 cegły','Mur 1,5 cegły'], ans: 1, exp: 'Cegła polska: 25×12×6,5 cm. Mur 1/2 cegły = 12 cm. Mur 1 cegły = 25 cm. Mur 1,5 cegły = 38 cm.' },
        { q: 'Kąt nachylenia dachu wpływa na:', opts: ['Tylko estetykę','Dobór pokrycia dachowego i odprowadzanie wody/śniegu','Tylko kolor elewacji','Głębokość fundamentów'], ans: 1, exp: 'Kąt dachu: <10° = dach płaski (papa, membrany), 10-20° = blacha, >20° = dachówka. Wpływa na obciążenie śniegiem.' },
        { q: 'Zaprawę murarską M5 stosuje się do:', opts: ['Tynkowania zewnętrznego','Murowania ścian nienośnych','Szpachlowania','Fugowania płytek'], ans: 1, exp: 'Zaprawa M5 (5 MPa): ściany nienośne, lżejsze konstrukcje. M10 lub M15: ściany nośne i konstrukcyjne.' },
        { q: 'Rysunki budowlane w skali 1:100 oznaczają, że 1 cm na rysunku to:', opts: ['1 cm w rzeczywistości','10 cm w rzeczywistości','100 cm (1 m) w rzeczywistości','1 mm w rzeczywistości'], ans: 2, exp: 'Skala 1:100 = 1 cm na rysunku = 100 cm = 1 m w naturze. 1:50 = 1 cm = 50 cm. 1:20 = 1 cm = 20 cm.' },
        { q: 'Ciężar objętościowy betonu zwykłego wynosi ok.:', opts: ['800 kg/m³','1200 kg/m³','2400 kg/m³','3500 kg/m³'], ans: 2, exp: 'Beton zwykły: ok. 2400 kg/m³ = 2,4 t/m³. Żelbet (z armaturą): ok. 2500 kg/m³. Beton lekki: < 2000 kg/m³.' },
        { q: 'Wilgotność drewna do konstrukcji budowlanych powinna wynosić:', opts: ['< 8%','< 18%','< 30%','< 50%'], ans: 1, exp: 'Drewno konstrukcyjne: wilgotność max. 18-20% (w Polsce). Drewno mokre kurczy się i pęka. Suszarnie do 12%.' },
        { q: 'Kosztorys budowlany zawiera:', opts: ['Tylko koszt materiałów','Koszt robocizny, materiałów, pracy sprzętu i narzuty','Tylko cenę końcową','Tylko czas realizacji'], ans: 1, exp: 'Kosztorys: R (robocizna) + M (materiały) + S (sprzęt) + KO (koszty ogólne) + Z (zysk) = cena ofertowa.' },
        { q: 'Strop Kleina to strop:', opts: ['Żelbetowy monolityczny','Ceramiczno-stalowy (belki stalowe + pustaki lub cegły)','Drewniany stropowy','Z płyt kanałowych'], ans: 1, exp: 'Strop Kleina: belki stalowe dwuteowe + pustak ceramiczny lub cegła. Historyczny, często w starym budownictwie.' },
        { q: 'Próba Proktora służy do:', opts: ['Badania wytrzymałości betonu','Określenia optymalnej wilgotności gruntu do zagęszczania','Sprawdzenia pionowości ściany','Pomiaru grubości izolacji'], ans: 1, exp: 'Próba Proktora: wyznacza optymalną wilgotność gruntu, przy której osiąga się maksymalną gęstość po zagęszczeniu.' },
        { q: 'Ocieplenie metodą ETICS (BSO) polega na:', opts: ['Ociepleniu od wewnątrz','Przyklejeniu i zakotwiczeniu izolacji + tynk systemowy na zewnątrz','Wentylowanej elewacji','Ociepleniu dachu'], ans: 1, exp: 'ETICS (BSO/Bezspoinowy System Ocieplenia): klej + styropian/wełna + kołki + siatka zbrojąca + tynk zewnętrzny.' },
        { q: 'BHP na budowie: kask ochronny chroni przed:', opts: ['Opadami deszczu','Urazami głowy od spadających przedmiotów','Hałasem','Zapyleniem'], ans: 1, exp: 'Kask: ochrona głowy przed uderzeniem i przebiciem przez spadające przedmioty (CE EN 397). Na budowie obowiązkowy.' },
        { q: 'Drewno klas C24 w konstrukcjach dachowych oznacza:', opts: ['Klasę ceny','Klasę wytrzymałości (wg EN 338)','Wilgotność','Gatunek drzewa'], ans: 1, exp: 'C24: klasa wytrzymałości drewna iglastego (EN 338). Liczba = wytrzymałość charakterystyczna na zginanie (MPa).' },
        { q: 'Wieniec żelbetowy w budynku murowanym pełni funkcję:', opts: ['Dekoracyjną','Usztywniającą i łączącą ściany na poziomie stropów','Izolacyjną termicznie','Wyłącznie estetyczną'], ans: 1, exp: 'Wieniec żelbetowy (obwodowy): ściąga konstrukcję budynku, przenosi obciążenia na ściany, zapobiega rozwarstwieniu.' },
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
