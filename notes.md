### **Vylepšení uživatelského rozhraní:**
1. **Zvýraznění aktivních prvků:**
   - Přidejte jemné hover efekty pro tlačítka "Edit" a "Remove".
   - Použijte animace, když se položky přidávají/odstraňují (např. fade-in/fade-out nebo slide efekty).

2. **Filtrace a vyhledávání:**
   - Přidejte pole pro vyhledávání položek podle názvu nebo kategorie.
   - Přidejte možnost filtrování inventáře podle stavu (např. dostupné, opravované, zakoupené).

3. **Pagination nebo scrollování:**
   - Pokud bude inventář obsahovat více položek, implementujte stránkování nebo nekonečné scrollování.

---

### **Nové funkce:**
1. **Detail položky:**
   - Přidejte tlačítko "Detail" pro zobrazení podrobnějších informací o každé položce (např. poznámky nebo historii změn).

2. **Export a import dat:**
   - Umožněte uživateli exportovat inventář do CSV nebo Excel souboru.
   - Přidejte možnost importovat data (např. při migraci inventáře).

3. **Uživatelská správa:**
   - Implementujte základní autentizaci a autorizaci pro různé role (např. admin, zaměstnanec).
   - Umožněte uživateli spravovat svůj profil.

4. **Notifikace:**
   - Přidejte upozornění při přidání/úpravě/odstranění položky (např. "Položka úspěšně přidána").
   - V budoucnu můžete přidat upozornění na položky, které se blíží vypršení nebo mají být vyměněny.

5. **Statistiky a přehledy:**
   - Zobrazte souhrnné informace, jako je celkový počet položek, jejich hodnota, nebo přehled podle kategorií.

---

### **Technické zlepšení:**
1. **Validace formuláře:**
   - Přidejte validaci, aby uživatel nemohl zadat neplatné nebo neúplné údaje (např. nevyplněné pole "Name" nebo záporné hodnoty).

2. **Asynchronní operace:**
   - Ujistěte se, že všechny operace s backendem (CRUD) jsou správně ošetřeny pomocí `try/catch` a zobrazte chyby uživateli.

3. **Testování:**
   - Přidejte jednotkové testy pro frontend i backend.
   - Pro frontend otestujte interakce uživatele a správné zobrazení stavu aplikace.

---

### **Dlouhodobé nápady:**
1. **Multijazyčnost:**
   - Přidejte podporu více jazyků (např. čeština, angličtina).

2. **Mobilní aplikace:**
   - Vytvořte mobilní verzi pomocí React Native nebo jiného frameworku.

3. **Integrace API třetích stran:**
   - Napojte aplikaci na externí služby, například sledování cen náhradních dílů nebo jejich dostupnosti.

