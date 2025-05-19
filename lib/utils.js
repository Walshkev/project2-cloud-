const paginate = (array, page, pageSize) => {
    const StartIndex = (Math.max(page-1)) * pageSize;
    const EndIndex = StartIndex + pageSize;

    return array.slice(StartIndex, EndIndex);
}


const vailidateObject = (object, schema) => {
    const keys= object.keys();
    const properties = object.keys(schema).filter((p) => schema[p].required);

    return properties.every((p) => keys.includes(p));   
}

const createModel= (object, schema) => {
    const properties = Object.keys(schema);
    const entries=properties.map((p) => [p, object[p] || schema[p].default]);
    const model = Object.fromEntries(entries);
    return model;
}

module.exports = {
    paginate,
    vailidateObject,
    createModel
}

