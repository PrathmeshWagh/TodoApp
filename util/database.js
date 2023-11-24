import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('places.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        lat REAL ,
        lng REAL 
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error)
        }
      );
    });
  })
  return promise
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(`
        INSERT INTO places (title, imageUri, lat, lng)
        VALUES (?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.location ? place.location.lat : null,
          place.location ? place.location.lng : null,
        ],
        (_, result) => {
          console.log(result)
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  });

  return promise
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(`SELECT * FROM places`,
        [],

        (_, result) => {
          console.log(result)
          resolve(result)
        },

        (_, error) => {
          reject(error);
        }
      );
    })
  })
  return promise
}