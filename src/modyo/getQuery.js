const getQuery = function(str,segmento,per_page){
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
}