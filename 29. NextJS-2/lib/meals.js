import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
// import { S3 } from '@aws-sdk/client-s3';

// const s3 = new S3({
//     region: 'us-east-1'
// });
const db = sql('meals.db');

export async function getMeals() {
    await new Promise((res) => {
        setInterval(() => {
            res()
        }, 1000);
    })

    // throw new Error("Loading meals failed");

    return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(id) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(id);
}

export async function saveMeal(meal) {
    await new Promise((res) => {
        setInterval(() => {
            res()
        }, 2000);
    })

    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error("Saving image failed!");
        }
    });
    // s3.putObject({
    //     Bucket: 'maxschwarzmueller-nextjs-demo-users-image',
    //     Key: fileName,
    //     Body: Buffer.from(bufferedImage),
    //     ContentType: meal.image.type,
    // });

    meal.image = `/images/${fileName}`;
    // meal.image = fileName;

    return db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `).run(meal);
}
