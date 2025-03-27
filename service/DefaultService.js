'use strict';

import * as Resolver from "did-resolver";
import * as keyGetResolver from "@cef-ebsi/key-did-resolver";
import * as transmuteDidKey from '@transmute/did-key.js';

let registry = {};

const keyResolver = keyGetResolver.getResolver();
console.log("KEY resolver is now: " + JSON.stringify(keyResolver));
registry = { ...registry, ...keyResolver };

const didResolver = new Resolver.Resolver(registry);
console.log("DID resolver is now: " + JSON.stringify(didResolver));

/**
 * Resolve a DID or other identifier.
 *
 * identifier String A DID or other identifier to be resolved.
 * accept String The requested MIME type of the DID document or DID resolution result. (optional)
 * returns Object
 **/
export function resolve(identifier,accept) {
  return new Promise(function(resolve, reject) {
    if (identifier.startsWith('did:key:z2dm') || identifier.startsWith('did:key:zmYg') || identifier.startsWith('did:key:zhQR')) {
      console.log("Using DID resolver for " + identifier);
      didResolver.resolve(identifier)
        .then(function(didResolutionResult) {
          if (didResolutionResult) {
            resolve(didResolutionResult);
          } else {
            resolve(404);
          }
        })
        .catch(function (response) {
          resolve({code:500, payload:''+response});
        });
    } else {
      console.log("Using TRANSMUTE resolver for " + identifier);
      transmuteDidKey.resolve(identifier)
      .then(function(didResolutionResult) {
        if (didResolutionResult) {
          const didDocument = didResolutionResult['didDocument'];
          const verificationMethods = didDocument['verificationMethod'];
          console.log("verificationMethods=" + typeof(verificationMethods));
          for (const i in verificationMethods) {
            console.log("i=" + i);
            const verificationMethod = verificationMethods[i];
            console.log("verificationMethod=" + JSON.stringify(verificationMethod));
            const publicKeyJwk = verificationMethod ? verificationMethod['publicKeyJwk'] : undefined;
            const crv = publicKeyJwk ? publicKeyJwk['crv'] : undefined;
            if (crv === 'BLS12381_G1') {
              publicKeyJwk['kty'] = 'OKP';
              publicKeyJwk['crv'] = 'Bls12381G1';
            }
            if (crv === 'BLS12381_G2') {
              publicKeyJwk['kty'] = 'OKP';
              publicKeyJwk['crv'] = 'Bls12381G2';
            }
          }
          resolve(didResolutionResult);
        } else {
          resolve(404);
        }
      })
      .catch(function (error) {
        console.error(error);
        resolve({ code:500, payload:'' + error });
      });
    }
  });
}
