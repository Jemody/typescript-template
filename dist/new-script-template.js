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
}