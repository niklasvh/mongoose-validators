var mongoose    = require('mongoose'),
    validators  = require('../lib/validators'),
    assert      = require('assert'),
    Schema      = mongoose.Schema;

describe('Validators', function() {
    var items, model;
    before(function() {
        items = new Schema({
            text: {type: String}
        });
        model = mongoose.model('items', items);
    });

    after(function() {
        mongoose.connection.db.dropDatabase();
    });

    afterEach(function() {
        items.paths.text.validators = [];
    });

    mongoose.connect("mongodb://127.0.0.1/validators");

    describe('.equals', function() {
        it('Should match equal string', function(done) {
            items.path('text').validate(validators.equals("cuicca"));
            new model({text: "cuicca"}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should fail on different strings', function(done) {
            items.path('text').validate(validators.equals("cuicca"));
            new model({text: "cu1cca"}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });

        it('Should fail on empty string', function(done) {
            items.path('text').validate(validators.equals("cuicca"));
            new model({text: ""}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });

        it('Should fail on null string', function(done) {
            items.path('text').validate(validators.equals("cuicca"));
            new model({text: null}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });

        it('Should pass on undefined string with skipNull option', function(done) {
            items.path('text').validate(validators.equals({skipNull: true}, "cuicca"));
            new model({}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should pass on null string with skipNull option', function(done) {
            items.path('text').validate(validators.equals({skipNull: true}, "cuicca"));
            new model({text: null}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should pass on null string with skipEmpty option', function(done) {
            items.path('text').validate(validators.equals({skipNull: true}, "cuicca"));
            new model({text: null}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should pass on empty string with skipEmpty option', function(done) {
            items.path('text').validate(validators.equals({skipEmpty: true}, "cuicca"));
            new model({text: ""}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });
    });

    describe('.contains', function() {
        it('Should pass string containing seed', function (done) {
            items.path('text').validate(validators.contains("world"));
            new model({text: "hello world!"}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should fail string not containing seed', function (done) {
            items.path('text').validate(validators.contains("cuicca"));
            new model({text: "hello world!"}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });
    });

    describe('.matches', function() {
        it('Should pass string matching pattern', function (done) {
            items.path('text').validate(validators.matches(/ORLD/i));
            new model({text: "hello world!"}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should pass string matching pattern with modifier', function (done) {
            items.path('text').validate(validators.matches("ORLD", "i"));
            new model({text: "hello world!"}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should fail string not matching pattern', function (done) {
            items.path('text').validate(validators.matches(/CUICCA/));
            new model({text: "digicuicca"}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });
    });

    describe('.isEmail', function() {
        it('Should pass string with valid email', function (done) {
            items.path('text').validate(validators.isEmail());
            new model({text: "hello@example.com"}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should fail string with invalid email', function (done) {
            items.path('text').validate(validators.isEmail());
            new model({text: "hello@example"}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });
    });

    describe('.isURL', function() {
        it('Should pass string with valid URL', function (done) {
            items.path('text').validate(validators.isURL());
            new model({text: "example.com"}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should fail string with invalid URL and options', function (done) {
            items.path('text').validate(validators.isURL({require_protocol: true}));
            new model({text: "example.com"}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });

        it('Should fail string with invalid URL', function (done) {
            items.path('text').validate(validators.isURL());
            new model({text: "invalid/"}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });
    });


    describe('.isIP', function() {
        it('Should pass string with valid ip (4)', function (done) {
            items.path('text').validate(validators.isIP());
            new model({text: "127.0.0.1"}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should pass string with valid ip (6)', function (done) {
            items.path('text').validate(validators.isIP());
            new model({text: "2001:db8:0000:1:1:1:1:1"}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should fail string with invalid IP and option', function (done) {
            items.path('text').validate(validators.isIP(4));
            new model({text: "2001:db8:0000:1:1:1:1:1"}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });

        it('Should fail string with invalid IP', function (done) {
            items.path('text').validate(validators.isIP());
            new model({text: "cuicca"}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });
    });

    describe('.isAlpha', function() {
        it('Should pass valid string', function (done) {
            items.path('text').validate(validators.isAlpha());
            new model({text: "cuicca"}).save(function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('Should fail invalid string', function (done) {
            items.path('text').validate(validators.isAlpha());
            new model({text: "cu1cca"}).save(function (err) {
                assert.equal(err.message, "Validation failed");
                done();
            });
        });
    });

    describe('Custom error message', function() {
        it('Should return custom error message', function (done) {
            items.path('text').validate(validators.isNumeric({message: "custom error message"}));
            new model({text: "cu1cca"}).save(function (err) {
                assert.equal(err.errors.text.message, "custom error message");
                done();
            });
        });

        it('Should return default error message', function (done) {
            items.path('text').validate(validators.isAlphanumeric({message: null}));
            new model({text: "cu_cca"}).save(function (err) {
                assert.equal(err.errors.text.message, 'Validator failed for path `text` with value `cu_cca`');
                done();
            });
        });
    });
});
