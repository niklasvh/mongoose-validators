mongoose-validators
===================

[![Build Status](https://travis-ci.org/niklasvh/mongoose-validators.png)](https://travis-ci.org/niklasvh/mongoose-validators)

[validator.js](https://github.com/chriso/validator.js) for [Mongoose](http://mongoosejs.com/) schemas.

## Installation

``` npm install mongoose-validators```

## Usage

    var mongoose = require('mongoose'),
        validators = require('mongoose-validators');

    // single validator
    var Schema = new mongoose.Schema({
        email: {type: String, validate: validators.isEmail()}
    });

    // multiple validators
    var Schema = new mongoose.Schema({
        username: {type: String, validate: [validators.isAlphanumeric(), validators.isLength(2, 60)]}
    });

## Options

Each validator type can be passed an optional `options` object as the first argument. The following common options can be defined:

 - **skipNull** - Skip validation if the value is null or undefined, default: false
 - **skipEmpty** - Skip validation if the value is and empty string (""), null or undefined, default: false
 - **message** - Override the default error message returned when validation fails.

## Validators

Same as with [validator.js](https://github.com/chriso/validator.js):

 - **equals([options, ] comparison)** - check if the string matches the comparison.
 - **contains([options, ] seed)** - check if the string contains the seed.
 - **matches([options, ] pattern [, modifiers])** - check if string matches the pattern. Either `matches('foo', /foo/i)` or `matches('foo', 'foo', 'i')`.
 - **isEmail([options])** - check if the string is an email.
 - **isURL([options])** - check if the string is an URL. `options` is an object which defaults to `{ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, allow_underscores: false }`.
 - **isIP([options, ][version])** - check if the string is an IP (version 4 or 6).
 - **isAlpha(([options])** - check if the string contains only letters (a-zA-Z).
 - **isNumeric([options])** - check if the string contains only numbers.
 - **isAlphanumeric([options])** - check if the string contains only letters and numbers.
 - **isBase64([options])** - check if a string is base64 encoded.
 - **isHexadecimal([options])** - check if the string is a hexadecimal number.
 - **isHexColor([options])** - check if the string is a hexadecimal color.
 - **isLowercase([options])** - check if the string is lowercase.
 - **isUppercase([options])** - check if the string is uppercase.
 - **isInt([options])** - check if the string is an integer.
 - **isFloat([options])** - check if the string is a float.
 - **isDivisibleBy([options, ] number)** - check if the string is a number that's divisible by another.
 - **isNull([options])** - check if the string is null.
 - **isLength([options,] min [, max])** - check if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 - **isByteLength([options,] min [, max])** - check if the string's length (in bytes) falls in a range.
 - **isUUID([options][, version])** - check if the string is a UUID (version 3, 4 or 5).
 - **isDate([options])** - check if the string is a date.
 - **isAfter([options][, date])** - check if the string is a date that's after the specified date (defaults to now).
 - **isBefore([options][, date])** - check if the string is a date that's before the specified date.
 - **isIn([options, ]values)** - check if the string is in a array of allowed values.
 - **isCreditCard([options])** - check if the string is a credit card.
 - **isISBN([options][, version])** - check if the string is an ISBN (version 10 or 13).
 - **isJSON([options])** - check if the string is valid JSON (note: uses JSON.parse).
 - **isMultibyte([options])** - check if the string contains one or more multibyte chars.
 - **isAscii([options])** - check if the string contains ASCII chars only.
 - **isFullWidth([options])** - check if the string contains any full-width chars.
 - **isHalfWidth([options])** - check if the string contains any half-width chars.
 - **isVariableWidth([options])** - check if the string contains a mixture of full and half-width chars.
 - **isSurrogatePair([options])** - check if the string contains any surrogate pairs chars.

## Testing

Run mocha tests using:

``` npm test````
