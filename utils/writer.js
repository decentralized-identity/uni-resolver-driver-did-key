const ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

export function respondWithCode(code, payload) {
  return new ResponsePayload(code, payload);
}

export function writeJson(response, arg1, arg2) {
  let code;
  let payload;

  if(arg1 && arg1.payload && arg1.code) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if(arg2) {
    payload = arg1;
    code = arg2;
  }
  else if(arg1) {
    if(Number.isInteger(arg1)) {
      code = arg1;
    } else {
      payload = arg1;
    }
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  response.writeHead(code, {'Content-Type': 'application/ld+json;profile="https://w3id.org/did-resolution"'});
  response.end(payload);
}
