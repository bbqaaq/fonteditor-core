/**
 * @file 解析cmap表
 * @author mengke01(kekee000@gmail.com)
 */




/*  start of script list  */
function readLangSysRecord(reader, ttf, langSysRecordOffset) {
    let langSysRecord = {}
    let offset = langSysRecordOffset

    langSysRecord.reserved = reader.readUint16(offset)
    langSysRecord.reqFeatureIndex = reader.readUint16(offset + 2)
    let featureIndexCount = reader.readUint16(offset + 4)
    langSysRecord.featureIndexes = []
    let featureIndexOffset = offset + 6
    for (var i = 0; i < featureIndexCount; i++) {
        langSysRecord.featureIndexes.push(reader.readUint16(featureIndexOffset))

        featureIndexOffset += 2
    }

    return langSysRecord
}

function readScriptTable(reader, ttf, scriptTableOffset) {
    let scriptTable = {}
    let offset = scriptTableOffset

    //  TODO: NULL HERE?
    let defaultLangSysOffset = reader.readUint16(offset)
    if (defaultLangSysOffset !== 0) {
        scriptTable.defaultLangSys = readLangSysRecord(reader, ttf, scriptTableOffset + defaultLangSysOffset)
    }

    let langSysCount = reader.readUint16(offset + 2)

    let langSysRecords = []
    offset = scriptTableOffset + 4
    for (var i = 0; i < langSysCount; i++) {
        let langSysRecord = {}
        let langSysTag = reader.readString(offset, 4)
        let langSysOffset = reader.readUint16(offset + 4)
        langSysRecordOffset = scriptTableOffset + langSysOffset

        langSys = readLangSysRecord(reader, ttf, langSysRecordOffset)
        langSysRecord.tag = langSysTag
        langSysRecord.langSys = langSys
        langSysRecords.push(langSysRecord)
        offset += 6
    }
    scriptTable.langSysRecords = langSysRecords
    
    return scriptTable
}

function readScriptRecord(reader, ttf, scriptListOffset, scriptRecordOffset) {
    let scriptRecord = {}
    let offset = scriptRecordOffset

    scriptRecord.tag = reader.readString(offset, 4)
    let scriptOffset = reader.readUint16(offset + 4)

    scriptRecord.script = readScriptTable(reader, ttf, scriptListOffset + scriptOffset)

    return scriptRecord
}

function readScriptList(reader, ttf, scriptListOffset) {
    let scriptList = []
    let offset = scriptListOffset

    let scriptCount = reader.readUint16(offset)
    offset = 2

    for (var i = 0; i < scriptCount; i++) {
        let scriptRecord = readScriptRecord(reader, ttf, scriptListOffset, scriptListOffset + offset)

        scriptList.push(scriptRecord)
        offset += 6
    }

    return scriptList
}
/*  end of script list  */

function parse(reader, ttf) {
    // let gposBytes = reader.readBytes(this.offset, 48)
    // console.log('gposBytes = ', gposBytes)

    var tgpos = {}
    var offset = this.offset

    reader.seek(offset)
    tgpos.version = reader.readFixed()
    let scriptListOffset = offset + reader.readUint16()
    let featureListOffset = offset +  reader.readUint16()
    let lookupListOffset = offset + reader.readUint16()



    let scriptList = readScriptList(reader, ttf, scriptListOffset)
    tgpos.scripts = scriptList

    return tgpos;
}

module.exports = parse;
    
