const sync = function(callback,callbacktermino){
    var index = 0,fin = this.length,self = this;
    function recursiva(){
        if(index == fin){return callbacktermino();}
        if(index < fin){callback(self[index],index);index++;recursiva();}
    }
    recursiva();
}