/** @param {NS} ns */
export async function main(ns) {
    const servers = new Set();

    function dfs(host) {
        if (servers.has(host)) return;

        servers.add(host);

        const neighbors = ns.scan(host);
        for (const neighbor of neighbors) {
            dfs(neighbor);
        }
    }
    
    dfs("home");

    // Create a map: { number of ports => list of servers }
    const grouped = {};

    for (const server of servers) {
      const ports = ns.getServerNumPortsRequired(server);

      if (!grouped[ports]) {
        grouped[ports] = [];
      }
      grouped[ports].push(server);
    }

    // Print out each group
    for (const portCount of Object.keys(grouped).sort((a, b) => a - b)) {
      ns.tprint(`\nServers that need ${portCount} port(s):`);
      for (const server of grouped[portCount]) {
        ns.tprint(`  - ${server}`);
      }
    }
}