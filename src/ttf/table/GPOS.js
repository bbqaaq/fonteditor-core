/**
 * @file GPOS 表
 * @author mengke01(kekee000@gmail.com)
 *
 * reference: https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6fpgm.html
 */



var table = require('./table');
var parse = require('./gpos/parse.js')
var write = require('./gpos/write.js')
var sizeof = require('./gpos/sizeof.js')

var GPOS = table.create(
    'GPOS',
    [],
    {
        read: parse,
        write: write,
        size: sizeof
    }
);

module.exports = GPOS;
    
