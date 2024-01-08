'use strict';

const didKey = require('@transmute/did-key.js');

/**
 * Resolve a DID or other identifier.
 *
 * identifier String A DID or other identifier to be resolved.
 * accept String The requested MIME type of the DID document or DID resolution result. (optional)
 * returns Object
 **/
exports.resolve = function(identifier,accept) {
  return new Promise(function(resolve, reject) {
    didKey.resolve(identifier)
    .then(function(didDocument) {
      if (didDocument) {
        const verificationMethods = didDocument['didDocument']['verificationMethod'];
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
        resolve(didDocument);
      } else {
        resolve(404);
      }
    })
    .catch(function (response) {
      resolve({code:500, payload:''+response});
    });
  });
};
