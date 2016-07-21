var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: "cb8662b9-69a8-46c6-b1da-f4c567b59f11",
    appPassword: "JcKd2jY5g1mZ2rfxnL5pkJP"
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
		builder.Prompts.text(session, "I am eacho bot: say something: ");
    },
	function(session, results){
        session.send(results.response);
		session.beginDialog('/echo');
	}
]);

bot.dialog('/echo', [
    function (session) {
		builder.Prompts.text(session, "listening... ");
    },
	function(session, results){
        session.send(results.response);
		session.beginDialog('/echo');
	}
]);