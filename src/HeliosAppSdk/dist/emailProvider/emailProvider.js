import { Email } from 'HeliosAppSdk/dist/emailProvider/smtp';
import { getShiftMark } from '../helpers/helpers';

export const handleSendEmail = (to, subject, body) => {
  return Email.send({
    Host: 'smtp.gmail.com',
    Username: process.env.REACT_APP_EMAIL_PROVIDER_LOGIN,
    Password: process.env.REACT_APP_EMAIL_PROVIDER_PASSWORD,
    To: to,
    From: 'heliosdispomail@gmail.com',
    Subject: subject,
    Body: body,
  });
};

const generateBodyFromDispo = (currentUser, appState, disposition, message, days) => {
  const { firstName, lastName, alias, email } = currentUser;
  const { day1, day2, day3, day4, day5, day6, day7 } = disposition;
  const dispositions = [day1, day2, day3, day4, day5, day6, day7];
  const daysRespond = [];

  dispositions.forEach((dispo, i) => {
    const x = days[i].split(' ');
    const day = `(${x[0].slice(0, 2)}) ${x[1].slice(3, 5)}.${x[1].slice(0, 2)} : ${getShiftMark(
      dispo,
      true,
    )}`;
    daysRespond.push(day);
  });

  const br = '<br>';
  const title = `Dyspozycja na okres ${appState.date1}-${appState.date2}`;
  const body = daysRespond.join(br);
  const sign = `${br}${br}${br}${br}Imie i naziwsko: ${firstName} ${lastName}${br}Alias: ${alias}${br}Email: ${email}`;

  const respond = {
    subject: `Dyspo ${appState.date1}-${appState.date2}`,
    message: `${title}${br}${body}${br}${br}${message}${br}${sign}`,
  };

  return respond;
};

export const emailProvider = {
  handleSendEmail,
  generateBodyFromDispo,
};
