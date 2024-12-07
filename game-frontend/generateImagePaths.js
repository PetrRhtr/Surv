import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Um __dirname zu simulieren, da es in ESM nicht verfügbar ist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basisverzeichnis für die Bilder
const directory = path.join(__dirname, "public/images/hero/Warrior_animations");

// Funktion, um alle Dateien in einem Verzeichnis rekursiv zu lesen
const getFilePaths = (dir) => {
    let fileList = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            fileList = fileList.concat(getFilePaths(filePath)); // Rekursiver Aufruf für Unterordner
        } else {
            fileList.push(filePath.replace(__dirname, "").replace(/\\/g, "/"));
        }
    });

    return fileList;
};

// Definiere Animationen basierend auf der Ordnerstruktur
const animations = {
    left: {
        walk: getFilePaths(path.join(directory, "Left_Side/Walk")),
        attack: getFilePaths(path.join(directory, "Left_Side/Attack_1")),
        run: getFilePaths(path.join(directory, "Left_Side/Run")),
        hurt: getFilePaths(path.join(directory, "Left_Side/Hurt")),
        idleBlinking: getFilePaths(path.join(directory, "Left_Side/Idle")),
        died: getFilePaths(path.join(directory, "Left_Side/Died")),
    },
    right: {
        walk: getFilePaths(path.join(directory, "Right_Side/Walk")),
        attack: getFilePaths(path.join(directory, "Right_Side/Attack_1")),
        run: getFilePaths(path.join(directory, "Right_Side/Run")),
        hurt: getFilePaths(path.join(directory, "Right_Side/Hurt")),
        idleBlinking: getFilePaths(path.join(directory, "Right_Side/Idle")),
        died: getFilePaths(path.join(directory, "Right_Side/Died")),
    },
    up: {
        walk: getFilePaths(path.join(directory, "Back/Walk")),
        attack: getFilePaths(path.join(directory, "Back/Attack_1")),
        run: getFilePaths(path.join(directory, "Back/Run")),
        hurt: getFilePaths(path.join(directory, "Back/Hurt")),
        idleBlinking: getFilePaths(path.join(directory, "Back/Idle")),
        died: getFilePaths(path.join(directory, "Back/Died")),
    },
    down: {
        walk: getFilePaths(path.join(directory, "Front/Walk")),
        attack: getFilePaths(path.join(directory, "Front/Attack_1")),
        run: getFilePaths(path.join(directory, "Front/Run")),
        hurt: getFilePaths(path.join(directory, "Front/Hurt")),
        idleBlinking: getFilePaths(path.join(directory, "Front/Idle")),
        died: getFilePaths(path.join(directory, "Front/Died")),
    },
};

// Ausgabe der Pfade in einer JSON-Datei
fs.writeFileSync(
    path.join(__dirname, "imageFrames.json"),
    JSON.stringify(animations, null, 4)
);
console.log("Die ImageFrames wurden generiert und in imageFrames.json gespeichert.");
