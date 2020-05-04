"use strict";
var path = require("path");
var app = require("../server");
var loopback = require("loopback");

var frontEndUrl = "http://localhost:4200";
var backEndUrl = "http://localhost:3000";
module.exports = function (Appuser) {
  Appuser.beforeRemote("findById", function (req, res, next) {
    req.args.filter = { include: ["superuser"] };
    next();
  });

  Appuser.beforeRemote("create", function (context, user, next) {
    context.args.data.role = "owner";
    next();
  });

  Appuser.afterRemote("create", function (context, user, next) {
    var verifyLink =
      backEndUrl +
      "/api/appusers/confirm?uid=" +
      user.id +
      "&redirect=" +
      frontEndUrl;

    var options = {
      type: "email",
      to: user.email,
      from: "anilbhatia34@gmail.com",
      subject: "Thanks for Registering ",
      host: "loclhost",
      templete: path.resolve(__dirname, "../boot/views/verify.ejs"),
      user: user,
      verifyHref: verifyLink,
    };

    user.verify(options, function (err, response) {
      if (err) {
        Appuser.deleteById(user.id);
        return next(err);
      } else {
        user.superuser.create(
          {
            username: user.username,
          },
          function (err, resp) {
            if (resp) {
              console.log("Superuser Created");
              Appuser.findById(resp.rootUserId, function (err, result) {
                result.superuserId = resp.id;
                Appuser.upsert(result, function () {});
              });
            }
          }
        );
        next();
      }
    });
  });

  Appuser.beforeRemote("confirm", function (ctx, res, next) {
    var redirectLink = "loaclhost:4200";
    Appuser.findById(ctx.args.uid, function (err, result) {
      if (result.emailVerified) {
        ctx.res.send(
          "you have already verified you Email:: please redirect to login " +
            '<a href="http://' +
            redirectLink +
            ">" +
            "Login" +
            "</a>"
        );
      } else {
        next();
      }
    });
  });

  Appuser.afterRemote("confirm", function (ctx, res, next) {
    ctx.args.status = "enabled";
    Appuser.findById(ctx.args.uid, function (err, result) {
      result.status = "enabled";
      Appuser.upsert(result, function (err, user) {
        next();
      });
    });
  });
};
