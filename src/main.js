const jira = require("./service/jira-service");

async function execute(settings, currentDate = new Date()) {
  const users = await jira.getAllUsers(settings);
}

module.exports = {
  execute: execute,
};
