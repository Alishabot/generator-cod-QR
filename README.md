# Generator Coduri QR 🔗

Un generator modern de coduri QR în limba română, cu interfață elegantă și funcționalități complete.

![QR Generator](https://img.shields.io/badge/QR-Generator-blue)
![Romanian](https://img.shields.io/badge/Language-Romanian-red)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Funcționalități

- ⚡ **Rapid și Simplu** - Generează coduri QR în mai puțin de 5 secunde
- 🎨 **Personalizabil** - Alege dimensiunea, formatul și culoarea
- 📥 **Descărcare Rapidă** - Salvează în PNG, SVG sau JPEG
- 📋 **Copiere Link** - Copiază linkul codului QR în clipboard
- 📱 **Responsive** - Funcționează perfect pe toate dispozitivele
- 🔧 **Fără înregistrare** - Folosește direct, fără cont

## 🚀 Demo Live

Vizitează site-ul live: [QR Generator](https://alishabot.github.io/generator-cod-QR/)

## 📸 Screenshots

### Pagina Principală
Interfață modernă cu design gradient și animații fluide.

### Generator QR
Formular simplu cu opțiuni de personalizare complete.

## 🛠️ Tehnologii Folosite

- **HTML5** - Structura semantică
- **CSS3** - Design modern cu CSS Grid și Flexbox
- **JavaScript ES6+** - Funcționalitate interactivă
- **QR Server API** - Generarea codurilor QR
- **Font Awesome** - Iconuri vectoriale

## 🏃‍♂️ Cum să rulezi local

1. **Clonează repository-ul**
   ```bash
   git clone https://github.com/Alishabot/generator-cod-QR.git
   cd generator-cod-QR
   ```

2. **Pornește un server local**
   ```bash
   # Cu Python
   python -m http.server 3000
   
   # Cu Node.js
   npx live-server --port=3000
   
   # Sau deschide direct index.html în browser
   ```

3. **Vizitează aplicația**
   ```
   http://localhost:3000
   ```

## 📁 Structura Proiectului

```
generator-cod-QR/
├── index.html          # Pagina principală
├── styles.css          # Stiluri CSS
├── app.js             # Logica JavaScript
├── logo.svg           # Logo-ul aplicației
├── hero-image.svg     # Imaginea hero
└── README.md          # Documentația
```

## 🎯 Caracteristici Tehnice

### Design
- **Mobile-first** - Optimizat pentru dispozitive mobile
- **CSS Grid & Flexbox** - Layout modern și flexibil
- **CSS Variables** - Sistem de culori consistent
- **Smooth animations** - Tranziții fluide și profesionale

### Funcționalitate
- **Form validation** - Validare în timp real
- **Error handling** - Gestionarea erorilor elegantă
- **Loading states** - Feedback vizual pentru utilizator
- **Clipboard API** - Copiere modernă în clipboard
- **File download** - Descărcare automată a fișierelor

### Performance
- **Lightweight** - Fără framework-uri grele
- **Fast loading** - Optimizat pentru viteză
- **SEO friendly** - Meta tags și structură semantică

## 🔧 Customizare

### Culori
Modifică variabilele CSS din `:root` pentru a schimba schema de culori:

```css
:root {
    --primary-color: #4361ee;
    --secondary-color: #4cc9f0;
    --text-color: #333;
}
```

### API QR
Aplicația folosește [QR Server API](https://goqr.me/api/). Pentru volume mari, poți înlocui cu:
- QR Code API
- Google Charts API
- Biblioteca qrcode.js pentru generare locală

## 🤝 Contribuții

Contribuțiile sunt binevenite! Pentru schimbări majore:

1. Fork repository-ul
2. Creează o ramură pentru feature (`git checkout -b feature/AmazingFeature`)
3. Commit schimbările (`git commit -m 'Add some AmazingFeature'`)
4. Push pe ramură (`git push origin feature/AmazingFeature`)
5. Deschide un Pull Request

## 📝 Licență

Acest proiect este licențiat sub licența MIT - vezi fișierul [LICENSE](LICENSE) pentru detalii.

## 👤 Autor

**Alishabot**
- GitHub: [@Alishabot](https://github.com/Alishabot)
- Repository: [generator-cod-QR](https://github.com/Alishabot/generator-cod-QR)

## 🙏 Mulțumiri

- [QR Server API](https://goqr.me/api/) pentru serviciul de generare QR
- [Font Awesome](https://fontawesome.com/) pentru iconuri
- Comunitatea open-source pentru inspirație

---

⭐ **Dacă proiectul ți-a fost util, lasă o stea pe GitHub!** ⭐
