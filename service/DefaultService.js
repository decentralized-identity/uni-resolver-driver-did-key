'use strict';

const Resolver = require("did-resolver");
const keyGetResolver = require("@cef-ebsi/key-did-resolver");

const transmuteDidKey = require('@transmute/did-key.js');

let registry = {};

const resolver = keyGetResolver.getResolver();
console.log("ebsi resolver is now: " + JSON.stringify(resolver));
registry = { ...registry, ...resolver };

const didResolver = new Resolver.Resolver(registry);
console.log("resolver is now: " + JSON.stringify(didResolver));

/**
 * Resolve a DID or other identifier.
 *
 * identifier String A DID or other identifier to be resolved.
 * accept String The requested MIME type of the DID document or DID resolution result. (optional)
 * returns Object
 **/
exports.resolve = function(identifier,accept) {
  return new Promise(function(resolve, reject) {
    if (identifier.startsWith('did:key:z2dm') || identifier.startsWith('did:key:zmYg') || identifier.startsWith('did:key:zhQR')) {
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
          resolve(didDocument);
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
};
