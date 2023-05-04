$(document).on('click', '#terminal', function(e){
	$("#commandPrompt").focus();
})
$(document).on('click', 'body', function(e){
	$("#commandPrompt").focus();
	
})

$(document).on('keyup', '#commandPrompt', function(e){	
	if (e.key == 'Enter' && $("#commandPrompt").val().trim() != ''){
		game.command($("#commandPrompt").val().trim());
		$("#commandPrompt").val('')
	} else if (e.key == 'ArrowUp'){
		if (game.cmdHistoryPtr == null){
			game.cmdHistoryPtr = game.cmdHistory.length - 1;
		} else {
			game.cmdHistoryPtr--;
		}		
		$("#commandPrompt").val(game.cmdHistory[game.cmdHistoryPtr]);
	} else if (e.key == 'ArrowDown'){
		if (game.cmdHistoryPtr == null){
			game.cmdHistoryPtr = game.cmdHistory.length - 1;
		} else {
			game.cmdHistoryPtr++;
		}

		$("#commandPrompt").val(game.cmdHistory[game.cmdHistoryPtr]);
	}
	if (game.cmdHistoryPtr != null && (game.cmdHistoryPtr < 0 || game.cmdHistoryPtr > game.cmdHistory.length - 1)){
		game.cmdHistoryPtr = null;
		$("#commandPrompt").val('')
	}
	
})
$(document).on('click', '.netscan', function(e){
	game.nmapClass.hostscan(game.npc.names[e.target.id.split('-')[1]]);
	
})

$(document).on('click', '.portscan', function(e){
	
	game.nmapClass.portscan(e.target.id.split('-')[1], game.npc.names[e.target.id.split('-')[2]]);
	
})
$(document).on('click', '#stop', function(e){
	game.on();
});
$(document).on('click', 'button', function(e){
  ui.refresh()
})
