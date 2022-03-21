var assert = require('chai').assert;
var app = require('./index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


describe("ETSYY", function () {
    describe('Login Test', function () {

        it('Incorrect Password',() => {
            agent.post("/login")
                .send({ email: "tbruch@etsy.com", password: "password1234" })
                .then(function (res) {
                    expect(res.text).to.equal("Email is not registered with us");
                })
                .catch(error => {
                    console.log(error);
                });
        });


        it('Successful Login',() => {
            agent.post("/login")
                .send({ email: "tbruch@etsy.com", password: "password" })
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('User Registeration Test', () => {

        it('User already exists', () => {
            agent.post("/signup")
                .send({ name: "Harry", email: "hpot@hp.com", password: "password" })
                .then(function (res) {
                    // expect(res.text).to.equal("Validation error");
                    expect(res.status).to.eql(400);
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Successful User registeration', () => {
            agent.post("/signup")
                .send({ name: "Ron", email: "ron@hp.com", password: "password" })
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Create Shop', () => {

        it('Shop already exists', () => {
            agent.post("/createshop")
                .send({ shopname: "TeslaShop", email: "emusk@tesla.com" })
                .then(function (res) {
                    expect(res.status).to.equal(404);
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Successful Shop creation', () => {
            agent.post("/createshop")
                .send({ shopname: "ShopHolic", email: "hpot@hp.com" })
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    })

    describe('Check shop availability', () => {

        it('Shop already exists', () => {
            agent.get("/shopNameAvailable")
                .send({ shopname: "TeslaShop" })
                .then(function (res) {
                    expect(res.status).to.equal(404);
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Shop is available', () => {
            agent.get("/shopNameAvailable")
                .send({ shopname: "Shoppie" })
                .then(function (res) {
                    expect(res.status).to.equal(404);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    })

    describe('Add product', () => {

        it('Product already exists', () => {
            agent.post("/addproduct")
                .send({ name: "Tory Bruch", price:"495" , "instock":"200" , shopname: "Tony" })
                .then(function (res) {
                    expect(res.text).to.equal("Validation error");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Added a new product successfully', () => {
            agent.post("/addproduct")
                .send({ name: "Tesla", price:"49500" , "instock":"200" , shopname: "TeslaShop" })
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    })
})