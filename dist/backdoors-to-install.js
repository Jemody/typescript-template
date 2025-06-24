/** @param {NS} ns */
export async function main(ns) {
    const visited = new Set();
    const parentMap = {};   

    // DFS to map all reachable servers and build a path tree
    function dfs(host, parent = null) {
      if (visited.has(host)) return;
      visited.add(host);

      if (parent !== null) parentMap[host] = parent;    
      const neighbors = ns.scan(host);

      for (const neighbor of neighbors) {
        dfs(neighbor, host);
      }
    }

  dfs("home");
  
    function getPathToTarget(target) {
       const path = [];
       let current = target;   

       while (current !== "home") {
         path.unshift(current);              // Adds current server to the front of the array
         current = parentMap[current];       // Move up to its parent
         if (!current) return [];            // Safety check if path is broken
       }   

       return ["home", ...path]; // Full path from home to target
    } 

     // Loop over all servers and filter for backdoor-eligible ones
     for (const server of visited) {
       const info = ns.getServer(server); // Server object with details

       // Conditions for backdooring
       if (
        !server.startsWith("pserv-") &&      //excludes private servers
        !info.backdoorInstalled &&           // We haven’t installed a backdoor yet
         info.hasAdminRights &&              // We own the server (nuked)
         info.requiredHackingSkill <= ns.getHackingLevel() // It's within our level
       ) {
         const path = getPathToTarget(server);
         const cmd = path.slice(1).map(s => `connect ${s}`).join("; ") + "; backdoor"; 

         // Output the backdoor command to terminal
         ns.tprint(`Backdoor available: ${server}`);
         ns.tprint(`     Run: ${cmd}\n`);
       }
    }
}