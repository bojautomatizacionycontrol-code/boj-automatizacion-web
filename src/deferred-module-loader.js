export function createRetryableModuleLoader(importer) {
  if (typeof importer !== "function") {
    throw new TypeError("createRetryableModuleLoader requiere una función importadora");
  }

  let pending;
  return function loadModule() {
    if (!pending) {
      pending = Promise.resolve()
        .then(importer)
        .catch((error) => {
          pending = undefined;
          throw error;
        });
    }
    return pending;
  };
}
