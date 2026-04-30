module.exports = {
  apps: [
    {
      name: "notice-board-a",
      script: "node_modules/next/dist/bin/next",
      args: "dev -p 3006",
      cwd: "D:/WEB Build/Notice-Board-A",
      env: {
        NODE_ENV: "development",
        PORT: "3006",
      },
    },
  ],
};
