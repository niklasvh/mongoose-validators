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
    })
});
