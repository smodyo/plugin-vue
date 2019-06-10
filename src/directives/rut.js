const rut = {
	// Cuando el elemento enlazado es insertado en el DOM
	inserted: function (el) {
		// Main config
		var config = {
			formatear: true,
			placeholder: true,
			no_permitidas: ['!', '"', '$', '%', '&', '/', '(', ')', '=','?', '¿', '*', '¨', '^', '{', '}', 'Ç', 'ç', 'ª', 'º',',', 'Dead', '´', '+', '`', '_', '@', '#', '|', '¢','∞', '¬', '÷', '”', '≠', '´'],
			no_permitidas_eventkey: [192, 222, 16, 220, 187],
			permitidas_eventkey: [190, 173],

			fn_error: function (input) {
				// El input esta invalido
				input.classList.remove('valid');
				input.parentNode.parentNode.classList.add('invalid');
				input.parentNode.parentNode.classList.remove('valid');
				input.classList.add('invalid');
			},

			fn_validado: function (input) {
				// El input esta valido
				input.classList.add('valid');
				input.parentNode.parentNode.classList.add('valid');
				input.parentNode.parentNode.classList.remove('invalid');
				input.classList.remove('invalid');
			}
		};

		// Atributos generales
		el.setAttribute('pattern', '[0-9]{1,3}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}');
		el.setAttribute('maxlength', 10);

		// Funciones
		function validar( rut_v ){
			if (!/[0-9]{1,3}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}/.test(rut_v) || /^00*/.test(rut_v)) {
				return false;
			}

			var tmp = rut_v.split('-');
			var dv_2 = tmp[1],rut_v2 = tmp[0].split('.').join('');

			if (dv_2 === 'K' || dv_2 === 'k') {
				dv_2 = 'k';
			} else {
				dv_2 = parseInt(tmp[1]);
			}
			return ( dv( rut_v2 ) === dv_2 );
		}

		function dv( rut ){
            var M = 0,S = 1;
            
			for (; rut; rut = Math.floor(rut / 10)) {
				S = (S + rut % 10 * (9 - M++ % 6)) % 11;
			}

			if (S) {
				return S - 1;
			} else {
				return 'k';
			}
		}

		function formatear( rut ){
			var tmp = quitar_formato( rut );
            var rut_2 = tmp.substring(0, tmp.length - 1),f = "";
            
			while (rut_2.length > 3) {
				f = '.' + rut_2.substr(rut_2.length - 3) + f;
				rut_2 = rut_2.substring(0, rut_2.length - 3);
			}

			if ( rut_2.trim() === '') {
				return '';
			} else {
				return rut_2 + f + "-" + tmp.charAt(tmp.length - 1);
			}
		}

		function quitar_formato( rut ){
			rut = rut.split('-').join('').split('.').join('');
			return rut;
        }
        
		// Eventos
		el.addEventListener('change', function(){
			if( validar(this.value) ){
				config.fn_validado( this );
			} else {
				config.fn_error( this );
			}
        });
        
		el.addEventListener('change', function(){
			if( validar( this.value ) === true && this.value.trim() !== '') {
				config.fn_validado( this );
			} else {
				config.fn_error( this );
			}
		});

		el.addEventListener('keydown', function(event){
			var key;
			if( !event.charCode ){
				key = String.fromCharCode(event.which);
			} else {
				key = String.fromCharCode(event.charCode);
			}

			if( config.no_permitidas_eventkey.indexOf(event.keyCode) !== -1 || config.no_permitidas.indexOf(event.key) !== -1){
				this.blur();
			}

			if (event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 37 && event.keyCode !== 39) {
				if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode === 75 || config.permitidas_eventkey.indexOf( event.keyCode) !== -1) {
					return true;
				} else {
					event.preventDefault();
					return false;
				}
			}

			if( config.formatear ){
				var formateado = formatear( this.value );
				if (formateado !== '') {
					this.value = formateado;
				}
			}
		});
	}
}