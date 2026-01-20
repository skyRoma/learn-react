// api/new-meetup

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://<db_user>:<db_password>@nextjs.rkfsxv9.mongodb.net/meetups?appName=NextJS')
        const db = client.db();
        const meetupsCollection = db.collection('meetups');

        await meetupsCollection.insertOne(data);

        client.close();
        res.status(201).json({ message: 'Meetup inserted!' });
    }
}
