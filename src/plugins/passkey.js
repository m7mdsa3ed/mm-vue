import {getCreateArguments, getArguments, createProcess, getProcess} from '../api/passkeys'

export const createPasskey = async () => {
  const response = await getCreateArguments()

  recursiveBase64StrToArrayBuffer(response.arguments);

  const credentials = await navigator.credentials.create(response.arguments)

  await createProcess({
      transports: credentials?.response?.getTransports ? credentials.response.getTransports() : null,
      clientDataJSON: credentials?.response?.clientDataJSON ? arrayBufferToBase64(credentials.response.clientDataJSON) : null,
      attestationObject: credentials?.response?.attestationObject ? arrayBufferToBase64(credentials.response.attestationObject) : null,
      challenge: response.challenge,
    }
  )
}

export const checkPasskey = async () => {
  const response = await getArguments()

  recursiveBase64StrToArrayBuffer(response.arguments);

  const credentials = await navigator.credentials.get(response.arguments);

  const credentialsData = {
    id: credentials?.rawId ? arrayBufferToBase64(credentials.rawId) : null,
    clientDataJSON: credentials?.response?.clientDataJSON ? arrayBufferToBase64(credentials.response.clientDataJSON) : null,
    authenticatorData: credentials?.response?.authenticatorData ? arrayBufferToBase64(credentials.response.authenticatorData) : null,
    signature: credentials?.response?.signature ? arrayBufferToBase64(credentials.response.signature) : null,
    userHandle: credentials?.response?.userHandle ? arrayBufferToBase64(credentials.response.userHandle) : null,
    challenge: response.challenge,
  } 
  
  await getProcess(credentialsData)
  
  return credentialsData;
}

const recursiveBase64StrToArrayBuffer = (obj) => {
  let prefix = '=?BINARY?B?';

  let suffix = '?=';

  if (typeof obj === 'object') {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        let str = obj[key];

        if (str.substring(0, prefix.length) === prefix && str.substring(str.length - suffix.length) === suffix) {
          str = str.substring(prefix.length, str.length - suffix.length);

          let binary_string = window.atob(str);

          let len = binary_string.length;

          let bytes = new Uint8Array(len);

          for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
          }

          obj[key] = bytes.buffer;
        }
      } else {
        recursiveBase64StrToArrayBuffer(obj[key]);
      }
    }
  }
}

const arrayBufferToBase64 = (buffer) => {
  let binary = '';

  let bytes = new Uint8Array(buffer);

  let len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}
