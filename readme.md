# 🖥️ Cron Scheduler CLI By Diego Felipe (<diegofelipe.14@gmail.com>)

A simple and modern CLI tool to schedule and execute cron jobs for shell scripts. This package allows you to schedule cron jobs directly from the command line, executing shell scripts at specified intervals.

## Features

- Schedule cron jobs using cron expressions.
- Run shell scripts at specified intervals.
- Simple and easy-to-use CLI interface.
- Built with TypeScript and the `cron` package for reliability and type safety.

## 📦 Installation

To install the Cron Scheduler CLI, simply install it globally via npm:

```bash
npm install -g cron-scheduler
```

## Usage

Schedule a Cron Job
To schedule a cron job, use the schedule command with two arguments:

script: The path to the shell script you want to run.
cronExpression: The cron expression defining the schedule (e.g., \* \* \* \* \* for every minute).
Example usage:

```bash
cron-scheduler schedule /path/to/your/script.sh "* * * * *"
```

This command will run your script.sh every minute.

## Example Cron Expressions

```bash
* * * * *: Every minute.
0 * * * *: Every hour at the start of the hour.
0 0 * * *: Every day at midnight.
0 0 * * 0: Every Sunday at midnight.
```

Example Shell Script
Here’s a simple shell script (script.sh) that could be executed by the scheduler:

```bash
#!/bin/bash
echo "Hello, Cron!"
```

Make sure to give execute permissions to your shell script:

```bash
chmod +x /path/to/your/script.sh
```

## Development

If you want to contribute to this project or modify it for your needs, follow the steps below.

### Prerequisites

- Node.js (>=14.x.x)
- npm (>=6.x.x)

### Clone the Repository

```bash
git clone https://github.com/DiegoFelipe/cron-scheduler.git
cd cron-scheduler
```

### Install Dependencies

```bash
npm install
```

## Build the Project

To compile the TypeScript code into JavaScript:

```bash
npm run build
```
