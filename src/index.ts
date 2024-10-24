import { exec } from "child_process";

const common = `./src/tests/features/*.feature \
--require-module ts-node/register \
--require ./src/tests/**/**/*.ts \
-f json:./src/report/report.json \
--format html:./src/report/report.html \
--tags "not @ignore"`;

interface ProfileCommands {
  [key: string]: string;
}

const profiles: ProfileCommands = {
  smoke: `${common} --tags "@smoke"`,
  regression: `${common} --tags "@regression"`,
  login: `${common} --tags "@login"`,
  contactUs: `${common} --tags "@contact-us"`,
};

const profile = process.argv[2];

let command = `npx cucumber-js ${
  profiles[profile as "smoke" | "regression" | "login" | "contact-us"]
}`;

exec(command, { encoding: "utf-8" }, (error: Error | null, stdout: string) => {
  console.log(stdout);

  if (error) {
    throw new Error("some error");
  }
});
