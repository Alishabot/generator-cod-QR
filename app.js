// QR Code Generator App
class QRGenerator {
    constructor() {
        this.form = document.getElementById('qr-form');
        this.urlInput = document.getElementById('url');
        this.sizeSelect = document.getElementById('size');
        this.formatSelect = document.getElementById('format');
        this.colorInput = document.getElementById('color');
        this.resultContainer = document.getElementById('result-container');
        this.resultContent = document.getElementById('result-content');
        this.qrImage = document.getElementById('qr-image');
        this.loadingSpinner = document.getElementById('loading-spinner');
        this.copyButton = document.getElementById('copy-link');
        this.downloadButton = document.getElementById('download-qr');
        this.errorMessage = document.getElementById('url-error');
        
        this.currentQRData = null;
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.copyButton.addEventListener('click', this.copyToClipboard.bind(this));
        this.downloadButton.addEventListener('click', this.downloadQR.bind(this));
        
        // Smooth scrolling pentru linkurile din navigare
        this.setupSmoothScrolling();
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const url = this.urlInput.value.trim();
        
        if (!this.validateURL(url)) {
            this.showError('Vă rugăm să introduceți un URL complet (ex: https://example.com) sau un text cu cel puțin 3 caractere.');
            return;
        }
        
        this.clearError();
        this.showLoading(true);
        
        try {
            await this.generateQR(url);
        } catch (error) {
            console.error('Eroare la generarea QR:', error);
            this.showError('A apărut o eroare la generarea codului QR. Încercați din nou.');
            this.showLoading(false);
        }
    }
    
    validateURL(url) {
        if (!url) return false;
        
        // Edge case: URL-uri incomplete ca "https://" sau "http://"
        if (url === 'https://' || url === 'http://' || url === 'ftp://') {
            return false;
        }
        
        // Verifică dacă este un URL valid
        try {
            const urlObj = new URL(url);
            // Verifică dacă URL-ul are un hostname valid
            if (!urlObj.hostname || urlObj.hostname.length < 1) {
                return false;
            }
            return true;
        } catch {
            // Dacă nu este URL, acceptă orice text non-gol cu cel puțin 3 caractere
            return url.length >= 3;
        }
    }
    
    async generateQR(text) {
        const size = this.sizeSelect.value;
        const format = this.formatSelect.value;
        const color = this.colorInput.value.replace('#', '');
        
        // Folosim QR Server API pentru generarea codurilor QR
        const qrURL = this.buildQRURL(text, size, format, color);
        
        try {
            // Simulăm un delay pentru a arăta loading-ul
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.qrImage.src = qrURL;
            this.qrImage.onload = () => {
                this.showResult(text, size, format, qrURL);
                this.showLoading(false);
            };
            
            this.qrImage.onerror = () => {
                throw new Error('Nu s-a putut încărca imaginea QR');
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    buildQRURL(text, size, format, color) {
        const baseURL = 'https://api.qrserver.com/v1/create-qr-code/';
        const params = new URLSearchParams({
            size: size,
            data: encodeURIComponent(text),
            format: format,
            color: color,
            bgcolor: 'ffffff'
        });
        
        return `${baseURL}?${params.toString()}`;
    }
    
    showResult(url, size, format, qrURL) {
        // Ascunde placeholder-ul și arată rezultatul
        this.resultContainer.querySelector('.placeholder-message').style.display = 'none';
        this.resultContent.style.display = 'block';
        
        // Actualizează detaliile
        document.getElementById('result-url').textContent = url;
        document.getElementById('result-size').textContent = size;
        document.getElementById('result-format').textContent = format.toUpperCase();
        
        // Salvează datele pentru download
        this.currentQRData = {
            url: url,
            qrURL: qrURL,
            format: format,
            size: size
        };
    }
    
    showLoading(show) {
        if (show) {
            this.loadingSpinner.classList.add('show');
            this.qrImage.style.opacity = '0.3';
        } else {
            this.loadingSpinner.classList.remove('show');
            this.qrImage.style.opacity = '1';
        }
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
    }
    
    clearError() {
        this.errorMessage.classList.remove('show');
    }
    
    async copyToClipboard() {
        if (!this.currentQRData) return;
        
        try {
            await navigator.clipboard.writeText(this.currentQRData.qrURL);
            this.showNotification('Link copiat în clipboard!');
        } catch (error) {
            // Fallback pentru browsere mai vechi
            this.fallbackCopyToClipboard(this.currentQRData.qrURL);
        }
    }
    
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('Link copiat în clipboard!');
        } catch (error) {
            this.showNotification('Nu s-a putut copia linkul.');
        }
        
        document.body.removeChild(textArea);
    }
    
    async downloadQR() {
        if (!this.currentQRData) return;
        
        try {
            const response = await fetch(this.currentQRData.qrURL);
            const blob = await response.blob();
            
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `qr-code-${Date.now()}.${this.currentQRData.format}`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(url);
            this.showNotification('Codul QR a fost descărcat!');
        } catch (error) {
            console.error('Eroare la descărcare:', error);
            this.showNotification('Eroare la descărcarea codului QR.');
        }
    }
    
    showNotification(message) {
        // Creează o notificare temporară
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animație de intrare
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Eliminare după 3 secunde
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Inițializare aplicație când DOM-ul este gata
document.addEventListener('DOMContentLoaded', () => {
    // Inițializează generatorul QR
    new QRGenerator();
    
    // Configurează animațiile pentru cardurile de funcționalități
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Animații pentru scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Animații pentru cardurile de funcționalități
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
