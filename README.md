# TheOnlineMovieCatalog-app
applicazione web realizzata per l'esame universitario di Applicazioni Web e Cloud - data di realizzazione: Dicembre 2021


# Requisiti

Il progetto si pone l’obiettivo di sviluppare l’applicazione web The Online Movie Catalog che implementa un sito di gestione catalogo e
ordinazione di film online. The Online Movie Catalog gestisce il processo di organizzazione dei palinsesti cinematografici di pi`u negozi online
e l’ordinazione dei film all’interno di un portale online di videostreaming.
E composto di due macro-scenari principali: `
– gestione del palinsesto
– gestione degli ordini.
Esistono due tipologie di utenti: negoziante e cliente. Di seguito sono
analizzate in dettaglio le caratteristiche dei due macro-scenari introdotti.
Il primo macro-scenario (gestione del palinsesto) consiste nella gestione dei film dalla pubblicazione del catalogo alla vendita. Gli utenti
negozianti devono potersi collegare all’applicazione, modificare i propri
dati/preferenze e cancellarsi. Per ogni negoziante si dovranno gestire informazioni quali nome del negozio, numero di telefono, partita iva, indirizzo, recensioni, etc. Un negoziante, una volta registrato, pu`o collegarsi
all’applicazione e inserire i prodotti in vendita selezionandoli da una lista
comune a tutti i negozianti. Questa lista `e da acquisire tramite il portale
The Movie DB (https://www.themoviedb.org/ tramite l’accesso API con la metodologia REST). Per ogni prodotto (film) in vendita dovranno
essere gestite le informazioni principali quali titolo, attori, regista, genere
e anno di pubblicazione, inoltre dovr`a essere presente una foto illustrativa (locandina) il cui riferimento `e sempre reperibile tramite API.
Un venditore, successivamente, pu`o collegarsi all’applicazione e modificare/cancellare prodotti esistenti di cui `e responsabile.
Il secondo scenario (gestione degli ordini) consiste nella classica gestione delle attivit`a dei clienti all’interno di un’applicazione di ordini online. I clienti devono potersi registrare, modificare i propri dati/preferenze,
cancellarsi. Per ogni utente si devono memorizzare informazioni personali
(ad es., nome, cognome) e informazioni relative all’account generato. Al
cliente vengono anche associate informazioni riguardanti il meccanismo
di pagamento dei prodotti (ad es., carta di credito o carta prepagata). Inoltre, in fase di registrazione gli utenti possono selezionare delle preferenze
(tra le quali quelle di privacy e relative all’applicazione) per la personalizzazione dei servizi (ad es., offerte speciali in bacheca per la tipologia di
genere preferito). In questo scenario, gli utenti registrati (min 2) possono
fare login al sito, selezionare un film di interesse, aggiungerlo al carrello
e concludere il pagamento dei film nel carrello.
Al momento del pagamento dell’ordine l’utente pu`o essere decidere
tra due modalit`a:
– acquisto perpetuo: il film acquisito sar`a sempre disponibile tra i film
disponibili per la visione del cliente;
– noleggio: il film pagato dal cliente sar`a disponibile nel film visibili dal
cliente solo per 72h dal giorno dell’acquisto; successivamente, rimarr`a
in elenco ma sar`a indicato come non disponibile per la visione.
