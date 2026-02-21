import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Car from './models/Car.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-market';

const SEED_USER = {
  name: 'CarMarket Demo',
  email: 'demo@carmarket.com',
  password: 'demo123',
  phone: '+1 (555) 123-4567',
  role: 'seller',
};

const SEED_ADMIN = {
  name: 'Admin',
  email: 'admin@carmarket.com',
  password: 'admin123',
  phone: '+1 (555) 987-6543',
  role: 'admin',
};

const SEED_CARS = [
  {
    title: '2022 Toyota Camry XSE V6',
    description: 'Toyota Camry XSE V6 in pristine condition with only 15,000 miles. First owner with complete service history at Toyota dealership. Accident-free vehicle with all original parts. Features include panoramic sunroof, heated/ventilated leather seats, JBL premium audio system, and wireless Apple CarPlay.',
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 32500,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Los Angeles, CA'
  },
  {
    title: '2023 Honda Civic Sport',
    description: 'Honda Civic Sport with low mileage and excellent fuel economy. Single owner with clean Carfax report. Features include 7-inch touchscreen, Honda Sensing safety suite, and 16-inch alloy wheels. Perfect commuter car with great reliability.',
    brand: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 24500,
    mileage: 8000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'Used',
    location: 'Miami, FL'
  },
  {
    title: '2024 Tesla Model 3 Long Range',
    description: 'Brand new Tesla Model 3 Long Range with Full Self-Driving capability. Zero miles, fresh from factory. Dual motor all-wheel drive with 358 mile range. Premium interior with 15-inch touchscreen, glass roof, and 17-speaker sound system.',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 47490,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'New',
    location: 'San Francisco, CA'
  },
  {
    title: '2021 Ford F-150 Lariat',
    description: 'Ford F-150 Lariat SuperCrew with 3.5L EcoBoost V6. Well-maintained with complete service records. Features include leather interior, heated steering wheel, FX4 off-road package, and integrated trailer brake controller. Perfect for work or family.',
    brand: 'Ford',
    model: 'F-150',
    year: 2021,
    price: 48900,
    mileage: 35000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Dallas, TX'
  },
  {
    title: '2022 Jeep Wrangler Rubicon',
    description: 'Jeep Wrangler Rubicon 4x4 with low mileage. Fully loaded with removable hardtop, premium audio, and off-road packages. Features include front/rear locking differentials, disconnecting sway bar, and 33-inch all-terrain tires. Ready for any adventure.',
    brand: 'Jeep',
    model: 'Wrangler',
    year: 2022,
    price: 52500,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Denver, CO'
  },
  {
    title: '2023 BMW X5 xDrive40i',
    description: 'BMW X5 xDrive40i with M Sport package. Powerful 3.0L inline-6 with mild hybrid technology. Loaded with premium features including Harman Kardon sound, gesture control, and driving assistance professional package. Impeccably maintained.',
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    price: 68500,
    mileage: 9000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'New York, NY'
  },
  {
    title: '2020 Chevrolet Silverado 2500HD',
    description: 'Chevrolet Silverado 2500HD High Country with Duramax diesel. Perfect for heavy towing with 18,500 lbs capacity. Leather interior, navigation system, and trailering package included. Well-maintained with service records available.',
    brand: 'Chevrolet',
    model: 'Silverado 2500HD',
    year: 2020,
    price: 58900,
    mileage: 45000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Houston, TX'
  },
  {
    title: '2024 Hyundai IONIQ 6 SEL',
    description: 'New Hyundai IONIQ 6 SEL AWD with ultimate package. Streamlined design with 270+ mile range. Features include Bose premium audio, blind-spot view monitor, and highway driving assist. Cutting-edge electric vehicle with sleek styling.',
    brand: 'Hyundai',
    model: 'IONIQ 6',
    year: 2024,
    price: 47500,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'New',
    location: 'Seattle, WA'
  },
  {
    title: '2021 Subaru Outback Limited',
    description: 'Subaru Outback Limited XT with turbocharged engine. Perfect for outdoor enthusiasts with standard Symmetrical All-Wheel Drive. Features include heated seats, power moonroof, and EyeSight driver assist technology. Excellent condition.',
    brand: 'Subaru',
    model: 'Outback',
    year: 2021,
    price: 32900,
    mileage: 25000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'Used',
    location: 'Portland, OR'
  },
  {
    title: '2023 Mercedes-Benz C300',
    description: 'Mercedes-Benz C300 4MATIC with AMG Line package. Elegant design with Burmester surround sound and ambient lighting. Low mileage with factory warranty remaining. Premium interior with MBUX infotainment system.',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: 54900,
    mileage: 6000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Chicago, IL'
  },
  {
    title: '2022 Porsche 911 Carrera S',
    description: 'Porsche 911 Carrera S with low mileage and premium options. 443hp twin-turbo flat-6 with Manual transmission. Features include Sport Chrono package, premium Bose audio, and adaptive sport seats. Pristine condition.',
    brand: 'Porsche',
    model: '911',
    year: 2022,
    price: 145000,
    mileage: 8000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'Used',
    location: 'Beverly Hills, CA'
  },
  {
    title: '2024 Ford Mustang GT',
    description: 'All-new 2024 Ford Mustang GT with 5.0L Coyote V8. Brand new with performance package. Features include active exhaust, digital dash, and MagneRide suspension. Classic American muscle with modern technology.',
    brand: 'Ford',
    model: 'Mustang',
    year: 2024,
    price: 47995,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'New',
    location: 'Orlando, FL'
  },
  {
    title: '2023 Toyota RAV4 Prime',
    description: 'Toyota RAV4 Prime plug-in hybrid with XSE package. Best-in-class 42 miles electric range. Loaded with premium audio, panoramic moonroof, and 6.6kW onboard charger. Excellent condition with low miles.',
    brand: 'Toyota',
    model: 'RAV4',
    year: 2023,
    price: 45900,
    mileage: 5000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'Used',
    location: 'San Diego, CA'
  },
  {
    title: '2021 Ram 1500 Limited',
    description: 'Ram 1500 Limited crew cab with 5.7L HEMI eTorque. Luxurious interior with 12-inch touchscreen, ventilated seats, and 19-speaker Harman Kardon audio. Air suspension for superior ride comfort. Well-maintained.',
    brand: 'Ram',
    model: '1500',
    year: 2021,
    price: 56900,
    mileage: 28000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Phoenix, AZ'
  },
  {
    title: '2024 Kia EV6 GT-Line',
    description: 'Kia EV6 GT-Line AWD with advanced technology. Brand new with 310-mile range. Features include augmented reality HUD, highway driving assist, and ultra-fast charging capability. Award-winning design and performance.',
    brand: 'Kia',
    model: 'EV6',
    year: 2024,
    price: 52900,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'New',
    location: 'Austin, TX'
  },
  {
    title: '2022 Audi Q5 Prestige',
    description: 'Audi Q5 Prestige with S line competition package. Quattro all-wheel drive with 2.0L turbo. Features include virtual cockpit, Bang & Olufsen 3D sound, and driver assistance package. Immaculate condition.',
    brand: 'Audi',
    model: 'Q5',
    year: 2022,
    price: 49500,
    mileage: 11000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Boston, MA'
  },
  {
    title: '2023 Chevrolet Corvette Stingray',
    description: 'Chevrolet Corvette Stingray 3LT with Z51 performance package. 490hp mid-engine V8 with dual-clutch transmission. Features include front lift, carbon fiber trim, and performance exhaust. Like new condition.',
    brand: 'Chevrolet',
    model: 'Corvette',
    year: 2023,
    price: 84900,
    mileage: 3000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Las Vegas, NV'
  },
  {
    title: '2024 Honda CR-V Hybrid',
    description: 'Honda CR-V Hybrid Sport Touring brand new. Most fuel-efficient CR-V ever with 40 mpg combined. Features include Bose audio, wireless charging, and Honda Sensing 360. Perfect family SUV with modern design.',
    brand: 'Honda',
    model: 'CR-V',
    year: 2024,
    price: 38900,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Manual',
    condition: 'New',
    location: 'Atlanta, GA'
  },
  {
    title: '2023 Tesla Model Y Performance',
    description: 'Tesla Model Y Performance with low miles and FSD capability. Dual motor all-wheel drive with 3.5 second 0-60. Features include 21-inch Überturbine wheels, performance brakes, and premium interior. Excellent condition.',
    brand: 'Tesla',
    model: 'Model Y',
    year: 2023,
    price: 54900,
    mileage: 4000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'San Jose, CA'
  },
  {
    title: '2022 Lexus RX 350 F Sport',
    description: 'Lexus RX 350 F Sport with luxury package. Smooth and reliable V6 with exceptional build quality. Features include Mark Levinson audio, panoramic view monitor, and heated/ventilated seats. Immaculate condition.',
    brand: 'Lexus',
    model: 'RX 350',
    year: 2022,
    price: 52900,
    mileage: 14000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Nashville, TN'
  }
];

const CAR_IMAGES = {
  'Camry': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=400&fit=crop',
  'Civic': 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=400&fit=crop',
  'Model 3': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=400&fit=crop',
  'F-150': 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&h=400&fit=crop',
  'Wrangler': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=400&fit=crop',
  'X5': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=400&fit=crop',
  'Silverado': 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&h=400&fit=crop',
  'IONIQ 6': 'https://images.unsplash.com/photo-1685069497032-3a7dcb5d6e3b?w=800&h=400&fit=crop',
  'Outback': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=400&fit=crop',
  'C-Class': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=400&fit=crop',
  '911': 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=400&fit=crop',
  'Mustang': 'https://images.unsplash.com/photo-1543443258-4ba3d1007f2a?w=800&h=400&fit=crop',
  'RAV4': 'https://images.unsplash.com/photo-1629897048516-0bd8d6fb3c8e?w=800&h=400&fit=crop',
  '1500': 'https://images.unsplash.com/photo-1537141264234-ec41842177fa?w=800&h=400&fit=crop',
  'EV6': 'https://images.unsplash.com/photo-1667165497017-4b8c4e7b9b8c?w=800&h=400&fit=crop',
  'Q5': 'https://images.unsplash.com/photo-1606220838315-056192d5e3b1?w=800&h=400&fit=crop',
  'Corvette': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=400&fit=crop',
  'CR-V': 'https://images.unsplash.com/photo-1568844293986-ca9c5d6b6b8b?w=800&h=400&fit=crop',
  'Model Y': 'https://images.unsplash.com/photo-1619767886558-efdc7b9e0473?w=800&h=400&fit=crop',
  'RX 350': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=400&fit=crop'
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');

    let user = await User.findOne({ email: SEED_USER.email });
    if (!user) {
      user = await User.create(SEED_USER);
      console.log('Created seed user:', user.email);
    } else {
      console.log('Seed user already exists:', user.email);
    }

    let adminUser = await User.findOne({ email: SEED_ADMIN.email });
    if (!adminUser) {
      adminUser = await User.create(SEED_ADMIN);
      console.log('Created admin user:', adminUser.email);
    } else {
      console.log('Admin user already exists:', adminUser.email);
    }

    const existingCount = await Car.countDocuments({ isActive: true });
    if (existingCount >= 20) {
      console.log('Already have', existingCount, 'cars. Skipping seed.');
    } else {
      const carsToCreate = SEED_CARS.slice(0, 20 - existingCount).map((car) => ({
        ...car,
        seller: user._id,
        contactEmail: user.email,
        contactPhone: user.phone,
        images: [CAR_IMAGES[car.model.split(' ')[0]] || CAR_IMAGES[car.model]],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await Car.insertMany(carsToCreate);
      console.log('Created', carsToCreate.length, 'cars. Total active:', await Car.countDocuments({ isActive: true }));
    }
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();