// testing
const expect = require("chai").expect;
const sinon = require('sinon');
const subject = require("../../src/util/console-out");

describe("console-out.js", function() {

    it("test logging", function() {
        subject.banner("alpha");
        subject.section("bravo");
        subject.log("charlie");
        subject.nvp("- ", "name", "value");
    });

});