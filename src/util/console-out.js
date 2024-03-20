const chalk = require("chalk");
const boxen = require("boxen");
const PAD_END = 100;

function banner(text) {
  const content = chalk.white.bold(text.padEnd(PAD_END));

  const boxenOptions = {
    padding: {
      top: 1,
      bottom: 1,
      left: 0,
      right: 0,
    },
    margin: 0,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555",
  };
  const msgBox = boxen(content, boxenOptions);

  console.log(msgBox);
  console.log("");
}

function section(text, borderColor = "blue") {
  const content = chalk.white.bold(text.padEnd(PAD_END));

  const boxenOptions = {
    padding: 0,
    margin: 0,
    borderStyle: "round",
    borderColor: borderColor,
    backgroundColor: "#000000",
  };
  const msgBox = boxen(content, boxenOptions);

  console.log(msgBox);
  console.log("");
}

function log(text) {
  console.log(text);
}

function nvp(pre, name, value, pad = 40) {
  const first = `${pre}${chalk.bold(name)}:`.padEnd(pad);
  console.log(`${first}${value}`);
}

module.exports = {
  banner: banner,
  section: section,
  log: log,
  nvp: nvp,
};
