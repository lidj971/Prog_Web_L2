var input = document.querySelector("input");
function CheckMdpLength()
{
    var mdpLenght = input.value.length;
    var p = new Promise((resolve,reject) =>
    {
        if(mdpLenght >=8)
        {
            resolve("Valide");
        }else
        {
            reject(mdpLenght);
        }
    })

    p.then((message) =>
    {
        console.log("Mot de passe " + message);
    }).catch((mdpLenght) =>
    {
        console.log("Mot de passe Invalide" + " Seulement " + mdpLenght + " Characteres votre mot de passe comporter au moins 8 characteres");
    })
}

