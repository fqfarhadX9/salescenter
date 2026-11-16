/**
 * Lead receiver: saves each enquiry to Google Sheets AND emails it to Gmail.
 *
 * Setup:
 * 1. Create a Google Sheet. Row 1 headers:
 *    submittedAt | name | phone | email | propertyType | source | utm_source | utm_campaign | page
 * 2. Extensions → Apps Script → paste this file → Save.
 * 3. Deploy → New deployment → Web app. Execute as: Me, Who has access: Anyone.
 * 4. Copy the /exec URL into VITE_LEAD_ENDPOINT (.env or your host's env settings),
 *    then rebuild/redeploy the site.
 * To update later: Deploy → Manage deployments → edit → Version: New version (URL stays the same).
 */
const NOTIFY_EMAIL = 'mintaxmedia@gmail.com'; // comma-separate for more: 'a@x.com,b@y.com'

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // 1. Save to sheet (columns follow the header row, so you can reorder/add columns)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map((h) => data[h] || ''));

  // 2. Email alert
  const esc = (v) => String(v || '—').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);
  const rows = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Property Type', data.propertyType],
    ['Form', data.source],
    ['Campaign', [data.utm_source, data.utm_campaign].filter(Boolean).join(' / ')],
    ['Submitted', new Date(data.submittedAt).toLocaleString('en-GB', { timeZone: 'Asia/Dubai' })],
  ];
  const phoneDigits = String(data.phone || '').replace(/\D/g, '');
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px">
      <h2 style="color:#0B1B33;margin:0 0 12px">New Villa Enquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px;border-bottom:1px solid #eee;color:#777;width:140px">${k}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">${esc(v)}</td>
          </tr>`,
          )
          .join('')}
      </table>
      <p style="margin-top:16px">
        <a href="tel:+${phoneDigits}" style="background:#B08D46;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">Call now</a>
        &nbsp;
        <a href="https://wa.me/${phoneDigits}" style="background:#25D366;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">WhatsApp</a>
      </p>
    </div>`;

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: `New Lead: ${data.name} – ${data.propertyType}`,
    htmlBody: html,
    replyTo: data.email,
  });

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
