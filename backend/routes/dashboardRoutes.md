Create an Express route to return dashboard statistics.

Route:
GET /dashboard/stats

Response example:
{
  totalWasteScanned: 120,
  recyclableWastePercent: 72,
  co2Saved: 14.5,
  itemsRecycledToday: 35
}