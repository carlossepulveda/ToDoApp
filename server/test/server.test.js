var expect  = require("chai").expect;
var request = require("request");

describe("ToDoList API", function() {

  describe("List tasks", function() {

    var url = "http://localhost:3001/task";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

  });

  describe("Create a task", function() {

    it("Returns status 500", function(done) {
      var url = "http://localhost:3001/task/create?name=carlos";
      request.post({ method: 'POST', uri: url}, function(error, response, body) {
        expect(response.statusCode).to.equal(500);
        var body = JSON.parse(body);
        expect(body.errors.length).to.equal(1);
        var validationError = body.errors[0].ValidationError;
        expect(Object.keys(validationError).length).to.equal(2);
        done();
      });
    });

    it("Returns status 200", function(done) {
      var url = "http://localhost:3001/task/create?name=carlos&dueDate=2015-03-12&priority=3";
      request.post({ method: 'POST', uri: url}, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        var body = JSON.parse(body);
        expect(body.name).to.equal('carlos');
        expect(body.dueDate).to.equal('2015-03-12');
        expect(body.priority).to.equal('3');
        expect(body.id).to.equal(0);
        done();
      });
    });

  });

});