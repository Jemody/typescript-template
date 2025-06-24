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

    const portOpeners = [
        {name: "BRUTESSH.exe", fn: ns.brutessh},
        {name: "FTPCrack.exe", fn: ns.ftpcrack},
        {name: "relaySMTP.exe", fn: ns.relaysmtp},
        {name: "HTTPWorm.exe", fn: ns.httpworm},
        {name: "SQLInject.exe", fn: ns.sqlinject} 
    ];
    
    const availableOpeners = portOpeners.filter(p => ns.fileExists(p.name, "home"));

    for (const server of servers) {
        if (server === "home") continue;

        const reqport = ns.getServerNumPortsRequired(server);
        const hasRoot = ns.hasRootAccess(server);

        if (!hasRoot && reqport <= availableOpeners.length) {
            for (let i = 0; i < reqport; i++) {
                availableOpeners[i].fn(server);
            }

            ns.nuke(server);
            ns.tprint("Nuked: " + $(server));
        }
    }

    ns.tprint("All possible servers have been nuked :)");

}