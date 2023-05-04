class UI{
	automation = null;
	frameNum = 1;
  constructor(){
    //this.startLoading(10000);
  }
  refresh(){

  }
  
  status(msg){
	  let old = $("#terminal").html();
	  $("#terminal").html(msg + old);
  }
  
  loading(everyFrame){
	
		let loadCent = Number($("#loadCent").html());
console.log(everyFrame, this.frameNum, this.frameNum % everyFrame == 0, loadCent);
		if (this.frameNum % everyFrame == 0){
			$("#loadCent").html(loadCent++);
		}	
	  if (this.frameNum % 2 == 0){
		  $(".loadUnit").html("/");
	  } else {
		  $(".loadUnit").html("\\");
	  }
	  this.frameNum++;
  }
  
  startLoading(delay){
	  this.automation = setInterval(function (){ ui.loading(delay / 100) }, 100);
	setTimeout(function(){
		console.log('hello2');
		clearInterval(this.automation);
		this.automation = null;
	}, delay * 100);
  }
  fetchSystemStatus(){
	return " System: " + (game.system / game.maxSystem * 100) + "%";

  }
}
