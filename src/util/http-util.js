const axios = require("axios");

async function get(url, headers, stopProgramOnFailure=true, retry=3, codeToReturnDefault=null, defaultResponse=[]) {
    let response = null;

    for (let i = 0; i < retry; i++) {
        console.log(`  + ${i + 1} GET ${url}`);
        try {
            response = await getNoRetry(url, headers);

            if (response.status === 200) {
                return response;
            } else if (codeToReturnDefault != null && response.status === codeToReturnDefault) {
                return defaultResponse;
            } else {
                await sleep(5000);
            }
        } catch (e) {
            await sleep(5000);
        }
    }

    // we failed
    if (stopProgramOnFailure) {
        console.log(response);
        throw new Error(`Failed ${url}`);
    }

    return null;
}

async function getNoRetry(url, headers) {
    const response = await axios.get(url, {
        headers: headers,
        validateStatus: function (status) {
          // no output for non-200
          return true;
        },
      });

    return response;
}

async function sleep(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }


module.exports = {
    get: get,
};
  