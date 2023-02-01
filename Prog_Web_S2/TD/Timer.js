var TimerRunning = false;
var heures = document.getElementById("heures");
var minutes = document.getElementById("minutes");
var secondes = document.getElementById("secondes");
var isRunning = false;

var h;
var m;
var s;

function StartTimer()
{
    h = setInterval(AddHeure,3600 * 1000);
    m = setInterval(AddMinute,60 * 1000);
    s = setInterval(AddSeconde,1000);
}

function StopTimer()
{
    clearInterval(h);
    clearInterval(m);
    clearInterval(s);
}

function ResetTimer()
{
    heures.textContent = "00";
    minutes.textContent = "00";
    secondes.textContent = "00";
}

function AddHeure()
{
    var currentH = parseInt(heures.textContent);
    currentH += 1;
    if(currentH >= 23)
    {
        currentH = 0;
    }
    heures.textContent = currentH;
}

function AddMinute()
{
    var currentM = parseInt(minutes.textContent);
    currentM += 1;
    if(currentM >= 60)
    {
        currentM = 0;
    }
    minutes.textContent = currentM;
    
}

function AddSeconde()
{
    var currentS = parseInt(secondes.textContent);
    currentS += 1;
    if(currentS >= 60)
    {
        currentS = 0;
    }
    secondes.textContent = currentS;
}