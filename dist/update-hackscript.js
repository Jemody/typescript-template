/** @param {NS} ns */
export async function main(ns) {
	const visited = new Set();
	const sname = ns.args[0];
	
	function dfs(host) {
        if (visited.has(host)) return;

        visited.add(host);

        //Custom logic goes here

        const neighbors = ns.scan(host);
        for (const neighbor of neighbors) {
            dfs(neighbor);
        }
    }
    
    dfs("home");

	const scriptRam = ns.getScriptRam(sname, "home");

	for (const server of visited) {
		const files = ns.ls(server);
		const found = files.includes(sname);

		if (!ns.hasRootAccess(server) || server == "home") continue;

		const ramcount = ns.getServerMaxRam(server);
		//const usedRam = ns.getServerUsedRam(server);
		//const curRam = ramcount - usedRam;
		const runtime = Math.floor(ramcount / scriptRam);

		ns.killall(server)

		if (found) {
			ns.rm(sname, server);
		}

 		ns.scp(sname, server);

		if (runtime > 0) {
  			ns.exec(sname, server, runtime);
			ns.tprint(`updated ${server} with ${sname}`);
		}
	
	}
}

