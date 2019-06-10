const getCustomFields = function(url){
    return new Promise((resolve,reject) => {
        fetch(url+'.json')
        .then(e => e.json())
        .then(r => resolve(r))
        .catch(f => reject(f));
    });
}