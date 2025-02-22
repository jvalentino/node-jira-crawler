const jira = require("./service/jira-service");
const flatten = require("./service/flatten-service");
const fsUtil = require("./util/file-utils");
const excel = require("./service/excel-service");

async function execute(settings, currentDate = new Date()) {
  const users = await jira.getAllUsers(settings);
  const projects = await jira.obtainAllProjects(settings);
  await jira.pullDetailsForProjects(settings, projects);
  const projectsWithStories = await jira.pullStoriesForProjects(settings, projects);
  
  // now flatten the projects with stories
  const flattened = flatten.recursiveFlatten(projectsWithStories, 'stories');
  fsUtil.writeJson(`${settings.buildDir}/flattened-stories.json`, flattened);

  // now output it to excel
  excel.generate(`${settings.buildDir}/flattened-stories.xlsx`, flattened);


}

module.exports = {
  execute: execute,
};
