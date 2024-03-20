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

    out.log(" ");

  
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

  async function obtainAllProjects(settings) {
    out.section("Obtaining all Jira Projects", "yellow");
    const file = `${settings.buildDir}/jira-projects.json`;

    let datas = [];
    if (fsUtil.exists(file)) {
      out.log(`- Loading Jira projects from ${file}`);
      datas = fsUtil.parseJSON(file);
    } else {
      out.log(`- Retrieving Jira Projects`);
      datas = await api.getAllProjects(settings);
      fsUtil.writeJson(file, datas);
    }
  
    out.nvp("- ", "Projects", datas.length);

    out.log(" ");

    return datas;
  }

  async function pullDetailsForProjects(settings, projects, poolSize=10) {
    out.section("Pulling Project Details", "yellow");

    const dir = `${settings.buildDir}/project-details`;
    fsUtil.mkdir(dir);

    for (let i = 0; i < projects.length; i += poolSize) {
        // this is a list of projects to be obtained in parallel
        const chunk = projects.slice(i, i + poolSize);

        // these are the results  that align the the projects in the chunk
        const details = await Promise.all(
          chunk.map((item) => pullDetails(settings, item, dir))
        );
    
        for (let j = 0; j < chunk.length; j++) {
            const project = chunk[j];
            const detail = details[j];

            project.detail = detail;
        }
      }

      fsUtil.writeJson(`${settings.buildDir}/jira-projects-with-details.json`, projects);

      return projects;
  }

  async function pullDetails(settings, project, dir) {
    const file = `${dir}/${project.id}.json`;
  
    if (fsUtil.exists(file)) {
      return fsUtil.parseJSON(file);
    }
  
    const detail = await api.getProjectDetails(settings, project.key);
    fsUtil.writeJson(file, detail, 0);
    return detail;
  }

  module.exports = {
    getAllUsers: getAllUsers,
    obtainAllProjects: obtainAllProjects,
    pullDetailsForProjects: pullDetailsForProjects,
  };