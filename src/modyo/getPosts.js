const getPosts = function(segmento){
    if(segmento == null || undefined){segmento = window.location.pathname;}
    var base = options.domain + segmento + '/detalles.json?per_page=500';
    return new Promise((resolve,reject) => {
        fetch(base)
        .then(e => e.json())
        .then(r => resolve(r.detalles))
        .catch(f => reject(f));
    });
}