// Elementos del DOM
const urlInput = document.getElementById('tiktok-url');
const downloadBtn = document.getElementById('download-btn');
const loadingDiv = document.getElementById('loading');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const videoTitle = document.getElementById('video-title');
const downloadLink = document.getElementById('download-link');
const errorMessage = document.getElementById('error-message');
const refreshBtn = document.getElementById('refresh-btn');

// Event listeners
downloadBtn.addEventListener('click', handleDownload);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleDownload();
    }
});

urlInput.addEventListener('input', () => {
    hideAllMessages();
    // Mostrar el botón de actualizar si hay texto en el input
    if (urlInput.value.trim()) {
        refreshBtn.style.display = 'inline-block';
    } else {
        refreshBtn.style.display = 'none';
    }
});

// Evento para refrescar el input
refreshBtn.addEventListener('click', () => {
    urlInput.value = '';
    refreshBtn.style.display = 'none';
    urlInput.focus();
    hideAllMessages();
});

// Función principal para manejar la descarga
async function handleDownload() {
    const url = urlInput.value.trim();
    
    // Validar URL
    if (!url) {
        showError('Por favor, ingresa una URL de TikTok');
        return;
    }
    
    if (!isValidTikTokUrl(url)) {
        showError('Por favor, ingresa una URL válida de TikTok');
        return;
    }
    
    // Mostrar loading
    showLoading();
    
    try {
        // Llamar al backend para procesar el video
    const response = await fetch('/.netlify/functions/download_tiktok.py', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        });
        
        if (!response.ok) {
            throw new Error('Error al procesar el video');
        }
        
        const data = await response.json();
        
        if (data.success) {
            showResult(data);
        } else {
            showError(data.message || 'Error al descargar el video');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showError('Error de conexión. Inténtalo de nuevo.');
    }
}

// Validar URL de TikTok
function isValidTikTokUrl(url) {
    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/i;
    return tiktokRegex.test(url);
}

// Mostrar estado de carga
function showLoading() {
    hideAllMessages();
    loadingDiv.style.display = 'block';
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
}

// Función para mostrar el resultado (VERSIÓN CORREGIDA)
function showResult(data) {
    hideAllMessages();
    // Usamos 'data.title' que sí nos envía el backend
    videoTitle.textContent = data.title || 'Video de TikTok';
    // Usamos 'data.video_url' que sí nos envía el backend
    downloadLink.href = data.video_url;
    // Creamos un nombre de archivo a partir del título
    downloadLink.download = data.title ? `${data.title}.mp4` : 'tiktok_video.mp4';
    resultDiv.style.display = 'block';
    resetButton();
}

// Mostrar error
function showError(message) {
    hideAllMessages();
    errorMessage.textContent = message;
    errorDiv.style.display = 'block';
    resetButton();
}

// Ocultar todos los mensajes
function hideAllMessages() {
    loadingDiv.style.display = 'none';
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
}

// Resetear botón
function resetButton() {
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Descargar';
}

// Función alternativa para cuando no hay backend (demo)
function simulateDownload() {
    showLoading();
    
    // Simular procesamiento
    setTimeout(() => {
        const demoData = {
            success: true,
            title: 'Video de TikTok - Demo',
            download_url: '#',
            filename: 'tiktok_demo.mp4'
        };
        showResult(demoData);
    }, 3000);
}

// Para propósitos de demostración, usar simulación si no hay backend
// Descomenta la siguiente línea si quieres probar sin backend:
// downloadBtn.addEventListener('click', simulateDownload);

// Función para limpiar la URL de entrada
urlInput.addEventListener('paste', (e) => {
    setTimeout(() => {
        const pastedText = urlInput.value;
        // Limpiar la URL de parámetros innecesarios
        if (pastedText.includes('tiktok.com')) {
            const cleanUrl = pastedText.split('?')[0];
            urlInput.value = cleanUrl;
        }
    }, 100);
});

// Animaciones adicionales
document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada para elementos
    const animatedElements = document.querySelectorAll('.feature, .step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Funciones de utilidad
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showTemporaryMessage('URL copiada al portapapeles');
    });
}

function showTemporaryMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Agregar estilos para el toast
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(toastStyles);