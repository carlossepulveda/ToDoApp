var expect  = require("chai").expect;
var request = require("request");

describe("ToDoList API", function() {

  describe("List tasks", function() {

    var url = "http://localhost:3001/task";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        console.log(response.body.length == 0);
        done();
      });
    });

  });

});