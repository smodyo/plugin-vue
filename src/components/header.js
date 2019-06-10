const header = {
    data: function(){
        return {
            rut: '',
            rutmobile: '',
            rutios: '',
            panelMenu: false,
            panelMenuMobile: false,
            panelLogin: false,
            panelSearch: false,
            panelLoginMobile: false,
            mobLogin: false,
            mobLoginClassic: false,
            mobLoginOfBanking: false,
            search: '',
            results: [],
            loginMobileIos: false,
            mobile: true,
            textVersion: 'Ir a version clásica'
        };
    },
    props: {
        modyo:{type:Boolean}
    },
    methods: {
        addSearch: function () {
            if (this.search.length <= 0) {
                this.results = [];
            } else {
                var self = this;
                var text = this.search;
                var url = 'https://banco.santander.cl/personas/detalles.json?limit=8&query=' + text;
                fetch(url).then(res => res.json())
                    .then(response => self.results = response.detalles)
            }
        },
        detectMobile: function () {
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (iOS) {
                this.loginMobileIos = true;
            } else {
                this.loginMobileIos = false;
            }
        },

        setfocus: function () {
            this.$refs.buscarinput.focus();
        },

        focus: function () {
            setTimeout(this.setfocus, 100);
        },

        findhero: function () {
            var topmenu = this.$refs.topmenu;
            var mainmenu = this.$refs.mainmenu;
            if (document.querySelector('.header-page') || document.querySelector('.main-full')) {
                topmenu.classList.add('active');
                mainmenu.classList.add('active');
            } else {
                window.addEventListener('scroll', function () {
                    if (window.pageYOffset > 100) {
                        topmenu.classList.add('active');
                        mainmenu.classList.add('active');
                    } else {
                        topmenu.classList.remove('active');
                        mainmenu.classList.remove('active');
                    }
                });
            }
        },

        changeVersion: function () {
            if (this.mobile) {
                this.mobile = false;
                this.textVersion = 'Ir a version móvil';
            } else {
                this.mobile = true;
                this.textVersion = 'Ir a version clásica';
            }
        },

        submitMobile: function () {
            var self = this;
            var run = this.$refs.run;
            var pin = this.$refs.pin;
            var zeros = 12 - run.value.trim().length;
            var zerosSufix = Array(zeros).join('0');
            var rut = zerosSufix + run.value.trim().toUpperCase();
            var run2 = rut;
            var formulario = new FormData();
            formulario.append('ctl12', 'Ingresar');
            formulario.append('username', run2);
            formulario.append('password', pin);

            fetch('https://www.santandermovil.cl/UI.Services/api/account/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: formulario
            }).then(res => res.json()).then(response => {
                if (response.ErrorCode == "00") {
                    window.location.href = 'https://www.santandermovil.cl/UI.Web.HB/dist/';
                }
            });
        },

        submit: function () {
            if (this.mobile) {
                this.submitMobile();
            } else {
                this.$refs.formulario.submit();
            }
        },
        mediaQuery: function (media = "min-width", pixels = 768) {
            var query;
            if ((media === "max-width" || "min-width" || "max-height" || "min-height")) {
                query = `${media}:${pixels.toString()}px`;
            }

            return window.matchMedia(`(${query})`).matches ? true : false;
        },

        accesibilidad: function () {
            document.addEventListener('DOMContentLoaded', function () {
                var accesibilidad_btn = document.querySelector('#accesiblidad-btn');
                var accesibilidad_cont = document.querySelector('#accesibilidad-cont');
                accesibilidad_cont.style.display = "none";
                var font_down = accesibilidad_cont.querySelector('#font-down');
                var font_reset = accesibilidad_cont.querySelector('#font-reset');
                var font_up = accesibilidad_cont.querySelector('#font-up');

                font_down.addEventListener('click', function (e) {
                    e.preventDefault();
                    alert('font down');
                });

                font_reset.addEventListener('click', function (e) {
                    e.preventDefault();
                    alert('font reset');
                });

                font_up.addEventListener('click', function (e) {
                    e.preventDefault();
                    alert('font up');
                });

                accesibilidad_btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (accesibilidad_cont.style.display === "none") {
                        accesibilidad_cont.style.display = "block";
                    } else {
                        accesibilidad_cont.style.display = "none";
                    }
                });
            });

        },

        oldHeader: function () {
            (function ($) {
                $.fn.rut = function (opt) {
                    var defaults = $.extend({
                        formatear: true,
                        on: 'blur',
                        required: false,
                        placeholder: true,
                        no_permitidas: ['!', '"', '$', '%', '&', '/', '(', ')', '=',
                            '?', '¿', '*', '¨', '^', '{', '}', 'Ç', 'ç', 'ª', 'º',
                            ',', 'Dead', '´', '+', '`', '_', '@', '#', '|', '¢',
                            '∞', '¬', '÷', '”', '≠', '´'
                        ],
                        no_permitidas_eventkey: [192, 222, 16, 220, 187],
                        permitidas_eventkey: [190, 173],

                        fn_error: function (input) {
                            $(input).removeClass('valid');
                            $(input).parent().parent().addClass('invalid');
                            $(input).parent().parent().removeClass('valid');
                            $(input).addClass('invalid');
                        },
                        fn_validado: function (input) {
                            $(input).addClass('valid');
                            $(input).parent().parent().addClass('valid');
                            $(input).parent().parent().removeClass('invalid');
                            $(input).removeClass('invalid');
                        }
                    }, opt);

                    return this.each(function () {
                        var $t = $(this);
                        $t.attr('pattern', '[0-9]{1,3}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}').attr('maxlength', 10);
                        if (defaults.required === true) {
                            $t.attr('required', true);
                        } else {
                            $t.attr('required', false);
                        }

                        if (defaults.formatear) {
                            $t.on('input propertychange', function () {
                                var formateado = $.rut.formatear($t.val());
                                if (formateado !== '') {
                                    $t.attr('maxlength', 13);
                                    $t.val(formateado);
                                }
                            });
                        }

                        $t.on('input propertychange', function () {
                            if ($.rut.validar($t.val()) === true && $.trim($t
                                    .val()) !== '') {
                                defaults.fn_validado($t);
                            } else {
                                defaults.fn_error($t);
                            }
                        });

                        $t.change(function () {
                            var number;
                            var palabras = $t.val().split('');
                            $.each(palabras, function (index, item) {
                                number = index;
                                if (defaults.no_permitidas.indexOf(
                                        item) !== -1) {
                                    $t.val('');
                                }
                            });
                        });

                        $t.click(function () {
                            $t.attr('maxlength', 10);
                            if ($t.hasClass('invalid')) {
                                $t.val('');
                            }
                        });

                        $t.keydown(function (event) {
                            var key;
                            if (!event.charCode) {
                                key = String.fromCharCode(event.which);
                            } else {
                                key = String.fromCharCode(event.charCode);
                            }

                            if (defaults.no_permitidas_eventkey.indexOf(event
                                    .keyCode) !== -1 || defaults.no_permitidas
                                .indexOf(event.key) !== -1) {
                                $t.blur();
                            }

                            if (event.keyCode !== 8 && event.keyCode !== 9 &&
                                event.keyCode !== 37 && event.keyCode !== 39) {
                                if ((event.keyCode >= 48 && event.keyCode <=
                                        57) || (event.keyCode >= 96 && event
                                        .keyCode <= 105) || event.keyCode ===
                                    75 || defaults.permitidas_eventkey.indexOf(
                                        event.keyCode) !== -1) {
                                    return true;
                                } else {
                                    event.preventDefault();
                                    return false;
                                }
                            }

                        });
                    });
                };
            })(jQuery);

            jQuery.rut = {
                validar: function (rut_v) {
                    if (!/[0-9]{1,3}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}/.test(rut_v) || /^00*/.test(
                            rut_v)) {
                        return false;
                    }

                    var tmp = rut_v.split('-');
                    var dv_2 = tmp[1],
                        rut_v2 = tmp[0].split('.').join('');
                    if (dv_2 === 'K' || dv_2 === 'k') {
                        dv_2 = 'k';
                    } else {
                        dv_2 = parseInt(tmp[1]);
                    }
                    return ($.rut.dv(rut_v2) === dv_2);
                },

                dv: function (rut) {
                    var M = 0,
                        S = 1;
                    for (; rut; rut = Math.floor(rut / 10)) {
                        S = (S + rut % 10 * (9 - M++ % 6)) % 11;
                    }
                    if (S) {
                        return S - 1;
                    } else {
                        return 'k';
                    }
                },

                formatear: function (rut) {
                    var tmp = this.quitar_formato(rut);
                    var rut_2 = tmp.substring(0, tmp.length - 1),
                        f = "";

                    while (rut_2.length > 3) {
                        f = '.' + rut_2.substr(rut_2.length - 3) + f;
                        rut_2 = rut_2.substring(0, rut_2.length - 3);
                    }

                    if ($.trim(rut_2) === '') {
                        return '';
                    } else {
                        return rut_2 + f + "-" + tmp.charAt(tmp.length - 1);
                    }
                },

                quitar_formato: function (rut) {
                    rut = rut.split('-').join('').split('.').join('');
                    return rut;
                },

                formatearRut: function (input) {
                    var formateado = $.rut.formatear($(input).val());
                    if (formateado !== '') {
                        $(input).val(formateado);
                    }
                }
            };


            function onlyNumbers(input, event) {
                var no_permitidas = ['!', '"', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '*', '¨',
                    '^', '{', '}', 'Ç', 'ç', 'ª', 'º', ',', 'Dead', '´', '+', '`', '_', '@', '#',
                    '|', '¢', '∞', '¬', '÷', '”', '≠', '´'
                ];
                var no_permitidas_eventkey = [192, 222, 16, 220, 187];

                var key;
                if (!event.charCode) {
                    key = String.fromCharCode(event.which);
                } else {
                    key = String.fromCharCode(event.charCode);
                }

                if (no_permitidas_eventkey.indexOf(event.keyCode) !== -1 || no_permitidas.indexOf(event
                        .key) !== -1) {
                    $(input).blur();
                }

                if (event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 37 && event
                    .keyCode !== 39) {
                    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event
                            .keyCode <= 105)) {
                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }
            }

            function defineHead() {
                var windowWidth = $(window).width();

                if (windowWidth <= 768) {
                    $('.main-header').addClass('fixed');
                    $('body').css('padding-top', $('.main-header').innerHeight());
                } else {
                    $('body').css({
                        'overflow': 'auto'
                    });
                    $('.main-header #navToggle span').removeClass('equis');
                    $('.responsive-header').fadeOut();
                    $('.main-header').removeClass('fixed');
                }
            }

            $(document).ready(function () {
                $('li.menu-item.ayuda').click(function (e) {
                    if ($('.submenu-ayuda', this).is(':visible')) {
                        $('.submenu-ayuda', this).hide();
                    } else {
                        $('.submenu-ayuda', this).show();
                    }
                });

                defineHead();

                $('.rut').rut();

                var default_ryc = $('.responsive-header #ingresar').html();

                $('.only_numbers').keydown(function (event) {
                    onlyNumbers(this, event);
                });

                $('#navToggle span').click(function (e) {
                    e.preventDefault();
                    $(this).toggleClass('equis');
                    var responsive_header = $('.responsive-header');

                    if ($('.responsive-header').is(':visible')) {
                        $('body').css('overflow', 'auto');
                        $(responsive_header).fadeOut(function () {
                            $('.header_cont', this).removeClass('active');
                            $('.responsive-header .rut_clave').slideUp();
                            $('.responsive-header #ingresar').html(default_ryc);
                            $('.responsive-header #ingresar').removeClass('active');
                        });
                    } else {
                        $('body').css('overflow', 'hidden');
                        $(responsive_header).fadeIn(function () {
                            $('.header_cont', this).addClass('active');
                        });
                    }
                });

                $('.responsive-nav .menu-dropdown').click(function (e) {
                    e.preventDefault();
                    $(this).next('ul').slideToggle();
                });

                $('.responsive-header #ingresar').click(function () {
                    if (String($(this)[0].classList).indexOf('active') === -1) {
                        $(this).addClass('active');
                        $(this).html('Ingresar');
                        $('.responsive-header .rut_clave').slideDown();
                    } else {
                        $('.responsive-header .rut_clave').submit();
                    }
                });

                $('.responsive-header .rut_clave').submit(function (e) {
                    e.preventDefault();
                    var valid = [];
                    var inputs = $('input', this);

                    $.each(inputs, function (i, e) {
                        if ($(e).attr('type') !== 'hidden') {
                            valid.push($(e).hasClass('valid'));

                            if (!$(e).hasClass('valid')) {
                                $(e).parent().parent().addClass('invalid');
                            }
                        }
                    });

                    if (valid.length > 0 && valid.indexOf(false) === -1) {
                        var rut_val = $('input[name="d_rut"]', this).val();
                        var pin_val = $('input[name="d_pin"]', this).val();
                        $('input[name="rut"]', this).val(rut_val);
                        $('input[name="pin"]', this).val(pin_val);
                        $(this).unbind('submit');
                        $(this).submit();
                    }
                });

                $('.responsive-header .rut_clave .pin').on('input propertychange', function (event) {
                    var maxLength = $(this).attr('maxlength');
                    var minLength = $(this).attr('minlength');
                    var varLength = $(this).val().length;

                    if (varLength > 0 && varLength >= minLength && varLength <=
                        maxLength) {
                        $(this).addClass('valid');
                        $(this).parent().parent().removeClass('invalid');
                    } else {
                        $(this).removeClass('valid');
                        $(this).parent().parent().addClass('invalid');
                    }
                });
            });

            $(window).resize(defineHead);
        }
    },
    mounted: function () {
        this.detectMobile();
        this.findhero();
        this.accesibilidad();
        if (!this.modyo) {this.oldHeader();}
    },
    template: `<div v-cloak>
<div v-if="modyo" id="new-header">
        <header>
                <!-- TOP MENU -->
                <div ref="topmenu" class="top-menu d-none d-md-inline-block"">
                    <div class="container">
                        <div class="row no-gutters align-items-center">
                            <div class="col">
                                <a href="/personas" class="active">Personas</a>
                            </div>
                            <div class="col">
                                <div v-cloak>
                                    <b-dropdown id="ddown1" text="Empresas" class="m-0 p-0 w-100 d-block border-0" variant="link">
                                        <b-dropdown-item href="https://www.santander.cl/advance/index.asp"
                                            class="text-dark text-shadow-no px-3 py-3 d-flex align-items-center d-flex justify-content-between">
                                            Pyme <span class="icon-flecha-derecha"></span></b-dropdown-item>
                                        <b-dropdown-item href="https://www.santander.cl/empresas/index.asp"
                                            class="text-dark text-shadow-no px-3 py-3 d-flex align-items-center d-flex justify-content-between">
                                            Empresas <span class="icon-flecha-derecha"></span></b-dropdown-item>
                                        <b-dropdown-item href="https://www.santander.cl/CIB/"
                                            class="text-dark text-shadow-no px-3 py-3 d-flex align-items-center d-flex justify-content-between">
                                            CIB <span class="icon-flecha-derecha"></span></b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>
                            <div class="col">
                                <a href="https://www.santanderpb.cl/" class="">Private Banking</a>
                            </div>
                            <div class="col-7">
                                <div class="row no-gutters top-menu__mini">
                                    <div class="col-3 col-lg-3"></div>
                                    <div class="col-3 col-lg-3">
                                        <a href="#" id="accesiblidad-btn">
                                            <span class="str-wheelchair-accessibility"> </span> Accesibilidad <span
                                                class="icon-flecha-abajo"></span>
                                        </a>
                                        <div id="accesibilidad-cont">
                                            <ul>
                                                <li class="control-text"><a href="#" id="font-down"><span
                                                            class="str-font-size-minus"></span></a></li>
                                                <li class="control-text"><a href="#" id="font-reset"><span
                                                            class="str-font-size"></span></a></li>
                                                <li class="control-text"><a href="#" id="font-up"><span
                                                            class="str-font-size-plus"></span></a></li>
                                                <li class="black-white"><a href="#"></a></li>
                                                <li class="black-yellow"><a href="#"></a></li>
                                                <li class="control-text"><a href="#">?</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-3 col-lg-3">
                                        <a href="https://ayuda.santander.cl/personas/">
                                            <span class="str-personal-area"> </span> Servicio al cliente
                                        </a>
                                    </div>
                                    <div class="col-3 col-lg-3">
                                        <a href="https://www.santander.cl/sucursales_santander/sucursales/index.asp">
                                            <span class="str-sitemap"> </span> Sucursales
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <!-- MAIN MENU -->
                <div ref="mainmenu" class="main-menu">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-6 col-sm-6 col-md-4">
                                <a href="/personas" class="logo d-inline-block">
                                    <img src="https://banco.santander.cl/uploads/000/003/697/9c2347b3-ca36-4f53-9f65-5cd6bdabf0d2/original/logo_santander_new.svg"
                                        class="img-fluid">
                                </a>
                                <a href="https://www.santander.cl/seleccion-chilena/index.asp"
                                    class="logo-seleccion d-inline-block">
                                    <img src="https://banco.santander.cl/uploads/000/006/717/3d75284d-234f-475e-81e6-673c85a82f9c/original/Logo_de_la_Federacio_n_de_Fu_tbol_de_Chile.png"
                                        class="img-fluid">
                                </a>
                            </div>
                            <div class="col-6 col-sm-6 col-md-8 text-right">
                                <a href="https://clienteonline.santander.cl/obd/#/inicio"
                                    class="btn btn-outline-light btn-small py-2 d-none d-md-inline-block" role="button">Hazte
                                    Cliente</a>
                                <a href="" class="btn btn-light btn-small py-2 d-none d-md-inline-block" role="button"
                                    @click.prevent="panelLogin = true;"><span class="str-user"></span> Ingresar</a>
                                <a href="" class="btn-icon d-none d-md-inline-block antialiased"
                                    @click.prevent="panelSearch = true; focus();"><span class="str-search"></span></a>
                                <a href="" class="btn-icon d-none d-md-inline-block click-toggle-menu"
                                    @click.prevent="panelMenu = true;"><span class="icon-menu-reducido"></span></a>
                                <b-link v-b-toggle="'mob-menu'" @click.prevent="panelLoginMobile = !panelLoginMobile"
                                    class="btn-mobile btn-text d-inline-block d-md-none"
                                    :aria-expanded="panelLoginMobile ? 'true' : 'false'">Ingresar</b-link>
                                <a href="" class="btn-mobile d-inline-block d-md-none click-toggle-menu-mobile"
                                    @click.prevent="panelMenuMobile = true;"><span class="icon-menu-reducido"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            
                <!-- MOBILE MENU -->
                <b-collapse id="mob-menu" v-model="panelLoginMobile" v-cloak>
                    <div class="container">
                        <div class="row" v-if="!mobLogin & !mobLoginClassic">
                            <div class="col-12">
                                <form ref="formulario" action="https://www.santander.cl/transa/cruce.asp" method="POST"
                                    onsubmit="return false;">
                                    <div v-if="mobile">
                                        <h5 class="mt-5 mb-4 text-center">Ingresa a tu versión móvil</h5>
                                        <input type="hidden" id="id_ctl12" name="ctl12" value="Ingresar">
                                    </div>
                                    <div v-else>
                                        <h5 class="mt-5 mb-4 text-center">Ingresa a tu versión clásica</h5>
                                        <input type="hidden" name="IDLOGIN" value="BancoSantander">
                                        <input type="hidden" name="tipo" value="0">
                                        <input type="hidden" name="usateclado" value="si">
                                        <input type="hidden" name="dondeentro" value="home">
                                        <input type="hidden" name="rslAlto" value="768">
                                        <input type="hidden" name="d_pin" value="">
                                        <input type="hidden" name="d_rut" value="">
                                        <input type="hidden" name="hrut" value="">
                                        <input type="hidden" name="pass" value="">
                                    </div>
            
                                    <div class="form-group mt-1 mb-4">
                                        <input ref="run" type="text" :name="mobile ? 'txtRUT' : 'rut' "
                                            :id="mobile ? 'id_txtRUT' : 'mobile_clasica_text1' " v-model="rut" v-rut="rut" required
                                            placeholder="16381222-K" autocomplete="new-password">
                                        <label :for="mobile ? 'id_txtRUT' : 'mobile_clasica_text1' "
                                            class="control-label">RUT</label>
                                        <i class="bar"></i>
                                    </div>
            
                                    <div class="form-group mt-1 mb-4">
                                        <input ref="pin" type="password" :name="mobile ? 'txtClave' : 'pin' "
                                            :id="mobile ? 'id_txtClave' : 'mobile_clasica_id_pass' " placeholder="" required
                                            autocomplete="new-password" pattern="\d+" maxlength="4">
                                        <label ref="pinLabel" :for="mobile ? 'id_txtClave' : 'mobile_clasica_id_pass' "
                                            class="control-label">Clave</label>
                                        <i class="bar"></i>
                                    </div>
            
            
                                    <div class="form-group mt-1 mb-4" style="padding:0 20px;">
                                        <button class="my-2 btn btn-primary btn-block" @click="submit">INGRESAR</button>
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <p style="color:#ec0000;cursor:pointer;" @click="changeVersion()">#{textVersion}</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div v-if="loginMobileIos">
                                    <a href="https://itunes.apple.com/pa/app/santander-chile/id604982236?mt=8" target="_blank">
                                        <img src="https://banco.santander.cl/uploads/000/003/713/6eff31b1-afdf-47d6-b90e-53a55d824701/R240x160/descarga_apple.jpg"
                                            alt="icon app-store" class="img-fluid"
                                            style="max-width: 150px;margin: 0 auto;display: block;width: 100%;margin-bottom: 30px;">
                                    </a>
                                </div>
                                <div v-else>
                                    <a href="https://play.google.com/store/apps/details?id=cl.santander.smartphone" target="_blank">
                                        <img src="https://banco.santander.cl/uploads/000/003/714/d27db9ab-33b7-425d-a105-6753d7224635/R240x160/descarga_android.jpg"
                                            alt="icon google-play" class="img-fluid"
                                            style="max-width: 150px;margin: 0 auto;display: block;width: 100%;margin-bottom: 30px;">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-collapse>
                <!-- ====== OVERLAY HEADER ======-->
                <div class="overlay overlay-header" @click="panelLoginMobile = !panelLoginMobile" v-if="panelLoginMobile"
                    data-toggle="collapse" :aria-expanded="panelLoginMobile ? 'true' : 'false'" aria-controls="mob-menu" v-cloak>
                </div>
            </header>
            
            <transition name="panel-top" v-cloak>
                <div class="search-panel" v-if="panelSearch" v-cloak>
                    <div class="container-fluid d-flex align-items-center search-panel-input">
                        <div class="container">
                            <div class="row">
                                <div class="col col-sm-1 d-flex align-items-center justify-content-center">
                                    <img src="https://banco.santander.cl/uploads/000/003/703/061db48f-ae18-4f70-8fbc-c2e033007d8a/original/icon_santander_new.svg"
                                        class="img-fluid" style="max-width: 40px;">
                                </div>
                                <div class="col col-sm-10">
                                    <input type="text" ref="buscarinput" v-model="search" @keyup="addSearch" id="buscar_input"
                                        class="px-5" placeholder="Busca en Santander.cl" />
                                </div>
                                <div class="col col-sm-1 d-flex align-items-center justify-content-center">
                                    <a href="" class="text-white p-0 m-0 h5 scale" @click.prevent="panelSearch = false;"><span
                                            class="icon-cerrar"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="search-panel-results">
                        <div class="row no-gutters">
                            <div class="col-12">
            
                                <div class="list-group">
            
                                    <!-- Resultados predefinidos -->
                                    <div v-if="search == 'cuenta corriente' || search == 'planes' || search == 'abrir'">
                                        <a href="{{ site.url }}/planes"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Planes
                                            Cuenta Corriente</a>
                                    </div>
            
                                    <a href="{{ site.url }}/credito-hipotecario"
                                        v-if="search == 'credito hipotecario' || search == 'comprar una casa'"
                                        class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Crédito
                                        Hipotecario</a>
            
                                    <!-- Resultados generales -->
                                    <a v-for="result in results" :href="result.url" target="_self"
                                        class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">#{result.title }</a>
            
                                    <!-- Sin resultados -->
                                    <div v-if="results.length == 0">
            
                                        <a href="{{ site.url }}/planes"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Planes
                                            Cuenta Corriente</a>
                                        <a href="{{ site.url }}/credito-de-consumo"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Crédito
                                            de Consumo</a>
                                        <a href="{{ site.url }}/tarjetas"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Tarjetas
                                            de Crédito</a>
                                        <a href="{{ site.url }}/credito-hipotecario"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Crédito
                                            Hipotecario</a>
                                        <a href="{{ site.url }}/seguros"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Seguros</a>
            
                                    </div>
            
                                </div>
            
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            
            <!-- ======== LOGIN PANEL ========= -->
            <transition name="panel-right" v-cloak>
                <div class="login-panel" v-if="panelLogin" v-cloak>
                    <div class="container-fluid top bg-red-gradient text-white d-flex align-items-center mb-1">
                        <div class="container">
                            <div class="row">
                                <div class="col text-left d-flex align-items-center">
                                    <img src="https://banco.santander.cl/uploads/000/003/703/061db48f-ae18-4f70-8fbc-c2e033007d8a/original/icon_santander_new.svg"
                                        class="img-fluid" style="max-width: 40px;">
                                </div>
                                <div class="col text-right">
                                    <a href="" class="text-white scale" @click.prevent="panelLogin = false;"><span
                                            class="icon-cerrar"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-8 mx-auto py-5">
            
                                <form action="https://www.santander.cl/transa/cruce.asp" method="post">
            
                                    <input type="hidden" name="IDLOGIN" value="BancoSantander">
                                    <input type="hidden" name="tipo" value="0">
                                    <input type="hidden" name="usateclado" value="si">
                                    <input type="hidden" name="dondeentro" value="home">
                                    <input type="hidden" name="rslAlto" value="768">
                                    <input type="hidden" name="d_pin" value="">
                                    <input type="hidden" name="d_rut" value="">
                                    <input type="hidden" name="hrut" value="">
                                    <input type="hidden" name="pass" value="">
            
                                    <div class="form-group mb-4">
            
                                        <input type="text" name="rut" id="text11" v-model="rut" v-rut="rut" required
                                            placeholder="16381211-k" autocomplete="false" onFocus="openKeyboard(this, 'rut');"
                                            tabindex="1">
                                        <i class="bar"></i>
                                        <label for="text11" class="control-label">RUT</label>
                                        <span class="invalid-feedback">
                                            <small class="form-text text-danger">Rut incorrecto</small>
                                        </span>
                                        <div id="keyboardRut" class="teclado-virtual"></div>
            
                                    </div>
            
                                    <div class="form-group mb-3">
            
                                        <input type="password" name="pin" id="exampleInputPassword11" placeholder="" required
                                            autocomplete="new-password" pattern="\d+" maxlength="4" title="Ingresa sólo números"
                                            onFocus="openKeyboard(this, 'clave');" tabindex="2">
                                        <i class="bar"></i>
                                        <label for="exampleInputPassword11" class="control-label">Clave</label>
                                        <span class="invalid-feedback">
                                            <small class="form-text text-danger">Clave incorrecta</small>
                                        </span>
                                        <div id="keyboardClave" class="teclado-virtual"></div>
            
                                    </div>
            
                                    <button class="my-2 btn btn-primary btn-block" type="submit">INGRESAR</button>
            
                                </form>
            
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="text-center p-0 m-0 d-flex justify-content-center align-items-center">
                                    <span class="icon-ayuda text-info icon-3x"></span>
                                    <a href="https://www.santander.cl/transa/productos/clavesantander/ingresorut.asp?o=hprut"
                                        class="text-dark text-small ml-2"> ¿No tienes tu clave?</a>
                                </p>
                            </div>
                            <div class="col">
                                <p class="text-center p-0 m-0 d-flex justify-content-center align-items-center">
                                    <span class="icon-candado text-danger icon-3x"></span>
                                    <a href="https://www.santander.cl/seguridad/index.asp" class="text-dark text-small ml-2"> Cómo
                                        proteger tus transacciones</a>
                                </p>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
            </transition>
            
            <!-- ======  MENU PANEL MOBILE  ======= -->
            <transition name="panel-right" v-cloak>
                <div class="menu-panel-mobile" v-if="panelMenuMobile" v-cloak>
                    <div class="outer-scroll">
                        <div class="inner-scroll">
                            <div class="row no-gutters bg-red-gradient align-items-center p-2">
                                <div class="col-10 text-left text-white">
                                    <img src="https://banco.santander.cl/uploads/000/003/703/061db48f-ae18-4f70-8fbc-c2e033007d8a/original/icon_santander_new.svg"
                                        class="img-fluid ml-2" style="max-width: 40px;">
                                </div>
                                <div class="col-2 text-center text-white">
                                    <p class="m-0 p-0 h5" @click="panelMenuMobile = false;"><span class="icon-cerrar"></span></p>
                                </div>
                                <div class="w-100"></div>
                                <div class="col-12 text-center">
                                    <a href="https://clienteonline.santander.cl/obd/#/inicio"
                                        class="my-3 px-3 btn btn-outline-white btn-block">Hazte cliente</a>
                                </div>
                            </div>
                            <div class="row no-gutters">
                                <div class="col-12">
                                    <template>
                                        <div role="tablist">
            
                                            <ul class="list-group">
                                                <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold text-medium"
                                                    v-b-toggle.accordion1 variant="info">
                                                    Personas
                                                    <span class="icon-flecha-abajo"></span>
                                                    <span class="icon-flecha-arriba"></span>
                                                </li>
                                            </ul>
                                            <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel"
                                                class="menu-accordion bg-gray-10">
                                                <a href="{{ site.url }}/planes"
                                                    class="d-flex justify-content-between align-items-center text-medium">Planes
                                                    Cuenta Corriente <span class="icon-flecha-derecha"></span></a>
                                                <a href="{{ site.url }}/detalles/cuenta-corriente-moneda-extranjera"
                                                    class="d-flex justify-content-between align-items-center text-medium">Cuentas
                                                    Corrientes <span class="icon-flecha-derecha"></span></a>
                                                <a href="{{ site.url }}/tarjetas"
                                                    class="d-flex justify-content-between align-items-center text-medium">Tarjetas
                                                    de Crédito <span class="icon-flecha-derecha"></span></a>
                                                <a href="{{ site.url }}/credito-de-consumo"
                                                    class="d-flex justify-content-between align-items-center text-medium">Crédito de
                                                    Consumo <span class="icon-flecha-derecha"></span></a>
                                                <a href="{{ site.url }}/credito-hipotecario"
                                                    class="d-flex justify-content-between align-items-center text-medium">Crédito
                                                    Hipotecario <span class="icon-flecha-derecha"></span></a>
                                                <a href="{{ site.url }}/seguros"
                                                    class="d-flex justify-content-between align-items-center text-medium">Seguros
                                                    <span class="icon-flecha-derecha"></span></a>
                                                <a href="{{ site.url }}/inversiones"
                                                    class="d-flex justify-content-between align-items-center text-medium">Ahorro e
                                                    Inversiones <span class="icon-flecha-derecha"></span></a>
                                                <a href="#"
                                                    class="d-flex justify-content-between align-items-center text-medium">Servicios
                                                    <span class="icon-flecha-derecha"></span></a>
                                                <a href="#"
                                                    class="d-flex justify-content-between align-items-center text-medium">Canales de
                                                    Atención <span class="icon-flecha-derecha"></span></a>
                                            </b-collapse>
            
                                            <ul class="list-group">
                                                <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold text-medium"
                                                    v-b-toggle.accordion2 variant="info">
                                                    Empresas
                                                    <span class="icon-flecha-abajo"></span>
                                                    <span class="icon-flecha-arriba"></span>
                                                </li>
                                            </ul>
                                            <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel"
                                                class="menu-accordion bg-gray-10">
                                                <a href="https://www.santander.cl/advance/index.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Portal
                                                    Pyme <span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/empresas/index.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Portal
                                                    Empresas <span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/GCB/"
                                                    class="d-flex justify-content-between align-items-center text-medium">Portal GCB
                                                    <span class="icon-flecha-derecha"></span></a>
                                            </b-collapse>
            
                                            <ul class="list-group">
                                                <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold text-medium"
                                                    v-b-toggle.accordion3 variant="info">
                                                    Private Banking
                                                    <span class="icon-flecha-abajo"></span>
                                                    <span class="icon-flecha-arriba"></span>
                                                </li>
                                            </ul>
                                            <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel"
                                                class="menu-accordion bg-gray-10">
                                                <a href="https://www.santanderpb.cl/PPB_PUBLICO/indicadores-economicos.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Indicadores
                                                    Económicos <span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santanderpb.cl/PPB_PUBLICO/nuestro-equipo.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Nuestro
                                                    Equipo <span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santanderpb.cl/PPB_PUBLICO/productos-y-servicios.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Productos
                                                    y Servicios <span class="icon-flecha-derecha"></span></a>
                                                <a href="mailto:ubpriva@santander.cl"
                                                    class="d-flex justify-content-between align-items-center text-medium">Contáctanos
                                                    <span class="icon-flecha-derecha"></span></a>
                                            </b-collapse>
            
                                            <ul class="list-group">
                                                <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold text-medium"
                                                    v-b-toggle.accordion4 variant="info">
                                                    Nuestro Banco
                                                    <span class="icon-flecha-abajo"></span>
                                                    <span class="icon-flecha-arriba"></span>
                                                </li>
                                            </ul>
                                            <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel"
                                                class="menu-accordion bg-gray-10">
                                                <a href="https://www.santander.cl/nuestro_banco/index.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Información
                                                    Corporativa <span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/nuestro_banco/gobiernos-corporativos-directorio.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Gobierno
                                                    Corporativo <span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/nuestro_banco/sostenibilidad/index.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Santander
                                                    y la Sostenibilidad <span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/nuestro_banco/santander-y-la-cultura/index.asp#area1"
                                                    class="d-flex justify-content-between align-items-center text-medium">Santander
                                                    y la Cultura <span class="icon-flecha-derecha"></span></a>
                                                <a href="http://saladecomunicacion.santander.cl/estudios/"
                                                    class="d-flex justify-content-between align-items-center text-medium">Estudios y
                                                    Políticas <span class="icon-flecha-derecha"></span></a>
                                                <a href="https://saladecomunicacion.santander.cl/"
                                                    class="d-flex justify-content-between align-items-center text-medium">Sala de
                                                    Prensa <span class="icon-flecha-derecha"></span></a>
                                                <a href="http://phx.corporate-ir.net/phoenix.zhtml?c=71614&p=irol-IRHome"
                                                    class="d-flex justify-content-between align-items-center text-medium">Investor
                                                    Relations <span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/accionistas/home.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Accionistas
                                                    <span class="icon-flecha-derecha"></span></a>
                                            </b-collapse>
            
                                            <ul class="list-group">
                                                <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold text-medium"
                                                    v-b-toggle.accordion5 variant="info">
                                                    Más información
                                                    <span class="icon-flecha-abajo"></span>
                                                    <span class="icon-flecha-arriba"></span>
                                                </li>
                                            </ul>
                                            <b-collapse id="accordion5" accordion="my-accordion" role="tabpanel"
                                                class="menu-accordion bg-gray-10">
                                                <a href="{{ site.url }}/tarifas-y-comisiones"
                                                    class="d-flex justify-content-between align-items-center text-medium">Tarifas y
                                                    Comisiones<span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/accionistas/home.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Accionistas<span
                                                        class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/hipotecario/post_venta_hipotecario.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Alzamiento
                                                    Hipotecas<span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/informacion/ley_fatca/index.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Normativa
                                                    FATCA<span class="icon-flecha-derecha"></span></a>
                                                <a href="https://www.santander.cl/transparencia/index.asp"
                                                    class="d-flex justify-content-between align-items-center text-medium">Transparencia<span
                                                        class="icon-flecha-derecha"></span></a>
                                            </b-collapse>
            
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            
            <!-- ======= MENU PANEL ======= -->
            <transition name="panel-top" v-cloak>
                <div class="menu-panel" v-if="panelMenu" v-cloak>
                    <div class="container-fluid">
                        <div class="container">
                            <div class="row menu-panel-top mt-5">
                                <div class="col">
                                    <img src="https://banco.santander.cl/uploads/000/003/706/b7ccb86b-661b-483a-b253-2a7c5463c4c8/original/icon_santander_red_new.svg"
                                        class="img-fluid" style="max-width: 45px;">
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col text-center">
                                            <a href="https://twitter.com/santanderchile" target="_blank"><img
                                                    src="https://banco.santander.cl/uploads/000/002/910/d3021e7f-18a9-4c9e-9a73-88a2963edd4c/original/twitter.svg"></a>
                                            <a href="http://www.facebook.com/santanderchile" target="_blank"><img
                                                    src="https://banco.santander.cl/uploads/000/002/826/5b3d8149-89a2-45c0-ae92-14a27cc93cf0/original/fb.svg"></a>
                                            <a href="https://www.youtube.com/user/SantanderChile/" target="_blank"> <img
                                                    src="https://banco.santander.cl/uploads/000/002/920/8dac3867-fbbc-4011-8388-bf5f60ffca85/original/ytube.svg"></a>
                                            <a href="https://www.instagram.com/santanderchile/" target="_blank"> <img
                                                    src="https://banco.santander.cl/uploads/000/002/852/bd50ebd2-e0fc-4026-afec-87efecb12369/original/instagram.svg"></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col"> <a href="" class="click-toggle-menu text-right"
                                        @click.prevent="panelMenu = false;"><span class="icon-cerrar"></span></a> </div>
                            </div>
                            <div class="row menu-panel-links mt-5">
                                <div class="col col-md-3">
                                    <h3 class="h6 font-weight-semibold text-uppercase text-danger">Personas</h3>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link" href="{{ site.url }}/planes">Planes Cuenta Corriente</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"
                                                href="{{ site.url }}/detalles/cuenta-corriente-moneda-extranjera">Cuentas
                                                Corrientes</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="{{ site.url }}/tarjetas">Tarjetas de Crédito</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="{{ site.url }}/credito-de-consumo">Crédito de Consumo</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="{{ site.url }}/credito-hipotecario">Crédito Hipotecario</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="{{ site.url }}/seguros">Seguros</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="{{ site.url }}/inversiones">Ahorro e Inversiones</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">Servicios</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">Canales de Atención</a>
                                        </li>
            
                                    </ul>
                                </div>
                                <div class="col col-md-3">
                                    <h3 class="h6 font-weight-semibold text-uppercase text-danger">Empresas</h3>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/advance/index.asp">Portal Pyme</a>
                                        </li>
            
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/empresas/index.asp">Portal
                                                Empresas</a>
                                        </li>
            
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/GCB/">Portal GCB</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col col-md-3">
                                    <h3 class="h6 font-weight-semibold text-uppercase text-danger">Private Banking</h3>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link active"
                                                href="https://www.santanderpb.cl/PPB_PUBLICO/indicadores-economicos.asp">Indicadores
                                                económicos</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"
                                                href="https://www.santanderpb.cl/PPB_PUBLICO/nuestro-equipo.asp">Nuestro equipo</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"
                                                href="https://www.santanderpb.cl/PPB_PUBLICO/productos-y-servicios.asp">Productos y
                                                Servicios</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="mailto:ubpriva@santander.cl">Contáctanos</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col col-md-3">
                                    <h3 class="h6 font-weight-semibold text-uppercase text-danger">Nuestro Banco</h3>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link active"
                                                href="https://www.santander.cl/nuestro_banco/index.asp">Información Corporativa</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"
                                                href="https://www.santander.cl/nuestro_banco/gobiernos-corporativos-directorio.asp">Gobierno
                                                Corporativo</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"
                                                href="https://www.santander.cl/nuestro_banco/sostenibilidad/index.asp">Santander y
                                                la Sostenibilidad</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"
                                                href="https://www.santander.cl/nuestro_banco/santander-y-la-cultura/index.asp#area1">Santander
                                                y la Cultura</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="http://saladecomunicacion.santander.cl/estudios/">Estudios y
                                                Políticas Públicas</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://saladecomunicacion.santander.cl/">Sala de Prensa</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"
                                                href="http://phx.corporate-ir.net/phoenix.zhtml?c=71614&p=irol-IRHome">Investor
                                                Relations</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/accionistas/home.asp">Accionistas</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-12">
                                    <h3 class="h6 font-weight-semibold text-uppercase text-danger">Sitios Relacionados</h3>
                                </div>
                            </div>
                            <div class="row py-3 my-1 bg-gray-10">
                                <div class="col text-center d-flex align-self-stretch align-items-center">
                                    <a class="w-100 d-block scale" href="https://www.officebanking.cl/default.htm" target="_blank">
                                        <img class="img-fluid mx-auto"
                                            src="https://banco.santander.cl/uploads/000/003/924/244020bd-9a57-46e7-86e9-2987afa0337c/original/logo-office-banking.png">
                                    </a>
                                </div>
                                <div class="col text-center d-flex align-self-stretch align-items-center">
                                    <a class="w-100 d-block scale"
                                        href="http://phx.corporate-ir.net/phoenix.zhtml?c=71614&p=irol-IRHome" target="_blank">
                                        <img class="img-fluid mx-auto"
                                            src="https://banco.santander.cl/uploads/000/003/877/085bc781-6320-4de5-a76d-e4e192e56b86/original/investor.png">
                                    </a>
                                </div>
                                <div class="col text-center d-flex align-self-stretch align-items-center">
                                    <a class="w-100 d-block scale" href="http://www.supercaja.cl/" target="_blank">
                                        <img class="img-fluid mx-auto"
                                            src="https://banco.santander.cl/uploads/000/003/879/d1089f01-0a3b-4a21-93c7-31b4a03a381e/original/supercaja.png">
                                    </a>
                                </div>
                                <div class="col text-center d-flex align-self-stretch align-items-center">
                                    <a class="w-100 d-block scale" href="https://www.abif.cl/defensoria-del-cliente/"
                                        target="_blank">
                                        <img class="img-fluid mx-auto"
                                            src="https://banco.santander.cl/uploads/000/003/880/58926476-205e-442f-a239-d06c2d029c70/original/banca.png">
                                    </a>
                                </div>
                                <div class="col text-center d-flex align-self-stretch align-items-center">
                                    <a class="w-100 d-block scale"
                                        href="http://www.clientebancario.cl/clientebancario/portada?indice=100.0" target="_blank">
                                        <img class="img-fluid mx-auto"
                                            src="https://banco.santander.cl/uploads/000/003/881/a703e37a-7cf8-4588-80da-574133d4c4ac/original/cliente.png">
                                    </a>
                                </div>
                                <div class="col text-center d-flex align-self-stretch align-items-center">
                                    <a class="w-100 d-block scale"
                                        href="https://sanodelucas.cl/personas/?utm_source=home_santander&utm_medium=sitio_web&utm_campaign=homesantanderpersonas"
                                        target="_blank">
                                        <img class="img-fluid mx-auto"
                                            src="https://banco.santander.cl/uploads/000/003/878/96a92a6c-48f1-49b5-9930-69760caa460d/original/sano.png">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            
            <!-- ======= SEARCH PANEL ======== -->
            <transition name="panel-top" v-cloak>
                <div class="search-panel" v-if="panelSearch" v-cloak>
                    <div class="container-fluid d-flex align-items-center search-panel-input">
                        <div class="container">
                            <div class="row">
                                <div class="col col-sm-1 d-flex align-items-center justify-content-center">
                                    <img src="https://banco.santander.cl/uploads/000/003/703/061db48f-ae18-4f70-8fbc-c2e033007d8a/original/icon_santander_new.svg"
                                        class="img-fluid" style="max-width: 40px;">
                                </div>
                                <div class="col col-sm-10">
                                    <input type="text" ref="buscarinput" v-model="search" @keyup="addSearch" id="buscar_input"
                                        class="px-5" placeholder="Busca en Santander.cl" />
                                </div>
                                <div class="col col-sm-1 d-flex align-items-center justify-content-center">
                                    <a href="" class="text-white p-0 m-0 h5 scale" @click.prevent="panelSearch = false;"><span
                                            class="icon-cerrar"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="search-panel-results">
                        <div class="row no-gutters">
                            <div class="col-12">
            
                                <div class="list-group">
            
                                    <!-- Resultados predefinidos -->
                                    <div v-if="search == 'cuenta corriente' || search == 'planes' || search == 'abrir'">
                                        <a href="{{ site.url }}/planes"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Planes
                                            Cuenta Corriente</a>
                                    </div>
                                    <a href="{{ site.url }}/credito-hipotecario"
                                        v-if="search == 'credito hipotecario' || search == 'comprar una casa'"
                                        class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Crédito
                                        Hipotecario</a>
            
                                    <!-- Resultados generales -->
                                    <a v-for="result in results" :href="result.url" target="_self"
                                        class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">#{result.title}</a>
            
                                    <!-- Sin resultados -->
                                    <div v-if="results.length == 0">
                                        <a href="{{ site.url }}/planes"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Planes
                                            Cuenta Corriente</a>
                                        <a href="{{ site.url }}/credito-de-consumo"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Crédito
                                            de Consumo</a>
                                        <a href="{{ site.url }}/tarjetas"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Tarjetas
                                            de Crédito</a>
                                        <a href="{{ site.url }}/credito-hipotecario"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Crédito
                                            Hipotecario</a>
                                        <a href="{{ site.url }}/seguros"
                                            class="border-bottom rounded-0 px-5 py-3 list-group-item list-group-item-action font-weight-bold">Seguros</a>
                                    </div>
            
                                </div>
            
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            
            <!-- ====== OVERLAYS ====== -->
            <div class="overlay" v-if="panelLogin || panelMenu || panelMenuMobile || panelSearch" @click="panelLogin = false; panelMenu = false; panelMenuMobile = false; panelSearch = false"></div>
             
</div>

<header id="classic_header" class="main-header personas" v-else>
        <div class="sup-header">
            <div class="container">
                <div class="row flex">
                    <div class="col-md-3 col-sm-6 col-6 text-center">
                        <div class="cont-ext">
                            <div class="cont-int">
                                <a class="logo-hold" href="https://www.santander.cl"><span
                                        class="santander-logo logo-seleccion icon-santander-logo"></span></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9 col-sm-3 col-sm-offset-3 col-6 text-right">
                        <div id="navToggle">
                            <div class="cont-ext">
                                <div class="cont-int">
                                    <div class="botonHamburguesa">
                                        <span class="linea"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav class="main-nav">
                            <ul>
                                <li class="menu-item active">
                                    <a href="https://www.santander.cl/index.asp">Personas</a>
                                </li>
                                <li class="menu-item">
                                    <a href="https://www.santander.cl/select/index.asp">Select</a>
                                </li>
                                <li class="menu-item">
                                    <a href="https://www.santander.cl/advance/index.asp">Pymes</a>
                                </li>
                                <li class="menu-item">
                                    <a href="https://www.santander.cl/empresas/index.asp">Empresas</a>
                                </li>
                                <li class="menu-item">
                                    <a href="https://www.santanderpb.cl">Private Banking</a>
                                </li>
                                <li class="menu-item">
                                    <a href="https://www.santander.cl/GCB/index.asp">GCB</a>
                                </li>
                                <li class="menu-item">
                                    <a href="https://www.santander.cl/universidades/index.asp">Universidades</a>
                                </li>
                                <li class="menu-item ayuda">
                                    <a href="#"><span class="icon-ayuda"></span></a>
                                    <ul class="submenu-ayuda">
                                        <li>
                                            <a href="https://ayuda.santander.cl/personas/">
                                                <span class="icon-left icon-servicio-cliente"></span>Servicio al
                                                cliente<span class="icon-flecha-derecha"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://saladecomunicacion.santander.cl/">
                                                <span class="icon-left icon-sala-prensa"></span>Sala de prensa<span
                                                    class="icon-flecha-derecha"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="item-beneficios">
                                    <a href="https://banco.santander.cl/beneficios?segmento=s-personas"><span
                                            class="icon-cupones"></span>Beneficios</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-header">
            <div class="container">
                <nav class="secondary-nav">
                    <ul>
                        <li><a href="https://www.santander.cl/cuenta-corriente.asp"><span
                                    class="icon-servicio-cliente"></span>Hazte Cliente</a></li>
                        <li><a href="https://www.santander.cl/nuestro_banco/index.asp">Nuestro Banco</a></li>
                        <li><a href="https://www.santander.cl/nuestros_productos/index.asp">Nuestros Productos</a></li>
                        <li><a href="https://www.santander.cl/simuladores/credito_consumo/simulador.asp">Crédito
                                Personal</a></li>
                        <li><a href="https://www.santander.cl/tarjetas/index.asp">Tarjetas <span
                                    class="icon-flecha-abajo"></span></a>
                            <ul class="sub-menu">
                                <li><a href="https://www.santander.cl/tarjetas/nuestras-tarjetas/index.asp">Nuestras
                                        tarjetas</a></li>
                                <li><a href="https://www.santander.cl/tarjetas/encuentra-tu-tarjeta/index.asp">Encuentra tu
                                        tarjeta</a></li>
                                <li><a href="https://www.santander.cl/tarjetas/preguntas-frecuentes/index.asp">Preguntas
                                        frecuentes</a></li>
                                <li><a href="https://www.santander.cl/tarjetas/campanas/index.asp">Promociones</a></li>
                                <li><a href="https://www.santander.cl/tarjetas/servicios/index.asp">Servicios</a></li>
                                <li><a href="https://superpuntos.santander.cl/ilionX45/Custom/SAN.CHL/Customers/StoreIndex.aspx"
                                        target="_blank">Canjear SUPERPUNTOS</a></li>
                            </ul>
                        </li>
                        <li><a href="https://www.santander.cl/seguros/index.asp">Seguros</a></li>
                        <li><a href="https://www.santander.cl/inversiones/index.asp">Inversiones</a></li>
                        <li><a href="https://www.santander.cl/hipotecario/index.asp">Mundo Hipotecario</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="responsive-header">
            <div class="header_cont">
                <form class="rut_clave" method="POST" action="https://www.santander.cl/transa/cruce.asp">
                    <input type="hidden" name="IDLOGIN" value="BancoSantander">
                    <input type="hidden" name="tipo">
                    <input type="hidden" name="rut">
                    <input type="hidden" name="pin">
                    <input type="hidden" name="usateclado" value="no">
                    <input type="hidden" name="dondeentro" value="home">
                    <input type="hidden" name="rslAlto" value="0">
                    <input type="hidden" name="rslAncho" value="0">
    
                    <div class="form_content">
                        <div class="cajaInput">
                            <div class="cont">
                                <input class="input rut" name="d_rut" minlength="8" maxlength="12" type="text"
                                    autocomplete="off">
                                <span class="barra"></span>
                                <label for="d_rut" class="label">RUT</label>
                            </div>
                            <span class="error_desc">Ingresa tu RUT</span>
                        </div>
                        <div class="cajaInput">
                            <div class="cont">
                                <input class="input pin only_numbers" name="d_pin" minlength="4" maxlength="4"
                                    type="password" autocomplete="off">
                                <span class="barra"></span>
                                <label for="d_pin" class="label">Clave</label>
                            </div>
                            <span class="error_desc">Ingresa tu clave</span>
                        </div>
                        <div class="cajaInput recuperar text-right">
                            <a class="btn-link" href="/transa/productos/clavesantander/ingresorut.asp">¿No tienes tu
                                clave?</a>
                        </div>
                    </div>
                </form>
    
                <div class="btn_holder">
                    <a href="#" id="ingresar">Ingresar a mi banco</a>
                </div>
    
                <nav class="responsive-nav">
                    <ul>
                        <li>
                            <a href="#" class="menu-dropdown">Personas<span class="icon-flecha-abajo"></span></a>
                            <ul>
                                <li>
                                    <a href="https://www.santander.cl/index.asp">Inicio</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/nuestro_banco/index.asp">Nuestro Banco</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/nuestros_productos/index.asp">Nuestros Productos</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/cuenta-corriente.asp">Hazte Cliente</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/simuladores/personas/credito_personal/simulador.asp">Crédito
                                        Personal</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/tarjetas/index.asp">Tarjetas</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/seguros/index.asp">Seguros</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/inversiones/index.asp">Inversiones</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/hipotecario/index.asp">Mundo Hipotecario</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="menu-dropdown">Select <span class="icon-flecha-abajo"></span></a>
                            <ul>
                                <li>
                                    <a href="https://www.santander.cl/select/index.asp">Inicio</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/cuenta-corriente.asp">Hazte Cliente</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/select/atencion.asp">Atención</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/select/productos.asp">Productos</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/select/productos.asp">Inversiones</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/select/productos.asp">Financiamiento</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/select/productos.asp">Seguros</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/select/global-value/index.asp">Global Value</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="menu-dropdown">Pymes <span class="icon-flecha-abajo"></span></a>
                            <ul>
                                <li>
                                    <a href="https://www.santander.cl/advance/index.asp">Inicio</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/advance/financiamiento.asp">Financiamiento</a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.santander.cl/advance/tarjetas/tarjeta-advance-debito.asp">Tarjetas</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/advance/seguros/seguros.asp">Seguros</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/advance/inversiones-y-derivados.asp">Inversiones</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/advance/productos-comex.asp">Comercio Exterior</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/advance/hazte-cliente/index.asp">Hazte Cliente</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="menu-dropdown">Empresas <span class="icon-flecha-abajo"></span></a>
                            <ul>
                                <li>
                                    <a href="https://www.santander.cl/empresas/index.asp">Inicio</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/empresas/nuestros_productos/index.asp">Nuestros
                                        Productos</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/empresas/nuestros_productos/financiamiento.asp">Solicita
                                        tu Crédito</a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.santander.cl/tarjetas/empresas/nuestras-tarjetas/index.asp">Tarjetas</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/empresas/garantias_estatales/index.asp">Garantías
                                        Estatales</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/empresas/pagos_en_linea/index.asp">Pagos por
                                        Internet</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/empresas/clientes-internacionales/index.asp">Clientes
                                        Internacionales</a>
                                </li>
                                <li>
                                    <a href="https://www.santander.cl/empresas/hazte_cliente/plan-empresas.asp">Hazte
                                        Cliente</a>
                                </li>
                            </ul>
                        </li>
                        <li><a href="http://www.santanderpb.cl">Private Banking</a></li>
                        <li><a href="https://www.santander.cl/GCB/index.asp" target="_blank">GCB</a></li>
                        <li><a href="https://www.santander.cl/universidades/index.asp">Universidades</a></li>
                    </ul>
                </nav>
                <nav class="footerMobile">
                    <ul>
                        <li>
                            <a class="salaPrensa" href="https://saladecomunicacion.santander.cl/" target="_blank">
                                <span class="icon-audio"></span> Sala de Prensa</a>
                        </li>
                        <li>
                            <a class="voxMobile" href="tel:6003203000">
                                <span class="icon-telefono"></span> Llámanos al 600 320 3000
                            </a>
                        </li>
                        <li>
                            <a class="servicioCliente" href="//ayuda.santander.cl/personas/">
                                <span class="icon-empleados-santander"></span> Servicio al Cliente
                            </a>
                        </li>
                        <li>
                            <a class="chatOnline" href="//ayuda.santander.cl/personas/?chat=on">
                                <span class="icon-app"></span>Chat Online
                            </a>
                        </li>
                        <li>
                            <a class="preguntasFrecuentes"
                                href="https://www.santander.cl/servicio_al_cliente/preguntas-frecuentes-santander.asp">
                                <span class="icon-favoritos"></span>Preguntas Frecuentes
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</div>`
}