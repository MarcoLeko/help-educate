import {inject, injectable} from 'inversify';
import AbstractRoutes from './abstract-routes';
import {TYPES} from '../../../di-config/types';
import MongoDBClient from '../../db/mongo-db-client';

@injectable()
export default class ApiRoutes extends AbstractRoutes {

    public ROUTE_PARAMS: string = '/api';

    constructor(@inject(TYPES.MONGO_DB_CLIENT) public mongoDBClient: MongoDBClient) {
        super();
    }

    public createEndpoints() {
        this.router.get('/charities', async (request: any, response: any) => {
            response.send(await this.mongoDBClient.getCollectionOfCharities());
        });

        this.router.get('/statistics/:type', async (request: any, response: any) => {
            const kindOfStatistics = request.params.type;
            try {
                const data = await this.mongoDBClient.getStatisticsCollection(kindOfStatistics);
                response.send(data);
            } catch (e) {
                response.statusMessage = 'Could not fetch Internet-statistics';
                response.status(500).end();
            }
        });
    }
}
