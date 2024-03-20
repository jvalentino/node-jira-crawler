const axios = require("axios");

async function getAllUsers(settings, maxResults = 250) {
  let results = [];

  let moreResults = true;
  let startAt = 0;
  while (moreResults) {
    const users = await getUsers(settings, startAt, maxResults);

    if (users.length == 0) {
      moreResults = false;
      break;
    }
    results = results.concat(users);

    startAt += maxResults;
  }

  return results;
}

async function getUsers(settings, startAt, maxResults) {
  const url = `${settings.jiraBaseUrl}/rest/api/3/users/search?startAt=${startAt}&maxResults=${maxResults}`;
  console.log(`  + GET ${url}`);
  const response = await axios.get(url, {
    headers: {
      Authorization: `Basic ${settings.jiraApiKey}`,
    },
  });

  return response.data;
}

async function getAllProjects(settings, maxResults = 50) {
  let results = [];

  let moreResults = true;
  let startAt = 0;
  while (moreResults) {
    const datas = await getProjects(settings, startAt, maxResults);

    if (datas.length == 0) {
      moreResults = false;
      break;
    }
    results = results.concat(datas);

    startAt += maxResults;
  }

  return results;
}

async function getProjects(settings, startAt, maxResults) {
  const url = `${settings.jiraBaseUrl}/rest/api/3/project/search?startAt=${startAt}&maxResults=${maxResults}`;
  console.log(`  + GET ${url}`);
  const response = await axios.get(url, {
    headers: {
      Authorization: `Basic ${settings.jiraApiKey}`,
    },
  });

  return response.data.values;
}

module.exports = {
  getAllUsers: getAllUsers,
  getAllProjects: getAllProjects,
};
