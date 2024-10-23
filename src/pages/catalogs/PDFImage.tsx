import React, { useEffect, useRef, useState } from 'react'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PDFImageProps {
  url: string
  pageNumber?: number
}

const PDFImage: React.FC<PDFImageProps> = ({ url, pageNumber = 1 }) => {
  const [imageData, setImageData] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const renderPage = async () => {
      try {
        const loadingTask = pdfjs.getDocument(url)
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(pageNumber)
        const viewport = page.getViewport({ scale: 1.5 })

        if (canvasRef.current) {
          const canvas = canvasRef.current
          const context = canvas.getContext('2d')

          canvas.height = viewport.height
          canvas.width = viewport.width

          const renderContext = {
            canvasContext: context!,
            viewport: viewport
          }
          await page.render(renderContext).promise

          const dataUrl = canvas.toDataURL('image/png')
          setImageData(dataUrl)
        }
      } catch (error) {
        console.error('Error rendering PDF:', error)
      }
    }

    renderPage()
  }, [url, pageNumber])

  return (
    <div>
      {imageData ? (
        <img
          src={imageData}
          alt={`PDF page ${pageNumber}`}
          style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '0' }}
        />
      ) : (
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      )}
    </div>
  )
}

export default PDFImage
