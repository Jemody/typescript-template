import {solvers} from "customlibraries/solvers.js";

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

    for (const contract of contracts) {
        for (const file of contract.files) {
            const type = ns.codingcontract.getContractType(file, contract.host);
            const solver = solvers[type];

            if (!solver) {
                ns.tprint(`No solver found for contract type: ${type}`);
                continue;
            }

            const data = ns.codingcontract.getData(file, contract.host);
            const answer = solver(data);

            const result = ns.codingcontract.attempt(answer, file, contract.host);

            if (result) {
                ns.tprint(`Solved ${type} on ${contract.host}: ${result}`);
            } else {
                ns.tprint(`Failed to solve ${type} on ${contract.host}`);
            }
        }
    }
}
