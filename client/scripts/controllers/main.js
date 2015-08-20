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
      }

      Service.getTasks({}, getTaskSuccess, onError);
  }]);
