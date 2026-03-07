export const getAllCenters = (req, res) => {
  // Use dummy centers for prototype
  const centers = [
      {
          id: 1,
          name: 'Green Earth Recycling Center',
          address: '123 Eco Way, Metro City',
          acceptedWaste: ['Plastic', 'Paper', 'Glass', 'Metal'],
          distance: '2.4 km',
          coordinates: { lat: 40.7128, lng: -74.0060 },
          rating: 4.8
      },
      {
          id: 2,
          name: 'TechScrap E-Waste Processing',
          address: '456 Tech Park Blvd, Metro City',
          acceptedWaste: ['E-Waste', 'Metal'],
          distance: '5.1 km',
          coordinates: { lat: 40.7580, lng: -73.9855 },
          rating: 4.5
      },
      {
          id: 3,
          name: 'City Compost Hub',
          address: '789 Nature Reserve, Metro City',
          acceptedWaste: ['Organic', 'Paper'],
          distance: '3.8 km',
          coordinates: { lat: 40.7282, lng: -73.9942 },
          rating: 4.9
      },
      {
          id: 4,
          name: 'Metro Glass & Plastic Recovery',
          address: '320 Industrial Ave, Metro City',
          acceptedWaste: ['Glass', 'Plastic'],
          distance: '6.2 km',
          coordinates: { lat: 40.7812, lng: -73.9665 },
          rating: 4.2
      },
      {
          id: 5,
          name: 'Sustainable Metals Plant',
          address: '55 Forge Street, Metro City',
          acceptedWaste: ['Metal'],
          distance: '8.5 km',
          coordinates: { lat: 40.6900, lng: -74.0440 },
          rating: 4.6
      },
      {
          id: 6,
          name: 'Community Paper Bank',
          address: '12 Library Road, Metro City',
          acceptedWaste: ['Paper', 'Cardboard'],
          distance: '1.2 km',
          coordinates: { lat: 40.7350, lng: -74.0010 },
          rating: 4.7
      },
      {
          id: 7,
          name: 'Advanced E-Dump',
          address: '99 Silicon Alley, Metro City',
          acceptedWaste: ['E-Waste'],
          distance: '4.5 km',
          coordinates: { lat: 40.7410, lng: -73.9890 },
          rating: 4.4
      },
      {
          id: 8,
          name: 'All-In-One Eco Depot',
          address: '1000 Greenways Drive, Metro City',
          acceptedWaste: ['Plastic', 'Paper', 'Glass', 'Metal', 'Organic', 'E-Waste'],
          distance: '12.0 km',
          coordinates: { lat: 40.8000, lng: -73.9500 },
          rating: 4.9
      }
  ];

  res.json(centers);
};
