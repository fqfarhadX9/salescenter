/**
 * Lead receiver: saves each enquiry to Google Sheets AND emails it to Gmail.
 *
 * Setup:
 * 1. Create a Google Sheet. Row 1 headers:
 *    submittedAt | project | name | phone | email | purpose | source | utm_source | utm_campaign | page
 * 2. Extensions → Apps Script → paste this file → Save.
 * 3. Deploy → New deployment → Web app. Execute as: Me, Who has access: Anyone.
 * 4. Copy the /exec URL into leadEndpoint in src/config/site.js, then rebuild/redeploy the site.
 *    Test: open the /exec URL in a browser - you should see "OK - DAMAC lead receiver is running".
 * To update later: Deploy → Manage deployments → edit → Version: New version (URL stays the same).
 */
// All addresses go inside ONE pair of quotes, separated by commas
const NOTIFY_EMAIL = 'mintaxmedia@gmail.com';

// EMAIL NOT ARRIVING? In the Apps Script editor pick "testEmail" in the function
// dropdown (top bar) and press Run. Allow access if asked, then check both inboxes
// (and Spam). Any error shows in the Execution log at the bottom.
function testEmail() {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'Test: DAMAC lead alerts are working',
    htmlBody: '<p>If you can read this, new website leads will be emailed to: ' + NOTIFY_EMAIL + '</p>',
  });
  Logger.log('Test email sent to: ' + NOTIFY_EMAIL + ' | Emails left today: ' + MailApp.getRemainingDailyQuota());
}

// Open the /exec URL in a browser to check the script is deployed and reachable.
function doGet() {
  return ContentService.createTextOutput('OK - DAMAC lead receiver is running. Leads go to the sheet and to: ' + NOTIFY_EMAIL);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // 1. Save to sheet (columns follow the header row, so you can reorder/add columns)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map((h) => data[h] || ''));

  // 2. Email alert
  const esc = (v) => String(v || '—').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);
  const rows = [
    ['Project', data.project],
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Purpose', data.purpose],
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

  // The lead is already saved above, so an email problem never loses it.
  // Errors show under Executions (left sidebar) in the Apps Script editor.
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: `New Lead [${data.project || 'website'}]: ${data.name} – ${data.purpose}`,
      htmlBody: html,
      replyTo: data.email,
    });
  } catch (err) {
    console.error('Lead email failed: ' + err);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
