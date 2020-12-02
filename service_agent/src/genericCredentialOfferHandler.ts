import { Agent } from '@jolocom/sdk'
import { CredentialOfferFlowState } from '@jolocom/sdk/js/interactionManager/types'
import { CredentialOffer } from 'jolocom-lib/js/interactionTokens/types'
import { RPCRequest } from './types'
import {encode} from 'node-base64-image'

type Claims = Record<string, string>

interface OfferRequestParameters {
  name: string
  type: string
  claims: Claims
  renderAs: string
}

const generateMetadata = (type: string, name: string, claims: Claims) => {
  return {
    type: ['Credential', type],
    name,
    context: [
      {
        name: 'schema:name',
        ...Object.keys(claims).reduce((acc, key) => {
          acc[key] = `schema:${key}`
          return acc
        }, {}),
      },
    ],
  }
}

const generateCredentialOffer = (
  type: string,
  renderAs: string,
): CredentialOffer => ({
  type,
  requestedInput: {},
  renderInfo: {
    // @ts-ignore
    renderAs,
  },
})

const getBase64FromUrl = (url: string) => {
  const options = {
    string: true,
    headers: {
      "User-Agent": "my-app"
    }
  }
 
  return encode(url, options) as Promise<string>
}

export const genericCredentialOfferHandler = (
  agent: Agent,
): RPCRequest => async (
  req: OfferRequestParameters,
  { createInteractionCallbackURL, wrapJWT },
) => {
  const { name, type, claims, renderAs } = req

  const callbackURL = createInteractionCallbackURL(async (jwt: string) => {
    const interaction = await agent.processJWT(jwt)

    // NOTE: encoding the photo property if it's available
    if(claims['photo']) {
      claims['photo'] = await getBase64FromUrl(claims['photo'])
    }

    const state = interaction.getSummary().state as CredentialOfferFlowState
    const credentials = await interaction.issueSelectedCredentials(
      state.selectedTypes.reduce((acc, type) => {
        return {
          ...acc,
          [type]: () => ({
            claim: claims,
            metadata: generateMetadata(type, name, claims),
          }),
        }
      }, {}),
    )

    return interaction.createCredentialReceiveToken(credentials)
  })

  return wrapJWT(
    await agent.credOfferToken({
      callbackURL,
      offeredCredentials: [generateCredentialOffer(type, renderAs)],
    }),
  )
}
