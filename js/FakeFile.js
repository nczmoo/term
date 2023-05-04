class FakeFile{
	files = {
		'root.file': "this is your root file. this is where all your bits and bauds are stored. this is also your wallet that holds all your crypto coins.",
	}	
  constructor(){
    
  }
  vi(filename){
	  if (this.files[filename] == undefined){
		  files[filename] = '';
	  }
	return this.files[filename];
  }
  

}
