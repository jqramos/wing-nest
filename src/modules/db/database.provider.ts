import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (config: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(config.get('DB_HOST')),
  },
];