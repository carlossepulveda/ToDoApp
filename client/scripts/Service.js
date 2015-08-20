angular.module('toDoTaskApp').factory('Service', function($resource) {
    var url = '/task';
    var defaultParams = {};

    var actions = {
        getTasks: { method: 'GET', isArray: true },
        createTask: { method : 'POST', url : url + '/create?name=:name&priority=:priority&dueDate=:dueDate'}
    };

    return $resource(url, defaultParams, actions);
});