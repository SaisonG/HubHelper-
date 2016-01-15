function testypants(){

}


function addCommentHooks() {
    var wrappers = document.getElementsByClassName("commentform");
    var commentDiv = wrappers[0];
    var form = commentDiv.getElementsByTagName('form')[0];  
    var area = commentDiv.getElementsByTagName('textarea')[0];  

    area.addEventListener('input', function() {
        previewText();
    }, false);
    
    var previewBox = document.createElement('div');
    previewBox.id = "previewbox";
    form.appendChild(previewBox);
}



function previewText(){
    var wrappers = document.getElementsByClassName("commentform");
    var commentDiv = wrappers[0];
    var areas = commentDiv.getElementsByTagName('textarea');  
    var commentbox = areas[0];
    var preview = $('div#previewbox')[0];  
        
    preview.innerHTML = getHTML(commentbox.value);
}


function getHTML(unparsedText)
{
	var linkname = '';
	var namebuilding = false; 
	var linkurl = ''; 
	var urlbuilding = false; 
	var fullhtml = ''; 
	var bolding = false; 
	var italicsing = false; 
	
    for (var i = 0;  i < unparsedText.length; i++) {
		if(unparsedText[i] == '[')
		{
			namebuilding = true;
			linkname = '';
		    linkurl = '';
		}else if(unparsedText[i] == ']')
		{
			namebuilding = false;
		}else if((unparsedText[i] == '(') && i > 1 && unparsedText[i-1] == ']' && linkname != '')
		{			
			namebuilding = false;
			urlbuilding = true;
			linkurl = '';
		}else if(unparsedText[i] == ')' && linkurl != '')
		{	
			namebuilding = false;
			urlbuilding = false;
			fullhtml += "<a href=\""+linkurl+"\">"+linkname+"</a>";
		}else if (namebuilding)
		{
			linkname += unparsedText[i];
		}else if (urlbuilding)
		{
			linkurl += unparsedText[i];
		}else if(unparsedText[i] == '*')
		{
			if(italicsing)
			{
				fullhtml += "</i>";
			}else
			{
				fullhtml += "<i>";
			}
			italicsing = !italicsing; 
		}else if(unparsedText[i] == '+')
		{
			if(bolding)
			{
				fullhtml += "</b>";
			}else
			{
				fullhtml += "<b>";
			}
			bolding = !bolding; 
		}else
		{
			fullhtml += unparsedText[i];
		}
	}
	return fullhtml;
}