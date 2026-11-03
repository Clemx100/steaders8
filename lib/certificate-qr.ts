import 'server-only'
import QRCode from 'qrcode'

export async function qrDataUrlForPayload(payload: string) {
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 180,
    color: { dark: '#143d21', light: '#ffffff' },
  })
}
