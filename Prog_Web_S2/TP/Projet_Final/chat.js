var pg_co = document.getElementById("pg_connexion");
var pg_contacts = document.getElementById("pg_contacts");
var pg_inv = document.getElementById("pg_inv");
var pg_chat = document.getElementById("pg_chat");
var currentPage;
//var identifiant = "a6fd037f9ccd8ca580083af9f96f29c72a459f34f2ed12a18a66a06996f7a740";
var connected = false;
var user = new Object();
user.identifiant = "";
user.identite = "";
user.mail = "";


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
    document.getElementById("sendButton").setAttribute("onclick","SendMsg(" + idRelation + ")");
    fetch("https://trankillprojets.fr/wal/wal.php?lire&identifiant=" + user.identifiant + "&relation=" + idRelation)
    .then(reponse => reponse.json())
    .then(json => {
        if(json.etat.reponse==1)
        {
            ClearMsg();
            let messages = json.messages;
            for(let i of messages)
            {
                let message = document.createElement("div");
                if(i.identite == user.identite)
                {
                    message.className = "user";
                }else
                {
                    message.className = "contact";
                }

                message.appendChild(document.createTextNode(i.message));
                message.setAttribute("id","message");
                pg_chat.appendChild(message);
                //ajouter les messages
                
            }
        }else
        {
            console.log("awa");//afficher msg erreur
        }
    }).catch(erreur => console.log(erreur));
    SetActive(pg_chat,true);
    currentPage = pg_chat;
}

function ClearMsg()
{
    document.querySelectorAll("#message").forEach(contact => contact.remove());
}

function SendMsg(idRelation)
{
    msg = document.getElementById("msgInput");
    if(msg.value != "")
    {
        fetch("https://trankillprojets.fr/wal/wal.php?ecrire&identifiant=" + user.identifiant + "&relation=" + idRelation + "&message=" + msg.value)
        .then(reponse => reponse.json())
        .then(json => {
            if(json.etat.reponse==1)
            {
                let message = document.createElement("div");
                message.className = "user";
                message.appendChild(document.createTextNode(msg.value));
                message.setAttribute("id","message");
                pg_chat.appendChild(message);
                msg.value = "";
            }else
            {
                console.log("awa");//afficher msg erreur
            }
        }).catch(erreur => console.log(erreur));
    }
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
    if(input.value != "")
    {
        user.identifiant = input.value;
    }else
    {
        user.identifiant = input.getAttribute("placeholder");
    }
    fetch("https://trankillprojets.fr/wal/wal.php?information&identifiant=" + user.identifiant)
    .then(reponse => reponse.json())
    .then(json => {
        if(json.etat.reponse==1)
        {
            input.value = "";
            user.identite = json.identite;
            user.mail = json.mail;
            ClearContacts();
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
    fetch("https://trankillprojets.fr/wal/wal.php?relations&identifiant=" + user.identifiant)
    .then(reponse => reponse.json())
    .then(json => {
        for(i of json.relations)
        {
            let contact = document.createElement("div");
            let name = document.createElement("div");
            let sup = document.createElement("button");
            sup.textContent = "Supprimer";
            sup.setAttribute("onclick","DelContact(" + i.relation + ")");
            name.appendChild(document.createTextNode(i.identite));
            name.setAttribute("onclick","ShowChat('" + i.identite + "'," + i.relation + ")");
            contact.appendChild(name);
            contact.appendChild(sup);
            contact.setAttribute("id","contact");
            pg_contacts.appendChild(contact);
        }
    }).catch(erreur => console.log(erreur));
}

function ClearContacts()
{
    document.querySelectorAll("#contact").forEach(contact => contact.remove());
}

function DelContact(idRelation)
{
    console.log(idRelation);
    fetch("https://trankillprojets.fr/wal/wal.php?delier&identifiant=" + user.identifiant + "&relation=" + idRelation)
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
    fetch("https://trankillprojets.fr/wal/wal.php?lier&identifiant=" + user.identifiant + "&mail=" + input.value)
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


