const footer = {
    props: {
        modyo:{type:Boolean}
    },
    methods: {
        mediaQuery: function (media = "min-width", pixels = 768) {
            var query;
            if ((media === "max-width" || "min-width" || "max-height" || "min-height")) {
                query = `${media}:${pixels.toString()}px`;
            }
            return window.matchMedia(`(${query})`).matches ? true : false;
        },

        oldfooter: function () {
            var windowWidth;
            function defineFooter() {
                windowWidth = $(window).width();
                if (windowWidth > 768) {
                    $('.main-footer .footer-nav').show();
                } else {
                    $('.main-footer .footer-nav').hide();
                }
            }

            $(document).ready(function () {
                defineFooter();
                $('.main-footer .footer-title').click(function (e) {
                    e.preventDefault();
                    if (windowWidth <= 768) {
                        $('.main-footer .footer-nav').slideUp();
                        if ($(this).next('.footer-nav').is(':visible')) {
                            $(this).next('.footer-nav').slideUp();
                        } else {
                            $(this).next('.footer-nav').slideDown();
                        }
                    }
                });
            });
            $(window).resize(defineFooter);
        }
    },
    mounted: function () {
        if (!this.modyo) {this.oldfooter();}
    },

    template:`<div v-cloak>
        <div v-if="modyo" id="new-footer">
            <div class="container-fluid footer-rrss pt-3 pt-md-5 mt-1 mt-sm-6">
                <hr class="d-none d-sm-block" style="position: absolute; bottom: 0; left: 0; right: 0; width: 100%;">
                <div class="row">
                    <div class="col-12 col-md-4"></div>
                    <div class="col-12 col-md-4 text-center rrss-icons">
                        <a href="https://twitter.com/santanderchile" target="_blank"><img src="https://banco.santander.cl/uploads/000/002/910/d3021e7f-18a9-4c9e-9a73-88a2963edd4c/original/twitter.svg"></a>
                                            <a href="http://www.facebook.com/santanderchile" target="_blank"><img src="https://banco.santander.cl/uploads/000/002/826/5b3d8149-89a2-45c0-ae92-14a27cc93cf0/original/fb.svg"></a>
                                            <a href="https://www.youtube.com/user/SantanderChile/" target="_blank"> <img src="https://banco.santander.cl/uploads/000/002/920/8dac3867-fbbc-4011-8388-bf5f60ffca85/original/ytube.svg"></a>
                                            <a href="https://www.instagram.com/santanderchile/" target="_blank"> <img src="https://banco.santander.cl/uploads/000/002/852/bd50ebd2-e0fc-4026-afec-87efecb12369/original/instagram.svg"></a>
                    </div>
                    <div class="col-12 col-md-4"></div>
                </div>
            </div>
        
            <footer>
                <div class="container d-none d-sm-block">
                    
                    <!-- LINKS -->
                    <div class="row footer-links">
        
                        <div class="col col-sm-12 col-md-4">
                            <div class="row">
                                <div class="col col-sm-3">
                                    <img class="img-fluid" src="https://banco.santander.cl/uploads/000/002/880/f8bd2072-4046-4e62-9f38-be7bfdebfd0c/original/phone-circle.png">
                                </div>
                                <div class="col-sm-9">
                                    <p class="big-text-light mb-3">Llámanos</p>
                                    <p class="big-text-bold">(600) 320 3000</p>
                                </div>
                            </div>
                        </div>		
        
                        <div class="col col-md-8">
                            <div class="row">
                                <div class="col col-sm-4 col-md-4">
                                    <h3>Portales</h3>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/nuestro_banco/index.asp">Nuestro Banco</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="{{ site.url }}">Personas</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/advance/index.asp">Pyme</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/empresas/index.asp">Empresas</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/GCB/">GCB</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santanderpb.cl/PPB_PUBLICO/index.asp">Private Banking</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/beneficios">Beneficios Santander</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="http://empleos.santander.cl/">Empleos Santander</a>
                                        </li>
                                    </ul>
                                </div>
        
                                <div class="col col-sm-4 col-md-4">
                                    <h3>Encuéntranos</h3>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://ayuda.santander.cl/personas/">Servicio al cliente</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/sucursales_santander/sucursales/index.asp">Sucursales</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/sucursales_santander/cajeros/index.asp">Cajeros</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/empresas/centros_empresa/index.asp">Centros empresa</a>
                                        </li>
                                    </ul>
                                </div>
        
                                <div class="col col-sm-4 col-md-4">
                                    <h3>Infórmate</h3>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="https://saladecomunicacion.santander.cl/">Sala de Prensa</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link active" href="https://banco.santander.cl/tarifas-y-comisiones">Tarifas y Comisiones</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/accionistas/estados-financieros.asp?o=redir">Estados Financieros</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/informacion/publicaciones/index.asp">Publicaciones</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="{{ site.url }}/concursos">Resultados de Concursos</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="http://saladecomunicacion.santander.cl/estudios/">Estudios</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/promociones/personas/metas_cumplimiento/index.asp">Metas y Cumplimientos</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="https://www.santander.cl/servicios/personas/solicitud_seguros/index.asp">Información general de Seguros</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>		
                    
                    <!-- BUTTONS -->
                    <div class="row footer-buttons d-none d-lg-block">
                        <div class="col">
                            <ul class="nav nav-pills nav-justified">
                                <li class="nav-item">
                                    <a class="nav-link p-1" href="https://www.santander.cl/accionistas/home.asp"><span class="d-block mx-auto str-users"></span><p class="text-small d-block mx-auto text-center mt-2">Accionistas</p></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link p-1" href="http://phx.corporate-ir.net/phoenix.zhtml?c=71614&p=irol-IRHome"><span class="d-block mx-auto str-bar-graph"></span><p class="text-small d-block mx-auto text-center mt-2">Investor relations</p></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link p-1" href="https://www.santander.cl/hipotecario/post_venta_hipotecario.asp"><span class="d-block mx-auto str-home"></span><p class="text-small d-block mx-auto text-center mt-2">Alzamiento hipotecas</p></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link p-1" href="{{ site.url }}/corredores-de-bolsa/"><span class="d-block mx-auto str-money-bag"></span><p class="text-small d-block mx-auto text-center mt-2">Corredores de bolsa</p></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link p-1" href="{{ site.url }}/normativas/"><span class="d-block mx-auto str-files"></span><p class="text-small d-block mx-auto text-center mt-2">Normativas</p></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link p-1" href="https://www.santander.cl/reconocimiento/"><span class="d-block mx-auto str-prize"></span><p class="text-small d-block mx-auto text-center mt-2">Reconocimientos</p></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link p-1" href="{{site.url}}/transparencia"><span class="d-block mx-auto str-handshake"></span><p class="text-small d-block mx-auto text-center mt-2">Transparencia</p></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link p-1" href="{{site.url}}/condiciones-de-uso"><span class="d-block mx-auto str-lock"></span><p class="text-small d-block text-center mx-auto w-100 mt-2 pl-1">Políticas de seguridad de uso del portal</p></a>
                                </li>
                            </ul>			
                        </div>
                    </div>
                    
                </div>
                
                <div class="container-fluid footer-bottom">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <p class="text-muted">Infórmese sobre la garantía estatal en su banco o en <a href="http://www.sbif.cl" class="link-text text-danger" target="_self">www.sbif.cl</a> / Infórmese sobre las entidades autorizadas para emitir Tarjetas de Pago en el país, quienes se encuentran inscritas en los Registros de Emisores de Tarjetas que lleva la SBIF, en <a href="http://www.sbif.cl" class="link-text text-danger" target="_self">www.sbif.cl</a> / <a href="{{site.url}}/condiciones-de-uso" class="link-text text-danger" target="_self">Políticas de seguridad de uso del portal</a> / ©2018 Banco Santander-Chile. Todos los derechos reservados. <a href="https://www.santander.cl/condiciones_contratacion.asp" class="link-text text-danger" target="_self"> Condiciones Objetivas de Contratación de Productos y Servicios Financieros</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        
        <footer id="classic_footer" class="main-footer" v-else>
            <div class="container">
                <div class="row flex">
                    <div class="col-md-6 col-sm-6 col-xs-4 logo_holder">
                        <div class="cont-ext">
                            <div class="cont-int">
                                <span class="icon-santander-logo"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-8">
                        <ul class="social">
                            <li>Síguenos en:</li>
                            <li class="twitter">
                                <a href="https://twitter.com/santanderchile">
                                    <span class="icon-twitter"></span>
                                </a>
                            </li>
                            <li class="facebook">
                                <a href="http://www.facebook.com/santanderchile">
                                    <span class="icon-facebook"></span>
                                </a>
                            </li>
                            <li class="youtube">
                                <a href="http://www.youtube.com/santanderchile">
                                    <span class="icon-youtube"></span>
                                </a>
                            </li>
                            <li class="instagram">
                                <a href="http://instagram.com/santanderchile">
                                    <span class="icon-instagram"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
    
                <div class="footer-row">
                    <div class="col-md-20">
                        <h6 class="footer-title">Portales Especializados</h6>
                        <nav class="footer-nav">
                            <ul>
                                <li>
                                    <a title="Nuestro Banco" href="https://www.santander.cl/nuestro_banco/index.asp">Nuestro Banco</a>
                                </li>
                                <li>
                                    <a title="Personas" href="https://www.santander.cl/index.asp">Personas</a>
                                </li>
                                <li>
                                    <a title="Select" href="https://www.santander.cl/select/index.asp">Select</a>
                                </li>
                                <li>
                                    <a title="Empresas" href="https://www.santander.cl/empresas/index.asp">Empresas</a>
                                </li>
                                <li>
                                    <a title="Pymes" href="https://www.santander.cl/advance/index.asp">Pymes</a>
                                </li>
                                <li>
                                    <a title="Universidades" href="https://www.santander.cl/universidades/index.asp">Universidades</a>
                                </li>
                                <li>
                                    <a title="Asset Management" href="https://www.santander.cl/fondos/index.asp">Asset Management</a>
                                </li>
                                <li>
                                    <a title="Accionistas" href="https://www.santander.cl/accionistas/home.asp">Accionistas</a>
                                </li>
                                <li>
                                    <a title="Corredores de Bolsa" href="https://www.santander.cl/corredores-de-bolsa/index.asp">Corredores de Bolsa</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="col-md-20">
                        <h6 class="footer-title">Nuestros Productos</h6>
                        <nav class="footer-nav">
                            <ul>
                                <li>
                                    <a title="Tarjetas de Crédito" href="https://www.santander.cl/tarjetas/nuestras-tarjetas/index.asp">Tarjetas de Crédito</a>
                                </li>
                                <li>
                                    <a title="Cuenta Corriente" href="https://www.santander.cl/cuenta-corriente.asp">Cuenta Corriente</a>
                                </li>
                                <li>
                                    <a title="Seguros" href="https://www.santander.cl/seguros/index.asp">Seguros</a>
                                </li>
                                <li>
                                    <a title="Crédito de Consumo" href="https://www.santander.cl/simuladores/personas/credito_personal/simulador.asp">Crédito de Consumo</a>
                                </li>
                                <li>
                                    <a title="Simulador Crédito Hipotecario" href="https://www.santander.cl/simuladores/simulador_hipotecario/simulador.asp">Simulador Crédito Hipotecario</a>
                                </li>
                                <li>
                                    <a title="Inversiones" href="https://www.santander.cl/inversiones/index.asp">Inversiones</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="col-md-20">
                        <h6 class="footer-title">Encuéntranos</h6>
                        <nav class="footer-nav">
                            <ul>
                                <li>
                                    <a title="Sucursales" href="https://www.santander.cl/sucursales/index.asp">Sucursales</a>
                                </li>
                                <li>
                                    <a title="Centros Empresas" href="https://www.santander.cl/empresas/centros_empresa/index.asp">Centros Empresas</a>
                                </li>
                                <li>
                                    <a title="Cajeros Automáticos" href="https://www.santander.cl/cajeros/index.asp">Cajeros Automáticos</a>
                                </li>
                                <li>
                                    <a title="Chat Online" href="//ayuda.santander.cl/personas/?chat=on">Chat Online</a>
                                </li>
                                <li>
                                    <a title="VOX" href="https://www.santander.cl/atencion-telefonica/6003203000.asp">(600) 320 3000</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="col-md-20">
                        <h6 class="footer-title">Infórmate</h6>
                        <nav class="footer-nav">
                            <ul>
                                <li>
                                    <a title="Tarifas y Comisiones" href="https://www.santander.cl/tarifas_comisiones/index.asp">Tarifas y Comisiones</a>
                                </li>
                                <li>
                                    <a title="Estados Financieros" href="https://www.santander.cl/accionistas/estados_financieros.asp">Estados Financieros</a>
                                </li>
                                <li>
                                    <a title="Publicaciones" href="https://www.santander.cl/informacion/publicaciones/index.asp">Publicaciones</a>
                                </li>
                                <li>
                                    <a title="Información Corporativa" href="https://www.santander.cl/nuestro_banco/index.asp">Información Corporativa</a>
                                </li>
                                <li>
                                    <a title="Resultados" href="https://www.santander.cl/promociones/personas/resultado_concursos/index.asp">Resultados de Concursos</a>
                                </li>
                                <li>
                                    <a title="Estudios y políticas públicas" target="_blank" href="http://saladecomunicacion.santander.cl/estudios-politicas-publicas/">Estudios</a>
                                </li>
                                <li>
                                    <a title="Metas y cumplimientos" href="https://www.santander.cl/promociones/personas/metas_cumplimiento/index.asp">Metas y Cumplimientos</a>
                                </li>
                                <li>
                                    <a title="Información general de Seguros" href="https://www.santander.cl/servicios/personas/solicitud_seguros/index.asp">Información general de Seguros</a>
                                </li>
                                <li>
                                    <a title="Bienvenida Clientes Nuevos" href="https://www.santander.cl/bienvenida/index.asp">Bienvenida Clientes Nuevos</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="col-md-20">
                        <h6 class="footer-title">Sitios Relacionados</h6>
                        <nav class="footer-nav">
                            <ul>
                                <li>
                                    <a title="www.officebanking.cl" href="https://www.officebanking.cl/">Office Banking</a>
                                </li>
                                <li>
                                    <a title="www.banefe.cl" href="http://www.banefe.cl/">Banefe</a>
                                </li>
                                <li>
                                    <a title="www.supercaja.cl" href="http://www.supercaja.cl">Super caja</a>
                                </li>
                                <li>
                                    <a title="Investor relations" target="_self" href="http://phx.corporate-ir.net/phoenix.zhtml?c=71614&amp;p=irol-IRHome">Investor relations</a>
                                </li>
                                <li>
                                    <a title="Defensoría del Cliente" href="http://www.abif.cl/defensoria-del-cliente/">Defensoría del Cliente</a>
                                </li>
                                <li>
                                    <a title="empleos.santander.cl" href="http://empleos.santander.cl">Trabaja con nosotros</a>
                                </li>
                                <li>
                                    <a title="http://www.santanderpb.cl" href="https://www.santanderpb.cl/PPB_PUBLICO/index.asp">Private Banking</a>
                                </li>
                                <li>
                                    <a title="www.sanodelucas.cl" href="http://sanodelucas.cl/personas/?utm_source=home_santander&amp;utm_medium=sitio_web&amp;utm_campaign=homesantanderpersonas">Sanodelucas Personas</a>
                                </li>
                                <li>
                                    <a title="www.sanodelucas.cl/pyme" href="http://sanodelucas.cl/pyme/?utm_source=home_santander&amp;utm_medium=sitio_web&amp;utm_campaign=homesantanderpyme">Sanodelucas Pyme</a>
                                </li>
                                <li>
                                    <a title="www.clientebancario.cl" href="http://www.clientebancario.cl">Consulta Acreencias</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
    
                <div class="legal">
                    <p>Infórmese sobre la garantía estatal en su banco o en www.sbif.cl / Infórmese sobre las entidades autorizadas para emitir Tarjetas de Pago en el país, quienes se encuentran inscritas en los Registros de Emisores de Tarjetas que lleva la SBIF, en www.sbif.cl / Condiciones de Uso / ©2013 Banco Santander-Chile. Todos los derechos reservados. Condiciones Objetivas de Contratación de Productos y Servicios Financieros</p>
                </div>
            </div>
        </footer>
    </div>`
}