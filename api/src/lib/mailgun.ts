import Mailgun from "mailgun.js";
import formData from "form-data";

export interface QuoteEmailData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

const projectTypeLabels: Record<string, string> = {
  "web-application": "Web Application",
  "mobile-app": "Mobile App",
  "api-development": "API Development",
  "consulting": "Technical Consulting",
  "system-integration": "System Integration",
  "other": "Other",
};

const budgetLabels: Record<string, string> = {
  "under-10k": "Under $10,000",
  "10k-25k": "$10,000 - $25,000",
  "25k-50k": "$25,000 - $50,000",
  "50k-100k": "$50,000 - $100,000",
  "over-100k": "Over $100,000",
  "discuss": "Let's Discuss",
};

export async function sendQuoteEmail(data: QuoteEmailData): Promise<void> {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const recipientEmail = process.env.RECIPIENT_EMAIL || "wolfy@wolfymaster.com";

  if (!apiKey || !domain) {
    throw new Error("Mailgun configuration missing");
  }

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: apiKey,
  });

  const projectTypeLabel = projectTypeLabels[data.projectType] || data.projectType;
  const budgetLabel = budgetLabels[data.budget] || data.budget;

  const htmlBody = `
    <h2>New Quote Request from wolfymaster.com</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
        <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Project Type</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(projectTypeLabel)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Budget</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(budgetLabel)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.message).replace(/\n/g, "<br>")}</td>
      </tr>
    </table>
  `;

  const textBody = `
New Quote Request from wolfymaster.com

Name: ${data.name}
Email: ${data.email}
Project Type: ${projectTypeLabel}
Budget: ${budgetLabel}

Message:
${data.message}
  `.trim();

  await mg.messages.create(domain, {
    from: `Quote Form <noreply@${domain}>`,
    to: [recipientEmail],
    subject: `New Quote Request: ${projectTypeLabel} - ${data.name}`,
    text: textBody,
    html: htmlBody,
    "h:Reply-To": data.email,
  });
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
