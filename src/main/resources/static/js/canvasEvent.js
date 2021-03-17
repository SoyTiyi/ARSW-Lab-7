var canvasEvent = (function () {
  var canvas = $('#canvas')[0];
  var ctx = canvas.getContext('2d');

  var points = [];

  const drawPoints = () => {
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.width;
    points.map(pts => {
      if (pts === points[0]) {
        console.log(pts.x, pts.y, 'primer punto');
        ctx.moveTo(pts.x, pts.y);
      }
      else {
        console.log(pts.x, pts.y);
        ctx.lineTo(pts.x, pts.y);
      }
    }
    );
    ctx.stroke();
  }

  return {

    load: () => {
      if (window.PointerEvent) {
        canvas.addEventListener("pointerdown", (event) => {
          const x = event.pageX;
          const y = event.pageY;
          points.push({ x: x, y: y });
          drawPoints();
          alert('pointerdown at ' + event.pageX + ',' + event.pageY);
          console.log(points);

        });
      }
      else {
        canvas.addEventListener("mousedown", (event) => {
          alert('mousedown at ' + event.clientX + ',' + event.clientY);
        }
        );
      }
    },
    clearPoints: () => {
      points = [];
    },
    saveUpdateDraw: () => {
      const currentSelect = app.getCurrent();
      bp = {
        author: currentSelect.author,
        name: currentSelect.name,
        points: points
      };
      console.log(bp);
      console.log(JSON.stringify(bp));
      apiclient.putBlueprintAuthor(currentSelect.name, currentSelect.author, JSON.stringify(bp), (error, resp) => {
        if (error != null) {
          alert("Verificar datos");
          return;
        }
        else {
          alert("Guardado/Actualizado");
          return;
        }
      });
    },
    DeleteBluePrint: () => {
      const author = $('#input').val();
      const currentSelect = app.getCurrent();
      if (currentSelect !== null) {
        bp = {
          author: currentSelect.author,
          name: currentSelect.name
        };
        console.log(bp.author, bp.name);
        apiclient.deleteBlueprint(JSON.stringify(bp), (error, resp) => {
          if (error !== null) {
            alert("Verificar datos");
            return;
          } else {
            app.setListBluePrintsByAuthor(author);
            var canvas = $('#canvas')[0];
            var ctx = canvas.getContext('2d');
            canvas.width = canvas.width;
            alert("Eliminado");
            return;
          }
        });
      }
    },
    CreateBluePrint: () => {
      const author = $('#input').val();
      const name = window.prompt("Blueprints name:");
      console.log(points)
      bp = {
        author: author,
        name: name,
        points: points
      };
      apiclient.createBluePrint(JSON.stringify(bp), (error, resp) => {
        if (error !== null) {
          alert("Verificar datos");
          return;
        }
        else {
          app.setListBluePrintsByAuthor(author);
          alert("Creado");
          return;
        }
      });
    }
  };
})();