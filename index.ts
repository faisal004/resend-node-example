import { Resend } from 'resend';
const resend = new Resend('re_G8oHxfne_7MgPC9C561U3ARDv1TYoVUHU');
const resend2 = new Resend('re_gLfrUHwc_8DjdtTz785w27g3mkqx5a9Rj');


(async function() {
  try {
    const data = await resend.emails.send({
      from: 'Kramaankh <noreply@kramaankh.com>',
      to: ['tannigupta31@gmail.com'],
      subject: 'Welcome to Kramaankh!',
      html: '<strong>Kya haal tanishq bhai?</strong>'
    });
    const data2 = await resend2.emails.send({
      from: 'Kramaankh <noreply@uicraft.in>',
      to: ['faisalhusain1320@gmail.com'],
      subject: 'Welcome to UICraft!',
      html: '<strong>Kya haal faisal bhai?</strong>'
    });

    console.log(data);
    console.log(data2);
  } catch (error) {
    console.error(error);
  }
})();
