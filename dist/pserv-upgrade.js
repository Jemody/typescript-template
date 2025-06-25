export async function main(ns) {
    const pserv = ns.getPurchasedServers();
    const wantram = ns.args[0];

    if (!wantram || wantram <=0) { 
        ns.tprint("Please specify RAM amount");
        return;
    }

    for (let i = 0; i < pserv.length; i++) {
        const server = pserv[i];
        const curram = ns.getServerMaxRam(server);

        if (curram >= wantram) {
            ns.tprint(`${server} already and or has more than ${curram} RAM.`);
            continue;
        }

        ns.killall(server);

        const bought = ns.upgradePurchasedServer(server, wantram);

        if (bought) {
            ns.tprint(`Upgraded ${server} to ${wantram} GB RAM`);  
        }

        else {
            ns.tprint(`Insufficient funds for ${server}`);
            return;
        }
           
    }
}