import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from 'axios';

const authData = {
  password: process.env.PORTAINER_PASSWORD,
  username: process.env.PORTAINER_USER
}

const fb = admin.initializeApp();

export const getEmailVerificationLink = functions.https.onCall((data: string, context) => {
  return fb.auth().generateEmailVerificationLink(data);
})

export const authenticatePortainer = functions.https.onCall(() => {
  const url = 'https://portainer.webqube.de/api/auth';
  return axios.post(url, authData).then(res => {
    console.log("res: ", res.data)
    return res.data;
  }).catch((err)=>{console.log(JSON.stringify(err))});
})

export const createApp = functions.https.onCall((data: { name: string, jwt: string, repo: string }, context) => {
  const url = 'https://portainer.webqube.de/api/stacks?type=2&method=repository&endpointId=2';
  const portainerObject = {
    composeFile: "docker-compose.prod.yaml",
    env: [
      {name: "HOST", value: "0.0.0.0"},
      {name: "PORT", value: "1337"},
      {
        name: "APP_KEYS",
        value: "Vh+Wdqb1UlzNEAlANedkYQ==,AXLCGCqKn3pto2kHc5aVKg==,scZdGr01ESGtzN0aXtWEfA==,bMXmOwTnWvv2G+Dz6myyPA=="
      },
      {name: "PORT", value: "1337"},
      {name: "API_TOKEN_SALT", value: "13uujEDHOgAQfXg1JCTD0idA37"},
      {name: "ADMIN_JWT_SECRET", value: "P22kSxwsH/MEUwBFenqZ8A=="},
      {name: "JWT_SECRET", value: "+TTbk3tOdTc65x6g4PFpFA=="},
      {name: "DATABASE_HOST", value: "db"},
      {name: "DATABASE_PORT", value: "5432"},
      {name: "DATABASE_NAME", value: "db"},
      {name: "DATABASE_USERNAME", value: "admin"},
      {name: "DATABASE_PASSWORD", value: "Dominim123_!"},
      {name: "NODE_ENV", value: "development"},
      {name: "ROOT_URL", value: "webqube.de"},
      {name: "DATABASE_CLIENT", value: "postgres"},
      {name: "SUBDOMAINAPI", value: 'backend-'+data.name},
      {name: "SUBDOMAINWEB", value: 'frontend-'+data.name},
    ],
    fromAppTemplate: false,
    name: 'app-' + data.name,
    repositoryAuthentication: false,
    repositoryReferenceName: "refs/heads/main",
    repositoryURL: data.repo
  }
  return axios.post(
    url,
    portainerObject,
    {headers: {Authorization: `Bearer ${data.jwt}`}}).then(res => {
    console.log("res: ", res.data)
    return res.data;
  }).catch((err)=>{console.log(JSON.stringify(err))});
});


export const createRepo = functions.https.onCall((data: { name: string }, context) => {
  const url = 'https://api.github.com/repos/qvllasa/webqube-starter-template/generate';
  const repoObject = {
    owner: "qvllasa",
    name: data.name,
    description: "This is your first repository",
    include_all_branches: true,
    private: false
  }
  return axios.post(
    url,
    repoObject,
    {headers: {Authorization: `token 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`}}).then(res => {
    console.log("res: ", res.data)
    return res.data;
  }).catch((err)=>{console.log(JSON.stringify(err))});
});


