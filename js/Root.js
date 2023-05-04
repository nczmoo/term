class Root{

  constructor(){
    
  }
  go(prompts){
	  if (prompts[1] == '-hash'){
		this.hash(prompts);
		return;
	  } else if (prompts[1] == '-l'){
		this.list(prompts);
		return;
	  } else if (prompts[1] == '-p'){
		 this.pwd(prompts);
		 return;
	}	

	this.badCommand('root');
	  
  }
  hash(prompts){
	  
	  if (game.pwd != null && prompts.length == 2){
		ui.status("<div>Your root file is password protected but you didn't input a password. Please input your password after '" + prompts[1] + "'.</div>");
		return;
	  }
	  game.hash += game.system;
		ui.status("<div>" + (game.system / game.maxSystem * 100) 
			+ "% of your CPU was used added to mine crypto. You are now " 
			+ (game.hash / game.cryptoGoal  * 100) + "% on your way towards creating an ELON</div>");
  }
  list (prompts){
	  if (game.pwd != null && prompts.length == 2){
		  ui.status("<div>root is password protected but you didn't type in a password. Please input the password.</div>");
		  return;
	  } else if (game.pwd != null && prompts[2] != game.pwd){
		  ui.status("<div>Invalid password. Please try again.</div>");
		  return;
	  } else if (game.pwd == null){
		  ui.status('<div>Your root file is ' + game.rootFile + "</div>");
		  return;
	  }
	  game.badCommand('root');
  }
  pwd(prompts){
	  if (prompts.length == 2 && game.pwd == null){
		  ui.status('<div>root is not password protected.</div>');
		  return;
	  } else if (prompts.length == 2 && game.pwd != null){
		  ui.status('<div>root is password protected.</div>');
		return;
	  } else if (game.pwd != null && prompts.length == 3){
		  ui.status('<div>root is already password protected. please type your old password first then the new password</div>');
		  return;
	  } else if (game.pwd != null && prompts.length == 4 && prompts[2] != game.pwd){
		  ui.status('<div>Invalid password. Please try again.</div>');
		  return;
	  } else if (game.pwd != null && prompts.length == 4 && prompts[2] == game.pwd){
		  game.pwd = prompts[3];
		  ui.status('<div>Password changed!</div>');
		  return;
	  } else if (game.pwd == null && prompts.length == 3){
		  game.pwd = prompts[2];
		  ui.status('<div>Password set!</div>');
		  return;
	  }
		game.badCommand('root');
		return;
  }

}
