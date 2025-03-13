#!/usr/bin/env node
import { Command } from "commander";
import cron from "cron";
import { exec } from "child_process";
import fs from "fs";
import { sendEmail } from "./email";

const program = new Command();

interface JobOptions {
  log?: string;
  onFailEmail?: string;
  retry?: number;
  onOutput?: Record<string, string>;
}

const logOutput = (filePath: string, data: string) => {
  fs.appendFileSync(filePath, `${new Date().toISOString()} - ${data}\n`);
};

const executeScript = async (
  scriptPath: string,
  options: JobOptions,
  attempt = 1
): Promise<void> => {
  exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
    if (options.log) {
      logOutput(options.log, stdout || stderr);
    }

    if (error) {
      if (options.onFailEmail) {
        sendEmail({
          host: process.env.SMTP_HOST || "",
          port: Number(process.env.SMTP_PORT) || 465,
          username: process.env.SMTP_USER || "",
          password: process.env.SMTP_PASS || "",
          from: process.env.SMTP_USER || "",
          to: options.onFailEmail,
          subject: "Cron Job Failed",
          message: `Error: ${stderr}`,
        });
      }

      if (options.retry && attempt <= options.retry) {
        console.log(`Retrying (${attempt}/${options.retry})...`);
        executeScript(scriptPath, options, attempt + 1);
      }
    } else if (stdout && options.onOutput) {
      Object.entries(options.onOutput).forEach(([key, action]) => {
        if (stdout.includes(key)) {
          if (action === "notify" && options.onFailEmail) {
            sendEmail({
              host: process.env.SMTP_HOST || "",
              port: Number(process.env.SMTP_PORT) || 465,
              username: process.env.SMTP_USER || "",
              password: process.env.SMTP_PASS || "",
              from: process.env.SMTP_USER || "",
              to: options.onFailEmail,
              subject: "Cron Job Output Notification",
              message: `Output matched: ${key}`,
            });
          }
        }
      });
    }
  });
};

program
  .command("schedule")
  .description("Schedule a cron job")
  .argument("<script>", "Path to the shell script")
  .argument("<cron>", "Cron expression")
  .option("--log <log>", "Log file path")
  .option("--on-fail-email <email>", "Email to notify on failure")
  .option("--retry <number>", "Number of retries on failure", parseInt)
  .option("--on-output <output>", "Output condition actions, e.g., 'success:notify,fail:retry'")
  .action((script, cronExpression, options) => {
    const jobOptions: JobOptions = {
      log: options.log,
      onFailEmail: options.onFailEmail,
      retry: options.retry || 0,
      onOutput: options.onOutput
        ? Object.fromEntries(options.onOutput.split(",").map((pair: string) => pair.split(":")))
        : {},
    };

    const job = new cron.CronJob(cronExpression, () => {
      executeScript(script, jobOptions);
    });

    job.start();
    console.log(`Scheduled ${script} with cron: '${cronExpression}'`);
  });

program.parse(process.argv);
