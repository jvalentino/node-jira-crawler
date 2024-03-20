const out = require("../util/console-out");
const fsUtil = require("../util/file-utils");
const api = require("../api/jira-api");
const Settings = require("../Settings").default;

async function getAllUsers(settings) {
    out.section("Obtaining all Jira Users", "yellow");
    const file = `${settings.buildDir}/jira-users.json`;
  
    let users = [];
    if (fsUtil.exists(file)) {
      out.log(`- Loading Jira users from ${file}`);
      users = fsUtil.parseJSON(file);
    } else {
      out.log(`- Retrieving Jira Users`);
      users = await api.getAllUsers(settings);
      fsUtil.writeJson(file, users);
    }
  
    out.nvp("- ", "Users", users.length);
  
    // filter out for only active users
    const filteredUsers = filterInactive(users);
    out.nvp("- ", "Active Users", filteredUsers.length);
  
    return filteredUsers;
  }

  function filterInactive(users) {
    const results = [];
    for (let user of users) {
      if (user.active == true) {
        results.push(user);
      }
    }
    return results;
  }

  module.exports = {
    getAllUsers: getAllUsers,
  };