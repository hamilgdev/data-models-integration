import { fromEnv } from '@aws-sdk/credential-providers';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

import dotenv from 'dotenv';

dotenv.config();

const getModels = async (req, res) => {
  if (process.env.NODE_ENV == 'production') {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
    });
  } else {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: fromEnv(),
    });
  }

  const docClient = DynamoDBDocumentClient.from(client);
  const command = new ScanCommand({
    TableName: 'tb_models',
  });

  const response = await docClient.send(command);

  const models = [];
  for (var i in response.Items) {
    models.push(response.Items[i]);
  }

  res.contentType = 'application/json';
  console.log({ models });
  res.json(models);

  return res;
};

const getModelsById = async (req, res) => {
  if (process.env.NODE_ENV == 'production') {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
    });
  } else {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: fromEnv(),
    });
  }

  const docClient = DynamoDBDocumentClient.from(client);

  const command = new GetCommand({
    TableName: 'tb_models',
    Key: {
      id: req.params.id,
    },
  });

  const response = await docClient.send(command);
  console.log(response.Item);
  res.json(response.Item);
  return res;
};

export { getModelsById, getModels };
