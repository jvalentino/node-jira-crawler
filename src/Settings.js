class Settings {
  constructor() {
    this.buildDir = null;

    this.jiraBaseUrl = null;
    this.jiraApiKey = null;
    this.daysBack = null;

  }
}

module.exports = {
  default: Settings,
};
