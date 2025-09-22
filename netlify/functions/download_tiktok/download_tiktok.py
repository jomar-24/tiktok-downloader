import json
import yt_dlp
import logging

# Configurar un logger simple para ver mensajes en Netlify
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    """
    Esta es la única función que Netlify ejecutará.
    Recibe la solicitud, procesa el video y devuelve la URL directa.
    """
    logger.info("Función 'download_tiktok' iniciada.")

    # 1. Obtener la URL de TikTok del cuerpo de la solicitud
    try:
        body = json.loads(event.get('body', '{}'))
        tiktok_url = body.get('url')
        if not tiktok_url:
            raise ValueError("URL no proporcionada en la solicitud.")
        
        logger.info(f"URL recibida: {tiktok_url}")

    except Exception as e:
        logger.error(f"Error al parsear la solicitud: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Solicitud inválida: {str(e)}'})
        }

    # 2. Configurar yt-dlp para OBTENER LA URL DIRECTA (no para descargar el archivo en el servidor)
    # En un entorno serverless, esta es la forma más eficiente.
    ydl_opts = {
        'format': 'mp4/best[ext=mp4]/best', # Prioriza mp4
        'quiet': True,
        'no_warnings': True,
    }

    try:
        logger.info("Extrayendo información del video con yt-dlp...")
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Usamos download=False para solo obtener la información, incluida la URL directa del video.
            info = ydl.extract_info(tiktok_url, download=False)
            
            # La URL directa del video suele estar en la clave 'url' del diccionario de información.
            video_url = info.get('url')

            if video_url:
                logger.info(f"URL del video encontrada exitosamente.")
                # 3. Devolver la URL directa del video al frontend
                return {
                    'statusCode': 200,
                    'body': json.dumps({
                        'success': True,
                        'video_url': video_url,
                        'title': info.get('title', 'Video TikTok')
                    })
                }
            else:
                logger.error("yt-dlp no devolvió una URL de video.")
                raise Exception("No se pudo encontrar la URL del video.")

    except Exception as e:
        logger.error(f"Error al procesar el video con yt-dlp: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'success': False,
                'error': f'Error al procesar el video: {str(e)}'
            })
        }