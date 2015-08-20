'use strict';

/**
 * @ngdoc function
 * @name webSiteTestYoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webSiteTestYoApp
 */
angular.module('toDoTaskApp')
  .controller('MainCtrl',['$scope', 'Service', function ($scope, Service) {

      $scope.filter = '+name'
      var filters = {
        'name' : true,
        'dueDate' : true,
        'priority' : true
      }

      $scope.pendingTasks = [];
      $scope.dueTasks = [];
      function getTaskSuccess(data) {
        for (var i in data) {
          addTask(data[i]);
        }
      }

      function onError(data) {
        console.log(data);
      }

      function addTask(task) {
        try {
            var dateData = task.dueDate.split('-');
            var date = new Date(dateData[0], dateData[1], dateData[2]);
            if (date.getTime() < new Date().getTime()) {
              $scope.dueTasks.push(task);
            } else {
              $scope.pendingTasks.push(task);
            }
        } catch (e) {}
        
      }

      $scope.saveTask = function(task) {
        Service.createTask(task, {}, onCreatedTask, onError);
      }

      function onCreatedTask(task) {
        addTask(task);
        $scope.newTask = {};
      }

      $scope.setFilter = function(filter) {
        if (filters[filter]) {
          $scope.filter = '-' + filter;
        } else {
          $scope.filter = '+' + filter;
        }
        filters[filter] = !filters[filter];
      }

      $scope.deleteDueTask = function(idx) {
        var task = $scope.dueTasks[idx];
        Service.deleteTask({id : task.id}, {}, function() {
          $scope.dueTasks.splice(idx, 1);
        }, onError);
      }

      $scope.deletePendingTask = function(idx) {
        var task = $scope.pendingTasks[idx];
        Service.deleteTask({id : task.id}, {}, function() {
          $scope.pendingTasks.splice(idx, 1);
        }, onError);
      }

      Service.getTasks({}, getTaskSuccess, onError);
  }]);
