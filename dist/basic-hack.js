export async function main(ns) {
    const visited = new Set();
    let target = "";

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
    
    

    function chooseTarget() {
        let best = "";

        for (const server of visited) {
            const reqlev = ns.getServerRequiredHackingLevel(server);
            const curlev = ns.getHackingLevel();
            const bigbank = ns.getServerMaxMoney(server);

            if ((reqlev <= Math.floor(curlev / 2) || reqlev == 1) && bigbank > 0 && ns.hasRootAccess(server) == true) {
                if (best === "" || bigbank > ns.getServerMaxMoney(best)) {
                    best = server;
                }
            }
        }

        return best;
    }

    target = chooseTarget();

    ns.print(`Switching target to ${target}.`);

    const maxsec = ns.getServerMinSecurityLevel(target);
    const maxmon = ns.getServerMaxMoney(target);

    let cyclecount = 0;

    while (true) {

		if (ns.getServerSecurityLevel(target) > maxsec) {
			// If the server's security level is above our threshold, weaken it
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < maxmon) {
			// If the server's money is less than our threshold, grow it
			await ns.grow(target);
		} else {
			// Otherwise, hack it
			await ns.hack(target);
		}

        cyclecount++
        if (cyclecount >= 10) {
            const newTarget = chooseTarget();
            target = newTarget;

            ns.print(`Switching target to ${target}.`);
            cyclecount = 0;
        }
        
        ns.print(`Cyclecount: ${cyclecount}`);
	}
}