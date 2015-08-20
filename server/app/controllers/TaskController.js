var path = require('path');

var TaskController = function (app) {
    this.app = app;
    register(app);
}

function register(app) {

    app.get("/task",function(req,res,next){
        res.send([]);
    });

}

module.exports = TaskController;