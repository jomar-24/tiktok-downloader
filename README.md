# LIGHT.CH.G - Descargador de TikTok sin Marca de Agua

Una aplicación web moderna para descargar videos de TikTok sin marca de agua, construida con Flask (Python) en el backend y HTML/CSS/JavaScript en el frontend.

## 🚀 Características

- ✅ Descarga videos de TikTok sin marca de agua
- ✅ Interfaz moderna y responsive
- ✅ Proceso rápido y fácil
- ✅ Compatible con todos los navegadores
- ✅ API REST para integraciones
- ✅ Limpieza automática de archivos temporales

## 📋 Requisitos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- ffmpeg (para procesamiento de video)

## 🛠️ Instalación

### Método 1: Instalación Local

1. **Clonar o descargar los archivos**
```bash
# Si usas git
git clone <tu-repositorio>
cd tiktok-downloader

# O simplemente descarga todos los archivos en una carpeta
```

2. **Instalar Python y pip**
- Descarga Python desde [python.org](https://python.org)
- Asegúrate de que pip esté instalado

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Instalar ffmpeg**

**Windows:**
- Descarga desde [ffmpeg.org](https://ffmpeg.org/download.html)
- Añade ffmpeg al PATH del sistema

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

5. **Ejecutar la aplicación**
```bash
python app.py
```

6. **Abrir en el navegador**
- Ve a: `http://localhost:5000`

### Método 2: Docker

1. **Construir la imagen**
```bash
docker build -t tiktok-downloader .
```

2. **Ejecutar el contenedor**
```bash
docker run -p 5000:5000 tiktok-downloader
```

3. **Abrir en el navegador**
- Ve a: `http://localhost:5000`

## 📁 Estructura de Archivos

```
tiktok-downloader/
├── index.html          # Frontend principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript del frontend
├── app.py              # Servidor Flask (backend)
├── requirements.txt    # Dependencias de Python
├── Dockerfile          # Configuración de Docker
└── README.md           # Este archivo
```

## 🖥️ Uso

1. **Abrir la aplicación** en tu navegador
2. **Copiar la URL** del video de TikTok que quieres descargar
3. **Pegar la URL** en el campo de entrada
4. **Hacer clic en "Descargar"**
5. **Esperar** a que se procese el video
6. **Descargar** el archivo MP4 sin marca de agua

## 🔌 API Endpoints

### Obtener información del video
```http
POST /api/info
Content-Type: application/json

{
  "url": "https://www.tiktok.com/@user/video/1234567890"
}
```

### Descargar video
```http
POST /api/download
Content-Type: application/json

{
  "url": "https://www.tiktok.com/@user/video/1234567890"
}
```

### Estado del servicio
```http
GET /api/status
```

## ⚙️ Configuración

### Variables de Entorno

- `FLASK_ENV`: Entorno de Flask (development/production)
- `FLASK_DEBUG`: Habilitar debug mode (True/False)

### Configuración Personalizada

Puedes modificar las siguientes configuraciones en `app.py`:

- `TEMP_DIR`: Directorio para archivos temporales
- `max_age_hours`: Tiempo antes de limpiar archivos (default: 1 hora)

## 🔧 Desarrollo

### Estructura del Backend

- **Flask**: Framework web de Python
- **yt-dlp**: Librería para descargar videos (fork mejorado de youtube-dl)
- **CORS**: Para permitir peticiones desde el frontend

### Estructura del Frontend

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con gradientes y animaciones
- **Vanilla JavaScript**: Sin frameworks adicionales
- **Responsive Design**: Compatible con móviles y desktop

## 🚨 Problemas Comunes

### Error: "ffmpeg not found"
```bash
# Instalar ffmpeg según tu sistema operativo
# Windows: Descargar desde ffmpeg.org y añadir al PATH
# macOS: brew install ffmpeg
# Linux: sudo apt install ffmpeg
```

### Error: "ModuleNotFoundError: yt_dlp"
```bash
pip install yt-dlp
```

### Error: "Port 5000 already in use"
```python
# Cambiar el puerto en app.py
app.run(debug=True, host='0.0.0.0', port=8000)  # Usar puerto 8000
```

## 📝 Notas Importantes

- Los archivos se almacenan temporalmente y se eliminan automáticamente después de 1 hora
- La aplicación respeta los términos de servicio de TikTok
- Solo para uso personal y educativo
- Asegúrate de tener los permisos necesarios para descargar contenido

## 🔒 Seguridad

- Los archivos temporales se limpian automáticamente
- No se almacenan URLs ni datos de usuario
- Validación de URLs de entrada
- Manejo seguro de errores

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de "Problemas Comunes"
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de que ffmpeg esté en el PATH
4. Revisa los logs de la consola para errores específicos

## 🎯 Próximas Características

- [ ] Descarga de múltiples videos
- [ ] Descarga de audio únicamente
- [ ] Historial de descargas
- [ ] Configuración de calidad de video
- [ ] Integración con otras plataformas

---

**LIGHT.CH.G** - Descargador de TikTok sin Marca de Agua © 2024