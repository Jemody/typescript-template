/** @param {NS} ns */
export async function main(ns) {

	//list of all backdoored servers
	// Array of all servers that don't need any ports opened
	// to gain root access. These have 16 GB of RAM
	const servers0Port = ["sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi", "foodnstuff"];


	// Array of all servers that only need 1 port opened
	// to gain root access. These have 32 GB of RAM
	const servers1Port = ["neo-net", "zer0", "max-hardware", "iron-gym"];

	for (let i = 0; i < servers0Port.length; i++) {
		const serv = servers0Port[i];

		ns.killall(serv);
		ns.rm("early-hack-template.js", serv);
 		ns.scp("early-hack-template.js", serv);
  		ns.exec("early-hack-template.js", serv, 6);
	
	}

	for (let i = 0; i < servers1Port.length; ++i) {
    const serv = servers1Port[i];

   		ns.killall(serv);
		ns.rm("early-hack-template.js", serv);
 		ns.scp("early-hack-template.js", serv);
  		ns.exec("early-hack-template.js", serv, 12);

	}
}