import { saveAs } from 'file-saver'

export const downloadPdf = async (url: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    saveAs(blob, filename)
  } catch (error) {
    console.error('Error downloading the PDF:', error)
  }
}
