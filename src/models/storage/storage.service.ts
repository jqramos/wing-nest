import { Injectable } from '@nestjs/common';
import { DownloadResponse, Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { StorageFile } from './storage-file';

@Injectable()
export class StorageService {
    private storage: Storage;
    private storageCreate: Storage;
    private bucket: string;

    constructor(configService: ConfigService) {
        this.storage = new Storage({
          projectId: configService.get('PROJECT_ID'),
          credentials: {
            client_email: configService.get('CLIENT_EMAIL'),
            private_key: configService.get('PRIVATE_KEY'),
          },
        });

        
        this.storageCreate = new Storage({
          projectId: configService.get('PROJECT_ID'),
          credentials: {
            client_email: configService.get('CLIENT_EMAIL_WRITE'),
            private_key: configService.get('PRIVATE_KEY_WRITE'),
          },
        });
    
        this.bucket = configService.get('STORAGE_MEDIA_BUCKET');
      }
    
      async save(
        path: string,
        contentType: string,
        media: Buffer,
        metadata: { [key: string]: string }[]
      ) {
        const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
        const file = this.storageCreate.bucket(this.bucket).file(path);
        const stream = file.createWriteStream();
        stream.on("finish", async () => {
          return await file.setMetadata({
            metadata: object,
          });
        });
        stream.end(media);
      }
    
      async delete(path: string) {
        await this.storage
          .bucket(this.bucket)
          .file(path)
          .delete({ ignoreNotFound: true });
      }
    
      async get(path: string): Promise<StorageFile> {
        const fileResponse: DownloadResponse = await this.storage
          .bucket(this.bucket)
          .file(path)
          .download();
        const [buffer] = fileResponse;
        const storageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map<string, string>();
        return storageFile;
      }
    
      async getWithMetaData(path: string): Promise<StorageFile> {
        const [metadata] = await this.storage
          .bucket(this.bucket)
          .file(path)
          .getMetadata();
        const fileResponse: DownloadResponse = await this.storage
          .bucket(this.bucket)
          .file(path)
          .download();
        const [buffer] = fileResponse;
    
        const storageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map<string, string>(
          Object.entries(metadata || {})
        );
        storageFile.contentType = storageFile.metadata.get("contentType");
        return storageFile;
      }

      //gcp get image url
      async getSignedUrl(path: string) {
        //create time after 1hour
        const expires = Date.now() + 1000 * 60 * 60;
        const [url] = await this.storage
          .bucket(this.bucket)
          .file(path)
          .getSignedUrl({
            action: "read",
            expires: expires,
          });
        return url;
      }

}
