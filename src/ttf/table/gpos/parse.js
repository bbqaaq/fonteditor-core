/**
 * @file 解析cmap表
 * @author mengke01(kekee000@gmail.com)
 */




// var readWindowsAllCodes = require('../../util/readWindowsAllCodes');

function readLangSysRecord(reader, ttf, langSysRecordOffset) {
    let langSysRecord = {}
    let offset = langSysRecordOffset

    langSysRecord.lookupOrder = reader.readUint16(offset)
    langSysRecord.requiredFeatureIndex = reader.readUint16(offset + 2)
    let featureIndexCount = reader.readUint16(offset + 4)
    langSysRecord.featureIndices = []
    let featureIndexOffset = offset + 6
    for (var i = 0; i < featureIndexCount; i++) {
        langSysRecord.featureIndices.push(reader.readUint16(featureIndexOffset))

        featureIndexOffset += 2
    }

    return langSysRecord
}

function readScriptTable(reader, ttf, scriptTableOffset) {
    let scriptTable = {}
    let offset = scriptTableOffset

    //  TODO: NULL HERE?
    let defaultLangSysOffset = reader.readUint16(offset)
    let langSysCount = reader.readUint16(offset + 2)

    scriptTable.defaultLangSys = readLangSysRecord(reader, ttf, scriptTableOffset + defaultLangSysOffset)

    let langSysRecords = []
    offset = scriptTableOffset + 4
    for (var i = 0; i < langSysCount; i++) {
        let langSysTag = reader.readString(offset, 4)
        let langSysOffset = reader.readUint16(offset + 4)
        langSysRecordOffset = scriptTableOffset + langSysOffset

        let langSysRecord = readLangSysRecord(reader, ttf, langSysRecordOffset)
        langSysRecord.tag = langSysTag
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

    scriptRecord.scriptTable = readScriptTable(reader, ttf, scriptListOffset + scriptOffset)

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


function parse(reader, ttf) {
    var tgpos = {}
    var offset = this.offset

    reader.seek(offset)
    tgpos.version = reader.readFixed()
    let scriptListOffset = offset + reader.readUint16()
    let featureListOffset = offset +  reader.readUint16()
    let lookupListOffset = offset + reader.readUint16()

    let scriptList = readScriptList(reader, ttf, scriptListOffset)
    console.log('scriptList = ', JSON.stringify(scriptList, null, 2))

    return tgpos;
}

module.exports = parse;
    
