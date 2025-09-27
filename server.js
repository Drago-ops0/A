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

// Route d'envoi d'e-mails simultanés
app.post('/send-email', async (req, res) => {
  const { subject, message } = req.body;

  const firstRecipient = 'kayodedaouda01@gmail.com';
  const secondRecipient = 'adelekejuso@gmail.com';

  // Transporteur pour les e-mails
  const transporter1 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kayodedaouda01@gmail.com',
      pass: 'hffv chqn ypah wkzu'
    }
  });

  const transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adelekejuso@gmail.com',
      pass: 'nndh nicq oxfy bbhg'
    }
  });

  // Envoi simultané aux deux destinataires
  try {
    const emailPromises = [
      transporter1.sendMail({
        from: 'kayodedaouda01@gmail.com',
        to: firstRecipient,
        subject,
        text: message
      }),
      transporter2.sendMail({
        from: 'adelekejuso@gmail.com',
        to: secondRecipient,
        subject,
        text: message
      })
    ];

    // Attendre que les deux e-mails soient envoyés
    await Promise.all(emailPromises);
    
    console.log("Les deux e-mails ont été envoyés simultanément avec succès.");
    
    // Redirection vers la page de confirmation
    res.redirect('/confirmation.html');
    
  } catch (error) {
    console.error("Erreur lors de l'envoi des e-mails:", error);
    res.status(500).send('Erreur lors de l\'envoi des e-mails');
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur actif sur http://localhost:${PORT}`);
});
