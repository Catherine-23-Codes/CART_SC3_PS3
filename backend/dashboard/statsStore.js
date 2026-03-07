const statsStore = {
  totalWasteScanned: 0,
  recyclableWasteCount: 0,
  co2Saved: 0,
  itemsRecycledToday: 0,
  classes: {
    Plastic: 0,
    Paper: 0,
    Glass: 0,
    Organic: 0,
    Metal: 0
  }
};

export const incrementWasteCount = (className) => {
  statsStore.totalWasteScanned += 1;
  if (className && statsStore.classes[className] !== undefined) {
    statsStore.classes[className] += 1;
  }
};

export const incrementRecyclable = () => {
  statsStore.recyclableWasteCount += 1;
  statsStore.itemsRecycledToday += 1;
};

export const addCO2Saved = (value) => {
  statsStore.co2Saved += value;
};

export const getStats = () => {
  // calculate percentages and return safely
  return {
    totalWasteScanned: statsStore.totalWasteScanned,
    recyclableWastePercent: statsStore.totalWasteScanned > 0 
      ? Math.round((statsStore.recyclableWasteCount / statsStore.totalWasteScanned) * 100)
      : 0,
    co2Saved: statsStore.co2Saved,
    itemsRecycledToday: statsStore.itemsRecycledToday,
    classes: statsStore.classes
  };
};

export default statsStore;
