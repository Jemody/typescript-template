/** @param {NS} ns */
export async function main(ns) {

	const target = ns.args[0];

	if (!target) {
		ns.tprint("No server specified");
		return
	}

	const HackTimeMs = ns.getHackTime(target);
	const GrowTimeMs = ns.getGrowTime(target);
	const WeakenTimeMs = ns.getWeakenTime(target);

	const MaxMon = ns.getServerMaxMoney(target);
	const CurMon = Math.round(ns.getServerMoneyAvailable(target));
	const MaxRam = ns.getServerMaxRam(target);
	const UsedRam = ns.getServerUsedRam(target);
	const MinSec = ns.getServerMinSecurityLevel(target);
	const CurSec = ns.getServerSecurityLevel(target);
	const HackTime = Math.round(HackTimeMs / 1000);
	const GrowTime = Math.round(GrowTimeMs / 1000);
	const WeakenTime = Math.round(WeakenTimeMs / 1000);


	ns.tprint("Profiling Server: " + target);
	ns.tprint("-------------------");
	ns.tprint("Maximum Money: " + MaxMon);
	ns.tprint("Current Money: " + CurMon);
	ns.tprint("Max Ram: " + MaxRam);
	ns.tprint("Used Ram: " + UsedRam);
	ns.tprint("Minimum Security Level: " + MinSec);
	ns.tprint("Current Security Level: " + CurSec);
	ns.tprint("Time to Hack: " + HackTime + "s");
	ns.tprint("Time to Grow: " + GrowTime + "s");
	ns.tprint("Time to Weaken: " + WeakenTime + "s");
	ns.tprint("-------------------");

}