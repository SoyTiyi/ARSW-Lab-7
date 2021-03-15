const app = (() => {

    var listBluePrints = []
    var currentAuthor = "";
    var currentName = "";
    var mockdata = apimock.getMockData();

    mockdata.map(author => {
        author.map(book => {
            const object = {};
            object.name = book.name;
            objecto.numPoints = book.points.length;
            listBluePrints.push(object);
        })
    })

    var authorName = () => {
        $('#input').val();
    }

    const drawCanvas = (name, author) => {
        canvasEvent.clearPoints();
        currentAuthor = author;
        currentName = name;
        console.log("Hola", name, author);
        apiclient.getBlueprintsByNameAndAuthor(name, author, (error, data) => {
            if (error != null) {
                alert("Verificar datos");
                return;
            }
            const points = data.points;
            var canvas = $('#canvas')[0];
            canvas.width = canvas.width;
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');
                ctx.moveTo(points[0].x, points[0].y);
                console.log(points[0].x, points[0].y);
                for (var i = 1; i < points.length; i++) {
                    console.log(points[i].x, points[i].y);
                    ctx.lineTo(points[i].x, points[i].y);
                }
                ctx.stroke();
            }
        })
    }

    return {
        setAuthorName: name => {
            $('#input').val(name);
        },
        setListBluePrintsByAuthor: authorName => {
            $('#table tbody').empty();
            $('#authorPoints').text("");
            apiclient.getBlueprintsByAuthor(authorName, (error, resp) => {
                if (error != null) {
                    alert("Verificar datos");
                    return;
                }
                const newResult = [];
                resp.map(book => {
                    const object = {};
                    object.name = book.name;
                    object.author = book.author;
                    object.numPoints = book.points.length;
                    newResult.push(object);
                })

                newResult.map(obj => {
                    $('#table > tbody:last')
                        .append($(`
                        <tr>
                            <td>${obj.name}</td>
                            <td>${obj.numPoints}</td>
                            <td><button class="btn btn-primary">Draw</button></td>
                        </tr>`).on("click", "button", () => drawCanvas(obj.name, obj.author)));
                })

                const totalPoints = Object.values(newResult).reduce((point, { numPoints }) => point + numPoints, 0)

                $('#authorPoints').text(totalPoints);
            })
        },
        getCurrent: () => {
            return {
                author: currentAuthor,
                name: currentName
            };
        }
    };
})();