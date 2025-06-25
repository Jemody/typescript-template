export async function main(ns) {
    const pserv = ns.getPurchasedServers();

    for (let i = 0; i < pserv.length; i++) {
        const priv = pserv[i];
        const privram = ns.getServerMaxRam(pserv[i]);
        const runtime = Math.floor(privram / 2.75);

        ns.killall(priv);
        ns.rm("basic-hack.js", priv);
        ns.scp("basic-hack.js", priv);
        ns.exec("basic-hack.js", priv, runtime);

        ns.tprint("Updated " + priv + " to run with " + runtime + " threads.");
    }
}