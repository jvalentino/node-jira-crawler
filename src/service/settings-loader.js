const Settings = require("../Settings").default;
const out = require("../util/console-out");
const yargs = require("yargs");
const fsUtil = require("../util/file-utils");

const argv = yargs
  .option("jira_api_key", {
    alias: "h",
    describe: "The API KEY for Jira",
    default: null,
    type: "string",
  })
  .option("jira_url", {
    alias: "j",
    describe: "The URL for Jira",
    default: null,
    type: "string",
  })
  .option("days_back", {
    alias: "d",
    describe: "The number of days back to do the searching",
    default: 90,
    type: "string",
  })
  .help().argv;

function load() {
  out.section("Settings", "yellow");
  const settings = new Settings();

  settings.buildDir = "build";

  settings.jiraBaseUrl = argv.jira_url;
  settings.jiraApiKey = argv.jira_api_key;

  settings.daysBack = parseInt(argv.days_back);

  out.nvp(" - ", "Build Directory", settings.buildDir);
  out.nvp(" - ", "Jira Base URL", settings.jiraBaseUrl);
  out.nvp(" - ", "Jira API Key", settings.jiraApiKey);
  out.nvp(" - ", "Days Back", settings.daysBack);

  out.log("");

  return settings;
}

module.exports = {
  load: load,
};
