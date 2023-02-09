var pg_co = document.getElementById("pg_connexion");
var pg_contacts = document.getElementById("pg_contacts");
var pg_inv = document.getElementById("pg_inv");
var pg_chat = document.getElementById("pg_chat");
var currentPage;
var identifiant = "a6fd037f9ccd8ca580083af9f96f29c72a459f34f2ed12a18a66a06996f7a740";
var connected = false;

function Init()
{
    SetActive(pg_co,true);
    SetActive(pg_contacts,false);
    SetActive(pg_inv,false);
    SetActive(pg_chat,false);
    currentPage = pg_co;
}

function Show(element)
{
    if(element != currentPage)
    {
        if(connected)
        {
            SetActive(currentPage,false);
            SetActive(element,true);
            currentPage = element;
        }else
        {
            //Afficher Se Connecter
        }
    }
}

function ShowChat(contact,idRelation)
{
    SetActive(currentPage,false);
    document.getElementById("chatLabel").textContent = contact;
    fetch("https://trankillprojets.fr/wal/wal.php?lire&identifiant=" + identifiant + "&relation=" + idRelation)
    .then(reponse => reponse.json())
    .then(json => {
        if(json.etat.reponse==1)
        {
            let messages = json.messages;
            for(let i of messages)
            {
                let message = document.createElement("div");
                //ajouter les messages
                contact.appendChild(document.createTextNode(i.identite));
                contact.appendChild(sup);
                contact.setAttribute("onclick","ShowChat('" + i.identite + "'," + i.relation + ")");
                pg_contacts.appendChild(contact);
            }
        }else
        {
            console.log("awa");//afficher msg erreur
        }
    }).catch(erreur => console.log(erreur));
    SetActive(pg_chat,true);
}

function SetActive(element,value)
{
    if(value)
    {
        element.style.display = "block";   
    }else
    {
        element.style.display = "none"
    }
}

function Login()
{
    var input = document.getElementById("identifiant");
    console.log(input.value);
    if(input.value != "")
    {
        identifiant = input.value;
    }
    fetch("https://trankillprojets.fr/wal/wal.php?information&identifiant=" + identifiant)
    .then(reponse => reponse.json())
    .then(json => {
        if(json.etat.reponse==1)
        {
            input.value = "";
            SetContact();
            Show(pg_contacts);
        }else
        {
            console.log("awa");//afficher msg erreur
        }
    }).catch(erreur => console.log(erreur));
    connected = true;
}

function SetContact()
{
    fetch("https://trankillprojets.fr/wal/wal.php?relations&identifiant=" + identifiant)
    .then(reponse => reponse.json())
    .then(json => {
        for(i of json.relations)
        {
            let contact = document.createElement("div");
            let sup = document.createElement("button");
            sup.textContent = "Supprimer";
            sup.setAttribute("onclick","DelContact(" + i.relation + ")");
            contact.appendChild(document.createTextNode(i.identite));
            contact.appendChild(sup);
            contact.setAttribute("onclick","ShowChat('" + i.identite + "'," + i.relation + ")");
            pg_contacts.appendChild(contact);
        }
    }).catch(erreur => console.log(erreur));
}

function ClearContacts()
{
    pg_contacts.childNodes.forEach(child => pg_contacts.removeChild(child));
}

function DelContact(idRelation)
{
    console.log(idRelation);
    fetch("https://trankillprojets.fr/wal/wal.php?delier&identifiant=" + identifiant + "&relation=" + idRelation)
    .then(reponse => reponse.json())
    .then(json => {
        if(json.etat.reponse==1)
        {
            ClearContacts();
            SetContact();
        }else
        {
            console.log("awa");//afficher mail n'existe pas
        }
    }).catch(erreur => console.log(erreur));
}

function Invite()
{
    var input = document.getElementById("email");
    fetch("https://trankillprojets.fr/wal/wal.php?lier&identifiant=" + identifiant + "&mail=" + input.value)
    .then(reponse => reponse.json())
    .then(json => {
        if(json.etat.reponse==1)
        {
            input.value = "";
            ClearContacts();
            SetContact();
            Show(pg_contacts);
        }else
        {
            console.log("awa");//afficher mail n'existe pas
        }
    }).catch(erreur => console.log(erreur));
}


