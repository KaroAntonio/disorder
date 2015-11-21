
var gif_i = 0,
    line_i = 0,
    poem_i = 0;

var poems,
    poem_titles;



$('#info_button').click(function(){
    if ($('#info').css('visibility') == 'hidden') {
        $('#info_button').html('-i')
        $('#info').css('visibility', 'visible')
    } else  {
        $('#info_button').html('+i')
        $('#info').css('visibility', 'hidden')
    }
})

//LOAD Poems
$.getJSON( "assets/poems.json", function( data ) {
    poems = data;
    poem_titles = Object.keys(poems);
    populateLines($('#content'), poems[poem_titles[0]],0)
    
    $(document).mousedown(function () {
        populateLines($('#content'), poems[poem_titles[1]],1)
    })
    $(document).mouseup(function () {
        populateLines($('#content'), poems[poem_titles[0]],0)
    })
    
    
    
    
 });

function populateLines(parent, lines, mode) {
    //Populates a Div with lines, 
    //each contained in a div
    parent.empty();
    for (var i = 0; i < lines.length; i++) {
        var s;
        if (i%2 == mode)
            s = "XOXOXOXOXOXOXOXOXOXOXOX"
        else 
            s = "OXOXOXOXOXOXOXOXOXOXOXO"
        var line = $("<div class='line'>"+s+"</div>");
        parent.append(line)
        bindDecoder(line, lines[i])
    }
}

function bindDecoder(e, dm) {
    var em = e.html() //encodedMessage
    var dm = dm;
    var index = 0;
    var decoder;
    var decoding = false,
        mouseOver = false;
    var timer = 0,
        time_limit = 1,
        speed = 10;
    
    e.hover(function () {
        return function(e,encodedMessage, decodedMessage) {
            initDecoder();
            if (!decoding ){
                var m;
                var s = e.html();
                decoding = true;
                e.html('#');
                if (s==encodedMessage) {
                    m = decodedMessage;
                    decoder = setInterval(function() {
                        decode(e, m)
                    }, speed/5)
                }
                else {
                    m = encodedMessage;
                    
                    decoder = setInterval(function() {
                        decode(e, m)
                    }, speed*2)
                }
                
                
                
            }
        }(e,em,dm)})
    
    function decode(e, m){
        //for each character, add a char to html string
        //randomize that character for a bit
        //set character to appropriate char in message
        timer++;
        randomize(e,index)
        if (timer > time_limit) {
            var s = e.html();
            s = s.substring(0,index) + 
                m.substring(index, index+1) + 
                s.substring(index+1, s.length);
            e.html(s)
            timer = 0
            index++;
        }
        //END condition
        if (index >= m.length)
            initDecoder()
    }
    
    function initDecoder() {
        clearInterval(decoder)
        timer = 0;
        index = 0;
        decoding = false;
    }

    function randomize(e,i) {
        //display random ascii char at index into e's content
        var s = e.html();
        var code = Math.floor((Math.random() * (126-64)) +64)
        s = s.substring(0,i) + 
            String.fromCharCode(code).substring(0,1) + 
            s.substring(i+1, s.length);
        e.html(s)
    }
}
