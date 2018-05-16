const { sizeofLangSysRecord, sizeofScriptTable, sizeofScriptRecord, sizeofScriptList } = require('./sizeofScriptList')

function sizeof(ttf) {
    let tgpos = ttf.GPOS
    let size = 0
    size += (tgpos.version === 1.1) ? 12 : 10 //  version/scriptListOffset/featureListOffset/lookupListOffset
    size += sizeofScriptList(tgpos)

    return size
}


module.exports = sizeof