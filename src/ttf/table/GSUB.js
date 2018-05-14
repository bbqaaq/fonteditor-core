/**
 * @file GSUB 表
 * @author mengke01(kekee000@gmail.com)
 *
 * reference: https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6fpgm.html
 */



var table = require('./table');

var GSUB = table.create(
    'GSUB',
    [],
    {

        read: function (reader, ttf) {
            var length = ttf.tables.GSUB.length;
            return reader.readBytes(this.offset, length);
        },

        write: function (writer, ttf) {
            if (ttf.GSUB) {
                writer.writeBytes(ttf.GSUB, ttf.GSUB.length);
            }
        },

        size: function (ttf) {
            return ttf.GSUB ? ttf.GSUB.length : 0;
        }
    }
);

module.exports = GSUB;
    
