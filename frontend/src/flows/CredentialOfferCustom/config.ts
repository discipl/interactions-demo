import { CredentialTypes } from "./types"

export const documentInputs = [
  {
    label: 'Belastingdienst',
    value: '1563',
    key: 'Beslagvrije voet',
    placeholder: '(mandatory)',
  },
  {
    label: 'Gerechtsdeurwaarder',
    value: 'Sanne Voorspoed',
    key: 'CDW',
    placeholder: '(mandatory)',
  },
  {
    label: 'UWV',
    value: '1846',
    key: 'Inkomensverhouding',
    placeholder: '(mandatory)',
  },
]

export const otherInputs = [
  {
    label: 'Place',
    value: 'Berlin, Germany',
    key: 'place',
    placeholder: '(mandatory)',
  },
]

export const documentTypes = [
  CredentialTypes.ProofOfDriverLicenceDemo,
  CredentialTypes.ProofOfIdCredentialDemo,
]

export const renderAsForType = {
  [CredentialTypes.ProofOfDriverLicenceDemo]: 'document',
  [CredentialTypes.ProofOfIdCredentialDemo]: 'document',
  [CredentialTypes.ProofOfTicketDemo]: 'ticket',
}