/* Citation
 * 
 * Adapted from code commited to all CPSC 310 project repos by 310-bot (i.e. Reid Holmes et al.).
 * 
 * https://github.com/bshapka/insight-ubc/commit/1c0c9f621d4307a6baa5f8aa221f518896c3b9ee
 */

import Server from "./server/Server";

export default class App {
	public init(port: number) {
		return new Server(port).start();
	}
}

(async () => await new App().init(3001))();
