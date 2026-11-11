// Fill only with verified official contact details. No submission service is connected.
export const contactData = {
  email: null,
  whatsappUrl: null,
  emailPlaceholder: '[Email TunasLab]',
  whatsappPlaceholder: '[Nomor WhatsApp TunasLab]',
  unavailableMessage: 'Kanal kontak resmi TunasLab sedang disiapkan. Informasi email atau WhatsApp akan ditampilkan di sini setelah tersedia.',
}

export const contactHref = contactData.email
  ? `mailto:${contactData.email}`
  : contactData.whatsappUrl
