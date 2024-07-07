import { Request, Response } from 'express';
import * as PubService from '../services/PubService';
import axios from 'axios';
import fs from 'fs';

export const publishToThreads = async (req: Request, res: Response) => {
  const baseurl = process.env.THREADS_GRAPH_API_BASE_URL as string;
  // TODO select association from DB based on pid
  const assocRecord = JSON.parse(fs.readFileSync('associationRecord.json', 'utf8'));
  const token = assocRecord.token;  
  const persona = req.body.pid;
  const content = req.body.content;
  
  if (persona === assocRecord.pid) { // TODO replace with check on db data
    try {
      var url = baseurl + '/me/threads';
      
      // specify and request media container for content
      var qstr = (new URLSearchParams({
	text: content,
	media_type: 'TEXT',
	access_token: token
      }) as any).toString();
      var response = await axios.post(url + '?' + qstr, {});
      const containerID = response.data.id;
      
      // TODO add check/wait for container readiness
      
      // publish container as thread
      url = baseurl;
      url += '/me/threads_publish';
      qstr = (new URLSearchParams({
	creation_id: containerID,
	access_token: token
      }) as any).toString();
      response = await axios.post(url + '?' + qstr);
      const threadID = response.data.id;
      
      // construct final response
      res.json({threadID: threadID});
    } catch (error) {
      console.log("Publishing flow failed");
    }
  } else {
    console.log("Bad personaID");
  }  
}