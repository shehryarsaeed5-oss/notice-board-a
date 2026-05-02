module.exports = {
  apps: [
    {
      name: "notice-board-a",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3006",
      cwd: "D:/WEB Build/Notice-Board-A",
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3006",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: "3006",
      },
    },
  ],
};
