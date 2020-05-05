"use strict";
var path = require("path");
var app = require("../server");
var loopback = require("loopback");

var frontEndUrl = "http://localhost:4200";
var backEndUrl = "http://localhost:3000";
module.exports = function (Appuser) {
  console.log(Appuser);
  Appuser.beforeRemote("findById", function (req, res, next) {
    req.args.filter = { include: ["superuser"] };
    next();
  });

  Appuser.beforeRemote("login", function (req, res, next) {
    req.args.filter = { include: "appuser" };
    next();
  });

  Appuser.afterRemote("login", function (ctx, res, next) {
    var filter = {
      include: ["superuser"],
    };
    Appuser.findById(ctx.result.userId, filter, function (err, result) {
      if (err == null) {
        var rJson = result.toJSON();
        res.responseCod = 200;
        if (rJson.emailVerified) {
          res.emailVerified = true;
        } else {
          res.emailVerified = false;
        }
        res.verificationToken = rJson.verificationToken;
        res.superuserId = rJson.superuserId;
        if (typeof rJson.role !== "undefined" && rJson.role == "owner") {
          res.superuser = rJson.superuser;
          res.rol = rJson.role;
        }
        next();
      }
    });
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
      from: "anilbhatia4963@gmail.com",
      subject: "Thanks for Registering ",
      host: "localhost",
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
        ctx.res.send("you have already verified you Email");
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

  Appuser.remoteMethod("sendEmail", {
    accepts: [{ arg: "email", type: "string" }],
    return: { arg: "email", type: "string" },
    http: { path: "/sendEmail", verb: "post" },
  });
  Appuser.sendEmail = function (email, cb) {
    Appuser.find({ where: { email: email } }, function (err, user) {
      if (user[0].verificationToken) {
        var verifyLink =
          backEndUrl +
          "/api/appusers/confirm?uid=" +
          user[0].id +
          "&redirect=" +
          frontEndUrl;

        var options = {
          type: "email",
          to: user[0].email,
          from: "anilbhatia4963@gmail.com",
          subject: "Thanks for Registering ",
          host: "localhost",
          templete: path.resolve(__dirname, "../boot/views/verify.ejs"),
          user: user[0],
          verifyHref: verifyLink,
        };
        user[0].verify(options, function (err, response) {
          if (err) {
            Appuser.deleteById(user[0].id);
            return next(err);
          }
          cb(null, response);
        });
      }
    });
  };
};
