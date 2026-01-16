const sql = require('better-sqlite3');
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
