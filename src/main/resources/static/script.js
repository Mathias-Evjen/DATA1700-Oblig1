const billetter = [];

function leggTilBillett() {

    // Sjekker om feltene er tomme og setter errormelding om de er det
    erFyltFilm();
    erTom("antall", "antallError");
    erTom("fornavn", "fornavnError");
    erTom("etternavn", "etternavnError");
    erTom("tlfnr", "tlfError");
    erTom("epost", "epostError");

    // Dersom feltene har en error skal funksjonen avbrytes
    if (document.getElementById("filmError").innerHTML !== "" ||
        document.getElementById("antallError").innerHTML !== "" ||
        document.getElementById("fornavnError").innerHTML !== "" ||
        document.getElementById("etternavnError").innerHTML !== "" ||
        document.getElementById("tlfError").innerHTML !== "" ||
        document.getElementById("epostError").innerHTML !== "") {
        return;
    }

    // Legger bestilling inn i billett
    billett = opprettBestilling("filmer", "antall", "fornavn", "etternavn", "tlfnr", "epost");

    billetter.push(billett); //Legger til billett-objekt i billetter-arrayet
    console.log(billetter);

    // Skriver ut billetter i billeter-arrayet som ikke allerede er skrevet ut
    leggTilHTML(billetter);

    // Resetter inputs etter at billett blir kjøpt
    document.getElementById("filmer").selectedIndex = "default";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("tlfnr").value = "";
    document.getElementById("epost").value = "";


}

// Oppretter returnerer et objekt av bestilling
function opprettBestilling(film, antall, fornavn, etternavn, tlf, epost) {
    return {
        film: document.getElementById(film).value,
        antall: document.getElementById(antall).value,
        fornavn: document.getElementById(fornavn).value,
        etternavn: document.getElementById(etternavn).value,
        tlf: document.getElementById(tlf).value,
        epost: document.getElementById(epost).value
    };
}

// Tar inn array med billetter og skriver dem ut
function leggTilHTML(billetter) {
    let billettTekst = "<ul>";
    for (const billett of billetter) {
        let nyBillett = "<li> Film: " + billett.film + ", antall: " + billett.antall + ", Navn: " + billett.fornavn + " " + billett.etternavn + ", telefonnummer: " + billett.tlf + ", epost: " + billett.epost + "</li>";
        billettTekst += nyBillett;
    }
    billettTekst += "</ul>";
    document.getElementById("billetter").innerHTML = billettTekst;
}

// Fjerner billettene fra billetter-array og tømmer div som viser billetter
function slettBilletter() {
    while (billetter.length !== 0) {
        billetter.pop();
    }
    document.getElementById("billetter").innerHTML = "";
}

// Sjekker at navn er riktig formatert
function sjekkNavn(navn, error) {
    let tillatt = /^[a-zA-Z]*$/;

    if (!tillatt.test(document.getElementById(navn).value)) {
        document.getElementById(error).innerHTML = "Ikke gyldig fornavn";
    } else {
        document.getElementById(error).innerHTML = "";
    }

    erTom("fornavn", "fornavnError");
}

// Sjekker at telefonnummer er riktig formatert
function sjekkTlf() {
    let tillatt = /^[0-9]*$/;

    if (!tillatt.test(document.getElementById("tlfnr").value) || document.getElementById("tlfnr").value.length !== 8) {
        document.getElementById("tlfError").innerHTML = "Ikke gyldig telefonnummer";
    } else {
        document.getElementById("tlfError").innerHTML = "";
    }
}

// Sjekker at epost er riktig formatert
function sjekkEpost() {
    let trenger = /\S+@\S+\.\S+$/;

    if (!trenger.test(document.getElementById("epost").value)) {
        document.getElementById("epostError").innerHTML = "Ikke gyldig epostadresse";
    } else {
        document.getElementById("epostError").innerHTML = "";
    }
}

// Sjekker om valgte input-felt er tomt
function erTom(id, error) {
    if (document.getElementById(id).value === "") {
        document.getElementById(error).innerHTML = "Må fylles inn";
        return true;
    } else {
        document.getElementById(error).innerHTML = "";
        return false;
    }
}

// Sjekker at det er blitt valgt en film
function erFyltFilm() {
    if (document.getElementById("filmer").value != "default") {
        document.getElementById("filmError").innerHTML = "";
    } else {
        document.getElementById("filmError").innerHTML = "Må velge en film";
    }
}