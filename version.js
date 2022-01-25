const { exec } = require("child_process");
const fs = require('fs');

exec("git rev-parse HEAD", (error, stdout, stderr) => {
    const version_string = `export let CURRENT_VERSION = "${stdout.trim()}";`
    fs.writeFile("./current_version.js", version_string, err => {});
});
