function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

/* Slooooow, gotta be a better way. 
*  searches child links till we get something like save_83982
*/
function findHubID(uiElement)
{
    var test = uiElement.getElementsByTagName('a');
    searchIndex = -1,
    hPubID = -1;
     
    if (test.length == 0)
    {
        test = uiElement.parentElement.getElementsByTagName('a');   
    }
    
    if (test.length == 0)
    {
        console.log("Failed to find the element");
        return -1; 
    }
    
    for(i = 0;i < test.length; i++)
    {
        searchIndex = test[i].id.search("_");
        if (searchIndex > 0) 
        { 
            hPubID = test[i].id.slice(searchIndex+1);
            break; 
        }
    }
    
    return hPubID;    
}

function fetch_feed(caller) {

    var hPubID = findHubID(caller.currentTarget);
    
    if(hPubID <=0)
    {
        console.log("Failed to find a valid pub ID");
        return; 
    }
    
    hubUrl = "http://api.hubski.com/publication/" + hPubID;
    
    chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: hubUrl,
    data: null
    },  function(response) {
            try {
                display_stories(response, hPubID);
            }catch(e){
                console.log(e);
            }
        }
    );
}

function display_stories(inputdata, ID) {
    if (inputdata == null)
    {
        console.log("Invalid input data passed to display");
        return; 
    }
    
    var data = JSON.parse(inputdata);
    var myPopup = document.getElementById("HubskiHelper" + ID);
    myPopup.textContent = "Unable to get vote data"; 
        
    var item = '';
    var votes = data.votes;
    for (var i = 0; i < votes.length; i++)
    {
        item +=  votes[i].user + "<br />";
    }
    
    myPopup.innerHTML = item;
    myPopup.style.display = 'block';
    myPopup.className = "hhPopup";
}

function hideBoopers() 
{
    var popups = document.getElementsByClassName("hhPopup");
    for(var i = 0; i < popups.length; i++){
        popups[i].style.display = 'none';
    }
}

function addVotesHooks() {
    var wrappers = document.getElementsByClassName("outercomm");
    for(var i = 0; i < wrappers.length; i++){
        var currentSection = wrappers[i];
        var boopwheel = currentSection.getElementsByClassName("plusminus")[0];
        var titleBar = currentSection.getElementsByClassName("subhead")[0];
        
        var hPubID = findHubID(titleBar);
        
        boopwheel.addEventListener("mouseover", function(e) {
            fetch_feed(e);
        }, false);

        boopwheel.addEventListener("mouseout", function() {
            hideBoopers();
        }, false);

        //Creating Elements
        var hhDiv = document.createElement('div');
        hhDiv.id = "HubskiHelper" + hPubID;
        titleBar.appendChild(hhDiv);
    }
}

$(document).ready(function () {
    // Add hooks for enabled features
    if (document.URL.indexOf("pub") != -1) {
        addVotesHooks();
        addCommentHooks();
    }
});