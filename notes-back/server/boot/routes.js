module.exports = function (app) {
  app.get("/ping", (req, res) => {
    res.send("welcome to note app");
  });
};
