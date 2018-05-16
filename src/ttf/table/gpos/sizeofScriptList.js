function sizeofLangSysRecord(langSys) {
    let size = 0
    size += 2   //  lookupOrder
    size += 2   //  requiredFeatureIndex
    size += 2   //  featureIndexCount
    size += 2 * langSys.featureIndexes.length   //  featureIndices[featureIndexCount]

    return size
}

function sizeofScriptTable(scriptTable, excludeChild = false) {
    let size = 0

    size += 2   //  defaultLangSys offset
    size += 2   //  langSysCount

    size += (scriptTable.defaultLangSys)? sizeofLangSysRecord(scriptTable.defaultLangSys) : 0
    scriptTable.langSysRecords.forEach((langSysRecord)=>{
        size += 4   //  langSysTag
        size += 2   //  langSysOffset

        size += excludeChild ? 0 : sizeofLangSysRecord(langSysRecord.langSys)
    })
    
    return size
}

function sizeofScriptRecord(scriptRecord, excludeChild = false) {
    let size = 0

    size += 4   //  scriptTag
    size += 2   //  scriptOffset

    size += excludeChild ? 0 : sizeofScriptTable(scriptRecord.script)
    return size
}

function sizeofScriptList(tgpos, excludeChild = false) {
    let size = 0

    size += 2   //  scriptCount

    tgpos.scripts.forEach((scriptRecord)=>{
        size += sizeofScriptRecord(scriptRecord, excludeChild)
    })

    return size
}

module.exports = { sizeofLangSysRecord, sizeofScriptTable, sizeofScriptRecord, sizeofScriptList }