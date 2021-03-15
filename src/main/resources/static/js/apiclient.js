var apiclient = (function () {

    return{
        getBlueprintsByAuthor: (author, callback) => {
            const promise = $.get({
                url: `/blueprints/${author}`,
                contentType: "application/json",
            });
            promise.then( data => {
                console.log(data);
                callback(null, data);
            }).catch(error => {
                callback(error, null);
            });
        },
        getBlueprintsByNameAndAuthor: (name, author, callback) => {
            const promise = $.get({
                url: `/blueprints/${author}/${name}`,
                contentType: "application/json",
            });
            promise.then(data => {
                callback(null,data);
            }).catch(error => {
                callback(error,null);
            })
        },
        putBlueprintAuthor: (name, author, dataSend, callback) => {
            const promise = $.ajax({
                url: `/blueprints/${author}/${name}`,
                type: 'PUT',
                data: dataSend,
                contentType: "application/json"
            }).then(data => {
                console.log(data);
                callback(null,data);
            }).catch(error => {
                callback(error,null);
            });
        }
    }
})();