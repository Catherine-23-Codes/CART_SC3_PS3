import express from 'express';

const router = express.Router();

const categories = [
  'Plastic',
  'Paper',
  'Glass',
  'Metal',
  'Organic',
  'E-Waste',
  'Non-Recyclable'
];

const recyclingTips = {
  'Plastic': [
    'Wash before recycling',
    'Do not mix with food waste',
    'Use plastic recycling bins',
    'Remove caps and lids if required locally'
  ],
  'Paper': [
    'Keep clean and dry',
    'Flatten cardboard boxes',
    'Do not recycle greasy pizza boxes'
  ],
  'Glass': [
    'Rinse out food residue',
    'Do not mix broken window glass or mirrors',
    'Sort by color if required locally'
  ],
  'Metal': [
    'Rinse aluminum and tin cans',
    'Crush cans to save space',
    'Aerosol cans should be completely empty'
  ],
  'Organic': [
    'Compost at home if possible',
    'Use green bins for municipal collection',
    'Avoid adding meat or dairy to basic composters'
  ],
  'E-Waste': [
    'Take to specialized e-waste collection centers',
    'Do not throw batteries in normal trash',
    'Wipe personal data from devices before disposal'
  ],
  'Non-Recyclable': [
    'Ensure this goes to general waste/landfill',
    'Try to reduce consumption of these items',
    'Check local guidelines as facilities may differ'
  ]
};

router.get('/categories', (req, res) => {
  res.json(categories);
});

router.get('/recycling-tips/:category', (req, res) => {
  const category = req.params.category;
  // Case-insensitive match
  const matchedKey = Object.keys(recyclingTips).find(k => k.toLowerCase() === category.toLowerCase());
  
  if (matchedKey) {
    res.json({
      category: matchedKey,
      tips: recyclingTips[matchedKey]
    });
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

export default router;
