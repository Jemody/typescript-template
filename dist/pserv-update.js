export async function main(ns) {
    const pserv = ns.getPurchasedServers();

    for (let i = 0; i < pserv.length; i++) {
        const priv = pserv[i];
        const privram = ns.getServerMaxRam(pserv[i]);
        const runtime = Math.floor(privram / 2.65);

        ns.killall(priv);
        ns.rm("early-hack-template.js", priv);
        ns.scp("early-hack-template.js", priv);
        ns.exec("early-hack-template.js", priv, runtime);

        ns.tprint("Updated " + priv + " to run with " + runtime + " threads.");
    }
}