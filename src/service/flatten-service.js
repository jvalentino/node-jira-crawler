const out = require("../util/console-out");

function recursiveFlatten(list, listKey) {
    out.section(`Flattening the ${list.length} projects at their story level`, "yellow");
    const results = [];
    // for every item in the list...
    for (let item of list) {
        // flatten the item, leaving out any list objects
        const rootFlattened = flatten(item);
        
        // now handle the single list object wich will become the actual record
        for (let childItem of item[listKey]) {
            // flatten the child item
            const childFlattened = flatten(childItem);

            // merge the root and child items
            const merged = { ...rootFlattened, ...childFlattened };

            // output the merged item
            results.push(merged);
        }
    }

    out.nvp("- ", "Records", results.length);

    // now figure out the unique keys across all recordds
    const uniqueKeys = findUniqueKeys(results);
    out.nvp("- ", "Unique Keys", uniqueKeys.size);
    
    // now we have to add the unique keys to the results if they do not exist
    for (let result of results) {
        for (let key of uniqueKeys) {
            if (!result.hasOwnProperty(key)) {
                result[key] = null;
            }
        }
    }

    out.log(" ");

    return results;
}

function flatten(obj, parentKey = '') {
    let result = {};

    for (let key in obj) {
        let propName = parentKey ? `${parentKey}.${key}` : key;
        if (Array.isArray(obj[key])) {
            // If it's an array, ignore it
            continue;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            // If it's an object, recursively flatten it
            Object.assign(result, flatten(obj[key], propName));
        } else {
            // Otherwise, add the key-value pair to the result
            result[propName] = obj[key];
        }
    }

    return result;
}

function findUniqueKeys(list) {
    const keys = new Set();

    for (let item of list) {
        for (let key in item) {
            keys.add(key);
        }
    }

    return keys;
}

module.exports = {
    flatten: flatten,
    recursiveFlatten: recursiveFlatten,
    findUniqueKeys: findUniqueKeys,
}