var querystring = require("querystring");

function index(response, postData) {
    console.log("Request handler 'index' was called.");
    
    var body = '<!DOCTYPE html>\n'+
        '<html lang="fr">\n'+
        '<head>\n'+
        '   <meta charset="utf-8" />\n'+
        '   <title>NodeTest</title>\n'+
        '   <meta name="viewport" content="width=device-width, '+
        'initial-scale=1, maximum-scale=1" />\n'+
        '   <link rel="stylesheet" href="css/base.css">\n'+
        '   <link rel="stylesheet" href="css/skeleton.css">\n'+
        '   <link rel="stylesheet" href="css/layout.css">\n'+
        '</head>\n'+
        '<body>\n'+
        '   <div class="container">\n'+
        '       <h1 style="margin-top: 100px;">NodeTest</h1>\n'+
        '       <p>Bienvenue sur le site de test de nodejs.</p>\n'+
        '       <p>Page de test : <a href="/test" class="button">test</a></p>\n'+
        '   </div>\n'+
        '   <script src="js/jquery-1.5.1.min.js"></script>\n'+
        '   <script src="js/app.js"></script>\n'+
        '</body>\n'+
        '</html>';
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function test(response, postData) {
    console.log("Request handler 'test' was called.");
    var data = '';
    
    if (postData === '')
        data = "rien";
    else
        data = querystring.parse(postData).text;
    
    var body = '<!DOCTYPE html>\n'+
        '<html lang="fr">\n'+
        '<head>\n'+
        '   <meta charset="utf-8" />\n'+
        '   <title>Formulaire - NodeTest</title>\n'+
        '   <meta name="viewport" content="width=device-width, '+
        'initial-scale=1, maximum-scale=1" />\n'+
        '   <link rel="stylesheet" href="css/base.css">\n'+
        '   <link rel="stylesheet" href="css/skeleton.css">\n'+
        '   <link rel="stylesheet" href="css/layout.css">\n'+
        '</head>\n'+
        '<body>\n'+
        '   <div class="container">\n'+
        '       <h1 style="margin-top: 100px;">Page de Test</h1>\n'+
        '       <p><a href="/">Retour</a></p>\n'+
        '       <form action="/test" method="post">\n'+
        '           <fieldset>\n'+
        '               <label for="txtMessage"></label>\n'+
        '               <textarea id="txtMessage" name="text">Votre message</textarea>\n'+
        '               <button type="submit">Envoyer</button>\n'+
        '           </fieldset>\n'+
        '       </form>\n'+
        '       <p>Vous avez envoyé : ' + data + '</p>\n'+
        '   </div>\n'+
        '   <script src="js/jquery-1.5.1.min.js"></script>\n'+
        '   <script src="js/app.js"></script>\n'+
        '</body>\n'+
        '</html>';
    
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

exports.index = index;
exports.test = test;