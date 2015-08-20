var path = require('path');

var TaskController = function (app) {
    this.app = app;
    register(app);
}

function register(app) {

    app.get("/task",function(req,res,next){
        res.send([]);
    });

    app.post("/task/create",function(req,res,next){
        createTask(req.query, function(task) {
            res.send(task);
        }, function(error) {
            res.status(500).send(error);
        });
    });

}

function listTasks() {
    return [];
}

function createTask(data, onSuccess, onError) {
    var response = { "errors" : []}

    var validationResponse = validateData(data, response);
    if (Object.keys(validationResponse.ValidationError).length > 0) {
        response.errors.push(validationResponse);
        onError(response);
        return;
    }

    var task = saveTask(data);
    onSuccess(task);
}

function validateData(data) {
    var response = { ValidationError : {} };
    var nameResponse = validateName(data.name);
    if (nameResponse != undefined) {
        response.ValidationError.name = nameResponse;
    }

    var dueDateResponse = validateDate(data.dueDate);
    if (dueDateResponse != undefined) {
        response.ValidationError.dueDate = dueDateResponse;
    }
    
    var priorityResponse = validatePriority(data.priority);
    if (priorityResponse != undefined) {
        response.ValidationError.priority = priorityResponse;
    }

    return response;
}

function validateName(name) {
    if (!name) {
        return [{"data": null,"message": "Validation error:  null is not of type string", "rule": "string"}];
    }
    return undefined;
}

function validateDate(dueDate) {
    try {
        var dateData = dueDate.split('-');
        var now = new Date(dateData[0], dateData[1], dateData[2]);
        return undefined;
    } catch (e) {
        return [{"data": null,"message": "Validation error: " + dueDate + " is not of type date","rule": "date"}];
    }
}

function validatePriority(priority) {
    if (!priority) {
        return [{"data": null,"message": "Validation error:  null is not of type number", "rule": "number"}];
    }
    try {
        var p = new Number(priority);
        if (p < 1 || p > 5) {
            return [{"data": null,"message": "Validation error: Invalid value (1 - 5)", "rule" : "number"}];
        }
        return undefined;        
    } catch (e) {
        return [{"data": null,"message": "Validation error: " + priority + " is not type number", "rule" : "number"}];
    }
}

function saveTask(data) {
    var task = {
        name : data.name,
        dueDate : data.dueDate,
        priority : data.priority,
        createdAt : new Date(),
        id : global.tasks.length
    };

    global.tasks.push(task);
    return task;
}
module.exports = TaskController;