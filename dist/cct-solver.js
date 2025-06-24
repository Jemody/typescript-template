export async function main(ns) {
    const visited = new Set();
    const contracts = [];

    function dfs(host) {
        if (visited.has(host)) return;

        visited.add(host);

        const files = ns.ls(host);
        const found = files.filter(file => file.endsWith(".cct"));

        if (found.length > 0) {
            contracts.push({host, files: found});
        }

        for (const neighbor of ns.scan(host)) {
            dfs(neighbor);
        }
    }

    dfs("home");

}
