open Rebase;

Utils.Fs.readDirRecursively(Config.packageDir)
|> Array.map(path => Node.Fs.readFileSync(path, `utf8))
|> Array.map(Json.parseOrRaise)
|> Array.map(Package.unsafeFromJson)
|> Array.map(p => (p##name, Lint.lintPackage(p)))
|> Array.filter(((_, errors)) => errors != [])
|> Array.forEach(((name, errors)) => {
  Js.log("");
  Js.log(name);
  errors |> List.forEach(error => Js.log2("  ", error))
});
