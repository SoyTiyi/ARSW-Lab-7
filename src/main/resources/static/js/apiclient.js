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
        },
        deleteBlueprint: (dataSend, callback) => {
            const promise = $.ajax({
                url: "/blueprints",
                type: 'DELETE',
                data: dataSend,
                contentType: "application/json"
            }).then(response => {
                callback(null, response);
                console.log(response);
            }).catch(error => {
                callback(JSON.stringify(error),null);
                console.log(`Error: ${error}`);
            })

        },
        createBluePrint: (dataSend, callback) => {
            const promise = $.post({
                url: "/blueprints",
                data: dataSend,
                contentType: "application/json"
            }).then(response => {
                console.log(response);
                callback(null,response);
            }).catch(error => {
                callback(JSON.stringify(error),null);
                console.log(`Error: ${error}`);
            });
        }
    }
})();