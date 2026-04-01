const DEFAULT_USERS = [
  { username: 'ahmed mounir', password: 'mounir1', role: 'superadmin', branches: ['Trivium Square', 'Lake Town', 'Telal'], checklists: ['service', 'bar', 'shisha'], canManagePoints: true, canManageUsers: true },
  { username: 'youssef raouf', password: 'raouf1', role: 'superadmin', branches: ['Trivium Square', 'Lake Town', 'Telal'], checklists: ['service', 'bar', 'shisha'], canManagePoints: true, canManageUsers: true },
  
  { username: 'yousef el gendy', password: 'gendy1', role: 'branchadmin', branches: ['Trivium Square'], checklists: ['service', 'bar', 'shisha'], canManagePoints: true, canManageUsers: false },
  { username: 'mahmoud yassin', password: 'yassin1', role: 'branchadmin', branches: ['Trivium Square'], checklists: ['service', 'bar', 'shisha'], canManagePoints: true, canManageUsers: false },
  { username: 'ebrahim qasem', password: 'qasem1', role: 'user', branches: ['Trivium Square'], checklists: ['service'], canManagePoints: false, canManageUsers: false },
  { username: 'mahmoud mosalam', password: 'mosalam1', role: 'user', branches: ['Trivium Square'], checklists: ['service'], canManagePoints: false, canManageUsers: false },
  { username: 'afsha', password: 'afsha', role: 'user', branches: ['Trivium Square'], checklists: ['service'], canManagePoints: false, canManageUsers: false },
  { username: 'ezz', password: 'ezz1', role: 'user', branches: ['Trivium Square'], checklists: ['service'], canManagePoints: false, canManageUsers: false },

  { username: 'pepo', password: 'pepo1', role: 'branchadmin', branches: ['Trivium Square'], checklists: ['service', 'bar', 'shisha'], canManagePoints: true, canManageUsers: false },
  { username: 'omar mohamed', password: 'omar1', role: 'user', branches: ['Trivium Square'], checklists: ['bar'], canManagePoints: false, canManageUsers: false },

  { username: 'kimo', password: 'kimo1', role: 'user', branches: ['Trivium Square', 'Lake Town'], checklists: ['shisha'], canManagePoints: false, canManageUsers: false },
  { username: 'haitham', password: 'haitham1', role: 'user', branches: ['Trivium Square'], checklists: ['shisha'], canManagePoints: false, canManageUsers: false },

  { username: 'mohamed zakaria', password: 'zakaria1', role: 'branchadmin', branches: ['Lake Town'], checklists: ['service', 'bar', 'shisha'], canManagePoints: true, canManageUsers: false },
  { username: 'agnaby', password: 'agnaby1', role: 'branchadmin', branches: ['Lake Town'], checklists: ['service', 'bar', 'shisha'], canManagePoints: true, canManageUsers: false },
  { username: 'men3m', password: 'men3m1', role: 'user', branches: ['Lake Town'], checklists: ['service'], canManagePoints: false, canManageUsers: false },
  { username: 'costa', password: 'costa1', role: 'user', branches: ['Lake Town'], checklists: ['service'], canManagePoints: false, canManageUsers: false },
  { username: 'noby', password: 'noby1', role: 'user', branches: ['Lake Town'], checklists: ['service'], canManagePoints: false, canManageUsers: false },

  { username: 'khaled gamal', password: 'khaled1', role: 'branchadmin', branches: ['Lake Town'], checklists: ['service', 'bar', 'shisha'], canManagePoints: true, canManageUsers: false },
  { username: 'ouny', password: 'ouny1', role: 'branchadmin', branches: ['Lake Town'], checklists: ['service', 'bar', 'shisha'], canManagePoints: true, canManageUsers: false },

  { username: 'youssef shehata', password: 'youssef1', role: 'user', branches: ['Lake Town'], checklists: ['shisha'], canManagePoints: false, canManageUsers: false },
];

const DEFAULT_CHECKLISTS = {
  service: [
    { section: 'OPENING - EXTERIOR & ENTRANCE', text: 'Entrance & Exterior: Sweep entrance, clean glass doors, check signage.' },
    { section: 'OPENING - EXTERIOR & ENTRANCE', text: 'Glass & Mirrors: Ensure all entrance glass and mirrors are clean and shiny.' },
    { section: 'OPENING - EXTERIOR & ENTRANCE', text: 'Black Pillars/Columns: Wipe down and ensure they are dust-free.' },
    { section: 'OPENING - EXTERIOR & ENTRANCE', text: 'Outdoor Area: Sweep floor and ensure floor dividers are clean.' },
    { section: 'OPENING - EXTERIOR & ENTRANCE', text: 'Outdoor Furniture: Clean tables (top and bottom) and ensure chairs are clean and stable.' },
    { section: 'OPENING - EXTERIOR & ENTRANCE', text: 'Heaters: Check condition of gas/electric heaters.' },
    { section: 'OPENING - EXTERIOR & ENTRANCE', text: 'Plants: Ensure all plants are clean and healthy.' },
    { section: 'OPENING - EXTERIOR & ENTRANCE', text: 'Lighting: Check that all outdoor lighting is clean and functioning.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Dining Area: Align tables/chairs, check for wobbles, wipe surfaces.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Table Setup: Place clean menus, polished cutlery, napkins, and condiments.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Condiments: Ensure salt, pepper, ashtrays, and menu holders are clean and full.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Decoration: Wipe down all indoor decorations and ensure they are dust-free.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Walls & Fences: Clean black walls and fences, ensuring they are dust-free.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Curtains: Check that curtains are clean and in good condition.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Under Tables: Ensure the area under every table is clean and free of stickers/debris.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Side Stations: Stock with extra napkins, cutlery, water carafes, and menus; ensure they are organized.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Lighting & Ambience: Set lights to standard, start background music.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Restrooms: Check cleanliness, stock toilet paper, soap, and towels.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'POS System: Log in, check printer paper, ensure cash drawer is ready and cables are organized.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Camera System: Verify that the camera system is working correctly.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Fire Safety: Ensure fire extinguishers are present and in their designated places.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Staff Briefing: Review daily specials, 86\'d items, and shift goals.' },
    { section: 'OPENING - DINING AREA (INDOOR)', text: 'Uniform & Grooming: Ensure all staff meet grooming and uniform standards (clean, ironed, complete).' },
    { section: 'CLOSING - SERVICE AREA', text: 'Guest Check: Ensure all guests have departed before starting procedures.' },
    { section: 'CLOSING - SERVICE AREA', text: 'Table Clearing: Clear all remaining items, sanitize tables and chairs.' },
    { section: 'CLOSING - SERVICE AREA', text: 'Floor Care: Sweep and mop the entire dining area (indoor and outdoor).' },
    { section: 'CLOSING - SERVICE AREA', text: 'Side Stations: Clean and restock for the next shift.' },
    { section: 'CLOSING - SERVICE AREA', text: 'Menu Maintenance: Wipe down all menus and discard damaged ones.' },
    { section: 'CLOSING - SERVICE AREA', text: 'Trash Removal: Empty all FOH bins and sanitize.' },
    { section: 'CLOSING - SERVICE AREA', text: 'POS Closing: Reconcile cash, print end-of-day reports, log out.' },
    { section: 'CLOSING - SERVICE AREA', text: 'Security: Lock all doors, turn off non-essential lights and music.' }
  ],
  bar: [
    { section: 'OPENING - BAR AREA', text: 'Station Setup: Sanitize bar counter (top and bottom), sinks, and prep surfaces.' },
    { section: 'OPENING - BAR AREA', text: 'Equipment Check: Turn on coffee machine, blender, and juicers; ensure all are working.' },
    { section: 'OPENING - BAR AREA', text: 'Coffee Calibration: Dial in espresso grinder, check extraction time and temperature.' },
    { section: 'OPENING - BAR AREA', text: 'Bar Tools: Organize shakers, strainers, spoons, and jiggers; ensure all are present.' },
    { section: 'OPENING - BAR AREA', text: 'Prep & Stock: Prepare garnishes (citrus, herbs), check syrups and juices.' },
    { section: 'OPENING - BAR AREA', text: 'Ice Supply: Fill ice bins with fresh, clean ice.' },
    { section: 'OPENING - BAR AREA', text: 'Glassware: Ensure all glasses are polished and stored correctly.' },
    { section: 'OPENING - BAR AREA', text: 'Fridge Check: Check temperatures, restock bottled drinks (FIFO).' },
    { section: 'OPENING - BAR AREA', text: 'Drains & Sinks: Ensure bar drains are clean and sinks are organized.' },
    { section: 'OPENING - BAR AREA', text: 'Expiry Dates: Check expiry dates of all bar products.' },
    { section: 'OPENING - BAR AREA', text: 'Stock Analysis: Check and analyze stock levels for daily sales.' },
    { section: 'CLOSING - BAR AREA', text: 'Equipment Cleaning: Backflush espresso machine, clean blender jars.' },
    { section: 'CLOSING - BAR AREA', text: 'Surface Sanitation: Deep clean bar mats, sinks, and counters.' },
    { section: 'CLOSING - BAR AREA', text: 'Stock Inventory: Record low items, store perishables in fridge.' },
    { section: 'CLOSING - BAR AREA', text: 'Fridge Maintenance: Wipe down fridge interiors, check seals.' },
    { section: 'CLOSING - BAR AREA', text: 'Glassware: Wash and polish all used glassware.' },
    { section: 'CLOSING - BAR AREA', text: 'Trash & Drains: Empty bar bins, flush drains with hot water/sanitizer.' },
    { section: 'CLOSING - BAR AREA', text: 'Power Down: Turn off non-essential bar equipment.' }
  ],
  shisha: [
    { section: 'OPENING - SHISHA AREA', text: 'Area Prep: Sweep shisha lounge, arrange seating and cushions.' },
    { section: 'OPENING - SHISHA AREA', text: 'Equipment Inspection: Check shisha pipes for cracks or leaks.' },
    { section: 'OPENING - SHISHA AREA', text: 'Cleaning: Sanitize hoses and bases, ensure they are dry and odor-free.' },
    { section: 'OPENING - SHISHA AREA', text: 'Coal Station: Prepare coal burners, ensure adequate coal supply.' },
    { section: 'OPENING - SHISHA AREA', text: 'Tobacco Stock: Organize flavors, check freshness and stock levels.' },
    { section: 'OPENING - SHISHA AREA', text: 'Accessories: Stock disposable tips, tongs, and foil/HMDs.' },
    { section: 'OPENING - SHISHA AREA', text: 'Ventilation: Turn on exhaust fans, check air quality.' },
    { section: 'CLOSING - SHISHA AREA', text: 'Coal Safety: Safely extinguish all remaining coals in water/sand.' },
    { section: 'CLOSING - SHISHA AREA', text: 'Pipe Breakdown: Disassemble shishas, empty bases, rinse thoroughly.' },
    { section: 'CLOSING - SHISHA AREA', text: 'Hose Care: Hang hoses to dry, sanitize handles.' },
    { section: 'CLOSING - SHISHA AREA', text: 'Station Cleanup: Clean coal burners and surrounding area.' },
    { section: 'CLOSING - SHISHA AREA', text: 'Inventory: Record tobacco usage, store containers airtight.' },
    { section: 'CLOSING - SHISHA AREA', text: 'Trash Removal: Empty ash trays and shisha area bins.' },
    { section: 'CLOSING - SHISHA AREA', text: 'Power Down: Turn off coal burners and exhaust fans.' }
  ]
};

const DATA_VERSION = '1.1';

function initData() {
  if (localStorage.getItem('garten_version') !== DATA_VERSION) {
    localStorage.setItem('garten_users', JSON.stringify(DEFAULT_USERS));
    localStorage.setItem('garten_checklists', JSON.stringify(DEFAULT_CHECKLISTS));
    localStorage.setItem('garten_version', DATA_VERSION);
  }
}

initData();
