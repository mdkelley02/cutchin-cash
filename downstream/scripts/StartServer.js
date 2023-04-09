// current directory is cutchin-cash/downstream
// sever is in cutchin-cash/downstream
// start the redis image if it is not running, then start the server
// redis should be running in the background
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

const startRedis = async () => {
  const { stdout, stderr } = await execAsync("docker ps");
  if (!stdout.includes("redis")) {
    await execAsync("gradle runRedis");
  }
};

const startServer = async () => {
  process.chdir("../upstream");

  await startRedis();
  await execAsync("gradle run");
};

startServer();
