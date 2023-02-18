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
        element.style.display = "flex";
        if(element.getAttribute("id") != null)
        {
            document.querySelector("nav ." + element.getAttribute("id")).classList.add("selected");
        }
    }else
    {
        element.style.display = "none"
        if(element.getAttribute("id") != null)
        {
            document.querySelector("nav ." + element.getAttribute("id")).classList.remove("selected");
        } 
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
            if(element.getAttribute("id") == null)
            {
                currentPage.style.display = "none";
            }else
            {
                SetActive(currentPage,false);
            }

            if(element == pg_co || element == pg_inv)
            {
                document.querySelector("nav .pg_contacts").classList.remove("selected");
            }

            SetActive(element,true);
            currentPage = element;
        }else
        {
            alert("Veuillez vous connecter d'abord");
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
            connected = true;
            SetContact();
            Show(pg_contacts);
            
        }else
        {
            alert("identifiant invalide !!!");
        }
    }).catch(erreur => console.log(erreur));
}

function SetContact()
{
    fetch("https://trankillprojets.fr/wal/wal.php?relations&identifiant=" + user.identifiant)
    .then(reponse => reponse.json())
    .then(json => {
        if(json.etat.reponse == 1)
        {
            if(user.contacts == null)
            {
                user.contacts = json;
                ClearContacts(user.contacts.relations);
            }else if(json.relations.length != user.contacts.relations.length)
            {
                user.contacts = json;
                ClearContacts(user.contacts.relations);
            }
        }else
        {
            alert("Nous n'avons pas pu acceder a votre liste de contacts");
        }
        
    }).catch(erreur => console.log(erreur));
    setTimeout(SetContact,4000);
}

function ClearContacts(relations)
{
    console.log(relations);
    document.querySelectorAll("#contactButtons").forEach(contact => contact.remove());
    document.querySelectorAll("#suppButtons").forEach(contact => contact.remove());
    user.chats = [];
    let contactButtons = document.createElement("div");
    contactButtons.setAttribute("id","contactButtons");
    let suppButtons = document.createElement("div");
    suppButtons.setAttribute("id","suppButtons");
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
        let sup = document.createElement("button");
        sup.textContent = "Supprimer";
        sup.className = "supp"
        sup.setAttribute("onclick","DelContact(" + i.relation + ")");
        contact.appendChild(document.createTextNode(i.identite));
        contact.setAttribute("onclick","{Show(" + "user.chats[" + chatIndex + "]" +");" + "clearInterval(chatT);" + "SetChat(" + i.relation + "," + chatIndex + ")}");
        suppButtons.appendChild(sup);
        contact.setAttribute("id","contact");
        contact.className = "contact";
        contactButtons.appendChild(contact);
    }
    pg_contacts.appendChild(contactButtons);
    pg_contacts.appendChild(suppButtons);
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
            alert("Nous n'avons pas pu supprimer le contact");
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
            alert(input.value + " n'est pas sur Wal");
        }
    }).catch(erreur => console.log(erreur));
}


function CreateChat(identite,idRelation,chatIndex)
{
    let textBar = document.createElement("div");
    textBar.setAttribute("id",idRelation);
    let textArea = document.createElement("input");
    textArea.setAttribute("id","chatInput " + idRelation);
    textBar.appendChild(textArea);
    let sendButton = document.createElement("button");
    sendButton.textContent = "Send";
    sendButton.setAttribute("id","sendButton");
    sendButton.setAttribute("onclick","SendMsg(" + idRelation + ","+ chatIndex + ")");
    textBar.appendChild(sendButton);
    textBar.className = "msgBar";
    let msgContainer = document.createElement("div");
    msgContainer.className = "msgContainer";
    let chat = document.createElement("div");
    chat.appendChild(textBar);
    chat.appendChild(msgContainer);
    let label = document.createElement("div");
    label.setAttribute("id","chatLabel");
    label.appendChild(document.createTextNode(identite));
    chat.appendChild(label);
    chat.className = "chat";
    return chat;
}


function SendMsg(idRelation,chatIndex)
{
    msg = document.getElementById("chatInput " + idRelation)
    if(msg.value != "")
    {
        fetch("https://trankillprojets.fr/wal/wal.php?ecrire&identifiant=" + user.identifiant + "&relation=" + idRelation + "&message=" + msg.value)
        .then(reponse => reponse.json())
        .then(json => {
            if(json.etat.reponse==1)
            {
                msg.value = "";
            }else
            {
                alert("Impossible d'envoyer le message");
            }
        }).catch(erreur => console.log(erreur));
    }
}

var chatT;

function SetChat(idRelation,chatIndex)
{
    let chatChildren = user.chats[chatIndex].children;
    let chat = chatChildren[1];
    
    fetch("https://trankillprojets.fr/wal/wal.php?lire&identifiant=" + user.identifiant + "&relation=" + idRelation)
        .then(reponse => reponse.json())
        .then(json => {
            if(json.etat.reponse==1)
            {
                for(i of json.messages)
                {
                    let message = document.createElement("div");
                    message.appendChild(document.createTextNode(i.message));
                    message.setAttribute("id","message");
                    message.className = "message";
                    if(user.identite == i.identite)
                    {
                        message.classList.add("user");
                    }else
                    {
                        message.classList.add("nUser");
                    }
                    chat.appendChild(message);
                    console.log(i);
                }
            }
        }).catch(erreur => console.log(erreur));
    chatT = setTimeout("SetChat("+idRelation + "," + chatIndex +")",1000);
}