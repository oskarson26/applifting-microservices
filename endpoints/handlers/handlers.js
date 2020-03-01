const dogs = async response => {
    const data = await response.json()
    data.status = response.status
    return data
}

const cats = async response =>  {
    const json = await response.json();
    const data = json[0]
    return {
        message: data.url,
        status: response.status
    }
}

const meowfacts = async response => {
    const data = await response.json();
    data.status = response.status
    const newKey = {data: "message"}
    const renamedData = renameKeys(data, newKey)
    renamedData.message = renamedData.message[0]
    return renamedData
}

 renameKeys = (obj, newKeys) => { // best wishes to legends from stackoverflow <3
    const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return {
            [newKey]: obj[key]
        };
    });
    return Object.assign({}, ...keyValues);
}

module.exports = {
    cats,
    meowfacts,
    dogs
}