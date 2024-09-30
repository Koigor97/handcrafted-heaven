/**
 * Resend Email Service Configuration
 *
 * This module initializes and exports an instance of the Resend email service.
 * Resend is used for sending transactional emails in the application.
 *
 * The Resend API key is fetched from the environment variable RESEND_API_KEY.
 * Ensure this environment variable is set before using this module.
 *
 * Usage:
 * import resend from './resend';
 * await resend.emails.send({
 *   from: 'onboarding@resend.dev',
 *   to: 'user@example.com',
 *   subject: 'Hello World',
 *   html: '<p>Congrats on sending your first email!</p>'
 * });
 *
 * @module resend
 * @requires resend
 */

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// exporting  the function
export default resend;
