var a = [1,2,3,-5];
alert(Min(a));
function ClearInfo()
{
    document.getElementByName("info");
}

function Min(tab)
{
    var min = tab[0];
    for(let i = 0;i < tab.length; )
    tab.array.forEach(element => {
        if(element > min)
        {
            min = element;
        }
    });
    return min;
}

function PrintInfo()
    {
        var nom = document.querySelectorAll("input")[0].value;
        var prenom = document.querySelectorAll("input")[1].value;
        if(nom.length > 0 && prenom.length > 0)
        {
            let b = document.createElement('div'); 
            let c = document.createTextNode("Bonjour" + nom + " " + prenom);
            b.appendChild(c);
            document.querySelector("body").appendChild(b);
        }else
        {
            let b = document.createElement('div').setAttribute("name","info"); 
            let c = document.createTextNode("quel est votre nom ?");
            b.appendChild(c);
            document.body.appendChild(b);
        }
    }