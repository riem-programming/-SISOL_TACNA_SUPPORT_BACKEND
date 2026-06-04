import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import multer from 'multer';
import { getSignedUrl as generatePresignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private s3: S3Client;
  private bucket: string;
  private publicUrl: string;

  constructor(private config: ConfigService) {
    this.bucket = this.config.get<string>('RUSTFS_BUCKET')!;
    this.publicUrl = this.config.get<string>('RUSTFS_PUBLIC_URL')!;

    this.s3 = new S3Client({
      endpoint: this.config.get<string>('RUSTFS_ENDPOINT'),
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.config.get<string>('RUSTFS_ACCESS_KEY')!,
        secretAccessKey: this.config.get<string>('RUSTFS_SECRET_KEY')!,
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder = 'vouchers',
  ): Promise<string> {
    const ext = path.extname(file.originalname);
    const key = `${folder}/${uuid()}${ext}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return key;
    // return `${this.publicUrl}/${this.bucket}/${key}`;
  }

  // En el método:
  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return generatePresignedUrl(this.s3, command, { expiresIn });
  }
}
