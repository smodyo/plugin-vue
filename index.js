const $modyoSantander = {
    install(Vue, options) {

        Array.prototype.sync = function(callback,callbacktermino){
            var index = 0,fin = this.length,self = this;
            function recursiva(){
                if(index == fin){return callbacktermino();}
                if(index < fin){callback(self[index],index);index++;recursiva();}
            }
            recursiva();
        }


        Vue.mixin({
            created: function () {
                var style = this.$options.styles;
                if (style && style != undefined) {
                    let css = document.createElement('style');
                    css.innerHTML = style.split('\n').join('');
                    document.head.appendChild(css);
                }
            }
        });

        Vue.prototype.$modyo = {
            getJson: function(url,option){
                return new Promise((resolve,reject) => {
                    fetch(url,option)
                    .then(e => e.json())
                    .then(r => resolve(r))
                    .catch(f => reject(f));
                })
            },

            getTag: function(tag,per_page,segmento){
                if(tag == null || undefined){tag = '';}
                if(per_page == null || undefined){per_page = 500;}
                if(segmento == null || undefined){segmento = window.location.pathname;}
                var contenido = options.domain + segmento + '/contenidos.json';
                var promo = options.domain + segmento + '/promociones.json';
                var query = '?tags='+tag+'&per_page='+per_page;
                var all = [];
                return new Promise((resolve,reject) => {
                    fetch(contenido+query)
                    .then(e => e.json())
                    .then(r => {
                        r.contenidos.sync(
                            e => {e['classification'] = 'contenido'; all.push(e);}, 
                            () => {
                                fetch(promo+query)
                                .then(q => q.json())
                                .then(w => {
                                    w.promociones.sync( 
                                        t => {t['classification'] = 'promocion'; all.push(t);},
                                        () => resolve(all)
                                    )   
                                }).catch(o => reject(all))
                            }
                        );
                    }).catch(oo => reject(all))
                });
            },

            getPosts: function(segmento){
                if(segmento == null || undefined){segmento = window.location.pathname;}
                var base = options.domain + segmento + '/detalles.json?per_page=500';
                return new Promise((resolve,reject) => {
                    fetch(base)
                    .then(e => e.json())
                    .then(r => resolve(r.detalles))
                    .catch(f => reject(f));
                });
            },

            getPromociones: function(segmento){
                if(segmento == null || undefined){segmento = window.location.pathname;}
                var base = options.domain + segmento + '/promociones.json?per_page=500';
                return new Promise((resolve,reject) => {
                    fetch(base)
                    .then(e => e.json())
                    .then(r => resolve(r.promociones))
                    .catch(f => reject(f));
                });
            },

            getQuery: function(str,segmento,per_page){
                if(str == null || undefined){str = '';}
                if(per_page == null || undefined){per_page = 500;}
                if(segmento == null || undefined){segmento = window.location.pathname;}
                var query = '?query='+str+'&per_page='+per_page;
                var contenido = options.domain + segmento + '/contenidos.json';
                var promo = options.domain + segmento + '/promociones.json';
                var all = [];
                return new Promise((resolve,reject) => {
                    fetch(contenido+query)
                    .then(e => e.json())
                    .then(r => {
                        r.contenidos.sync(
                            e => {e['classification'] = 'contenido'; all.push(e);}, 
                            () => {
                                fetch(promo+query)
                                .then(q => q.json())
                                .then(w => {
                                    w.promociones.sync( 
                                        t => {t['classification'] = 'promocion'; all.push(t);},
                                        () => resolve(all)
                                    )   
                                }).catch(o => reject(all))
                            }
                        );
                    }).catch(oo => reject(all))
                });
            },

            getCustomFields: function(url){
                return new Promise((resolve,reject) => {
                    fetch(url+'.json')
                    .then(e => e.json())
                    .then(r => resolve(r))
                    .catch(f => reject(f));
                });
            },

            getCategory: function(cat,per_page,segmento){
                if(cat == null || undefined){cat = '';}
                if(per_page == null || undefined){per_page = 500;}
                if(segmento == null || undefined){segmento = window.location.pathname;}
                var contenido = options.domain + segmento + '/contenidos.json';
                var promo = options.domain + segmento + '/promociones.json';
                var query = '?category='+cat+'&per_page='+per_page;
                var all = [];
                return new Promise((resolve,reject) => {
                    fetch(contenido+query)
                    .then(e => e.json())
                    .then(r => {
                        r.contenidos.sync(
                            e => {e['classification'] = 'contenido'; all.push(e);}, 
                            () => {
                                fetch(promo+query)
                                .then(q => q.json())
                                .then(w => {
                                    w.promociones.sync( 
                                        t => {t['classification'] = 'promocion'; all.push(t);},
                                        () => resolve(all)
                                    )   
                                }).catch(o => reject(all))
                            }
                        );
                    }).catch(oo => reject(all))
                });
            },

            getAll: function(segmento){
                if(segmento == null || undefined){segmento = window.location.pathname;}
                var contenido = options.domain + segmento + '/contenidos.json';
                var promo = options.domain + segmento + '/promociones.json';
                var all = [];
                return new Promise((resolve,reject) => {
                    fetch(contenido)
                    .then(e => e.json())
                    .then(r => {
                        r.contenidos.sync(
                            e => {e['classification'] = 'contenido'; all.push(e);}, 
                            () => {
                                fetch(promo)
                                .then(q => q.json())
                                .then(w => {
                                    w.promociones.sync( 
                                        t => {t['classification'] = 'promocion'; all.push(t);},
                                        () => resolve(all)
                                    )   
                                }).catch(o => reject(all))
                            }
                        );
                    }).catch(oo => reject(all))
                });
            },

            numRandom: function(min,max){
                return Math.floor(Math.random() * (max - min)) + min;
            }

        }
    }
};