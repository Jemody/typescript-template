/** @param {NS} ns **/
export async function main(ns) {
    const target = ns.args[0];
    if (!target) {
        ns.tprint("ERROR: Please provide a target server name.");
        return;
    }

    const path = findPath(ns, "home", target);
    if (path.length === 0) {
        ns.tprint(`Could not find a path to ${target}.`);
    } else {
        ns.tprint(`Path to ${target}: ${path.join(" → ")}`);
    }
}

function findPath(ns, start, target, visited = new Set()) {
    if (start === target) return [start];
    visited.add(start);

    for (const neighbor of ns.scan(start)) {
        if (visited.has(neighbor)) continue;
        const subPath = findPath(ns, neighbor, target, visited);
        if (subPath.length > 0) return [start, ...subPath];
    }

    return [];
}