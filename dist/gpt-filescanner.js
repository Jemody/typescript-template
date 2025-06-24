/** @param {NS} ns */
export async function main(ns) {
  const visited = new Set();
  const interestingFiles = [];

  // Recursively scan all reachable servers
  function dfs(server) {
    if (visited.has(server)) return;
    visited.add(server);

    const files = ns.ls(server);
    const found = files.filter(file =>
      file.endsWith(".cct") || file.endsWith(".lit") || file.endsWith(".msg") || file.endsWith(".txt")
    );

    if (found.length > 0) {
      interestingFiles.push({ server, files: found });
    }

    for (const neighbor of ns.scan(server)) {
      dfs(neighbor);
    }
  }

  dfs("home");

  for (const entry of interestingFiles) {
    ns.tprint(`${entry.server}:`);
    for (const file of entry.files) {
      ns.tprint(`    - ${file}`);
    }
  }
}
