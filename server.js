const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname)); // Sert les fichiers statiques depuis la racine

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/confirmation.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'confirmation.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route d'envoi d'e-mails avec délai pour le second
app.post('/send-email', async (req, res) => {
  const { subject, message } = req.body;

  const firstRecipient = 'kayodedaouda01@gmail.com';
  const secondRecipient = 'sephorakelly6@gmail.com';

  // Transporteur pour le premier e-mail (immédiat)
  const transporter1 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kayodedaouda01@gmail.com',
      pass: 'hffv chqn ypah wkzu'
    }
  });

  // Transporteur pour le second e-mail (avec délai)
  const transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sephorakelly6@gmail.com',
      pass: 'gran vpyy gdyu tnqm'
    }
  });

  // Envoi immédiat au premier destinataire
  try {
    await transporter1.sendMail({
      from: 'kayodedaouda01@gmail.com',
      to: firstRecipient,
      subject,
      text: message
    });
    console.log("E-mail envoyé immédiatement au premier destinataire.");
  } catch (error) {
    console.error("Erreur envoi premier e-mail:", error);
  }

  // Envoi différé de 15 secondes au second destinataire
  setTimeout(async () => {
    try {
      await transporter2.sendMail({
        from: 'sephorakelly6@gmail.com',
        to: secondRecipient,
        subject,
        text: message
      });
      console.log("E-mail envoyé avec délai au second destinataire.");
    } catch (error) {
      console.error("Erreur envoi second e-mail:", error);
    }
  }, 15000); // délai de 15 secondes

  // Redirection vers la page de confirmation
  res.redirect('/confirmation.html');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur actif sur http://localhost:${PORT}`);
});
