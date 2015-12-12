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
        
    preview.innerHTML = commentbox.value;
}

function getHTML(unparsedText)
{
    var lastquote = -1;
    var lastaddr = -1; 
    var linktext = '';
    var html = '';
    var linkbackup = ''; 
    
    for (var i = 0,  i < unparsedText.length; i++) {
        if(unparsedText[i] == '[')
        {
            lastquote = i; 
            linkbackup = '[';
        }
        else if(unparsedText[i] == ']')
        {
            if(lastquote != -1)
            {
                linktext = unparsedText.substring(lastquote, i); 
                linkbackup += ']';
            }
        }
        else if(unparsedText[i] == '(')
        {
            linkbackup += ']';
        }
        else if(unparsedText[i] == ')')
        {
            var linkaddr = '';
            if(lastquote != -1 && linkaddr != '' && )
            {
                linkbackup += ']';
                lastquote == -1
            }
        }
        else if(lastquote != -1)
        {
            linkbackup += unparsedText[i];
        }
        else
        {
            html += unparsedText[i];
        }
        
    }
}