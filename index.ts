import { CronJob } from "cron";
import { exec } from "child_process";
import { Command } from "commander";
import { access, constants } from "fs";

// Initialize Commander for CLI
const program = new Command();
program
  .name("cron-scheduler")
  .description("A CLI tool to schedule cron jobs for shell scripts")
  .version("1.0.0");

// Define the command to schedule a cron job
program
  .command("schedule")
  .description("Schedule a cron job to run a shell script")
  .argument("<script>", "Path to the .sh script")
  .argument("<cronExpression>", "Cron expression to schedule the job")
  .action((script: string, cronExpression: string) => {
    // Validate the script exists
    access(script, constants.F_OK, (err: any) => {
      if (err) {
        console.error(`Script file not found: ${script}`);
        process.exit(1);
      }

      // Schedule the cron job using the provided cron expression
      const job = new CronJob(cronExpression, () => {
        console.log(`Executing cron job for script: ${script}`);

        // Execute the shell script using child_process
        exec(`bash ${script}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        });
      });

      job.start();

      console.log(`Scheduled job for script: ${script} with cron expression: ${cronExpression}`);
    });
  });

program.parse(process.argv);
