import { v4 as uuidv4 } from 'uuid';
import express from 'express';

import AWS from 'aws-sdk';

const router = express.Router();

// Configurar AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
});

const cognito = new AWS.CognitoIdentityServiceProvider();

router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };
  try {
    const data = await cognito.initiateAuth(params).promise();
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/new-password', async (req, res) => {
  const { email, newPassword, session } = req.body;
  const params = {
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    ChallengeResponses: {
      USERNAME: email,
      NEW_PASSWORD: newPassword,
    },
    Session: session,
  };

  try {
    const data = await cognito.respondToAuthChallenge(params).promise();
    console.log({ data });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/sign-up', (req, res) => {
  res.send('Sign up route');
});

export default router;
