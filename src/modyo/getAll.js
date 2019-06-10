const getAll = function(segmento){
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
}