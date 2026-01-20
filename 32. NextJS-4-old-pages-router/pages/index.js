import Head from "next/head";
import { MeetupList } from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image:
//             'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!',
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image:
//             'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 10, 12345 Some City',
//         description: 'This is a second meetup!',
//     },
// ];

export default function HomePage({ meetups }) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
            </Head>
            <MeetupList meetups={meetups} />
        </>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     };
// }

export async function getStaticProps() {
    //fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://<db_user>:<db_password>@nextjs.rkfsxv9.mongodb.net/meetups?appName=NextJS')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
            })),
        },
        revalidate: 1 //in seconds
    }
}
