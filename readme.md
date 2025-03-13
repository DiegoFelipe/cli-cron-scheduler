# 🕰️ Cron Scheduler CLI

By Diego Felipe (<diegofelipe.14@gmail.com>)

A powerful and flexible CLI tool to schedule cron jobs, handle retries, log outputs, and send email notifications on failures or specific outputs.

## 🚀 Features

- **Schedule Cron Jobs** with custom scripts.
- **Retry Mechanism** for failed jobs.
- **Email Notifications** on failure or specific output conditions.
- **Logging** of job outputs to a file.

---

## ⚙️ Installation

```bash
npm install -g cron-scheduler
```

---

## 🔧 Setup

1. Create a `.env` file in your project root based on the provided `.env.sample`:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

2. Ensure that your shell script files have executable permissions:

```bash
chmod +x your-script.sh
```

---

## 📖 Usage

### 1. **Schedule a Job**

```bash
cron-scheduler schedule ./backup.sh "0 0 * * *" --log ./backup.log --on-fail-email user@example.com --retry 3 --on-output "success:notify,fail:retry"
```

- `./backup.sh`: Path to your shell script.
- `"0 0 * * *"`: Cron expression (daily at midnight).
- `--log`: (Optional) Path to the log file.
- `--on-fail-email`: (Optional) Email address to notify on failure.
- `--retry`: (Optional) Number of retry attempts on failure.
- `--on-output`: (Optional) Define output conditions and actions.
  - Example: `"success:notify,fail:retry"`

## ✅ Examples

### Example 1: Basic Job with Logging

```bash
cron-scheduler schedule ./script.sh "*/5 * * * *" --log ./script.log
```

- Runs the script every 5 minutes and logs the output.

### Example 2: Notify on Failure

```bash
cron-scheduler schedule ./script.sh "0 1 * * *" --on-fail-email admin@example.com
```

- Runs the script daily at 1 AM and sends an email if it fails.

### Example 3: Retry on Failure and Notify on Success

```bash
cron-scheduler schedule ./script.sh "0 12 * * 1" --retry 2 --on-output "success:notify"
```

- Runs every Monday at noon, retries twice on failure, and notifies on success.

---

## 📄 Environment Variables

Ensure these are correctly configured in your `.env` file:

- `SMTP_HOST`: SMTP server host.
- `SMTP_PORT`: SMTP server port (e.g., 465 for SSL).
- `SMTP_USER`: SMTP username (usually your email).
- `SMTP_PASS`: SMTP password.

---

## ❓ Troubleshooting

- **Email Not Sending**: Check SMTP configurations in your `.env` file.
- **Script Not Executing**: Ensure the script has executable permissions (`chmod +x`).
- **Global CLI Not Recognized**: Try re-installing globally with `npm install -g cron-scheduler` and ensure your system PATH includes npm global binaries.

---

## 📬 Contributions

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)
