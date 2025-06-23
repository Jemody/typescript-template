/** @param {NS} ns */
export async function main(ns) {

	//list of all backdoored servers
	// Array of all servers that don't need any ports opened
	// to gain root access. These have 16 GB of RAM
	const servers0Port = ["sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi", "foodnstuff"];

	// Array of all servers that only need 1 port opened
	// to gain root access. These have 32 GB of RAM
	const servers1Port = ["neo-net", "zer0", "max-hardware", "iron-gym"];

	// Array of all private servers with 8GB of RAM
	const serversP8Port = ["pserv-0", "pserv-1", "pserv-1-0", "pserv-10", "pserv-11", "pserv-12", "pserv-13", "pserv-14",
												"pserv-15", "pserv-16", "pserv-17", "pserv-18", "pserv-19", "pserv-2", "pserv-2-0", "pserv-3", 
												"pserv-3-0", "pserv-4", "pserv-4-0", "pserv-5", "pserv-5-0", "pserv-6", "pserv-7", "pserv-8", "pserv-9"];

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

	for (let i = 0; i < serversP8Port.length; ++i) {
    const serv = serversP8Port[i];

    ns.killall(serv);
		ns.rm("early-hack-template.js", serv);
 		ns.scp("early-hack-template.js", serv);
  	ns.exec("early-hack-template.js", serv, 3);
	}
}