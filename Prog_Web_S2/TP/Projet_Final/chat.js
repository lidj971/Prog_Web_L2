var pg_co = document.getElementById("pg_connexion");
var pg_contacts = document.getElementById("pg_contacts");
var pg_inv = document.getElementById("pg_inv");
var currentPage;
var connected = false;
var user = new Object();
user.identifiant = "";
user.identite = "";
user.mail = "";
user.contacts = null;
user.chats = [];

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

function Init()
{
    SetActive(pg_co,true);
    SetActive(pg_contacts,false);
    SetActive(pg_inv,false);
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
            user.contacts = null;
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
        if(user.contacts == null)
        {
            user.contacts = json;
            ClearContacts(user.contacts.relations);
        }else if(json.relations.length != user.contacts.relations.length)
        {
            user.contacts = json;
            ClearContacts(user.contacts.relations);
        }
    }).catch(erreur => console.log(erreur));
    SetChats();
    setTimeout(SetContact,4000);
}

function ClearContacts(relations)
{
    console.log(relations);
    document.querySelectorAll("#contact").forEach(contact => contact.remove());
    user.chats = [];
    for(i of relations)
    {
        let chat = document.querySelector("div" + i.relation);
        let chatIndex = user.chats.length;
        if(!chat)
        {
            chat = CreateChat(i.identite,i.relation,chatIndex);
            document.body.appendChild(chat);
            SetActive(chat,false);
        }
        user.chats.push(chat);
        let contact = document.createElement("div");
        let name = document.createElement("div");
        let sup = document.createElement("button");
        sup.textContent = "Supprimer";
        sup.setAttribute("onclick","DelContact(" + i.relation + ")");
        name.appendChild(document.createTextNode(i.identite));
        name.setAttribute("onclick","Show(" + "user.chats[" + chatIndex + "]" +")");
        contact.appendChild(name);
        contact.appendChild(sup);
        contact.setAttribute("id","contact");
        pg_contacts.appendChild(contact);
    }
}

function DelContact(idRelation)
{
    console.log(idRelation);
    fetch("https://trankillprojets.fr/wal/wal.php?delier&identifiant=" + user.identifiant + "&relation=" + idRelation)
    .then(reponse => reponse.json())
    .then(json => {
        if(json.etat.reponse==1)
        {
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
            SetContact();
            Show(pg_contacts);
        }else
        {
            console.log("awa");//afficher mail n'existe pas
        }
    }).catch(erreur => console.log(erreur));
}


function CreateChat(identite,idRelation,chatIndex)
{
    let chatPage = document.createElement("div");
    chatPage.setAttribute("id",idRelation);
    let label = document.createTextNode(identite);
    chatPage.appendChild(label);
    let textArea = document.createElement("textarea");
    textArea.setAttribute("id","textArea " + idRelation);
    chatPage.appendChild(textArea);
    let sendButton = document.createElement("button");
    sendButton.setAttribute("id","sendButton");
    sendButton.setAttribute("onclick","SendMsg(" + idRelation + ","+ chatIndex + ")");
    chatPage.appendChild(sendButton);
    return chatPage;
}


function SendMsg(idRelation,chatIndex)
{
    msg = document.getElementById("textArea " + idRelation)
    if(msg.value != "")
    {
        fetch("https://trankillprojets.fr/wal/wal.php?ecrire&identifiant=" + user.identifiant + "&relation=" + idRelation + "&message=" + msg.value)
        .then(reponse => reponse.json())
        .then(json => {
            if(json.etat.reponse==1)
            {
               // SetChat(idRelation,chatIndex);
                msg.value = "";
            }else
            {
                console.log("awa");//afficher msg erreur
            }
        }).catch(erreur => console.log(erreur));
    }
}

function SetChat(idRelation,chatIndex)
{
    let chat = user.chats[chatIndex];
    fetch("https://trankillprojets.fr/wal/wal.php?lire&identifiant=" + user.identifiant + "&relation=" + idRelation)
        .then(reponse => reponse.json())
        .then(json => {
            if(json.etat.reponse==1)
            {
                for(i of json.messages)
                {
                    let message = document.createElement("div");
                    if(user.identite == i.identite)
                    {
                        message.className = "user";
                    }else
                    {
                        message.className = "contact";
                    }
                    message.appendChild(document.createTextNode(i.message));
                    message.setAttribute("id","message");
                    chat.appendChild(message);
                    console.log(i);
                }
            }else
            {
                console.log("awa");//afficher msg erreur
            }
        }).catch(erreur => console.log(erreur));
}

function SetChats()
{
    if(user.contacts != null)
    {
        for(i in user.chats)
        {
            SetChat(user.chats[i].getAttribute("id"),i);
        }
        
    }
    setTimeout(SetChats,2000);
}