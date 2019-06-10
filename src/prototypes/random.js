const random = function(cantidadNumeros = 1,callback){
    var self = this, arr = [], indexes = [], hasta = self.length; 
    while(arr.length < cantidadNumeros && cantidadNumeros < hasta){
      var v = Math.floor(Math.random() * hasta);
      if(!arr.some(function(e){return e == self[v];})){
          arr.push(self[v]);
          indexes.push(self.indexOf(self[v]));
      }

      if(arr.length == cantidadNumeros ){
          callback(arr,indexes);
      }
    }
};