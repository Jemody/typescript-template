/** @param {NS} ns */
export async function main(ns) {
  const visited = new Set();

  function dfs(server) {
    if (visited.has(server)) return;
    visited.add(server);

    const files = ns.ls(server);
    const transferable = files.filter(file =>
      file.endsWith(".lit") || file.endsWith(".txt")
    );

    for (const file of transferable) {
      ns.scp(file, "home", server);
      ns.tprint(`Transferred ${file} from ${server} to home`);
    }

    for (const neighbor of ns.scan(server)) {
      dfs(neighbor);
    }
  }

  dfs("home");
}
