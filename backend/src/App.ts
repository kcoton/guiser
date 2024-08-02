/* Citation
 *
 * Adapted from code commited to all CPSC 310 project repos by 310-bot (i.e. Reid Holmes et al.).
 *
 * https://github.com/bshapka/insight-ubc/commit/1c0c9f621d4307a6baa5f8aa221f518896c3b9ee
 */
require('dotenv').config({ path: '../.env' });
import Server from './server/Server';

export default class App {
    public init(port: number) {
        const local = process.env.LOCAL;
        if (local) {
            return new Server(port, './guiser.server.pem', './guiser.server-key.pem').start();
        } else {
            return new Server(port).start();
        }
    }
}

const port: number = Number(process.env.PORT || 3001);

(async () => await new App().init(port))();
