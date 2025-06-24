export async function main(ns) {
    const pserv = ns.getPurchasedServers();

    for (let i = 0; i < pserv.length; i++) {
        
        ns.upgradePurchasedServer(pserv[i], 512);

        ns.tprint("Upgraded " + pserv[i] + " to 512 GB RAM.");
    }
}