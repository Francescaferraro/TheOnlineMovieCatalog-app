  function intro() {
    if (localStorage.getItem('info') === null) {
      //crea una voce "info" in localstorage solo se non esiste già
      var dati = [];
      localStorage.setItem('info', JSON.stringify(dati)); 
    }
    if (localStorage.getItem('info_n') === null) {
      //crea una voce "info_n" in localstorage solo se non esiste già
      var dati_n = [];
      localStorage.setItem('info_n', JSON.stringify(dati_n)); 
    }
  }


  //gestione dati CLIENTI


  function valida() {
    
    // Variabili associate ai campi del modulo
   var nome = document.invio.nome.value;
   var cognome = document.invio.cognome.value;
   var nascita = document.invio.nascita.value;
   var password = document.invio.password.value;
   var conferma= document.invio.conferma.value;
   var telefono = document.invio.telefono.value;
   var email = document.invio.email.value;
   var tipo = document.invio.tipo_account.value;
   var pagamento = document.invio.pagamento.value;
   var privacy = document.invio.privacy.value;
   var marketing = document.invio.mktg.value;

   //controlli sui campi della form
   if ((nome == "") || (nome == "undefined")) {
      alert("Devi inserire un nome");
      document.invio.nome.value = "";
      document.invio.nome.focus();
      return false;
   }
   if ((cognome == "") || (cognome == "undefined")) {
      alert("Devi inserire un cognome");
      document.invio.cognome.value = "";
      document.invio.cognome.focus();
      return false;
   }
   if ((nascita == "") || (nascita == "undefined")) {
      alert("Devi inserire una data di nascita");
      document.invio.nascita.value = "";
      document.invio.nascita.focus();
      return false;
   }
   if ((isNaN(telefono)) || (telefono == "") || (telefono == "undefined")) {
      alert("Inserisci un numero di telefono corretto");
      document.invio.telefono.value = "";
      document.invio.telefono.focus();
      return false;
   }
// Espressione regolare dell'email
   var email_valid = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;
   if (!email_valid.test(email) || (email == "") || (email == "undefined")) 
   {
      alert("Inserisci un indirizzo email corretto");
      document.invio.email.value = "";
      document.invio.email.focus();
      return false;
   }
   //verifico che l'email non sia già presente nel local storage, dato che è la chiave identificativa dell'utente
   var utente = JSON.parse(localStorage.getItem('info'));
   var mail =  [];
   utente.forEach(function(key) {
     mail.push(key.email);
    })
   for (var i = 0; i <= mail.length; i++) {
      if (mail[i]==email) {
        alert("Esiste già un account associato a questa email");
      document.invio.email.value = "";
      document.invio.email.focus();
      return false;
      }
    }

  if (password.length < 6 || (password == "") || (password == "undefined") ) 
   {
    alert("Scegli una password che abbia minimo 6 caratteri");
    document.invio.password.value = "";
    document.invio.password.focus();
    return false;
   }
   //Effettua il controllo sul campo CONFERMA PASSWORD
   if ((conferma == "") || (conferma == "undefined")) {
      alert("Devi confermare la password");
      document.invio.conferma.value = "";
      document.invio.conferma.focus();
      return false;
    }
    if (password != conferma) {
       alert("Le password non corrispondono");
       document.invio.conferma.value = "";
       document.invio.conferma.focus();
       return false;
    }
    if (!privacy.checked) {
      privacy = "rifiuta";
    }
    if (!mktg.checked) {
      marketing = "rifiuta";
    }
    //fine controlli

    var informazioni = { //oggetto javascript
     nome : nome, 
     cognome : cognome, 
     nascita : nascita, 
     password : password, 
     telefono : telefono, 
     email : email,
     tipo : tipo,
     pagamento : pagamento,
     privacy : privacy,
     marketing : marketing
    };
    
    add(informazioni,'info'); //info è il nome del localStorage che contiene gli oggetti "informazioni"

    alert("Ciao "+ informazioni.nome +". Registrazione avvenuta con successo.");
    
    document.invio.action = "area_clienti.html";
  }

  function check() {
    var username = document.invio.username.value;
    var password = document.invio.password.value;
    var utente = JSON.parse(localStorage.getItem('info'));

    var check = utente.filter(cliente => cliente.email == username && cliente.password == password);
    //filter è un metodo js che serve per mantenere solo i valori che rispettano i requisiti

    var email_valid = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;
        if (!email_valid.test(username) || (username == "") || (username == "undefined")) {
          alert("Inserisci un indirizzo email corretto");
         document.invio.username.value = "";
         document.invio.username.focus();
         return false;
        }
        if (check.length==0) {
        document.getElementById("check").innerHTML = "<b>Inserisci email e password corretti.</b>";
       document.invio.username.value = "";
       document.invio.password.value = "";
                return false
        }
        if (password == null || password == "") {
                alert("Inserisci la password");
        document.invio.password.value = "";
         document.invio.password.focus();
                return false;
        }
      sessionStorage.setItem('utenteAttuale', JSON.stringify(username)); 
      document.invio.action = "carrello.html";
    }

  function show() {
   var utente = JSON.parse(sessionStorage.getItem('utenteAttuale'));
   document.invio.email.value = utente;
   var confronto = JSON.parse(localStorage.getItem('info'));
   var email =  [];
   var nome = [];
   var cognome = [];
   var nascita = [];
   var password = [];
   var conferma= [];
   var telefono = [];
   var tipo = [];
   var pagamento = [];
   var privacy = [];
   
    confronto.forEach(function(key) {
      email.push(key.email);
      nome.push(key.nome);
      cognome.push(key.cognome);
      nascita.push(key.nascita);
      password.push(key.password);
      conferma.push(key.conferma);
      telefono.push(key.telefono);
      tipo.push(key.tipo);
      pagamento.push(key.pagamento);
      privacy.push(key.privacy);
    });
    for (var i = 0; i <= email.length; i++) {
      if (utente === email[i]) {
        document.invio.nome.value = nome[i];
        document.invio.cognome.value = cognome[i];
        document.invio.nascita.value = nascita[i];
        document.invio.password.value = password[i];
        document.invio.conferma.value = password[i];
        document.invio.telefono.value = telefono[i];
        document.invio.tipo_account.value = tipo[i];
        document.invio.pagamento.value = pagamento[i];
        document.invio.privacy.value = privacy[i];
        }
    }
  }

  function modifica() { //dopo il click su "Salva". La funzione elimina l'elemento presente nel LS associato all'email e ne crea un altro
    var utente = JSON.parse(sessionStorage.getItem('utenteAttuale'));
    var account = JSON.parse(localStorage.getItem('info'));
    var email =  [];
    account.forEach(function(key) {
     email.push(key.email);
    })
    for (var i = 0; i <= email.length; i++) {
      if (utente === email[i]) {
        del(i, 'info');
      }
    }

    // Variabili associate ai campi del modulo di modifica
   var nome = document.invio.nome.value;
   var cognome = document.invio.cognome.value;
   var nascita = document.invio.nascita.value;
   var password = document.invio.password.value;
   var conferma= document.invio.conferma.value;
   var telefono = document.invio.telefono.value;
   var email = document.invio.email.value;

   //controlli sui campi della form
   if ((nome == "") || (nome == "undefined")) {
      alert("Devi inserire un nome");
      document.invio.nome.value = "";
      document.invio.nome.focus();
      return false;
   }
   if ((cognome == "") || (cognome == "undefined")) {
      alert("Devi inserire un cognome");
      document.invio.cognome.value = "";
      document.invio.cognome.focus();
      return false;
   }
   if ((nascita == "") || (nascita == "undefined")) {
      alert("Devi inserire una data di nascita");
      document.invio.nascita.value = "";
      document.invio.nascita.focus();
      return false;
   }
   if ((isNaN(telefono)) || (telefono == "") || (telefono == "undefined")) {
      alert("Inserisci un numero di telefono corretto");
      document.invio.telefono.value = "";
      document.invio.telefono.focus();
      return false;
   }
// Espressione regolare dell'email
   var email_valid = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;
   if (!email_valid.test(email) || (email == "") || (email == "undefined")) 
   {
      alert("Inserisci un indirizzo email corretto");
      document.invio.email.value = "";
      document.invio.email.focus();
      return false;
   }
   //verifico che l'email non sia già presente nel local storage, dato che è la chiave identificativa dell'utente
   var utente = JSON.parse(localStorage.getItem('info'));
   var mail =  [];
   utente.forEach(function(key) {
     mail.push(key.email);
    })
   for (var i = 0; i <= mail.length; i++) {
      if (mail[i]==email) {
        alert("Esiste già un account associato a questa email");
      document.invio.email.value = "";
      document.invio.email.focus();
      return false;
      }
    }

  if (password.length < 6 || (password == "") || (password == "undefined") ) 
   {
    alert("Scegli una password che abbia minimo 6 caratteri");
    document.invio.password.value = "";
    document.invio.password.focus();
    return false;
   }
   //Effettua il controllo sul campo CONFERMA PASSWORD
   if ((conferma == "") || (conferma == "undefined")) {
      alert("Devi confermare la password");
      document.invio.conferma.value = "";
      document.invio.conferma.focus();
      return false;
    }
    if (password != conferma) {
       alert("Le password non corrispondono");
       document.invio.conferma.value = "";
       document.invio.conferma.focus();
       return false;
    }
    //fine controlli

    var informazioni = { //oggetto javascript
     nome : nome, 
     cognome : cognome, 
     nascita : nascita, 
     password : password, 
     telefono : telefono, 
     email : email 
    };
    
    add(informazioni,'info'); //info è il nome del localStorage che contiene gli oggetti "informazioni"

    alert("Ciao "+ informazioni.nome +". Modifiche eseguite con successo.");
    document.invio.action = "area_clienti.html";
  }


//funzioni comuni a clienti e negozianti


function add(oggetto, local) { //aggiunge un oggetto al localStorage

    var oggetti = JSON.parse(localStorage.getItem(local));
    oggetti.push(oggetto);
    localStorage.setItem(local, JSON.stringify(oggetti));
  }

function del(index, local) {
  const users = JSON.parse(localStorage.getItem(local));
  users.splice(index, 1); //modifica l'array (users) eliminando (istruzione: 1) l'elemento index
  localStorage.setItem(local, JSON.stringify(users)); //reset dell'item dopo la cancellazione
  }
function logout(location) { //svuota il session storage che conteneva l'email dell'utente attuale
  if (window.confirm("Sei sicuro di voler uscire?")) {
    sessionStorage.clear();
    window.location.href = location;
  }
}
function cancella(session, local, location) {
    if (window.confirm("Sei sicuro di voler cancellare il tuo account?")) {
    var utente = JSON.parse(sessionStorage.getItem(session));
    var account = JSON.parse(localStorage.getItem(local));
    var email =  [];
    account.forEach(function(key) {
     email.push(key.email);
    })
    for (var i = 0; i <= email.length; i++) {
      if (utente === email[i]) {
        del(i, local);
        if (localStorage.getItem('carrello"'+email[i]+'"')) {
          localStorage.removeItem('carrello"'+email[i]+'"');
        }
        if (localStorage.getItem('storico"'+email[i]+'"')) {
          localStorage.removeItem('storico"'+email[i]+'"');
        }
        if (localStorage.getItem('acquisti"'+email[i]+'"')) {
          localStorage.removeItem('acquisti"'+email[i]+'"');
        }
        if (localStorage.getItem('negozianti"'+email[i]+'"')) {
          localStorage.removeItem('negozianti"'+email[i]+'"');
        }

        if (localStorage.getItem('catalogo"'+email[i]+'"')) {
          localStorage.removeItem('catalogo"'+email[i]+'"');
        }
      }
      //per i clienti devo cancellare "carrello", "storico", "acquisti" e "negozianti" associati in LS
      //per i negozianti "catalogo"
    }
    alert("Account cancellato con successo.");
    
    window.location.href = location;
    }
  }

//gestione dati NEGOZIANTI


function valida_n() {
// Variabili associate ai campi del modulo

   var negozio = document.invio.negozio.value;
   var titolare = document.invio.nome.value;
   var indirizzo = document.invio.indirizzo.value;
   var piva = document.invio.piva.value;
   var password = document.invio.password.value;
   var conferma = document.invio.conferma.value;
   var telefono = document.invio.telefono.value;
   var email = document.invio.email.value;
   if ((negozio == "") || (negozio == "undefined")) {
      alert("Devi inserire il nome del negozio");
      document.invio.negozio.value = "";
      document.invio.negozio.focus();
      return false;
   }
   if ((titolare == "") || (titolare == "undefined")) {
      alert("Devi inserire un nome");
      document.invio.nome.value = "";
      document.invio.nome.focus();
      return false;
   }
   if ((indirizzo == "") || (indirizzo == "undefined")) {
      alert("Devi inserire un indirizzo");
      document.invio.indirizzo.value = "";
      document.invio.indirizzo.focus();
      return false;
   }
   if ((isNaN(piva)) || (piva == "") || (piva == "undefined") || (piva.length!=11)) {
      alert("Devi inserire una partita iva corretta");
      document.invio.piva.value = "";
      document.invio.piva.focus();
      return false;
   }
   if ((isNaN(telefono)) || (telefono == "") || (telefono == "undefined")) {
      alert("Inserisci un numero di telefono corretto");
      document.invio.telefono.value = "";
      document.invio.telefono.focus();
      return false;
   }
// Espressione regolare dell'email
   var email_valid = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;
   if (!email_valid.test(email) || (email == "") || (email == "undefined")) 
   {
      alert("Inserisci un indirizzo email corretto");
      document.invio.email.value = "";
      document.invio.email.focus();
      return false;
   }
   //verifico che l'email non sia già presente nel local storage, dato che è la chiave identificativa dell'utente
   var utente = JSON.parse(localStorage.getItem('info_n'));
   var mail =  [];
   utente.forEach(function(key) {
     mail.push(key.email);
    })
   for (var i = 0; i <= mail.length; i++) {
      if (mail[i]==email) {
        alert("Esiste già un account associato a questa email");
      document.invio.email.value = "";
      document.invio.email.focus();
      return false;
      }
    }
  if (password.length < 6 || (password == "") || (password == "undefined") ) 
   {
    alert("Scegli una password che abbia minimo 6 caratteri");
    document.invio.password.value = "";
    document.invio.password.focus();
    return false;
   }
   //Effettua il controllo sul campo CONFERMA PASSWORD
   if ((conferma == "") || (conferma == "undefined")) {
      alert("Devi confermare la password");
      document.invio.conferma.value = "";
      document.invio.conferma.focus();
      return false;
    }
    if (password != conferma) {
       alert("Le password non corrispondono");
       document.invio.conferma.value = "";
       document.invio.conferma.focus();
       return false;
    }
    //fine controlli

    var informazioni_negozianti = { //oggetto javascript
     negozio : negozio, 
     titolare : titolare, 
     indirizzo : indirizzo, 
     piva : piva, 
     password : password, 
     telefono : telefono,
     email : email
    };
    
    add(informazioni_negozianti,'info_n'); 

    alert("Registrazione avvenuta con successo.");
    
    document.invio.action = "area_negozianti.html";

}


  function check_n() {
    var username = document.invio.username.value;
    var password = document.invio.password.value;
    var utente = JSON.parse(localStorage.getItem('info_n'));

    var check = utente.filter(cliente => cliente.email == username && cliente.password == password);
    //filter è un metodo js che serve per mantenere solo i valori che rispettano i requisiti

    var email_valid = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;
        if (!email_valid.test(username) || (username == "") || (username == "undefined")) {
          alert("Inserisci un indirizzo email corretto");
         document.invio.username.value = "";
         document.invio.username.focus();
         return false;
        }
        if (check.length==0) {
        document.getElementById("check").innerHTML = "<b>Inserisci email e password corretti.</b>";
       document.invio.username.value = "";
       document.invio.password.value = "";
                return false
        }
        if (password == null || password == "") {
                alert("Inserisci la password");
        document.invio.password.value = "";
         document.invio.password.focus();
                return false;
        }
      sessionStorage.setItem('utenteAttuale', JSON.stringify(username)); 
      document.invio.action = "prodotti.html";
    }

    function show_n() {
   var utente = JSON.parse(sessionStorage.getItem('utenteAttuale'));
   document.invio.email.value = utente;
   var confronto = JSON.parse(localStorage.getItem('info_n'));
   var email =  [];
   var negozio = [];
   var titolare = [];
   var indirizzo = [];
   var password = [];
   var conferma= [];
   var telefono = [];
   var piva = [];

    confronto.forEach(function(key) {
      email.push(key.email);
      negozio.push(key.negozio);
      titolare.push(key.titolare);
      password.push(key.password);
      conferma.push(key.conferma);
      telefono.push(key.telefono);
      indirizzo.push(key.indirizzo);
      piva.push(key.piva);
    });
    for (var i = 0; i <= email.length; i++) {
      if (utente === email[i]) {
        document.invio.negozio.value = negozio[i];
        document.invio.nome.value = titolare[i];
        document.invio.password.value = password[i];
        document.invio.conferma.value = password[i];
        document.invio.telefono.value = telefono[i];
        document.invio.indirizzo.value = indirizzo[i];
        document.invio.piva.value = piva[i];
        }
    }
  }

  function modifica_n() { //dopo il click su "Salva". La funzione elimina l'elemento presente nel LS associato all'email e ne crea un altro
    var utente = JSON.parse(sessionStorage.getItem('utenteAttuale'));
    var account = JSON.parse(localStorage.getItem('info_n'));
    var email =  [];
    account.forEach(function(key) {
     email.push(key.email);
    })
    for (var i = 0; i <= email.length; i++) {
      if (utente === email[i]) {
        del(i, 'info_n');
      }
    }
    
    // Variabili associate ai campi del modulo di modifica

   var negozio = document.invio.negozio.value;
   var titolare = document.invio.nome.value;
   var indirizzo = document.invio.indirizzo.value;
   var piva = document.invio.piva.value;
   var password = document.invio.password.value;
   var conferma = document.invio.conferma.value;
   var telefono = document.invio.telefono.value;
   var email = document.invio.email.value;
   if ((negozio == "") || (negozio == "undefined")) {
      alert("Devi inserire il nome del negozio");
      document.invio.negozio.value = "";
      document.invio.negozio.focus();
      return false;
   }
   if ((titolare == "") || (titolare == "undefined")) {
      alert("Devi inserire un nome");
      document.invio.nome.value = "";
      document.invio.nome.focus();
      return false;
   }
   if ((indirizzo == "") || (indirizzo == "undefined")) {
      alert("Devi inserire un indirizzo");
      document.invio.indirizzo.value = "";
      document.invio.indirizzo.focus();
      return false;
   }
   if ((isNaN(piva)) || (piva == "") || (piva == "undefined") || (piva.length!=11)) {
      alert("Devi inserire una partita iva corretta");
      document.invio.piva.value = "";
      document.invio.piva.focus();
      return false;
   }
   if ((isNaN(telefono)) || (telefono == "") || (telefono == "undefined")) {
      alert("Inserisci un numero di telefono corretto");
      document.invio.telefono.value = "";
      document.invio.telefono.focus();
      return false;
   }
// Espressione regolare dell'email
   var email_valid = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;
   if (!email_valid.test(email) || (email == "") || (email == "undefined")) 
   {
      alert("Inserisci un indirizzo email corretto");
      document.invio.email.value = "";
      document.invio.email.focus();
      return false;
   }
   //verifico che l'email non sia già presente nel local storage, dato che è la chiave identificativa dell'utente
   var utente = JSON.parse(localStorage.getItem('info_n'));
   var mail =  [];
   utente.forEach(function(key) {
     mail.push(key.email);
    })
   for (var i = 0; i <= mail.length; i++) {
      if (mail[i]==email) {
        alert("Esiste già un account associato a questa email");
      document.invio.email.value = "";
      document.invio.email.focus();
      return false;
      }
    }
  if (password.length < 6 || (password == "") || (password == "undefined") ) 
   {
    alert("Scegli una password che abbia minimo 6 caratteri");
    document.invio.password.value = "";
    document.invio.password.focus();
    return false;
   }
   //Effettua il controllo sul campo CONFERMA PASSWORD
   if ((conferma == "") || (conferma == "undefined")) {
      alert("Devi confermare la password");
      document.invio.conferma.value = "";
      document.invio.conferma.focus();
      return false;
    }
    if (password != conferma) {
       alert("Le password non corrispondono");
       document.invio.conferma.value = "";
       document.invio.conferma.focus();
       return false;
    }
    //fine controlli

    var informazioni_negozianti = { //oggetto javascript
     negozio : negozio, 
     titolare : titolare, 
     indirizzo : indirizzo, 
     piva : piva, 
     password : password, 
     telefono : telefono,
     email : email
    };
    
    add(informazioni_negozianti,'info_n'); 

    alert("Modifiche registrate con successo.");
    
    document.invio.action = "area_negozianti.html";
  }

  

function show_catalog(k) { //dato l'indice dell'elemento in LS restituisce la card corrispondente al film basandosi su ciò che trova in LS (quindi anche eventuali modifiche alla descrizione)
            var negoziante = sessionStorage.getItem('utenteAttuale');
            var catalogo = JSON.parse(localStorage.getItem('catalogo'+negoziante));
              var catalog = catalogo[k];
              input_valore = catalog.id;

            var card = document.getElementById('card');
            var button = document.getElementById('button');
            var risultato = document.getElementById('risultato');
            var description = document.getElementById('description');
            var locandina = document.getElementById('locandina');
            card.style.display = "block";
            button.style.display = "block";
            
            get_url(get_film_url(input_valore), function (status, film) {
              
                risultato.innerHTML = "<h2>" + catalog.titolo_film + "</h2>";
                risultato.innerHTML += "<strong>ID: </strong>" + catalog.id + "<br><br>";
                risultato.innerHTML += "<strong>Genere: </strong><br>";
                for (var i = 0; i < (catalog.generi).length; i++) {
                 risultato.innerHTML += "-" +  catalog.generi[i] + "<br> ";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Produzione: </strong><br>";
                for (var j = 0; j < (catalog.produzione).length; j++) {
                  risultato.innerHTML += "-" + catalog.produzione[j] + "<br>";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Lingua originale: </strong><br>" + catalog.lingua + "<br><br> ";
                risultato.innerHTML += "<strong>Data di rilascio: </strong><br>" + catalog.anno + "<br><br> ";
               
                if (catalog.overview!=null) {
                description.innerHTML = "<strong>Descrizione: </strong><br>";
                description.innerHTML += "<p>" + catalog.overview + "</p><br>";
                } else {
                description.innerHTML = "<h2></h2><br>"; 
                }

                if (film.id==catalog.id) {
                  locandina.src = get_poster(film.poster_path);
                }
              
            });
          
            
         }

function catalogo() { //mostra il catalogo del negoziante e permette di modificare o cancellare i film
    var negoziante = sessionStorage.getItem('utenteAttuale');
            var card = document.getElementById('card');
            var click = document.getElementById('click');
            var cancella = document.getElementById('cancella');
            var risultato = document.getElementById('risultato');
            var description = document.getElementById('description');
            var locandina = document.getElementById('locandina');
            var testo = document.getElementById('oppure');
            
            var ids = [];
            var x = 0;

            if (localStorage.getItem('catalogo'+negoziante) === null) {
                  var array = [];
                localStorage.setItem('catalogo'+negoziante, JSON.stringify(array)); 
            }

            var catalogo = JSON.parse(localStorage.getItem('catalogo'+negoziante));


            for (var k = 0; k < catalogo.length; k++) {
              var catalog = catalogo[k];
              //alert(catalog.id);
              if ((catalogo.length)>1) {
               click.style.display="block";
              }
                var id = catalog.id;
                ids.push(id);
                show_catalog(x);
                card.style.display = "block";
            button.style.display = "block";
            cancella.style.display = "block";
            testo.style.display = "block";
                //alert(i);
                //click.style.height="120px";
              //prev.style.height="120px";
                click.onclick = function() {
                  x=x+1;
                  show_catalog(x);
                  //alert(ids[x]);
                  card.style.display = "block";
            button.style.display = "block";
            cancella.style.display = "block";
            testo.style.display = "block";
                  //alert(x);
                  if (x===(catalogo.length-1)) {
                  click.style.display="none";
                  }
                  prev.style.display="block";
                }
                prev.onclick = function() {
                  click.style.display="block";
                  x=x-1;
                  if (x===0) {
                    click.style.display="block";
                    prev.style.display="none";
                  }
                  show_catalog(x);
                  card.style.display = "block";
            button.style.display = "block";
            cancella.style.display = "block";
            testo.style.display = "block";
                  //alert(x);
                }

              cancella.onclick = function() {
                 if (window.confirm("Sei sicuro di voler cancellare " + catalogo[x].titolo_film + " dal tuo catalogo?")) {
                    del(x, 'catalogo'+negoziante);
                    alert("Film cancellato con successo.");
                    window.location.href = "prodotti.html";
                 } else {
                    window.location.href = "prodotti.html";
                  }
              }

              button.onclick = function() {
                var text = document.getElementById('descrizione_cambiata');
                text.style.display = 'block';
                button.value="Salva";
                get_url(get_film_url(ids[x]), function (status, film) {
              
              if (film.title!=null) {
                risultato.innerHTML = "<h2>" + film.title + "</h2>";
                risultato.innerHTML += "<strong>ID: </strong>" + film.id + "<br><br>";
                risultato.innerHTML += "<strong>Genere: </strong><br>";
                for (var i = 0; i < (film.genres).length; i++) {
                 risultato.innerHTML += "-" +  film.genres[i].name + "<br> ";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Produzione: </strong><br>";
                for (var i = 0; i < (film.production_companies).length; i++) {
                  risultato.innerHTML += "-" + film.production_companies[i].name + "<br>";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Lingua originale: </strong><br>" + film.original_language + "<br><br> ";
                risultato.innerHTML += "<strong>Data di rilascio: </strong><br>" + film.release_date + "<br><br> ";
                if (film.overview!="No overview found.") {
                description.innerHTML = "<strong>Descrizione: </strong><br>";
                text.value = film.overview;
                } else {
                description.innerHTML = "<h2></h2><br>"; 
                }
                locandina.src = get_poster(film.poster_path);
                button.onclick = function() {
                  //alert(desc);
                  //film.overview = desc;
                  var desc = text.value;
                  film.overview = desc;
                  var films = film.title;
                //alert(films);
                var id = film.id;
                var overview = desc;
                var generi = [];
                for (var i = 0; i < (film.genres).length; i++) {
                  generi[i] =  film.genres[i].name;
                }
                var produzione = [];
                for (var i = 0; i < (film.production_companies).length; i++) {
                 produzione[i] =  film.production_companies[i].name;
                }
                var poster_path = film.poster_path;
               var lingua = film.original_language;
               var anno = film.release_date;
               var info_catalogo = {
                  negoziante : negoziante,
                  id : id,
                  titolo_film : films,
                  generi : generi,
                  produzione : produzione,
                  lingua : lingua,
                  anno : anno,
                   overview : overview,
                   poster_path : poster_path
              };
              del(x, 'catalogo'+negoziante);
              add(info_catalogo,'catalogo'+negoziante);
              alert("descrizione modificata correttamente"); 
              window.location.href = "prodotti.html";
                }
              } 
            });
              }
              }
            
          }


  
  function get_film_url(id) { //url per ricerca film tramite id
    return "https://api.themoviedb.org/3/movie/" + id + "?api_key=8e1d58fcc77c5c4352c9f13815c6c9d6"
  };
  function get_title_url(title) { //url per ricerca film tramite titolo 
    return "https://api.themoviedb.org/3/search/movie?api_key=8e1d58fcc77c5c4352c9f13815c6c9d6&query=" + title
  };
  function get_poster(path) { //locandina del film 
    return "https://image.tmdb.org/t/p/w500" + path
  };

  function get_url(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        callback(status, xhr.response);
    }
    xhr.send();
  };

 //aggiunta di film tramite ID

  function aggiungiFilm_id() { //aggiunge il film in localstorage dopo ricerca con ID
    var button = document.getElementById('button');
    var id = document.getElementById('id_film').value;
    get_url(get_film_url(id), function (status, film) {
      var negoziante = sessionStorage.getItem('utenteAttuale');
      var catalogo = JSON.parse(localStorage.getItem('catalogo'+negoziante));
    var films = film.title;

    var id = film.id;
    var overview = film.overview;
    var generi = [];
    for (var i = 0; i < (film.genres).length; i++) {
     generi[i] =  film.genres[i].name;
    }
    var produzione = [];
    for (var i = 0; i < (film.production_companies).length; i++) {
     produzione[i] =  film.production_companies[i].name;
    }
    var lingua = film.original_language;
    var anno = film.release_date;
    var poster_path = film.poster_path;
    var info_catalogo = {
      negoziante : negoziante,
      id : id,
      titolo_film : films,
      generi : generi,
      produzione : produzione,
      lingua : lingua,
      anno : anno,
      overview : overview,
      poster_path : poster_path
    };
    if (button.value=="Aggiungi") {
    
                var messaggio = "";
                if (catalogo.length===0) {
                  messaggio = "film aggiunto correttamente al tuo catalogo";
                }
                for (var k = 0; k < catalogo.length; k++) {
                  //alert(catalogo[k].id);
                if (catalogo[k].id===id) {
                messaggio = "questo film è già presente nel tuo catalogo";
                break;
                } else {
                messaggio = "film aggiunto correttamente al tuo catalogo";
                }
                }
                alert(messaggio);
               if (messaggio=="film aggiunto correttamente al tuo catalogo") {
                add(info_catalogo,'catalogo'+negoziante);
               } 
             }
  });
  }


  function input_cambiato(input_valore) {
            var card = document.getElementById('card');
            var button = document.getElementById('button');
            var input_valore = document.getElementById('id_film').value;
            var risultato = document.getElementById('risultato');
            var description = document.getElementById('description');
            var locandina = document.getElementById('locandina');
            card.style.display = "block";
            button.style.display = "block";
            var negoziante = sessionStorage.getItem('utenteAttuale');
            get_url(get_film_url(input_valore), function (status, film) {
              var catalogo = JSON.parse(localStorage.getItem('catalogo'+negoziante));
              button.value = "Aggiungi";
              
              if (film.title!=null) {
                risultato.innerHTML = "<h2>" + film.title + "</h2>";
                risultato.innerHTML += "<strong>ID: </strong>" + film.id + "<br><br>";
                risultato.innerHTML += "<strong>Genere: </strong><br>";
                for (var i = 0; i < (film.genres).length; i++) {
                 risultato.innerHTML += "-" +  film.genres[i].name + "<br> ";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Produzione: </strong><br>";
                for (var i = 0; i < (film.production_companies).length; i++) {
                  risultato.innerHTML += "-" + film.production_companies[i].name + "<br>";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Lingua originale: </strong><br>" + film.original_language + "<br><br> ";
                risultato.innerHTML += "<strong>Data di rilascio: </strong><br>" + film.release_date + "<br><br> ";
                if (film.overview!="No overview found.") {
                  description.innerHTML = "<strong>Descrizione: </strong><br>";
                description.innerHTML += "<p>" + film.overview + "</p><br>";
                } else {
                description.innerHTML = "<h2></h2><br>"; 
                }
                locandina.src = get_poster(film.poster_path);
                
              } else {
                card.style.display = "none";
                button.style.display = "none";
                risultato.innerHTML = "<h4>prova con un altro id</h4><br>";
              }
            });
            
         }


      //aggiunta di film tramite TITOLO
     

         function input_title(input_valore) {
            var card = document.getElementById('card');
            var button = document.getElementById('button');
            var risultato = document.getElementById('risultato');
            var description = document.getElementById('description');
            var locandina = document.getElementById('locandina');
            card.style.display = "block";
            button.style.display = "block";
            var negoziante = sessionStorage.getItem('utenteAttuale');
            get_url(get_film_url(input_valore), function (status, film) {
              
              if (film.title!=null) {
                risultato.innerHTML = "<h2>" + film.title + "</h2>";
                risultato.innerHTML += "<strong>ID: </strong>" + film.id + "<br><br>";
                risultato.innerHTML += "<strong>Genere: </strong><br>";
                for (var i = 0; i < (film.genres).length; i++) {
                 risultato.innerHTML += "-" +  film.genres[i].name + "<br> ";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Produzione: </strong><br>";
                for (var i = 0; i < (film.production_companies).length; i++) {
                  risultato.innerHTML += "-" + film.production_companies[i].name + "<br>";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Lingua originale: </strong><br>" + film.original_language + "<br><br> ";
                risultato.innerHTML += "<strong>Data di rilascio: </strong><br>" + film.release_date + "<br><br> ";
                if (film.overview!="No overview found.") {
                description.innerHTML = "<strong>Descrizione: </strong><br>";
                description.innerHTML += "<p>" + film.overview + "</p><br>";
                } else {
                description.innerHTML = "<h2></h2><br>"; 
                }
                locandina.src = get_poster(film.poster_path);
                
              } 
            });
            
         }

         function input_cambiato_title() {
            var input_valore =document.getElementById('title_film').value;

            var negoziante = sessionStorage.getItem('utenteAttuale');
            get_url(get_title_url(input_valore), function (status, title) {
              var button = document.getElementById('button');
              var click = document.getElementById('click');
              var ids = [];
              var catalogo = JSON.parse(localStorage.getItem('catalogo'+negoziante));
              button.value = "Aggiungi";
                            
               var x = 0;
              
                for (var i = 0; i < title.results.length; i++) {
                button.onclick = function() {
                  var button = document.getElementById('button');
                  var id = ids[x];
                get_url(get_film_url(id), function (status, film) {
                var negoziante = sessionStorage.getItem('utenteAttuale');
                var catalogo = JSON.parse(localStorage.getItem('catalogo'+negoziante));
                var films = film.title;
                //alert(films);
                var id = film.id;
                var overview = film.overview;
                var generi = [];
                for (var i = 0; i < (film.genres).length; i++) {
                  generi[i] =  film.genres[i].name;
                }
                var produzione = [];
                for (var i = 0; i < (film.production_companies).length; i++) {
                 produzione[i] =  film.production_companies[i].name;
                }
               var lingua = film.original_language;
               var anno = film.release_date;
               var poster_path = film.poster_path;
               var info_catalogo = {
                  negoziante : negoziante,
                  id : id,
                  titolo_film : films,
                  generi : generi,
                  produzione : produzione,
                  lingua : lingua,
                  anno : anno,
                   overview : overview,
                   poster_path : poster_path
              };
              if (button.value=="Aggiungi") {
               
                var messaggio = "";
                if (catalogo.length===0) {
                  messaggio = "film aggiunto correttamente al tuo catalogo";
                }
                for (var k = 0; k < catalogo.length; k++) {
                  //alert(catalogo[k].id);
                if (catalogo[k].id===id) {
                messaggio = "questo film è già presente nel tuo catalogo";
                break;
                } else {
                messaggio = "film aggiunto correttamente al tuo catalogo";
                }
                }
                alert(messaggio);
               if (messaggio=="film aggiunto correttamente al tuo catalogo") {
                add(info_catalogo,'catalogo'+negoziante);
               
             }
           }
            });
              }
              //alert(title.results.length);
              //click.style.height="120px";
              //prev.style.height="120px";
                var id = title.results[i].id;
                ids.push(id);
                input_title(ids[x]);
                //alert(i);
              if (title.results.length==1) {
                click.style.display="none";
                prev.style.display="none";
              } else {
                click.style.display="block";
                prev.style.display="none";
                click.onclick = function() {
                  x=x+1;
                  input_title(ids[x]);
                  //alert(x);
                  if (x===(ids.length-1)) {
                  click.style.display="none";
                  }
                  prev.style.display="block";
                }
                prev.onclick = function() {
                  click.style.display="block";
                  x=x-1;
                  if (x===0) {
                    click.style.display="block";
                    prev.style.display="none";
                  }
                  input_title(ids[x]);
                  //alert(x);
                }
              }
              }
            });
            }

          function film() {
            var lista = JSON.parse(localStorage.getItem('info_n'));
            var negozianti = [];
            var negozi = [];
            for (var i = 0; i < lista.length; i++) {
              negozianti.push(JSON.stringify(lista[i].email));
            }
            for (var i = 0; i < lista.length; i++) {
              negozi.push(JSON.stringify(lista[i].negozio));
            }
            //alert(negozianti);
            var cataloghi = [];
            var neg = document.getElementById("negoziante");
            for (var i = 0; i < negozianti.length; i++) {
              var catalogs = JSON.parse(localStorage.getItem('catalogo'+negozianti[i]));
              if (catalogs!=null) {
               cataloghi.push(JSON.stringify(catalogs));
              }
            }
            if (cataloghi.length==0) {
              neg.innerHTML = "<br><br><center>Purtroppo non ci sono negozi a disposizione attualmente.</center>";
            } else {
            var array = [];
            
            for (var i = 0; i < negozianti.length; i++) {
              
              var div = document.createElement('div');
              var spazio = document.createElement('br');
              var space = document.createElement('br');
              var space2 = document.createElement('br');
              var button = document.createElement('input');
              button.type = 'button';
              button.id = JSON.stringify(i);
              button.value = negozi[i];
              button.style = 'width: 500px; font-size: 1.3rem;';
              button.className = 'btn btn-outline-dark';
              
              var container = document.getElementById('negoziante');
              container.appendChild(div);
              div.appendChild(button);
              div.appendChild(spazio);
              div.appendChild(space);
              div.appendChild(space2);
              //alert(negozianti[i]);

               button.onclick = function() { //Salva in sessionstorage il valore identificativo (email) del negozio per recuperarne il catalogo dal local storage nella pagina suceessiva
                sessionStorage.setItem('negozioAttuale', negozianti[this.id]);
                window.location.href = 'prodotti_clienti.html';
              };  
            }
            
          }

          }

         

function show_catalog_cliente(k) { //dato l'indice dell'elemento in LS restituisce la card corrispondente al film basandosi su ciò che trova in LS (quindi anche eventuali modifiche alla descrizione)
            var negoziante = sessionStorage.getItem('negozioAttuale');
            var catalogo = JSON.parse(localStorage.getItem('catalogo'+negoziante));
              var catalog = catalogo[k];
              input_valore = catalog.id;

            var card = document.getElementById('card');
            var button = document.getElementById('button');
            var risultato = document.getElementById('risultato');
            var description = document.getElementById('description');
            var locandina = document.getElementById('locandina');
            card.style.display = "block";
            button.style.display = "block";
            
            get_url(get_film_url(input_valore), function (status, film) {
              
                risultato.innerHTML = "<h2>" + catalog.titolo_film + "</h2>";
                risultato.innerHTML += "<strong>ID: </strong>" + catalog.id + "<br><br>";
                risultato.innerHTML += "<strong>Genere: </strong><br>";
                for (var i = 0; i < (catalog.generi).length; i++) {
                 risultato.innerHTML += "-" +  catalog.generi[i] + "<br> ";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Produzione: </strong><br>";
                for (var j = 0; j < (catalog.produzione).length; j++) {
                  risultato.innerHTML += "-" + catalog.produzione[j] + "<br>";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Lingua originale: </strong><br>" + catalog.lingua + "<br><br> ";
                risultato.innerHTML += "<strong>Data di rilascio: </strong><br>" + catalog.anno + "<br><br> ";
                if (catalog.overview!=null) {
                description.innerHTML = "<strong>Descrizione: </strong><br>";
                description.innerHTML += "<p>" + catalog.overview + "</p><br>";
                } else {
                description.innerHTML = "<h2></h2><br>"; 
                }

                if (film.id==catalog.id) {
                  locandina.src = get_poster(film.poster_path);
                }

                var info_film =  {
                  negoziante : catalog.negoziante,
                  id : catalog.id,
                  titolo_film : catalog.titolo_film,
                  generi : catalog.generi,
                  produzione : catalog.produzione,
                  lingua : catalog.lingua,
                  anno : catalog.anno,
                   overview : catalog.overview,
                   poster_path : catalog.poster_path
              };
                button.onclick = function() {
                  var cliente = sessionStorage.getItem('utenteAttuale');
                  if (localStorage.getItem('carrello'+cliente) === null) {
                  var array = [];
                    localStorage.setItem('carrello'+cliente, JSON.stringify(array)); 
                  } 
                  var carrello = JSON.parse(localStorage.getItem('carrello'+cliente));
                  var messaggio = "";
                if (carrello.length===0) {
                  messaggio = "film aggiunto correttamente al tuo carrello";
                }
                for (var k = 0; k < carrello.length; k++) {
                  //alert(carrello);
                if (carrello[k].id===film.id) {
                messaggio = "questo film è già presente nel tuo carrello";
                break;
                } else {
                messaggio = "film aggiunto correttamente al tuo carrello";
                }
                }
                alert(messaggio);
               if (messaggio=="film aggiunto correttamente al tuo carrello") {
                  add(info_film, 'carrello'+cliente);
                 //window.location.href = 'carrello.html';
               }
                
                }
              
            });
          
            
         }

function catalogo_cliente() { //mostra il catalogo del negoziante e permette di modificare o cancellare i film
    var negoziante = sessionStorage.getItem('negozioAttuale');
            var card = document.getElementById('card');
            var click = document.getElementById('click');
            var cancella = document.getElementById('cancella');
            var risultato = document.getElementById('risultato');
            var description = document.getElementById('description');
            var locandina = document.getElementById('locandina');
            var testo = document.getElementById('oppure');
            
            var ids = [];
            var x = 0;

            
            var catalogo = JSON.parse(localStorage.getItem('catalogo'+negoziante));
            //alert(JSON.stringify(catalogo));
            if (catalogo==null) {
              alert("non ci sono ancora film in questo catalogo, prova con un altro");
              window.location.href="clienti.html";
            } else {
            for (var k = 0; k < catalogo.length; k++) {
              var catalog = catalogo[k];
              //alert(catalog.id);
              if ((catalogo.length)>1) {
               click.style.display="block";
              }
                var id = catalog.id;
                ids.push(id);
                show_catalog_cliente(x);
                card.style.display = "block";
            button.style.display = "block";
                //alert(i);
              //click.style.height="120px";
              //prev.style.height="120px";
                click.onclick = function() {
                  x=x+1;
                  show_catalog_cliente(x);
                  //alert(ids[x]);
                  card.style.display = "block";
            button.style.display = "block";
                  //alert(x);
                  if (x===(catalogo.length-1)) {
                  click.style.display="none";
                  }
                  prev.style.display="block";
                }
                prev.onclick = function() {
                  click.style.display="block";
                  x=x-1;
                  if (x===0) {
                    click.style.display="block";
                    prev.style.display="none";
                  }
                  show_catalog_cliente(x);
                  card.style.display = "block";
            button.style.display = "block";
                  //alert(x);
                }

              }
              }
              }
            
  function carrello() {
     var cliente = sessionStorage.getItem('utenteAttuale');
    const now = new Date();
    var data = now.getTime();
    //alert(JSON.parse(localStorage.getItem('acquisti'+cliente)).length);
    if (JSON.parse(localStorage.getItem('acquisti'+cliente)) != null) {
          for (var i = 0; i < JSON.parse(localStorage.getItem('acquisti'+cliente)).length ; i++) { //cancella il film dal catalogo acquisti (e da "Film disponibili") se è scaduto il noleggio
            if (data > (JSON.parse(localStorage.getItem('acquisti'+cliente))[i].expiry)) {
              
              del(i, 'acquisti'+cliente);
            }
          }
      }        
    var container = document.createElement('div');
    var cart = document.getElementById('carrello');
    

    container.id = "container";
    container.className = "container";

    var carrello = JSON.parse(localStorage.getItem('carrello'+cliente));
    //alert(carrello.length);
    if ((carrello==null) || (carrello.length==0)) {
      cart.innerHTML = "<br><br><h5>Non ci sono film nel tuo carrello. <a href='clienti.html' style='color: black;'>Aggiungili</a>.</h5>";
    } else {
    var x = 0;
    for (var i = 0; i < carrello.length; i++) {
      
      var spazio = document.createElement('br');
      var spazio2 = document.createElement('br');
      var spazio3 = document.createElement('br');
        var row = document.createElement('div');
        row.className = "row";
        row.id = "row" + x;
        
        if (i==carrello.length-1) {
          row.style = "width: 19rem; float: left; padding-bottom: 100px;";
        } else {
          row.style = "width: 19rem; float: left; padding-bottom: 20px;";
        }
        
        //alert(k);
          var catalog = carrello[x];
          var input_valore = catalog.id;
          

          var card = document.createElement('div');   
          card.id=i;
          card.className="card";
          var img = document.createElement('img');
          img.className="card-img-top";
          img.id="locandina"+i;
          card.appendChild(img);
          var card_body = document.createElement('h5');
          card_body.id=i;
          
          var card_text = document.createElement('button');
          card_text.className="btn btn-outline-dark";
          card_text.id=input_valore;
          //card_text.style = "margin-left: auto; margin-right: auto; background-color: #454444;";
          card.style = "width: 17rem; height: 33.9rem; float: left;  padding-bottom: 30px; background-color: #aec2d1; border-color: #aec2d1;";

            card.appendChild(card_body);
            card.appendChild(card_text);
            if (i==card.id) {
              card_text.innerHTML = "<p>Visualizza dettagli</p>";
              card_text.onclick = function(){
             sessionStorage.setItem('filmAttuale', JSON.stringify(this.id)); //filmAttuale, in sessionStorage, conterrà il valore del film che viene cliccato
             window.location.href = "acquisto.html";
            };  
                
            } 
            
          img.src = get_poster(catalog.poster_path);
               
            var box = document.createElement('div');
            box.className = "col-sm";
            box.id = input_valore;
            box.appendChild(spazio);
            row.appendChild(box);
            box.appendChild(card);
            container.appendChild(row);
            cart.appendChild(container);

            /*box.onclick = function(){
             sessionStorage.setItem('filmAttuale', JSON.stringify(this.id)); //filmAttuale, in sessionStorage, conterrà il valore del film che viene cliccato
             window.location.href = "acquisto.html";
            };*/
        x++
      }
    }

  }

function acquista() { //mostra il catalogo del negoziante e permette di modificare o cancellare i film
    var cliente = sessionStorage.getItem('utenteAttuale');
     //alert(JSON.parse(localStorage.getItem('acquisti'+cliente)).length);
    
            var card = document.getElementById('card');
            var cancella = document.getElementById('cancella');
            var risultato = document.getElementById('risultato');
            var description = document.getElementById('description');
            var locandina = document.getElementById('locandina');
            var noleggio = document.getElementById('noleggio');

            var ids = [];
            var x = 0;
          var catalogo = JSON.parse(localStorage.getItem('carrello'+cliente));
          //alert(catalogo);
          var id = sessionStorage.getItem('filmAttuale').replaceAll('"', '');
                //alert(id);
            for (var k = 0; k < catalogo.length; k++) {

              var catalog = catalogo[k];
              //alert(catalog.id);
              //alert(id);
              if (catalog.id==id) {
                var input_valore = catalog.id;
              
                
                x=k;
                get_url(get_film_url(input_valore), function (status, film) {
              var catalog = catalogo[x];
                risultato.innerHTML = "<h2>" + catalog.titolo_film + "</h2>";
                var lista = JSON.parse(localStorage.getItem('info_n'));
                for (var j = 0; j < lista.length; j++) {
                  var nome = (catalog.negoziante).replaceAll('"', '');
                  if (nome==lista[j].email) {
                    risultato.innerHTML += "<p><b>Negozio:</b> " + lista[j].negozio + "</p><br>";
                  }
                }
                risultato.innerHTML += "<strong>Genere: </strong><br>";
                for (var i = 0; i < (catalog.generi).length; i++) {
                 risultato.innerHTML += "-" +  catalog.generi[i] + "<br> ";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Produzione: </strong><br>";
                for (var j = 0; j < (catalog.produzione).length; j++) {
                  risultato.innerHTML += "-" + catalog.produzione[j] + "<br>";
                }
                risultato.innerHTML += "<br>";
                risultato.innerHTML += "<strong>Lingua originale: </strong><br>" + catalog.lingua + "<br><br> ";
                risultato.innerHTML += "<strong>Data di rilascio: </strong><br>" + catalog.anno + "<br><br> ";
                if (catalog.overview!=null) {
                description.innerHTML = "<strong>Descrizione: </strong><br>";
                description.innerHTML += "<p>" + catalog.overview + "</p><br>";
                } else {
                description.innerHTML = "<h2></h2><br>"; 
                }

                if (film.id==catalog.id) {
                  locandina.src = get_poster(film.poster_path);
                }
              
            });
            
                
              cancella.onclick = function() {
                 if (window.confirm("Sei sicuro di voler cancellare " + catalogo[x].titolo_film + " dal tuo carrello?")) {
                    del(x, 'carrello'+cliente);
                    alert("Film cancellato con successo.");
                    window.location.href = "carrello.html";
                 } else {
                    window.location.href = "carrello.html";
                  }
              }

              button.onclick = function() {
                get_url(get_film_url(input_valore), function (status, film) {
              var catalog = catalogo[x];
                var negoziante = catalog.negoziante;
                 var films = catalog.titolo_film;
                var id = catalog.id;
                var overview = catalog.overview;
                var generi = [];
                for (var i = 0; i < (catalog.generi).length; i++) {
                  generi[i] =  catalog.generi[i].name;
                }
                var produzione = [];
                for (var i = 0; i < (catalog.produzione).length; i++) {
                 produzione[i] =  catalog.produzione[i].name;
                }
               var lingua = catalog.lingua;
               var anno = catalog.anno;
               var poster_path = catalog.poster_path;
               var info_catalogo = {
                  negoziante : negoziante,
                  id : id,
                  titolo_film : films,
                  generi : generi,
                  produzione : produzione,
                  lingua : lingua,
                  anno : anno,
                   overview : overview,
                   poster_path : poster_path
              };

              var negoziante = { //serve per le recensioni
                cliente : cliente,
                negoziante : negoziante,
                recensione : ""
              }
              if (localStorage.getItem('acquisti'+cliente) === null) {
                  var array = [];
                localStorage.setItem('acquisti'+cliente, JSON.stringify(array)); 
              }
              if (localStorage.getItem('storico'+cliente) === null) {
                  var array = [];
                localStorage.setItem('storico'+cliente, JSON.stringify(array)); 
              }
              if (localStorage.getItem('negozianti'+cliente) === null) {
                  var array = [];
                localStorage.setItem('negozianti'+cliente, JSON.stringify(array)); 
              }
              for (var i = 0; i <= (JSON.parse(localStorage.getItem('negozianti'+cliente))).length; i++) {
                //alert(i);
                if ((JSON.parse(localStorage.getItem('negozianti'+cliente))).length==0) {
                  add(negoziante,'negozianti'+cliente);
                  break;
                }
              }

              var flag = true;
              for (var i = 0; i < (JSON.parse(localStorage.getItem('negozianti'+cliente))).length; i++) {
                if (JSON.parse(localStorage.getItem('negozianti'+cliente))[i].negoziante==negoziante.negoziante) {
                  flag=false;
                  break;
                } 
              }
              if (flag) { //aggiunge l'item del negoziante (per relazione con cliente) solo se non esiste già
                add(negoziante,'negozianti'+cliente);
              }

          	if (window.confirm("Sei sicuro di voler acquistare " + info_catalogo.titolo_film + " ?")) {
          		add(info_catalogo,'acquisti'+cliente);
          		add(info_catalogo,'storico'+cliente);
          		alert("Acquisto avvenuto correttamente"); 
          		del(x, 'carrello'+cliente);
          		window.location.href = "film_disponibili.html";
      		}
              
                });
              } 

              noleggio.onclick = function() {
                const now = new Date();
                var data = now.getTime();
                get_url(get_film_url(input_valore), function (status, film) {
              var catalog = catalogo[x];
                var negoziante = catalog.negoziante;
                 var films = catalog.titolo_film;
                var id = catalog.id;
                var overview = catalog.overview;
                var generi = [];
                for (var i = 0; i < (catalog.generi).length; i++) {
                  generi[i] =  catalog.generi[i].name;
                }
                var produzione = [];
                for (var i = 0; i < (catalog.produzione).length; i++) {
                 produzione[i] =  catalog.produzione[i].name;
                }
               var lingua = catalog.lingua;
               var anno = catalog.anno;
               var poster_path = catalog.poster_path;
               var info_catalogo = {
                  negoziante : negoziante,
                  id : id,
                  titolo_film : films,
                  generi : generi,
                  produzione : produzione,
                  lingua : lingua,
                  anno : anno,
                   overview : overview,
                   poster_path : poster_path,
                   noleggio : data,
                  expiry: now.getTime() + 259200000 //72 ore in millisecondi 
              };
              var negoziante = {
                cliente : cliente,
                negoziante : negoziante,
                recensione : ""
              }
              if (localStorage.getItem('acquisti'+cliente) === null) {
                  var array = [];
                localStorage.setItem('acquisti'+cliente, JSON.stringify(array)); 
              }
              if (localStorage.getItem('storico'+cliente) === null) {
                  var array = [];
                localStorage.setItem('storico'+cliente, JSON.stringify(array)); 
              }
              if (localStorage.getItem('negozianti'+cliente) === null) {
                  var array = [];
                localStorage.setItem('negozianti'+cliente, JSON.stringify(array)); 
              }
              //alert((JSON.parse(localStorage.getItem('negozianti'+cliente))).length);
              
              for (var i = 0; i <= (JSON.parse(localStorage.getItem('negozianti'+cliente))).length; i++) {
                //alert(i);
                if ((JSON.parse(localStorage.getItem('negozianti'+cliente))).length==0) {
                  add(negoziante,'negozianti'+cliente);
                  break;
                }
              }

              var flag = true;
              for (var i = 0; i < (JSON.parse(localStorage.getItem('negozianti'+cliente))).length; i++) {
                if (JSON.parse(localStorage.getItem('negozianti'+cliente))[i].negoziante==negoziante.negoziante) {
                  flag=false;
                  break;
                } 
              }
              if (flag) {
                add(negoziante,'negozianti'+cliente);
              }
              if (window.confirm("Sei sicuro di voler noleggiare " + info_catalogo.titolo_film + " ?")) {
          		add(info_catalogo,'acquisti'+cliente);
          		add(info_catalogo,'storico'+cliente);
          		alert("Noleggio avvenuto correttamente"); 
          		del(x, 'carrello'+cliente);
          		window.location.href = "film_disponibili.html";
      		}
              });
          } 
            
        }
    }
}

  function disponibili() {
    var container = document.createElement('div');
    var cart = document.getElementById('carrello');
    

    container.id = "container";
    container.className = "container";

    var cliente = sessionStorage.getItem('utenteAttuale');
    var carrello = JSON.parse(localStorage.getItem('acquisti'+cliente));
    //alert(carrello.length);
    if ((carrello==null) || (carrello.length==0)) {
      cart.innerHTML = "<br><br><h5>Non ci sono film disponibili. <a href='carrello.html' style='color: black;'>Acquistali dal tuo carrello</a>.</h5>";
    } else {
    var x = 0;
    for (var i = 0; i < carrello.length; i++) {
      
      var spazio = document.createElement('br');
      var spazio2 = document.createElement('br');
      var spazio3 = document.createElement('br');
        var row = document.createElement('div');
        row.className = "row";
        row.id = "row" + x;
        
        if (i==carrello.length-1) {
          row.style = "width: 19rem; float: left; padding-bottom: 100px;";
        } else {
          row.style = "width: 19rem; float: left; padding-bottom: 20px;";
        }
        
        //alert(k);
          var catalog = carrello[x];
          var input_valore = catalog.id;
          

          var card = document.createElement('div');   
          card.id=i;
          card.className="card";
          var img = document.createElement('img');
          img.className="card-img-top";
          img.id="locandina"+i;
          card.appendChild(img);
          var card_body = document.createElement('h5');
          card_body.id=i;
          
          var card_text = document.createElement('button');
          card_text.className="btn btn-dark";
          card_text.id=input_valore;
          //card_text.style = "margin-left: auto; margin-right: auto; background-color: #454444;";
          card.style = "width: 17rem; height: 33.9rem; float: left;  padding-bottom: 30px; background-color: #aec2d1; border-color: #aec2d1;";

            card.appendChild(card_body);
            card.appendChild(card_text);
            if (i==card.id) {
              card_text.innerHTML = "<p>Guarda ora</p>";
            } 
            
          
          img.src = get_poster(catalog.poster_path);
               
            var box = document.createElement('div');
            box.className = "col-sm";
            box.id = input_valore;
            box.appendChild(spazio);
            row.appendChild(box);
            box.appendChild(card);
            container.appendChild(row);
            cart.appendChild(container);

            
        x++
      }
    }

  }

  function storico() {
    var container = document.createElement('div');
    var cart = document.getElementById('carrello');
    

    container.id = "container";
    container.className = "container";

    var cliente = sessionStorage.getItem('utenteAttuale');
    var carrello = JSON.parse(localStorage.getItem('storico'+cliente));
    //alert(carrello.length);
    if ((carrello==null) || (carrello.length==0)) {
      cart.innerHTML = "<br><br><h5>Non ci sono film disponibili. <a href='carrello.html' style='color: black;'>Acquistali dal tuo carrello</a>.</h5>";
    } else {
    var x = 0;
    for (var i = 0; i < carrello.length; i++) {
      
      var spazio = document.createElement('br');
      var spazio2 = document.createElement('br');
      var spazio3 = document.createElement('br');
        var row = document.createElement('div');
        row.className = "row";
        row.id = "row" + x;
        if (i==carrello.length-1) {
          row.style = "width: 19rem; height: 59rem; float: left; padding-bottom: 100px;";
        } else {
          row.style = "width: 19rem; height: 59rem; float: left; padding-bottom: 20px;";
        }
        //alert(k);
          var catalog = carrello[x];
          var input_valore = catalog.id;
          

          var card = document.createElement('div');   
          card.id="card"+i;
          card.className="card";
          var img = document.createElement('img');
          img.className="card-img-top";
          img.id="locandina"+i;
          card.appendChild(img);
          var card_body = document.createElement('div');
          card_body.className="card-body";
          card.appendChild(card_body);
          var card_text = document.createElement('p');
          card_text.className="card-text";
          card_text.id="description"+i;
          card_text.style = "margin-left: auto; margin-right: auto; height:25rem; width: 15rem;";
          card.appendChild(card_text);
          card.style = "width: 17rem; float: left;";
          var stato = document.createElement('p');
          card.appendChild(stato);
                if (catalog.overview!=null) {
                card_text.innerHTML += "<strong>Descrizione: </strong><br>";
                card_text.innerHTML += "<p>" + catalog.overview + "</p><br>";
                } else {
                card_text.innerHTML = "<h2></h2><br>"; 
                }
                img.src = get_poster(catalog.poster_path);
                img.id = input_valore; //imposto l'id del film attuale come id della locandina per fare il confronto dopo
                stato.innerHTML = "<strong>Stato: </strong><i>non disponibile</i>";
                img.style = "filter: grayscale(100%); -webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%);filter: gray;"; 
                  //se l'immagine non è disponibile viene trasformata in b&w
              //alert(catalog);
              var acquisti = JSON.parse(localStorage.getItem('acquisti'+cliente));
              for (var k = 0; k < carrello.length; k++) { //carrello=storico
                for (var j = 0; j < acquisti.length; j++) {
                  
                  if ((JSON.stringify(carrello[k].id)==JSON.stringify(acquisti[j].id)) && (img.id==JSON.stringify(acquisti[j].id))) {
                  	stato.innerHTML = "<strong>Stato: </strong><a style='color:black; text-decoration:underline;' href='film_disponibili.html'>disponibile</a>";
                    img.style = "filter: grayscale(0%); -webkit-filter: grayscale(0%); -moz-filter: grayscale(0%); -ms-filter: grayscale(0%); -o-filter: grayscale(0%);"; 
                    
                  //se il film è disponibile, la locandina viene resa a colori
                  }
                  
                }
              } 
            var box = document.createElement('div');
            box.className = "col-sm";
            box.id = input_valore;
            box.appendChild(spazio);
            row.appendChild(box);
            box.appendChild(card);
            container.appendChild(row);
            cart.appendChild(container);

            
        x++
      }
    }

  }

  function recensioni_clienti() {
    var cliente = sessionStorage.getItem('utenteAttuale');
    var lista = JSON.parse(localStorage.getItem('negozianti'+cliente));
    var info_n = JSON.parse(localStorage.getItem('info_n'));
    //alert(lista);
    var box = document.getElementById('recensioni');
    if (lista==null) {
      box.innerHTML = "<br><br><b>Non hai ancora negozianti da recensire, <a href='carrello.html' style='color:black;'>Acquista i tuoi film<a>.";
    } else {
    for (var i = 0; i < lista.length; i++) {
      //alert(lista[i].recensione);

     var div = document.createElement('div');
     div.style= 'font-family: Georgia, serif; font-size: 1.65rem;';
     var container = document.createElement('div');
     var button = document.createElement('button');
     button.innerHTML = "Salva";
     button.className= 'btn btn-dark';
     button.id= 'id'+i;
     box.appendChild(div);     
     var testo = document.createElement('textarea');
     testo.style.width = '30rem';
     testo.style.height = '7rem';
     testo.id = 'id'+i;
     div.appendChild(testo);

     var recensione = document.createElement('div');
     recensione.style.display='none';
     box.appendChild(recensione);
     if (lista[i].recensione!="") {
      var br = document.createElement('br');
      var br2 = document.createElement('br');
        button.style.display='none';
        testo.style.display='none';
        recensione.style.display='block';
        recensione.innerHTML = lista[i].recensione;
        recensione.style = 'color: #333; height: 4em; width: 550px; margin: 0 auto; border-radius: 10px; background-color: #f2f2f2; font-family: Georgia, serif;';
        box.appendChild(br);
        box.appendChild(br2);
     }

     button.onclick = function() {
      for (var i = 0; i < lista.length; i++) {
        var text = document.getElementById('id'+i);
        if (this.id==text.id) {
         var desc = text.value;
         var negoziante = {
          cliente : cliente,
          negoziante : lista[i].negoziante,
          recensione : desc
         }
         
         del(i, 'negozianti'+cliente);
         add(negoziante, 'negozianti'+cliente);
        } 
      }
      alert("Valutazione salvata correttamente");
      window.location.href='acquisti_passati.html';
    }
      box.appendChild(testo);
      box.appendChild(button);
      for (var j = 0; j < info_n.length; j++) {
        if ((lista[i].negoziante).replaceAll('\"', '')==(info_n[j].email)) {
          div.innerHTML = JSON.stringify(info_n[j].negozio).replaceAll('"', '');
          lista[i].recensione = JSON.stringify(info_n[j].negozio);
        }
      }
    }
  }
  }

  //gestione recensioni dei negozianti
  function rev() {
    var info = JSON.parse(localStorage.getItem('info'));
    var array = [];
    for (var i = 0; i < info.length; i++) {
      array.push(info[i].email);
    }
    //var x = 0;
    var check = []; //serve per controllare se ci sono recensioni per uno specifico negozio
    var flag = true; //gestire l'errore se un negoziante ha ricevuto recensioni solo da alcuni clienti
    for (var i = 0; i < array.length; i++) {
      x=i;
      var lista = JSON.parse(localStorage.getItem('negozianti'+'"'+array[i]+'"'));
      if (lista==null) {
        flag=false;
      } else {
      for (var j = 0; j < lista.length; j++) {

        if ((lista[j].negoziante==sessionStorage.getItem('utenteAttuale'))&&(lista[j].recensione!="")) {
        	
          //alert(j);
          check.push(j);
          var div = document.createElement("div");
          var br = document.createElement("br");
          document.getElementById("show_reviews").appendChild(div);
          document.getElementById("show_reviews").appendChild(br);
          div.style = "color: #333; height: 7em; width: 550px; margin: 0 auto; border-radius: 10px; background-color: #f2f2f2; font-family: Georgia, serif;";
          div.innerHTML = '<b><br>'+lista[j].recensione+'<br>'+'<br></b>';
          div.innerHTML += '<i>'+lista[j].cliente.replaceAll('"', '');
      		
        }
       }
      }
     }
     if ((check.length==0)||((check.length==0)&&(flag==false))) {
          var div = document.createElement("div");
          var br = document.createElement("br");
          document.getElementById("show_reviews").appendChild(div);
          document.getElementById("show_reviews").appendChild(br);
          div.style = "font-family: Georgia, serif; font-size: 1.3rem;";
          div.innerHTML = '<b><br>Non hai ancora recensioni</b>';
      }
    }