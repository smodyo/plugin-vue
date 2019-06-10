const onlyNumbers = {
	// Cuando el elemento enlazado es insertado en el DOM
	inserted: function (el) {
		var config = {
			no_permitidas: ['!', '"', '$', '%', '&', '/', '(', ')', '=','?', '¿', '*', '¨', '^', '{', '}', 'Ç', 'ç', 'ª', 'º',',', 'Dead', '´', '+', '`', '_', '@', '#', '|', '¢','∞', '¬', '÷', '”', '≠', '´'],
			no_permitidas_eventkey: [192, 222, 16, 220, 187]
		};

		el.addEventListener('keydown', function(event){
			var key;
			if( !event.charCode ){
				key = String.fromCharCode( event.which );
			} else {
				key = String.fromCharCode( event.charCode );
			}

			if( config.no_permitidas_eventkey.indexOf( event.keyCode ) !== -1 || config.no_permitidas.indexOf( event.key ) !== -1 ){
				// Verifica si el caracter ingresado esta dentro del array de las no permitidas
				this.blur();
			}

			if( event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 37 && event.keyCode !== 39 ){
				// Permite el ingreso de Borrar, Tab, Flecha a la izquierda, Flecha a la derecha
				if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)){
					// Si es numero, permite la accion
					return true;
                } else {
					// Si no es numero, previene la escritura en el input
					event.preventDefault();
					return false;
				}
			}
		});
	}
}