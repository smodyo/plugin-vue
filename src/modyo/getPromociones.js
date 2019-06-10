const getPromociones = function(segmento){
    if(segmento == null || undefined){segmento = window.location.pathname;}
    var base = options.domain + segmento + '/promociones.json?per_page=500';
    return new Promise((resolve,reject) => {
        fetch(base)
        .then(e => e.json())
        .then(r => resolve(r.promociones))
        .catch(f => reject(f));
    });
}