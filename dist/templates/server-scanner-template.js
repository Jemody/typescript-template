export async function main(ns) {
    const visited = new Set();

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
    
}