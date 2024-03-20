const jira = require("./service/jira-service");

async function execute(settings, currentDate = new Date()) {
  const users = await jira.getAllUsers(settings);
  const projects = await jira.obtainAllProjects(settings);
  await jira.pullDetailsForProjects(settings, projects);
  await jira.pullStoriesForProjects(settings, projects);
}

module.exports = {
  execute: execute,
};
