import tls from "tls";

export const sendEmail = (options: {
  host: string;
  port: number;
  username: string;
  password: string;
  from: string;
  to: string;
  subject: string;
  message: string;
}) => {
  const { host, port, username, password, from, to, subject, message } = options;

  const client = tls.connect(port, host, { rejectUnauthorized: false }, () => {
    client.write(`EHLO ${host}\r\n`);
    client.write(`AUTH LOGIN\r\n`);
    client.write(`${Buffer.from(username).toString("base64")}\r\n`);
    client.write(`${Buffer.from(password).toString("base64")}\r\n`);
    client.write(`MAIL FROM:<${from}>\r\n`);
    client.write(`RCPT TO:<${to}>\r\n`);
    client.write(`DATA\r\n`);
    client.write(`Subject: ${subject}\r\n`);
    client.write(`From: ${from}\r\n`);
    client.write(`To: ${to}\r\n\r\n`);
    client.write(`${message}\r\n.\r\n`);
    client.write(`QUIT\r\n`);
  });

  client.on("data", (data) => {
    console.log(data.toString());
  });

  client.on("end", () => {
    console.log("Disconnected from SMTP server");
  });

  client.on("error", (err) => {
    console.error("SMTP Error:", err);
  });
};
