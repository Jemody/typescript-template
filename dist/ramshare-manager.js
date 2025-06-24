/** @param {NS} ns */
export async function main(ns) {
    const percent = ns.args[0] || 100;  // Use 100% if no arg passed
    if (percent <= 0 || percent > 100) {
        ns.tprint("Please provide a percentage between 1 and 100.");
        return;
    }

    const host = "home";
    const shareRam = ns.getScriptRam("customlibraries/share.js", host);
    const maxRam = ns.getServerMaxRam(host);
    const usedRam = ns.getServerUsedRam(host);
    const freeRam = maxRam - usedRam;

    const targetRam = (freeRam * percent) / 100;
    const threads = Math.floor(targetRam / shareRam);

    if (threads > 0) {
        ns.tprint(`Running share.js with ${threads} threads using ${percent}% of available RAM.`);
        ns.run("customlibraries/share.js", threads);
    } else {
        ns.tprint("Not enough RAM to run share.js with even 1 thread.");
    }
}
