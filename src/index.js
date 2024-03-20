const out = require("./util/console-out");
const main = require("./main");
const settingsLoader = require("./service/settings-loader");

out.banner("Jira Crawler: Command-Line Interface");

const settings = settingsLoader.load();
main.execute(settings);
