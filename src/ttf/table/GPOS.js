/**
 * @file GPOS 表
 * @author mengke01(kekee000@gmail.com)
 *
 * reference: https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6fpgm.html
 */



var table = require('./table');
var parse = require('./gpos/parse.js')

var GPOS = table.create(
    'GPOS',
    [],
    {

        read: parse,
        
        /*
        write: function (writer, ttf) {
            if (ttf.GPOS) {
                writer.writeBytes(ttf.GPOS, ttf.GPOS.length);
            }
        },

        size: function (ttf) {
            return ttf.GPOS ? ttf.GPOS.length : 0;
        }
        */
    }
);

module.exports = GPOS;
    
