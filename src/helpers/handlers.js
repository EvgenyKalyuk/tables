export function reducerPresetData({ state, action, events }) {
  const eventTypeSplit = events[Object.keys(events)[0]].split('_');
  const eventType = eventTypeSplit.length > 2 ? `${eventTypeSplit[0]}_${eventTypeSplit[1]}` : null;
  const pattern = new RegExp(`^${eventType}`);

  if (pattern.test(action.type)) {
    if (action.payload && !action.payload.error && Object.keys(action.payload).length) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    }
  }
}
