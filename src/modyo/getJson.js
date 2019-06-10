const getJson = function(url,option){
    return new Promise((resolve,reject) => {
        fetch(url,option)
        .then(e => e.json())
        .then(r => resolve(r))
        .catch(f => reject(f));
    });
}