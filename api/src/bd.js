import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const _carpetaAct = path.dirname(fileURLToPath(import.meta.url));
const rutaDb = path.join(_carpetaAct, "..", "datos", "tienda.db");

const db = new DatabaseSync(rutaDb);
db.exec("PRAGMA foreign_keys = ON;");

export default db;

