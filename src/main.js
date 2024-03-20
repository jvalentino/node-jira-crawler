const jira = require("./service/jira-service");

async function execute(settings, currentDate = new Date()) {
  const users = await jira.getAllUsers(settings);
  const projects = await jira.obtainAllProjects(settings);
  const projectsWithDetails = await jira.pullDetailsForProjects(settings, projects);
}

module.exports = {
  execute: execute,
};
