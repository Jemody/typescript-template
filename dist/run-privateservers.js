export async function main(ns) {
    const pserv = ns.getPurchasedServers();

    for (let i = 0; i < pserv.length; i++) {
        
        ns.killall(pserv[i]);
        ns.rm("early-hack-template.js", pserv[i]);
        ns.scp("early-hack-template.js", pserv[i]);
        ns.exec("early-hack-template.js", pserv[i], 24);
    }
}