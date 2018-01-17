#!/usr/bin/env node
'use strict';

var Fs      = require("fs");
var Path    = require("path");
var Rebase  = require("@glennsl/rebase/src/Rebase.bs.js");
var Resync  = require("refetch/src/Resync.js");
var Hashtbl = require("bs-platform/lib/js/hashtbl.js");

function readDirRecursively(dir) {
  return Rebase.$$Array[/* flatMap */5]((function (filename) {
                var path = Path.join(dir, filename);
                var match = +Fs.statSync(path).isDirectory();
                if (match !== 0) {
                  return readDirRecursively(path);
                } else {
                  return /* array */[path];
                }
              }), Fs.readdirSync(dir));
}

function ensureDirExists(path) {
  path.split(Path.sep).reduce((function (acc, dir) {
          var path = Path.join(acc, dir);
          if (!Fs.existsSync(path)) {
            Fs.mkdirSync(path);
          }
          return path;
        }), "");
  return /* () */0;
}

function writeFile(path, contents) {
  ensureDirExists(Path.dirname(path));
  Fs.writeFileSync(path, contents, "utf8");
  return /* () */0;
}

var Fs$1 = /* module */[
  /* readDirRecursively */readDirRecursively,
  /* ensureDirExists */ensureDirExists,
  /* writeFile */writeFile
];

function filterDuplicates(arr) {
  var unique = /* array */[];
  var set = Hashtbl.create(/* None */0, arr.length);
  arr.forEach((function (x) {
          return Hashtbl.replace(set, x, /* () */0);
        }));
  Hashtbl.iter((function (x, _) {
          unique.push(x);
          return /* () */0;
        }), set);
  return unique;
}

function $great$great$eq($$this, f) {
  return Resync.Future[/* flatMap */9](f, $$this);
}

var $$return = Resync.Future[/* from */3];

var Future = /* module */[
  /* >>= */$great$great$eq,
  /* return */$$return
];

exports.Fs               = Fs$1;
exports.filterDuplicates = filterDuplicates;
exports.Future           = Future;
/* fs Not a pure module */