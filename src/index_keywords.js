// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var Fs                      = require("fs");
var List                    = require("bs-platform/lib/js/list.js");
var Utils                   = require("./common/Utils.js");
var Rebase                  = require("reason-rebase/src/rebase.js");
var Hashtbl                 = require("bs-platform/lib/js/hashtbl.js");
var Js_dict                 = require("bs-platform/lib/js/js_dict.js");
var Json_decode             = require("bs-json/src/Json_decode.js");
var Json_encode             = require("bs-json/src/Json_encode.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var packageDir = "data/generated/packages";

function getKeywords(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.string, json),
          Json_decode.field("keywords", (function (param) {
                  return Json_decode.array(Json_decode.string, param);
                }), json)
        ];
}

function makeInvertedIndex(data) {
  var index = Hashtbl.create(/* None */0, Rebase.$$Array[/* length */12](data));
  Rebase.$$Array[/* forEach */8]((function (param) {
          var id = param[0];
          return Rebase.$$Array[/* forEach */8]((function (keyword) {
                        var old;
                        try {
                          old = Hashtbl.find(index, keyword);
                        }
                        catch (exn){
                          if (exn === Caml_builtin_exceptions.not_found) {
                            old = /* [] */0;
                          } else {
                            throw exn;
                          }
                        }
                        return Hashtbl.replace(index, keyword, /* :: */[
                                    id,
                                    old
                                  ]);
                      }), param[1]);
        }), data);
  return Hashtbl.fold((function (k, v, acc) {
                return /* :: */[
                        /* tuple */[
                          k,
                          v
                        ],
                        acc
                      ];
              }), index, /* [] */0);
}

var json = JSON.stringify(Json_encode.list((function (prim) {
            return prim;
          }), Rebase.List[/* map */2]((function (param) {
                var packages = param[1];
                return Js_dict.fromList(/* :: */[
                            /* tuple */[
                              "name",
                              param[0]
                            ],
                            /* :: */[
                              /* tuple */[
                                "count",
                                List.length(packages)
                              ],
                              /* :: */[
                                /* tuple */[
                                  "packages",
                                  Json_encode.list((function (prim) {
                                          return prim;
                                        }), packages)
                                ],
                                /* [] */0
                              ]
                            ]
                          ]);
              }), makeInvertedIndex(Rebase.$$Array[/* map */2](getKeywords, Rebase.$$Array[/* map */2]((function (prim) {
                            return JSON.parse(prim);
                          }), Rebase.$$Array[/* map */2]((function (path) {
                                return Fs.readFileSync(path, "utf8");
                              }), Rebase.$$Array[/* filter */10]((function (filename) {
                                    return +filename.endsWith(".json");
                                  }), Utils.Fs[/* readDirRecursively */0](packageDir)))))))));

Fs.writeFileSync("data/generated/keywords.json", json, "utf8");

var length = List.length;

exports.length            = length;
exports.packageDir        = packageDir;
exports.getKeywords       = getKeywords;
exports.makeInvertedIndex = makeInvertedIndex;
/* json Not a pure module */
