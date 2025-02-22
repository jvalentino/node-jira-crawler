const axios = require("axios");
const http = require("../util/http-util");

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

async function getProjectDetails(settings, key) {
  const url = `${settings.jiraBaseUrl}/rest/api/3/project/${key}`;
  const headers = {
    Authorization: `Basic ${settings.jiraApiKey}`,
  };
  const response = await http.get(url, headers);

  return response.data;
}

async function runJQL(settings, query, maxResults = 250) {
  let results = [];

  let moreResults = true;
  let startAt = 0;
  while (moreResults) {
    const datas = await runIndividualJQL(settings, query, startAt, maxResults);

    if (datas.length == 0) {
      moreResults = false;
      break;
    }
    results = results.concat(datas);

    startAt += maxResults;
  }

  return results;
}

async function runIndividualJQL(settings, query, startAt, maxResults) {
  const url = `${settings.jiraBaseUrl}/rest/api/3/search?startAt=${startAt}&maxResults=${maxResults}&jql=${query}`;
  const headers = {
    Authorization: `Basic ${settings.jiraApiKey}`,
  };
  const response = await http.get(url, headers);

  return response.data.issues;
}

module.exports = {
  getAllUsers: getAllUsers,
  getAllProjects: getAllProjects,
  getProjectDetails: getProjectDetails,
  runJQL: runJQL,
};
