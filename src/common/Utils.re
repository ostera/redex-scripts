open Rebase;

let stick = x => {
  Js.log(x);
  x
};

module Fs = {
  type stats;

  [@bs.module "fs"] external statSync : string => stats = "";
  [@bs.send] external isDirectory : stats => bool = "";

  let rec readDirRecursively = dir => {
    Node.Fs.readdirSync(dir)
    |> Array.flatMap(filename => {
        let path = Node.Path.join2(dir, filename);
        switch (path |> statSync |> isDirectory) {
        | true  => readDirRecursively(path)
        | false => [|path|]
        }
      })
  };
};

let filterDuplicates = arr => {
  let unique = [||];
  let set = Hashtbl.create(Js.Array.length(arr));
  arr |> Js.Array.forEach(x => Hashtbl.replace(set, x, ()));
  set |> Hashtbl.iter((x, _) => Js.Array.push(x, unique) |> ignore);
  unique
};