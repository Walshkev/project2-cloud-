require("dotenv").config();
const { MongoClient } = require("mongodb");

const envVars = {
    host: "MONGO_HOST",
    port: "MONGO_PORT",
    rootUser: "MONGO_ROOT_USER",
    rootPassword: "MONGO_ROOT_PASSWORD",
    database: "MONGO_DATABASE",
    user: "MONGO_USER",           // <-- Added
    password: "MONGO_PASSWORD"    // <-- Added
};

const parseEnvVars = () => {
    const keys = Object.keys(envVars);
    const vars = {};
    const missing = [];

    for (const key of keys) {
        const envVarKey = envVars[key];

        if (process.env[envVarKey]) {
            vars[key] = process.env[envVarKey];
        } else {
            missing.push(envVars[key]);
        }
    }

    return { vars, missing };
};

const initialize = async () => {
    console.log("Initialization started.");

    const { vars, missing } = parseEnvVars();

    if (missing.length > 0) {
        console.error(`Please set the following environment variables: ${missing.join(", ")}`)
        return;
    }

    const url = `mongodb://${vars.rootUser}:${vars.rootPassword}@${vars.host}:${vars.port}`;
    
    console.log(`Connecting to ${url}.`);
    const client = await MongoClient.connect(url);

    console.log(`Creating database "${vars.database}".`);
    const db = await client.db(vars.database);

    console.log(`Creating user "${vars.user}" with password "${vars.password}".`);
    await db.command({
        createUser: vars.user,
        pwd: vars.password,
        roles: [{ role: "readWrite", db: vars.database }]
    });

    client.close();
    
    console.log("Initialization done.");
}

initialize();