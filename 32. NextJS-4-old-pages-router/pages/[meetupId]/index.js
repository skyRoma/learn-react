import { MongoClient, ObjectId } from "mongodb";

import { MeetupDetails } from "../../components/meetups/MeetupDetails";
import Head from "next/head";

export default function MeetupDetailsPage({ meetupData }) {
    return (
        <>
            <Head>
                <title>{meetupData.title}</title>
                <meta
                    name="description"
                    content={meetupData.description}
                />
            </Head>
            <MeetupDetails
                image={meetupData.image}
                title={meetupData.title}
                address={meetupData.address}
                description={meetupData.description}
            />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://<db_user>:<db_password>@nextjs.rkfsxv9.mongodb.net/meetups?appName=NextJS')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        // paths: [
        //     { params: { meetupId: 'm1' } },
        //     { params: { meetupId: 'm2' } }
        // ],
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        })),
        fallback: 'blocking'
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://<db_user>:<db_password>@nextjs.rkfsxv9.mongodb.net/meetups?appName=NextJS')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

    client.close();

    //fetch data for a single meetup
    return {
        props: {
            // meetupData: {
            //     id: meetupId,
            //     title: 'First Meetup',
            //     image:
            //         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
            //     address: 'Some address 5, 12345 Some City',
            //     description: "This is a first meetup!"
            // },
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
            },
        },
    };
}
