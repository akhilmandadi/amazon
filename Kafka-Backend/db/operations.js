const logger = require('tracer').colorConsole();

const findDocumentsByQuery = async (modelObject, query, options) => {
    try {
       
        return await modelObject.find(query, options).lean();
    } catch (error) {
        logger.error("Error while fetching data:" + error)
        throw new Error(error);
    }
}

const findDocumentsByQueryOffset = async (modelObject, query, projection, offset, options) => {
    try {
        if(!projection){
            projection = {}
        }
        if(!offset){
            offset = {}
        }

        return await modelObject.find(query, projection, options).lean().sort(offset.sort).skip(offset.skip).limit(offset.limit);
    } catch (error) {
        logger.error("Error while fetching data:" + error)
        throw new Error(error);
    }
}

const saveDocuments = async (modelObject, data, options) => {
    try {
        let model = new modelObject(data);
        return await model.save(options);
    } catch (error) {
        logger.error("Error while saving data:" + error)
        throw new Error(error);
    }
}

const updateField = async (modelObject, filters, update) => {
    try {
        return await modelObject.findOneAndUpdate(filters, update, { useFindAndModify: false, new: true });
    } catch (error) {
        logger.error("Error while updating data:" + error)
        throw new Error(error);
    }
}

const deleteDocument = async function (modelObject, id) {
    const result = await modelObject.deleteOne({ id });
    return result;
}

const countDocumentsByQuery = async (modelObject, query, options) => {
    try {
        return await modelObject.find(query,  options).lean().count();
    } catch (error) {
        logger.error("Error while fetching data:" + error)
        throw new Error(error);
    }
}

module.exports.findDocumentsByQuery = findDocumentsByQuery;
module.exports.findDocumentsByQueryOffset = findDocumentsByQueryOffset ;
module.exports.saveDocuments = saveDocuments;
module.exports.updateField = updateField;
module.exports.deleteDocument = deleteDocument;
module.exports.countDocumentsByQuery = countDocumentsByQuery;
