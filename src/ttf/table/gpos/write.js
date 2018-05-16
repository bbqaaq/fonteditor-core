const { sizeofLangSysRecord, sizeofScriptTable, sizeofScriptRecord, sizeofScriptList } = require('./sizeofScriptList')

/*  start of script list  */
function writeScriptRecord(writer, ttf, scriptRecord) {
    let tgpos = ttf.GPOS

    // scriptRecord.scriptTable = readScriptTable(reader, ttf, scriptListOffset + scriptOffset)
}

function writeScriptList(writer, ttf) {
    let tgpos = ttf.GPOS

    let scriptCount = tgpos.scripts.length
    writer.writeUint16(tgpos.scripts.length)

    //  write header
    let offset = sizeofScriptList(tgpos, true)
    console.log('offset = ', offset)
    tgpos.scripts.forEach((scriptRecord)=>{
        writer.writeString(scriptRecord.tag, 4)
        writer.writeUint16(offset)

        console.log('sizeofScriptRecord(scriptRecord, true) = ', sizeofScriptRecord(scriptRecord, true))
        console.log('sizeofScriptTable(scriptRecord.script.defaultLangSys, true) = ', sizeofLangSysRecord(scriptRecord.script.defaultLangSys, true))

        // writeScriptRecord(writer, ttf, scriptRecord)
    })
}
/*  end of script list  */

function write(writer, ttf) {
    if (ttf.GPOS) {
        let tgpos = ttf.GPOS
        // console.log('tgpos = ', JSON.stringify(tgpos, null, 2))
        writer.writeFixed(tgpos.version)    //  major and minor version

        writer.writeUint16((tgpos.version === 1.1) ? 12 : 10)               //  offset to ScriptList table
        writer.writeUint16(0)               //  offset to FeatureList table
        writer.writeUint16(0)               //  offset to LookupList table

        writeScriptList(writer, ttf)
    }
}

module.exports = write
    