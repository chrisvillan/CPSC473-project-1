(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log("Setting submit handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  FormHandler.prototype.addInputHandler = function(fn) {
    console.log("Setting input handler for form");
    var password;
    var passwordAgain;
    this.$formElement.on("input", "[name=password]", function(event) {
      password = event.target.value;
    });
    this.$formElement.on("input", "[name=passwordAgain]", function(event) {
      passwordAgain = event.target.value;
      var message = "";
      if (fn(password, passwordAgain)) {
        event.target.setCustomValidity("");
      } else {
        message = "Passwords must match";
        event.target.setCustomValidity(message);
      }
    });
  };

  FormHandler.prototype.addAnswerHandler = function(fn) {
    console.log("Setting answer handler for form");
    this.$formElement.on("input", "[name=answer]", function(event) {
      var answer = event.target.value;
      if (fn(answer)) {
        event.target.setCustomValidity("");
      } else {
        var message = "Answer must be a, b, or c";
        event.target.setCustomValidity(message);
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
