Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", {
  value: true,
  writable: true,
});

if (!("createObjectURL" in URL)) {
  Object.defineProperty(URL, "createObjectURL", {
    value: () => "blob:test-url",
    writable: true,
  });
}

if (!("revokeObjectURL" in URL)) {
  Object.defineProperty(URL, "revokeObjectURL", {
    value: () => undefined,
    writable: true,
  });
}
