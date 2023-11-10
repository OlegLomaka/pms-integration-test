export const updateObject = (
  object: Record<string, any>,
  updateNewObject: Record<string, any>,
) => {
  if (!updateNewObject) return;

  const keys = Object.keys(updateNewObject);
  const values = Object.values(updateNewObject);

  for (let i = 0; i < keys.length; i += 1) {
    if (values[i] !== undefined && values[i] !== null) {
      object[keys[i]] = values[i];
    }
  }
};
